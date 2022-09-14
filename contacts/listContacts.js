const fs = require("fs").promises;
const contactsPath = require("./contactsPath");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

module.exports = listContacts;
