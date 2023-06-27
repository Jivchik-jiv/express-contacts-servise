const { validate } = require("../validator.js");
const {
  schemaCreateContact,
  schemaUpdateContact,
  schemaUpdateStatusContact,
} = require("./shemas.js");

const validateContact = {
  create: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  update: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  updateStatus: (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next);
  },
};

module.exports = { validateContact };
