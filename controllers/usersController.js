const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const gravatar = require('gravatar');
const path = require('path');
const fs = require("fs/promises");
const Jimp = require("jimp");
const nanoid = require("nanoid")

const User = require("../models/user")
const { createNewError } = require("../helpers")
const { cntrWrap } = require('../decorator');
const { SECRET_KEY, BASE_URL } = process.env;
const { sendEmail } = require("../helpers")

const avatrsDir = path.resolve("public", "avatars");




const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    const avatar = gravatar.url(email);
    const verificationToken = Date.now();

    if (user) {
        throw createNewError(409, "Email in use")
    }
    const cryptPassw = await bcrypt.hash(password, 10)

    const newUser = await User.create({ ...req.body, password: cryptPassw, avatarURL: avatar, verificationToken });
    const emailMsg = {
        to: email,
        subject: 'Sending with SendGrid is Fun',
        text: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
    }

    await sendEmail(emailMsg)

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,

        }
    })
}

const verify = async (req, res) => {
    const { verificationToken } = req.params


    res.status(200).json({ message: 'Verification successful' })

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        throw createNewError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw createNewError(401, "Email or password is wrong")
    }
    const { _id: id } = user;
    const payload = {
        id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token })

    res.json({
        "token": token,
        "user": {
            "email": user.email,
            "subscription": user.subscription,
        }
    })
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({ email, subscription })

}

const logoutUser = async (req, res) => {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { token: "" })
    res.status(204).json()
}

const updateSubscription = async (req, res) => {
    const { subscription } = req.body
    const { id } = req.user;
    const result = await User.findByIdAndUpdate(id, { subscription })
    res.status(204).json({
        result
    })
}

const updateAvatar = async (req, res) => {

    const { id } = req.user
    const { path: tempPath, filename } = req.file

    const newFileName = `${id}_${filename}`
    const newPath = path.join(avatrsDir, newFileName)

    await fs.rename(tempPath, newPath)
    Jimp.read(newPath)
        .then((avatar) => {
            return avatar
                .resize(250, 250)
                .write(newPath);
        })
        .catch((err) => {
            console.error(err);
        });
    const avatar = path.join("avatars", newFileName)
    await User.findByIdAndUpdate(id, { avatarURL: avatar })

    res.status(200).json({ avatarURL: avatar })
}


module.exports = {
    registerUser: cntrWrap(registerUser),
    verify: cntrWrap(verify),
    loginUser: cntrWrap(loginUser),
    getCurrent: cntrWrap(getCurrent),
    logoutUser: cntrWrap(logoutUser),
    updateSubscription: cntrWrap(updateSubscription),
    updateAvatar: cntrWrap(updateAvatar)

}