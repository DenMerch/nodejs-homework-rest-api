const User = require("../models/user")
const { createNewError } = require("../helpers")
const { cntrWrap } = require('../decorator');

const registerUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,

        }
    })
}


module.exports = {
    registerUser: cntrWrap(registerUser),

}