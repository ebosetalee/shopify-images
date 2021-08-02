import Users from "../models/users";
import bcrypt from "bcrypt";

function hashPassword(password) {
    try {
        const newPassword = bcrypt.hash(password, 10);
        return newPassword;
    } catch (error) {
        return error;
    }
}

const userController = {
    async createUser(emailAddress, password, username, role) {
        try {
            const user = new Users({
                emailAddress,
                username,
                role,
                password: await hashPassword(password)
            });
            const newUser = await user.save();
            return newUser;
        } catch (error) {
            return error;
        }
    },
    async getAllUsers() {
        try {
            const users = await Users.find({}, "-password");
            return users;
        } catch (error) {
            return error;
        }
    },
    async getUserById(id) {
        try {
            const user = await Users.findById({ _id: id }, "-password");
            return user;
        } catch (error) {
            return error;
        }
    },
    async getUserByEmail(emailAddress) {
        try {
            const user = await Users.findOne({ emailAddress });
            return user;
        } catch (error) {
            return error;
        }
    },
    async updateUser(id, item) {
        try {
            if (item.password) {
                item.password = await hashPassword(item.password);
            }
            const user = await Users.findByIdAndUpdate(
                { _id: id },
                { $set: { ...item } }
            );
            return user;
        } catch (error) {
            return error;
        }
    },
    async deleteUser(id) {
        try {
            const user = await Users.findByIdAndDelete(id);
            return user;
        } catch (error) {
            return error;
        }
    }
};

export default userController;
