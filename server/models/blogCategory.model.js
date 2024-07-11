const mongoose = require("mongoose");

const BlogCategoriesModel = new mongoose.model(
  "blogcategories",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    uploadDate: {
      type: Date,
      required: true,
      trim: true,
    },
    updateDate: {
      type: Date,
      required: true,
      trim: true,
    },
  })
);
module.exports = BlogCategoriesModel;