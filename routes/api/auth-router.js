const express = require('express')

const { validateBody } = require("../../decorator")
const { userRegisterSchema, userLoginSchema, userUpdateSubscription, userVerifyEmail } = require("../../schema/users")
const { registerUser, loginUser, getCurrent, logoutUser, updateSubscription, updateAvatar, verify, sendVerifyEmail } = require("../../controllers/usersController")
const authentacate = require("../../middlwares/authenticate")
const { upload } = require("../../middlwares")

const authRouter = express.Router()

authRouter.post("/register", validateBody(userRegisterSchema), registerUser);

authRouter.post("/login", validateBody(userLoginSchema), loginUser)

authRouter.get("/verify/:verificationToken", verify)

authRouter.post("/verify", validateBody(userVerifyEmail), sendVerifyEmail)

authRouter.get("/current", authentacate, getCurrent)

authRouter.post("/logout", authentacate, logoutUser)

authRouter.patch("/", authentacate, validateBody(userUpdateSubscription), updateSubscription)

authRouter.patch("/avatars", authentacate, upload.single("avatar"), updateAvatar)


module.exports = authRouter;