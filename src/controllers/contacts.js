const { HttpCode } = require("../helpers/constants");
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../services/contacts.js");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await getAllContacts(userId, req.query);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await getContactById(userId, req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      next({
        status: 404,
        message: "Contact with such ID does not exist",
        data: "Bad Request",
      });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const contact = await createContact(userId, req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const contact = await updateContact(userId, req.params, req.body);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      next({
        status: 404,
        message: "Contact with such ID does not exist",
        data: "Bad Request",
      });
    }
  } catch (error) {
    next({
      status: error.status,
      message: error.message,
    });
  }
};

const remove = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const contact = await deleteContact(userId, req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({ contact });
    } else {
      next({
        status: 404,
        message: "Contact with such ID does not exist",
        data: "Bad Request",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
