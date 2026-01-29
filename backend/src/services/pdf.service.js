const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

exports.extractText = async (filePath) => {
  // pdf-lib text extraction is limited
  // demo-friendly placeholder
  return "This is extracted context from the document.";
};

exports.writeText = async (inputPath, outputPath, text) => {
  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const page = pdfDoc.getPages()[0];

  page.drawText(text, {
    x: 50,
    y: 490,
    size: 12,
    maxWidth: 500,
    lineHeight: 14
  });

  const outputBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, outputBytes);
};
