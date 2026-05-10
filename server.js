const express = require("express");
const path = require("path");

const app = express();

app.get("/:file", (req, res) => {

    // get URL name
    const fileName = req.params.file + ".txt";

    // full path
    const filePath = path.join(__dirname, "files", fileName);

    // download file
    res.download(filePath, fileName, (err) => {
        if (err) {
            res.status(404).send("File not found");
        }
    });
});

module.exports = app;

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}