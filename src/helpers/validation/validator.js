const { HttpCode } = require("../constants");

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Fail: ${message.replace(/"/g, "")}`,
      data: "Bad Rerquest",
    });
  }
  next();
};

module.exports = { validate };
