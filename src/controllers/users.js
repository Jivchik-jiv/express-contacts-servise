const userServices = require("../services/users.js");
const authServices = require("../services/auth.js");
const { HttpCode } = require("../helpers/constants.js");

const register = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await userServices.getUserByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: HttpCode.CONFLICT,
        message: "User with such email already exists.",
        data: "Conflict",
      });
    }
  } catch (error) {
    next(error);
  }

  try {
    const user = await userServices.registerUser({ password, email });
    res.status(HttpCode.CREATED).json({
      status: "Success",
      code: HttpCode.CREATED,
      data: {
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    result = await authServices.login(req.body);

    if (result && result.token) {
      const {
        token,
        user: { subscription, email, avatar },
      } = result;
      return res.status(HttpCode.OK).json({
        status: "Success",
        code: HttpCode.OK,
        data: { token, user: { subscription, email, avatar } },
      });
    }

    next({
      status: HttpCode.UNAUTHORISED,
      message: "Invalid credentials",
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  const id = req.user.id;
  try {
    await authServices.logout(id);
    res.status(HttpCode.NO_CONTENT).json({ data: "Success" });
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  const id = req.user.id;
  try {
    const { email, subscription, avatar } = await userServices.getUserById(id);
    res.status(HttpCode.OK).json({
      status: "Success",
      code: HttpCode.OK,
      data: {
        user: {
          email,
          subscription,
          avatar,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  const id = req.user.id;

  try {
    const { email, subscription } = await userServices.updateSubscription(
      id,
      req.body
    );

    res.status(HttpCode.OK).json({
      status: "Success",
      code: HttpCode.OK,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const id = req.user.id;
  const pathFile = req.file.path;
  try {
    const { avatar, cloudAvatarId, _id } = await userServices.updateAvatar(
      id,
      pathFile
    );
    res.status(HttpCode.OK).json({
      code: HttpCode.OK,
      status: "success",
      data: { avatar, cloudAvatarId, _id },
    });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const result = await userServices.verifyUser(req.params);

    if (result) {
      return res.status(HttpCode.OK).json({
        satus: "succes",
        code: HttpCode.OK,
        data: {
          message: "Verification Successful",
        },
      });
    }

    return next({
      status: HttpCode.BAD_REQUEST,
      message: "Your verification token is not valid",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verifyUser,
};
