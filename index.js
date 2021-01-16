const app = require("express")();
const bs = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const Image = require("./models/images");

const LOCAL_MONGO_DB = "mongodb://127.0.0.1:27017/shopifyimages";
mongoose.Promise = global.Promise;

mongoose
    .connect(LOCAL_MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then((connection) => {
        console.log("Connected to Database....");
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, __dirname + "/imgs");
    },
    filename: (_req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});

const img = multer({ storage: storage });
const port = process.env.PORT || 4041;

app.use(bs.urlencoded({ extended: false }));
app.use(bs.json());

app.post("/image", img.single("file"), async (req, res, _next) => {
    console.log(req.file);
    try {
        const new_image = await Image.create({
            name: req.file.filename,
            url: req.file.path
        });
        return res
            .status(200)
            .json({ message: "File Uploaded!", Id: new_image._id });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

app.post("/images", img.array("files"), async (req, res, next) => {
    console.log(req.files);
    try {
        const files = req.files.map((file) => ({
            name: file.filename,
            url: file.path
        }));
        const new_images = await Image.create(files);
        return res
            .status(200)
            .json({ message: "File Uploaded!", data: new_images });
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ status: "Files not added to database", message: error });
    }
});

app.get("/images", async (req, res) => {
    try {
        const images = await Image.find();
        return res.status(200).json(
            images.map((it) => {
                return { url: it.url, id: it._id };
            })
        );
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

app.delete("/image/:id", async (req, res) => {
    const path = req.params.id;
    try {
        const images = await Image.findByIdAndDelete(path).catch((err) => {
            return res.status(400).json({ message: "Database error," + err });
        });
        fs.unlinkSync(images.url);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    return res.status(200).json({ message: "File deleted" });
});

app.listen(port, () => {
    console.log(`server is runnng on port: ${port}`);
});
