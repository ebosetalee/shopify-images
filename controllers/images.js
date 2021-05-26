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
//name: req.file.filename,
// url: req.file.path
const imageController = {
    async addImage(name, url, id) {
        //console.log(req.file);
        try {
            const new_image = await Image.create({
                name: name,
                url: url,
                user_id: id
            });
            return res
                .status(200)
                .json({ message: "File Uploaded!", Id: new_image._id });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    async getImage(id) {
        try {
            const image = await Image.findOne({ _id: id });
            return res.status(200).json(image, {
                details: [image._id, image.name, image.url, image.user_id]
            });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    async getImages(user_id) {
        try {
            const images = await Image.find({ user_id });
            return res.status(200).json(
                images.map((it) => {
                    return {
                        image: it,
                        name: it.name,
                        url: it.url,
                        id: it._id
                    };
                })
            );
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    },
    async deleteImage(id) {
        // const path = req.params.id;
        try {
            const images = await Image.findByIdAndDelete(id).catch((err) => {
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
