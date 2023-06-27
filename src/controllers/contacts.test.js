const { getAll, getById, create, update, remove } = require("./contacts");
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../services/contacts.js");
const { HttpCode } = require("../helpers/constants");
const { contacts, newContact } = require("../services/__mocks__/contacts-data");
jest.mock("../services/contacts.js");

describe("Contacts controller tests", () => {
  let req, res, next;
  beforeEach(() => {
    req = { user: { id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });
  it("should return 200 result and arrey of contacts", async () => {
    const result = await getAll(req, res, next);
    expect(getAllContacts).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "success");
    expect(result).toHaveProperty("code", HttpCode.OK);
    expect(result.data.contacts).toBeInstanceOf(Array);
  });

  it("should return 200 result and contact by id", async () => {
    const { _id, phone, name } = contacts[0];
    req.params = { contactId: _id };
    const result = await getById(req, res, next);
    expect(getContactById).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "success");
    expect(result).toHaveProperty("code", HttpCode.OK);
    expect(result.data.contact).toHaveProperty("phone", phone);
    expect(result.data.contact).toHaveProperty("name", name);
  });

  it("should return 201 result and new contact", async () => {
    req.body = newContact;
    const result = await create(req, res, next);
    expect(createContact).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "success");
    expect(result).toHaveProperty("code", HttpCode.CREATED);
    expect(result.data.contact).toHaveProperty("phone", newContact.phone);
    expect(result.data.contact).toHaveProperty("name", newContact.name);
  });

  it("should return 200 result and updated contact by id", async () => {
    const { _id, phone } = contacts[0];
    req.params = { contactId: _id };
    req.body = { name: "newName" };
    const result = await update(req, res, next);
    expect(updateContact).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "success");
    expect(result).toHaveProperty("code", HttpCode.OK);
    expect(result.data.contact).toHaveProperty("phone", phone);
    expect(result.data.contact).toHaveProperty("name", "newName");
  });

  it("should return 200 result and deleted contact by id", async () => {
    const { _id } = contacts[0];
    req.params = { contactId: _id };
    const result = await remove(req, res, next);
    expect(deleteContact).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.contact).toHaveProperty("_id", _id);
  });

  it("should call next if there is error while geting all contacts", async () => {
    const result = await getAll({}, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should return 404 and call next while getting contact with wrong id", async () => {
    req.params = { contactId: 999 };
    const result = await getById(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith({
      status: 404,
      message: "Contact with such ID does not exist",
      data: "Bad Request",
    });
  });

  it("should return 404 and call next while updating contact with wrong id", async () => {
    req.params = { contactId: 999 };
    const result = await update(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith({
      status: 404,
      message: "Contact with such ID does not exist",
      data: "Bad Request",
    });
  });

  it("should return 404 and call next while deleting contact with wrong id", async () => {
    req.params = { contactId: 999 };
    const result = await remove(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith({
      status: 404,
      message: "Contact with such ID does not exist",
      data: "Bad Request",
    });
  });
});
