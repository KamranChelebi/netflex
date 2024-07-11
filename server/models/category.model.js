const mongoose = require("mongoose");

const CategoriesModel = new mongoose.model(
  "categories",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  })
);
module.exports = CategoriesModel;