const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "../../");

module.exports = {
  ROOT_DIR,
  UPLOAD_DIR: path.join(ROOT_DIR, "uploads"),
  OUTPUT_DIR: path.join(ROOT_DIR, "outputs")
};
