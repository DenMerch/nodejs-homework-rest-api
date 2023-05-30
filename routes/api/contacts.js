const express = require('express')

const { createNewError } = require("../../helpers")
const contactsSchema = require("../../schema/contacts-schema")
const { validateContact } = require('../../middlware')

const contacts = require("../../models/contacts")

const router = express.Router()


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result.length) {

      throw createNewError(404);
    }
    res.json(result)
  } catch (error) {
    console.log(error);
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw createNewError(404);
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      error.message = `missing required ${error.message.replace("is required", "")} field`
      throw createNewError(400, error.message);
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (!req.body.length) {
      error.message = `missing fields`
      throw createNewError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body)
    if (!result) {
      throw createNewError(404)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})


module.exports = router
