import Users from "../models/users.js";

const userController = {
    async createUser(emailAddress, password, username, role) {
        try {
            const user = new Users({ emailAddress, password, username, role });
            const newUser = await user.save();
            return newUser;
        } catch (error) {
            return error;
        }
    },
    async getUser(id) {
        try {
            const user = await Users.findById({ _id: id });
            return user;
        } catch (error) {
            return error;
        }
    },
    async updateUser(id, item) {
        try {
            const user = await Users.updateOne(
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
