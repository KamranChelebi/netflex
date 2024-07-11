const mongoose = require("mongoose");

const QualitiesModel = new mongoose.model(
  "qualities",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
  })
);
module.exports = QualitiesModel;