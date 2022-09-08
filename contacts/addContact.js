const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");
const fs = require("fs").promises;

async function addContact(name, email, phone) {
  const data = { name, email, phone };
  const contacts = await listContacts();
  const newContact = { ...data, id: v4() };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}
module.exports = addContact;
