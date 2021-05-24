import express from "express"
import imageController from "../controllers/images.js";

const { addImages, addImage, getImages, deleteImage } = imageController
const router = express.Router();

router.post("/", addImages);

router.post("/", addImage);

router.get("/", getImages);

router.delete("/:id", deleteImage);

export default router;

