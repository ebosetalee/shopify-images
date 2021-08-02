import express from "express";
import passport from "passport";
import imageController from "../controllers/images";
import img from "../strategies/imageUpload";

const { addImage, getImage, getImages, deleteImage } = imageController;
const router = express.Router();

router.post(
    "/",
    img.saveImage,
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const file = req["file"];
            const image = await addImage(req.user?.["id"], file);
            return res.status(200).send(image);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);

router.get(
    "/user/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const id = req["user"]?.["id"];
            const images = await getImages(id);
            return res.status(200).send(images);
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

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const id = req.params.id;
            const deletedImage = deleteImage(id);
            return res
                .status(200)
                .send({
                    message: "Image deleted successfully",
                    details: deletedImage
                });
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);

export default router;
