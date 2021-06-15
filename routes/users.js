import express from "express";
import passport from "passport";
import userController from "../controllers/users.js";

const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser, getAllUsers } =
    userController;

router.post("/", async (req, res) => {
    try {
        const { emailAddress, username, password, role } = req.body;
        const newUser = await createUser(
            emailAddress,
            password,
            username,
            role
        );
        return res.status(200).send(newUser);
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", error });
    }
});

router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const user = await getUserById(req.user.id);
            return res.status(200).send(user);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const users = await getAllUsers();
            return res.status(200).send(users);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);

router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const id = req.params.id;
            const item = req.body;
            const user = await updateUser(id, item);
            return res.status(200).send(user);
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
            const user = await deleteUser(id);
            return res.status(200).send(user);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "something went wrong", error });
        }
    }
);
export default router;
