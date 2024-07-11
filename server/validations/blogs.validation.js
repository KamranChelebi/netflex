const Joi = require("joi");

const BlogsSchema = Joi.object({
  title: Joi.string().min(10).required(),
  imageURL: Joi.string()
    .regex(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      "Invalid Url"
    ),
  firstDesc: Joi.string().min(35).required(),
  secondDesc: Joi.string().min(35).required(),
  categoryID: Joi.string().required(),
});

module.exports = BlogsSchema;
