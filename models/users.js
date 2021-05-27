import mongoose from "mongoose";
const { Schema } = mongoose;

const Users = new Schema(
    {
        username: { type: String, unique: true, required: true },
        firstname: { type: String },
        lastname: { type: String },
        emailAddress: { type: String, unique: true, required: true },
        password: { type: String, unique: true, required: true },
        role: { type: String, enum: ["admin", "regular"], required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", Users);
