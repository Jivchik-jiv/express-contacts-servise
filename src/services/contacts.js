const contactsRepository = require("../repository/contacts.js");

const getAllContacts = async (userId, query) => {
  const contacts = await contactsRepository.getAllContacts(userId, query);
  return contacts;
};

const getContactById = async (userId, { contactId }) => {
  const contact = await contactsRepository.getContactById(userId, contactId);
  return contact;
};

const createContact = async (userId, body) => {
  const contact = await contactsRepository.createContact(userId, body);
  return contact;
};

const updateContact = async (userId, { contactId }, body) => {
  const contact = await contactsRepository.updateContact(
    userId,
    contactId,
    body
  );
  return contact;
};

const deleteContact = async (userId, { contactId }) => {
  const contact = await contactsRepository.deleteContact(userId, contactId);
  return contact;
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};
