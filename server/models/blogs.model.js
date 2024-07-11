const mongoose = require("mongoose");

const BlogsModel = new mongoose.model(
  "netflexBlogs",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    imageURL: {
      type: String,
      required: true,
      trim: true,
      minlength: 15,
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "Invalid Url",
      ],
    },
    firstDesc: {
      type: String,
      required: true,
      trim: true,
      minlength: 35,
    },
    secondDesc: {
      type: String,
      required: true,
      trim: true,
      minlength: 35,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogcategories",
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
    likeCount: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    commentCount: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
  })
);
module.exports = BlogsModel;
