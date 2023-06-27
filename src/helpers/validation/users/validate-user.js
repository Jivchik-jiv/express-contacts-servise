const Joi = require("joi");
const { validate } = require("../validator");
const { schemaSignupUser, schemaSubscription } = require("./schemas");

const validateUser = {
  signup: (req, res, next) => {
    return validate(schemaSignupUser, req.body, next);
  },
  subscription: (req, res, next) => {
    return validate(schemaSubscription, req.body, next);
  },
};

module.exports = { validateUser };
