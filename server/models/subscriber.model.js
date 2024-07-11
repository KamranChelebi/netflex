const mongoose = require("mongoose");

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const SubscribersModel = new mongoose.model(
  "subscribers",
  new mongoose.Schema({
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
    uploadDate: {
      type: Date,
      required: true,
      trim: true,
    },
  })
);
module.exports = SubscribersModel;
