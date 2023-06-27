const userRepository = require("../repository/users.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async ({ email, password }) => {
  const user = await userRepository.getUserByEmail(email);

  if (!user || !user.validatePassword(password) || !user.verified) {
    return null;
  }

  const id = user.id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await userRepository.updateToken(id, token);
  return { token, user };
};
const logout = async (userId) => {
  await userRepository.updateToken(userId, null);
  return;
};

module.exports = { login, logout };
