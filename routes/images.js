import express from "express";
import imageController from "../controllers/images.js";

const { addImage, getImage, getImages, deleteImage } = imageController;
const router = express.Router();

router.post("/", addImage);

router.get("/:id", getImage);

router.get("/:user_id", getImages);

router.delete("/:id", deleteImage);

export default router;
