const createNewError = require("../helpers")

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            error.message = `missing required ${error.message.replace("is required", "")} field`
            next(createNewError(400, error.message))
        }
        next(error)
    }
    return func;
}

module.exports = { validateBody }