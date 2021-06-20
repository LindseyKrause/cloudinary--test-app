//https://dev.to/musebe/get-on-board-with-the-media-express-5h1k

const express = require("express");
const app = express();
const upload = require("./handlers/multer");
const cloudinary = require("cloudinary");
require("dotenv").config();
require("./handlers/cloudinary");

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get("/", (req, res) => res.render("index"));

// app.post("/uploads", upload.single("image"), (req, res) => {
//     res.send(req.file);
//     console.log(res);
// });

// app.post("/uploads", (req, res) => {
//     cloudinary.v2.uploader.upload(req.file.path,
//         function (err, result) {
//         console.log(result)
//     })
// });
//*******************look at upload widget options --- tell it what path to go to with the response  */

app.get("/api/files", async (req, res) => {
    const images = await cloudinary.v2.api.resources({
        type: "upload"
    });
    return res.json(images)
});
cloudinary.v2.api.resources(
    function (error, result) { console.log(result, error); });




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

