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
            return { message: "File Uploaded!", Id: new_image._id };
        } catch (error) {
            return error;
        }
    },
    async getImage(id) {
        try {
            const image = await Image.findOne({ _id: id });
            return (
                image,
                {
                    details: [image._id, image.name, image.url, image.user_id]
                }
            );
        } catch (error) {
            return error;
        }
    },
    async getImages(user_id) {
        try {
            const images = await Image.find({ user_id });
            return images.map((it) => {
                return {
                    image: it,
                    name: it.name,
                    url: it.url,
                    id: it._id
                };
            });
        } catch (err) {
            return err;
        }
    },
    async deleteImage(id) {
        // const path = req.params.id;
        try {
            const images = await Image.findByIdAndDelete(id).catch(
                (err) => err
            );
            fs.unlinkSync(images.url);
        } catch (err) {
            return err;
        }
        return err;
    }
};

export default imageController;
