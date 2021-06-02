import userController from "../controllers/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { createUser, getUserByEmail } = userController;

const signUp = async (req, res) => {
    try {
        const { emailAddress, password, username, role } = req.body;
        const user = await getUserByEmail(emailAddress);
        if (user) {
            throw Error("User Already Exists");
        } else {
            const newuser = await createUser(
                emailAddress,
                password,
                username,
                role
            );
            const userbody = { username: newuser.username, role: newuser.role };
            const token = jwt.sign(userbody, process.env.JWT, {
                expiresIn: "1h"
            });
            res.status(200).json({
                message: "User Account Created successfully",
                data: newuser,
                tokenid: token
            });
        }
    } catch (error) {
        res.status(400).json({ message: err });
    }
};

const signIn = async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        const user = await getUserByEmail(emailAddress);
        if (!user) {
            throw Error("User Doesn't Exist");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw Error("Invalid Password");
        }
        const body = {
            _id: user.id,
            username: user.username,
            role: user.role
        };
        const token = jwt.sign(body, process.env.JWT, {
            expiresIn: "1h"
        });
        const loginDetails = {
            username: user.username,
            role: user.role
        };
        return res.status(200).send({
            success: true,
            user: loginDetails,
            tokenid: `Bearer ${token}`
        });
    } catch (error) {
        res.status(400).json({ message: err });
    }
};

//const signOut = async(req, res) => {};

const loginController = {signUp, signIn};
export default loginController;
