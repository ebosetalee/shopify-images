import express from "express";
import userController from "../controllers/users.js";

const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser } = userController;

router.post("/", createUser);

router.get("/:id", getUserById);

router.patch("/:d", updateUser);

router.delete("/:id", deleteUser);

export default router;
