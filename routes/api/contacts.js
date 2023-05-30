const express = require('express')

const { getAll,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById, } = require("../../controllers/contactsController")
const router = express.Router()


router.get('/', getAll)

router.get('/:id', getContactById)

router.delete('/:id', deleteContactById)

router.post('/', addContact)

router.put('/:id', updateContactById)


module.exports = router
