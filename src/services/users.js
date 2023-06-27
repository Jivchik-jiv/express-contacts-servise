const fs = require("fs/promises");
const { cloudinary } = require("../configs/cloudinary.js");
const { ErrorHandler } = require("../helpers/error-handler.js");
const userRepository = require("../repository/users.js");
const { nanoid } = require("nanoid");
const { sendEmail } = require("./email.js");
const { HttpCode } = require("../helpers/constants.js");

const getUserById = async (id) => {
  const result = await userRepository.getUserById(id);
  return result;
};
const getUserByEmail = async (email) => {
  const result = await userRepository.getUserByEmail(email);
  return result;
};

const registerUser = async (body) => {
  const verifyToken = nanoid();
  try {
    await sendEmail(verifyToken, body.email);
    const user = await userRepository.registerUser({ ...body, verifyToken });
    return user;
  } catch (error) {
    throw new ErrorHandler(
      HttpCode.INTERNAL_SERVER_ERROR,
      "We have problem with autorisation, try again later"
    );
  }
};

const updateSubscription = async (id, { subscription }) => {
  const user = await userRepository.updateSubscription(id, subscription);
  return user;
};

const updateAvatar = async (id, pathFile) => {
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      pathFile,
      {
        folder: "hw-avatars",
        crop: "fill",
        width: 250,
      }
    );
    const oldAvatar = await userRepository.getAvatar(id);
    const result = await userRepository.updateAvatar(id, secure_url, public_id);
    await cloudinary.uploader
      .destroy(oldAvatar.cloudAvatarId)
      .then()
      .catch(console.log);
    fs.unlink(pathFile);

    return result;
  } catch (error) {
    throw new ErrorHandler(null, "Error upload avatar");
  }
};

const verifyUser = async ({ token }) => {
  const user = await userRepository.getUserByField({ verifyToken: token });

  if (user) {
    await user.updateOne({ verified: true, verifyToken: null });
    return true;
  }

  return false;
};

module.exports = {
  getUserById,
  getUserByEmail,
  registerUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
};
