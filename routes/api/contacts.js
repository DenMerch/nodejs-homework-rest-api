const express = require('express')

const { getAll,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
  updateStatusContact, } = require("../../controllers/contactsController")
const { contactsSchema, contactUpdateSchema } = require("../../schema/contacts-schema")
const { validateBody, validateFavoriteBody } = require("../../decorator")
const { isValidId } = require("../../middlwares")
const authentacate = require("../../middlwares/authenticate")


const router = express.Router()

router.use(authentacate)

router.get('/', authentacate, getAll)

router.get('/:id', isValidId, getContactById)

router.delete('/:id', isValidId, deleteContactById)

router.post('/', validateBody(contactsSchema), addContact)

router.put('/:id', isValidId, validateBody(contactsSchema), updateContactById)

router.patch('/:id/favorite', isValidId, validateFavoriteBody(contactUpdateSchema), updateStatusContact)


module.exports = router
