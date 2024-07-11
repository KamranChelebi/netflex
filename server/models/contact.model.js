const mongoose = require("mongoose");

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const ContactModel = new mongoose.model(
  "contact",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: false,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    uploadDate: {
      type: Date,
      required: true,
      trim: true,
    },
  })
);
module.exports = ContactModel;
