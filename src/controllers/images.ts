import Image from "../models/images";

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
            return image;
        } catch (error) {
            return error;
        }
    },
    async getImages(id) {
        try {
            const images = await Image.find(
                { user_id: id, deleted_at: null },
                "-deleted_at"
            );
            return images;
        } catch (err) {
            return err;
        }
    },
    async deleteImage(id) {
        try {
            const image = await Image.updateOne(
                { _id: id },
                { deleted_at: new Date() }
            );
            return image;
        } catch (err) {
            return err;
        }
    }
};

export default imageController;
