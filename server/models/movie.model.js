const mongoose = require("mongoose");

const MovieModel = new mongoose.model(
  "movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    moviePoster: {
      type: String,
      required: true,
      trim: true,
      minlength: 15,
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "Invalid Url",
      ],
    },
    movie: {
      type: String,
      required: true,
      trim: true,
      minlength: 15,
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "Invalid Url",
      ],
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    IMDB: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    releaseDate: {
      type: Date,
      required: true,
      trim: true,
    },
    viewCount: {
      type: Number,
      required: true,
      trim: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    qualityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "qualities",
    },
    languageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "languages",
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      minlength: 35,
    },
    trailerURL: {
      type: String,
      required: true,
      trim: true,
      minlength: 25,
    },
    uploadDate: {
      type: Date,
      // required: true,
      trim: true,
    },
    updateDate: {
      type: Date,
      // required: true,
      trim: true,
    },
    history: {
      type: String,
      // required: true,
      trim: true,
      minlength: 40,
    }
  })
);
module.exports = MovieModel;
