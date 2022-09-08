const contactsAction = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsAction.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsAction.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id: ${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsAction.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await contactsAction.removeContact(id);
      if (!deletedContact) {
        throw new Error(`Contact with id: ${id} not found`);
      }
      console.log(deletedContact);
      break;

    case "update":
      const updatedContact = await contactsAction.updateContactById(
        id,
        name,
        email,
        phone
      );
      if (!updatedContact) {
        throw new Error(`Contact with id: ${id} not found`);
      }
      console.log(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
