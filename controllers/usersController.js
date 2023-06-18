const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const gravatar = require('gravatar');
const path = require('node:path');
const fs = require("fs/promises");

const User = require("../models/user")
const { createNewError } = require("../helpers")
const { cntrWrap } = require('../decorator');
const { SECRET_KEY } = process.env;
const avatrsDir = path.join(process.cwd(), "public", "avatars");


const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    const avatar = gravatar.url(email);

    if (user) {
        throw createNewError(409, "Email in use")
    }
    const cryptPassw = await bcrypt.hash(password, 10)

    const newUser = await User.create({ ...req.body, password: cryptPassw, avatarURL: avatar });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,

        }
    })
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
    const { path, filename } = req.file
    console.log(avatrsDir);
    console.log(filename);
    let createdNewPath = path.join('/foo', 'bar', 'baz/asdf', 'quux')
    console.log(id, createdNewPath);

    // console.log(newPath);
    // await fs.rename(path, newPath)
    // const avatar = path.join("avatars", filename)
    // const result = await User.findByIdAndUpdate(id, { avatarURL: avatar })
    res.status(200).json({ message: "done" })

}


module.exports = {
    registerUser: cntrWrap(registerUser),
    loginUser: cntrWrap(loginUser),
    getCurrent: cntrWrap(getCurrent),
    logoutUser: cntrWrap(logoutUser),
    updateSubscription: cntrWrap(updateSubscription),
    updateAvatar: cntrWrap(updateAvatar)

}