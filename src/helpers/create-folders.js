const fs = require("fs/promises");
const { ErrorHandler } = require("./error-handler");

const isAccessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

const createFoldersIfNotExist = async (foldersPaths) => {
  try {
    foldersPaths.forEach(async (path) => {
      if (!(await isAccessible(path))) {
        fs.mkdir(path);
      }
    });
  } catch (error) {
    throw new ErrorHandler(error.status, error.message);
  }
};

module.exports = { createFoldersIfNotExist };
