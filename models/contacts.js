const fs = require('fs/promises')
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
  const result = await fs.readFile(contactsPath)
  return JSON.parse(result)
}

const getContactById = async (id) => {
  const contacts = await listContacts()
  const result = contacts.filter(contact => contact.id === id)
  if (!result) {
    return null
  };
  return result;
}

const removeContact = async (id) => {

  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(contact => contact.id === id)
  if (contactIndex === -1) {
    return null
  }
  const removedContact = contacts[contactIndex]
  const newContacts = contacts.filter(contact => contact.id !== id)
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))

  return removedContact
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const contact = {
    name,
    email,
    phone,
    id: uuidv4()
  }
  contacts.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts;
}

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(contact => contact.id === id)
  if (contactIndex === -1) {
    return null
  }
  contacts[contactIndex] = { id, name, email, phone }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[contactIndex]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
