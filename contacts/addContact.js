const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");
const fs = require("fs").promises;

async function addContact(name, email, phone) {
  try {
    const data = { name, email, phone };
    const contacts = await listContacts();
    const newContact = { ...data, id: v4() };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}
module.exports = addContact;
