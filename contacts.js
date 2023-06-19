const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return (contacts = JSON.parse(data));
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();

  const contactForRemove = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactForRemove === -1) return null;

  const [result] = allContacts.splice(contactForRemove, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return result;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);
  
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
