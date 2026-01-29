const { v4: uuidv4 } = require("uuid");
const jobService = require("../services/job.service");
const { OUTPUT_DIR } = require("../config/paths");
const path = require("path");

exports.upload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const jobId = uuidv4();

  jobService.create(jobId, {
    status: "idle",
    inputPath: req.file.path,
    outputPath: path.join(OUTPUT_DIR, `${jobId}.pdf`)
  });

  res.json({ jobId });
};
