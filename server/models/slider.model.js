const mongoose = require("mongoose");

const SliderModel = new mongoose.model(
  "sliders",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    imageURL: {
      type: String,
      trim: true,
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "Invalid Url",
      ],
    },
    trailerURL: {
      type: String,
      required: true,
      trim: true,
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
module.exports = SliderModel;
