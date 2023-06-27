const express = require("express");
const contactsController = require("../controllers/contacts.js");
const guard = require("../helpers/guard.js");
const {
  validateContact,
} = require("../helpers/validation/contacts/validate-contact.js");
const router = express.Router();

router
  .get("/", guard, contactsController.getAll)
  .get("/:contactId", guard, contactsController.getById)
  .post("/", guard, validateContact.create, contactsController.create)
  .put("/:contactId", guard, validateContact.update, contactsController.update)
  .patch(
    "/:contactId/favorite",
    guard,
    validateContact.updateStatus,
    contactsController.update
  )
  .delete("/:contactId", guard, contactsController.remove);

module.exports = router;
