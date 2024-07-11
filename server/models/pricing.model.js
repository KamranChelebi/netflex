const mongoose = require("mongoose");

const PricingModel = new mongoose.model(
  "pricing",
  new mongoose.Schema({
    planName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    quality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    qualityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "qualities",
    },
    screenCount: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    downloadCount: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
  })
);

module.exports = PricingModel;
