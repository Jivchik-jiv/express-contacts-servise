const User = require("../models/users.js");

const getUserById = async (id) => {
  const result = await User.findOne({ _id: id });
  return result;
};
const getUserByEmail = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

const getUserByField = async (field) => {
  const user = await User.findOne(field);
  return user;
};

const registerUser = async (body) => {
  const result = new User(body);
  return result.save();
};
const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, subscription) => {
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { subscription },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  return user;
};

const updateAvatar = async (id, avatar, cloudAvatarId) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { avatar, cloudAvatarId },
    { new: true, fields: ["avatar", "cloudAvatarId"] }
  );

  return result;
};

const getAvatar = async (id) => {
  const result = await User.findOne({ _id: id }, [
    "avatar",
    "cloudAvatarId",
    "-_id",
  ]);
  return result;
};

module.exports = {
  getUserById,
  getUserByEmail,
  registerUser,
  updateToken,
  updateSubscription,
  updateAvatar,
  getAvatar,
  getUserByField,
};
