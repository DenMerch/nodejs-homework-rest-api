const createNewError = require('../helpers')

const validateContact = schema => {
    const validate = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(createNewError(404, `missing required ${error.message.replace("is required", "")} field`))
        }
        next()
    }
    return validate;
}

module.exports = validateContact;