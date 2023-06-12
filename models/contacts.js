const mongoose = require("mongoose")
const { Schema, model } = mongoose
const { handleMongooseError } = require("../middlwares")

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, { versionKey: false, timestamps: true })

contactSchema.post("save", handleMongooseError)

const Contact = model("contact", contactSchema);

module.exports = Contact

