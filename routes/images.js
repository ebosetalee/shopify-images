import express from "express";
import passport from "passport";
import imageController from "../controllers/images.js";
import img from "../strategies/imageUpload.js";

const { addImage, getImage, getImages, deleteImage } = imageController;
const router = express.Router();

router.post(
    "/",
    img.saveImage,
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            console.log('req.file is', req.file)
            const file = req.file;
            const image = await addImage(req.user.id, file);
            return res.status(200).send(image);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);

router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const id = req.params.id;
            const image = await getImage(id);
            return res.status(200).send(image);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);

router.get(
    "/user/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            
            const id = req.params.id
            const images = await getImages(id);
            return res.status(200).send(images);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const id = req.params.id;
            const deletedImage = deleteImage(id);
            return res.status(200).send(deletedImage);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);

export default router;
