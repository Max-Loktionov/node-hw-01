const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");
const fs = require("fs/promises");

async function removeContact(contactId) {
  const contacts = await listContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return deletedContact;
}

module.exports = removeContact;
