const jwt = require("jsonwebtoken")

const { createNewError } = require("../helpers")
const User = require("../models/user")

const { SECRET_KEY } = process.env;

const message = "Not authorized"


const authentacate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ")

    if (bearer !== "Bearer") {

        next(createNewError(401, message))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id)
        if (!user || !user.token) {

            next(createNewError(401, message))
        }
        req.user = user;
        next()
    }
    catch {

        next(createNewError(401, message))
    }

}

module.exports = authentacate;