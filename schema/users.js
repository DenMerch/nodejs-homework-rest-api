const Joi = require("joi");
const { emailRegex } = require("../constants/users")

const userRegisterSchema = Joi.object({
    password: Joi.string().required().min(6),
    subscription: Joi.string(),
    email: Joi.string().required().pattern(emailRegex),
})

module.exports = {
    userRegisterSchema,
};