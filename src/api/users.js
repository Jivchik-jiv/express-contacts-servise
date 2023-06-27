const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");
const guard = require("../helpers/guard.js");
const rateLimit = require("express-rate-limit");
const { accountLimitsSettings } = require("../configs/limits.js");
const {
  validateUser,
} = require("../helpers/validation/users/validate-user.js");
const { upload } = require("../helpers/uploader.js");

const accountLimiter = rateLimit(accountLimitsSettings);

router
  .post(
    "/signup",
    validateUser.signup,
    accountLimiter,
    usersController.register
  )
  .post("/login", usersController.login)
  .post("/logout", guard, usersController.logout)
  .get("/verify/:token", usersController.verifyUser)
  .get("/current", guard, usersController.current)
  .patch(
    "/",
    guard,
    validateUser.subscription,
    usersController.updateSubscription
  )
  .patch(
    "/avatar",
    guard,
    upload.single("avatar"),
    usersController.updateAvatar
  );

module.exports = router;
