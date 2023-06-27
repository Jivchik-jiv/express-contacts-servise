const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  phone: Joi.string().min(5).max(20).required(),
  email: Joi.string().min(5).max(45).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(1).max(20).optional(),
  phone: Joi.string().min(5).max(20).optional(),
  email: Joi.string().min(5).max(45).optional(),
}).or("name", "phone", "email");

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  schemaCreateContact,
  schemaUpdateContact,
  schemaUpdateStatusContact,
};
