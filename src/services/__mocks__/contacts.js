const { contacts } = require("./contacts-data");

const getAllContacts = jest.fn((userId, query) => {
  return contacts;
});

const getContactById = jest.fn((userId, { contactId }) => {
  const contact = contacts.find((c) => c._id === contactId);
  return contact;
});

const createContact = jest.fn((userId, body) => {
  return body;
});

const updateContact = jest.fn((userId, { contactId }, body) => {
  let contact = contacts.find((c) => c._id === contactId);
  if (contact) {
    contact = { ...contact, ...body };
    return contact;
  }
  return contact;
});

const deleteContact = jest.fn((userId, { contactId }) => {
  const contact = contacts.find((c) => c._id === contactId);
  return contact;
});

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
