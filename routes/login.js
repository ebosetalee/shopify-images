import express from "express";
import loginController from "../controllers/login.js";

const router = express.Router();
const { signIn, signUp } = loginController;

router.post("/signup", signUp);

router.post("/", signIn);

export default router;
