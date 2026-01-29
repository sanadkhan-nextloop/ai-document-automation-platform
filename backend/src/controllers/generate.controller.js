const jobService = require("../services/job.service");
const pdfService = require("../services/pdf.service");
const aiService = require("../services/ai.service");
const { AI_MODE } = require("../config/env");

exports.generate = async (req, res) => {
  const { jobId, prompt } = req.body;

  if (!jobId || !prompt) {
    return res.status(400).json({ error: "jobId and prompt required" });
  }

  const job = jobService.get(jobId);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  job.status = "processing";

  try {
    const extractedText = await pdfService.extractText(job.inputPath);

    let generatedText;

    if (AI_MODE === "mock") {
      generatedText = "This is a mock AI-generated document section.";
    } else {
      generatedText = await aiService.generateText({
        prompt,
        context: extractedText
      });
    }

    await pdfService.writeText(
      job.inputPath,
      job.outputPath,
      generatedText
    );

    job.status = "done";
    res.json({ status: "done" });
  } catch (err) {
    job.status = "failed";
    job.error = err.message;
    res.status(500).json({ error: "Generation failed" });
  }
};
