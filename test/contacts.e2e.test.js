const request = require("supertest");
const app = require("../src/app");
const {
  contacts,
  newContact,
} = require("../src/services/__mocks__/contacts-data.js");
const { HttpCode } = require("../src/helpers/constants");
jest.mock("../src/services/contacts.js");
jest.mock("../src/helpers/guard.js", () => {
  return (req, res, next) => {
    req.user = { id: 1 };
    next();
  };
});

describe("should handle api requiests api/contacts", () => {
  it("should return 200 responce and array of all contacts", async () => {
    const res = await request(app)
      .get("/api/contacts")
      .set("Accept", "application/json");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.data.contacts).toBeInstanceOf(Array);
  });

  it("should return 200 responce and contact by id", async () => {
    const { _id, phone } = contacts[0];
    const res = await request(app)
      .get(`/api/contacts/${_id}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.data.contact).toHaveProperty("phone", phone);
  });

  it("should return 201 responce and new contact", async () => {
    const { name, phone, email } = newContact;
    const res = await request(app)
      .post(`/api/contacts`)
      .set("Accept", "application/json")
      .send({ name, phone, email });
    expect(res.status).toEqual(HttpCode.CREATED);
    expect(res.body).toBeDefined();
    expect(res.body.data.contact).toHaveProperty("phone", phone);
  });

  it("should return 200 responce and updated contact", async () => {
    const { _id } = contacts[0];
    const newName = "NewTestName";
    const res = await request(app)
      .put(`/api/contacts/${_id}`)
      .set("Accept", "application/json")
      .send({ name: newName });
    expect(res.status).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.data.contact).toHaveProperty("name", newName);
  });

  it("should return 200 responce and deleted contact", async () => {
    const { _id, name } = contacts[0];
    const res = await request(app)
      .delete(`/api/contacts/${_id}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.contact).toHaveProperty("name", name);
  });
});
