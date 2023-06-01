const express = require('express')

const { getAll,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById, } = require("../../controllers/contactsController")
const { contactsSchema } = require("../../schema/contacts-schema")
const { validateBody } = require("../../decorator")


const router = express.Router()


router.get('/', getAll)

router.get('/:id', getContactById)

router.delete('/:id', deleteContactById)

router.post('/', validateBody(contactsSchema), addContact)

router.put('/:id', validateBody(contactsSchema), updateContactById)


module.exports = router
