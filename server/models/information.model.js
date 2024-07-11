const mongoose = require("mongoose");

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const InformationModel = new mongoose.model(
  "information",
  new mongoose.Schema({
    logoIMG: {
      type: String,
      required: true,
      trim: true,
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "Invalid Url",
      ],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    iframe: {
      type: String,
      required: true,
      trim: true,
      minlength: 30,
    },
    updateDate: {
      type: Date,
      required: true,
      trim: true,
    },
  })
);
module.exports = InformationModel;
