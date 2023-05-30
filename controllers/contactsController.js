const contacts = require("../models/contacts")
const { createNewError } = require("../helpers")
const contactsSchema = require("../schema/contacts-schema")
const { cntrWrap } = require('../decorator')

const getAll = async (req, res,) => {

    const result = await contacts.listContacts();
    res.json(result);

}

const getContactById = async (req, res, next) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result.length) {

        throw createNewError(404);
    }
    res.json(result)
}

const updateContactById = async (req, res, next) => {
    const { error } = contactsSchema.validate(req.body)
    if (!Object.keys(req.body).length) {
        error.message = `missing fields`
        throw createNewError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body)
    if (!result) {
        throw createNewError(404)
    }
    res.json(result)
}

const addContact = async (req, res, next) => {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
        error.message = `missing required ${error.message.replace("is required", "")} field`
        throw createNewError(400, error.message);
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
}

const deleteContactById = async (req, res, next) => {
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