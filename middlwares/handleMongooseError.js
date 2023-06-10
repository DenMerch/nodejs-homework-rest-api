const handleMongooseError = (error, data, next) => {
    const { code, name } = error;
    error.status = (code === 11000 && name === "MongoServerError") ? 409 : 400;
    error.message = (code === 11000 && name === "MongoServerError") ? "Email in use" : "Bad Request"
    next();
}

module.exports = handleMongooseError;