const path = require("path");
const app = require("./src/app.js");
const db = require("./src/configs/db.js");
const { createFoldersIfNotExist } = require("./src/helpers/create-folders.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const uploadFolder = path.join(__dirname, process.env.UPLOAD_DIR);

db.then(() => {
  app.listen(PORT, async () => {
    await createFoldersIfNotExist([uploadFolder]);
    console.log(`Server runing. Use our API on port ${PORT}`);
  });
}).catch((err) => {
  console.log("Server not running. Error message: ", err.message);
});
