const Joi = require("joi");

const schemaSignupUser = Joi.object({
  password: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().min(5).max(45).required(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { schemaSignupUser, schemaSubscription };
