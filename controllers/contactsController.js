const contacts = require("../models/contacts")
const { createNewError } = require("../helpers")
const { cntrWrap } = require('../decorator')

const getAll = async (req, res,) => {

    const result = await contacts.listContacts();
    res.json(result);

}

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {

        throw createNewError(404);
    }
    res.json(result)
}

const updateContactById = async (req, res) => {

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body)
    if (!result) {
        throw createNewError(404)
    }
    res.json(result)
}

const addContact = async (req, res) => {

    console.log(req.body);
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
}

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
        throw createNewError(404);
    }
    res.json({ message: 'contact deleted' });
}

module.exports = {
    getAll: cntrWrap(getAll),
    getContactById: cntrWrap(getContactById),
    addContact: cntrWrap(addContact),
    updateContactById: cntrWrap(updateContactById),
    deleteContactById: cntrWrap(deleteContactById),
}