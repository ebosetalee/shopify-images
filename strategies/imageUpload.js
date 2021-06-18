import "dotenv/config";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const img = {};

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "shopify-images",
        allowedFormats: ["jpeg", "jpg", "png"],
        use_filename: true
    }
});

function checkFileType(file, cb) {
    //   extentions allowed
    const filetypes = /jpeg|jpg|png/;
    // check extention
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // check mime type
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    return cb("Error: Images only");
}

img.saveImage = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    },
    limits: {
        fileSize: 2000000
    }
}).single("image");

export default img;
