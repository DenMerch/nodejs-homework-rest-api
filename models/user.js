const mongoose = require("mongoose")
const { Schema, model } = mongoose
const { handleMongooseError } = require("../middlwares")
const { emailRegex } = require("../constants/users")

const authSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
    },
    email: {
        type: String,
        match: emailRegex,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: String,
    token: String,
}, { versionKey: false, timestamps: true });

authSchema.post("save", handleMongooseError)

const User = model("user", authSchema);

module.exports = User;


