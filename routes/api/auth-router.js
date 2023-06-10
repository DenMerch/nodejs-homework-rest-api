const express = require('express')

const { validateBody } = require("../../decorator")
const { userRegisterSchema } = require("../../schema/users")
const { registerUser } = require("../../controllers/usersController")

const authRouter = express.Router()

authRouter.post("/register", validateBody(userRegisterSchema), registerUser)


module.exports = authRouter;