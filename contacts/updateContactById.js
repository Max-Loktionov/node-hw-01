const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");
const fs = require("fs/promises");

async function updateContactById(id, name, email, phone) {
  const data = { name, email, phone };
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = updateContactById;
