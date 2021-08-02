import Users from "../models/users";
import userController from "../controllers/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { createUser, getUserByEmail } = userController;

const loginController = {
  async signUp(req, res) {
    try {
      const { emailAddress, password, username, role } = req.body;
      // const user = await getUserByEmail(emailAddress);
      const user = await Users.findOne({ emailAddress }).exec();
      if (user) {
        throw "User Already Exists";
        //return res.status(400).json({ message: "User Already Exists!"})
      }
      const newuser = await createUser(emailAddress, password, username, role);
      const userbody = { username: newuser.username, role: newuser.role };
      const token = jwt.sign(userbody, "secret", {
        expiresIn: "1h"
      });
      return res.status(200).json({
        message: "User Account Created successfully",
        data: newuser,
        tokenid: token
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: error });
    }
  },

  async signIn(req, res) {
    try {
      const { emailAddress, password } = req.body;
      const user = await getUserByEmail(emailAddress);
      if (!user) {
        throw "User Doesn't Exist";
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw "Invalid Password";
      }
      const body = {
        _id: user._id,
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
      res.status(400).json({ message: error });
    }
  }
};

export default loginController;
