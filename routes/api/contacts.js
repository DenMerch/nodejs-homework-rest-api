const express = require('express')


const { createNewError } = require("../../helpers")

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
    if (!result) {

      throw createNewError(404);
    }
    res.json(result)
  } catch (error) {
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
    res.json(result);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next()
  }
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
