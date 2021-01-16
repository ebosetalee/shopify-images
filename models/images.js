const mongoose = require('mongoose');
const { Schema } = mongoose;

const Image = new Schema(
  {
    name: { type: String },
    url: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Image', Image);
