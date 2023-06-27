const Contact = require("../models/contacts.js");

const getAllContacts = async (
  userId,
  { offset = 0, limit = 5, selectOpt, sortBy, sortByDesc, favorite }
) => {
  const sort = sortBy ? `${sortBy}` : sortByDesc ? `-${sortByDesc}` : "";

  const select = selectOpt ? selectOpt.split("|").join(" ") : "";

  const filter = favorite ? { owner: userId, favorite } : { owner: userId };

  const { docs, totalDocs, page } = await Contact.paginate(filter, {
    offset,
    limit,
    sort,
    select,
    populate: {
      path: "owner",
      select: "email subscription",
    },
  });
  return { docs, totalDocs, offset, limit, page };
};

const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate("owner", "email subscription");
  return contact;
};

const deleteContact = async (userId, contactId) => {
  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return contact;
};

const createContact = async (userId, body) => {
  const contact = await Contact.create({ ...body, owner: userId });
  return contact;
};

const updateContact = async (userId, contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body,
    {
      returnDocument: "after",
    }
  );
  return contact;
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};
