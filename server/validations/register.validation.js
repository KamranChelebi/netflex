const Joi = require("joi");

const RegisterSchema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string()
    .regex(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    )
    .required(),
  password: Joi.string().min(6).required(),
  favorites: Joi.object(),
  userIMG: Joi.string()
    .regex(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      "Invalid Url"
    ),
});

module.exports = RegisterSchema;
