const { isValidObjectId } = require("mongoose")

const { createNewError } = require("../helpers")

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(createNewError(404, `${id} is not valid id format`))
    }
    next()
}

module.exports = isValidId