const Joi = require("joi");
const { emailRegex } = require("../constants/users")

const defination = ["starter", "pro", "business"]
const userRegisterSchema = Joi.object({
    password: Joi.string().required().min(6),
    subscription: Joi.string(),
    email: Joi.string().required().pattern(emailRegex),
})

const userLoginSchema = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().required().pattern(emailRegex),
})
const userUpdateSubscription = Joi.object({
    subscription: Joi.string().required().$_compile(defination)
})
const userVerifyEmail = Joi.object({
    email: Joi.string().required().pattern(emailRegex),
})

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userUpdateSubscription,
    userVerifyEmail,
};