const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const fileName = "ass1.txt";
  const filePath = path.join(__dirname, "..", "files", fileName);

  if (!fs.existsSync(filePath)) {
    res.status(404).end("File not found");
    return;
  }

  const fileContent = fs.readFileSync(filePath);
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Content-Length", fileContent.length);
  res.status(200).end(fileContent);
};