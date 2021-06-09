import Image from "../models/images.js";

const imageController = {
    async addImage(id, file) {
        try {
            const new_image = await Image.create({
                name: file ? file.filename : null,
                url: file ? file.path : null,
                user_id: id
            });
            return new_image;
        } catch (error) {
            return error;
        }
    },
    async getImage(id) {
        try {
            const image = await Image.findOne({ _id: id });
            return image
        } catch (error) {
            return error;
        }
    },
    async getImages(id) {
        try {
            const images = await Image.find({ "user_id": id });
            return images
        } catch (err) {
            return err;
        }
    },
    async deleteImage(id) {
        try {
            const image = await Image.findByIdAndDelete(id);
            return image;
        } catch (err) {
            return err;
        }
    }
};

export default imageController;
