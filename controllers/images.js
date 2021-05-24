import Image from "../models/images.js";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, __dirname + "/imgs");
    },
    filename: (_req, file, cb) => {
        //console.log(file.originalname);
        cb(null, file.originalname);
    }
});

const img = multer({ storage: storage });

const imageController = {
    async addImages(req, res, _next) {
        //console.log(req.file);
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
    },
    async addImage(req, res, next) {
        //console.log(req.files);
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
            return res.status(400).json({
                status: "Files not added to database",
                message: error
            });
        }
    },
    async getImages(req, res) {
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
    },
    async deleteImage(req, res) {
        const path = req.params.id;
        try {
            const images = await Image.findByIdAndDelete(path).catch((err) => {
                return res
                    .status(400)
                    .json({ message: "Database error," + err });
            });
            fs.unlinkSync(images.url);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
        return res.status(200).json({ message: "File deleted" });
    }
};

export default imageController;
