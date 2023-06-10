const express = require('express')

const { validateBody } = require("../../decorator")
const { userRegisterSchema, userLoginSchema, userUpdateSubscription } = require("../../schema/users")
const { registerUser, loginUser, getCurrent, logoutUser, updateSubscription } = require("../../controllers/usersController")
const authentacate = require("../../middlwares/authenticate")

const authRouter = express.Router()

authRouter.post("/register", validateBody(userRegisterSchema), registerUser);

authRouter.post("/login", validateBody(userLoginSchema), loginUser)

authRouter.get("/current", authentacate, getCurrent)

authRouter.post("/logout", authentacate, logoutUser)

authRouter.patch("/", authentacate, validateBody(userUpdateSubscription), updateSubscription)


module.exports = authRouter;