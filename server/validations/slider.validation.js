const Joi = require("joi");

const SlidersSchema = Joi.object({
  title: Joi.string().min(5).required(),
  imageURL: Joi.string()
    .regex(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      "Invalid Url"
    ),
  trailerURL: Joi.string().required(),
});

module.exports = SlidersSchema;
