import express from "express";
import imageController from "../controllers/images.js";

const { addImage, getImage, getImages, deleteImage } = imageController;
const router = express.Router();

router.post("/", addImage);

router.get("/:id", getImage);

router.get(
    "/:user_id",
    async (req, res, next) => {
        await passport.authenticate("jwt", { session: false });
        next();
    },
    getImages
);

router.delete(
    "/:id",
    async (req, res, next) => {
        await passport.authenticate("jwt", { session: false });
        next();
    },
    deleteImage
);

export default router;
