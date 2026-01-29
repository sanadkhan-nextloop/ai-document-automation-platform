const express = require("express");
const { download } = require("../controllers/download.controller");

const router = express.Router();

router.get("/:jobId", download);

module.exports = router;
