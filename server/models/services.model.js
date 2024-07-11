const mongoose = require("mongoose");

const ServiceModel = new mongoose.model(
  "netflexServices",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    iconClass: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      minlength: 35,
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
module.exports = ServiceModel;
