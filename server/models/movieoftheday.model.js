const mongoose = require("mongoose");

const MovieOfTheDayModel = new mongoose.model(
  "movieoftheday",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      minlength: 35,
    },
    qualityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "qualities",
    },
    IMDB: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    trailerURL: {
      type: String,
      required: true,
      trim: true,
      minlength: 25,
    },
    updateDate: {
      type: Date,
      required: true,
      trim: true,
    },
  })
);

module.exports = MovieOfTheDayModel;
