const Contact = require("../models/contacts")
const { createNewError } = require("../helpers")
const { cntrWrap } = require('../decorator');


const getAll = async (req, res,) => {
    const { _id: owner } = req.user
    const { page = 1, limit = 10, ...qyery } = req.query
    const skip = (page - 1) * limit
    const result = await Contact.find({ owner, ...qyery }, "-createdAt -updatedAt -owner", { skip, limit })
        .populate("owner", "email");

    res.json(result);

}

const getContactById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user
    // const result = await Contact.findOne({ _id: id });
    const result = await Contact.findById({ id, owner });
    if (!result) {

        throw createNewError(404);
    }
    res.json(result)
}

const updateContactById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user

    const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true })
    if (!result) {
        throw createNewError(404)
    }
    res.json(result)
}

const addContact = async (req, res) => {
    const { _id: owner } = req.user
    const result = await Contact.create({ ...req.body, owner })
    res.status(201).json(result)
}

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user
    const result = await Contact.findOneAndDelete({ _id: id, owner });
    if (!result) {
        throw createNewError(404);
    }
    res.json({ message: 'contact deleted' });
}
const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user
    const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true })
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