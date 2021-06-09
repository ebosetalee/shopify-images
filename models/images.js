import mongoose from "mongoose";
const { Schema } = mongoose;

const ImageSchema = new Schema(
    {
        name: { type: String },
        url: { type: String, unique: true, required: true },
        user_id: { type: String, required: true }
    },
    { timestamps: true }
);

const Image = mongoose.model("Image", ImageSchema);
export default Image;
