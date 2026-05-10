const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const fileName = "ass1.txt";
  const filePath = path.join(__dirname, "..", "files", fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.send(fs.readFileSync(filePath));
};