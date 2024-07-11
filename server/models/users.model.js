const mongoose = require("mongoose");

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const Users = new mongoose.model(
  "Users",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 5,
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
    userIMG: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    plan: {
      type: String,
    },
    favorites: {
      type: [Object],
    },
    isAdmin: {
      type: Boolean,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    confirmationCode: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    uploadDate: {
      type: Date,
      required: true,
      trim: true,
    },
  })
);
module.exports = Users;
