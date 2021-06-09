import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const cloudConfig = () => cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudConfig(),
    params: {
        folder: "shopify-images",
        format: ["jpeg", "JPG", "png"],
        use_filename: true
    }
});
const img = multer({ storage: storage }).single("image");
// console.log(img)app.use(uploads.cloudConfig)


export default img;
