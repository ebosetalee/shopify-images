import express from "express";
import userController from "../controllers/users.js";

const router = express.Router();
const { createUser, getUser, updateUser, deleteUser } = userController;

router.post("/", createUser);

router.get("/:id", getUser);

router.update("/:d", updateUser);

router.delete("/:id", deleteUser);

export default router;
