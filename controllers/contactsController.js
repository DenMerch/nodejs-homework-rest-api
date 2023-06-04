const Contact = require("../models/contacts")
const { createNewError } = require("../helpers")
const { cntrWrap } = require('../decorator');


const getAll = async (req, res,) => {

    const result = await Contact.find();

    res.json(result);

}

const getContactById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    // const result = await Contact.findOne({ _id: id });
    const result = await Contact.findById(id);
    if (!result) {

        throw createNewError(404);
    }
    res.json(result)
}

const updateContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!result) {
        throw createNewError(404)
    }
    res.json(result)
}

const addContact = async (req, res) => {

    const result = await Contact.create(req.body)
    res.status(201).json(result)
}

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findOneAndDelete({ _id: id });
    if (!result) {
        throw createNewError(404);
    }
    res.json({ message: 'contact deleted' });
}
const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!result) {
        throw createNewError(404)
    }
    res.json(result)
}

module.exports = {
    getAll: cntrWrap(getAll),
    getContactById: cntrWrap(getContactById),
    addContact: cntrWrap(addContact),
    updateContactById: cntrWrap(updateContactById),
    deleteContactById: cntrWrap(deleteContactById),
    updateStatusContact: cntrWrap(updateStatusContact),
}