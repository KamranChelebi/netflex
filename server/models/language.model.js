const mongoose = require("mongoose");

const MovieLanguageModel = new mongoose.model(
  "languages",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  })
);
module.exports = MovieLanguageModel;