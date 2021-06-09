import express from "express";
import passport from "passport";
import userController from "../controllers/users.js";

const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser } = userController;

router.post("/", createUser);

router.get(
    "/:id",
    async (req, res, next) => {
        await passport.authenticate("jwt", { session: false });
        next();
    },
    getUserById
);

router.patch(
    "/:d",
    async (req, res, next) => {
        await passport.authenticate("jwt", { session: false });
        next();
    },
    updateUser
);

router.delete(
    "/:id",
    async (req, res, next) => {
        await passport.authenticate("jwt", { session: false });
        next();
    },
    deleteUser
);

export default router;
