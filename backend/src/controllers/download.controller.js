const fs = require("fs");
const jobService = require("../services/job.service");

exports.download = (req, res) => {
  const { jobId } = req.params;
  const job = jobService.get(jobId);

  if (!job || job.status !== "done") {
    return res.status(404).json({ error: "File not ready" });
  }

  res.download(job.outputPath);
};
