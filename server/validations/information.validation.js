const Joi = require("joi");

const InformationSchema = Joi.object({
  logoIMG: Joi.string()
    .regex(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      "Invalid Url"
    ),
  address: Joi.string().min(6).required(),
  phone: Joi.string().required(),
  email: Joi.string()
    .regex(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    )
    .required(),
  iframe: Joi.string().min(30).required(),
});

module.exports = InformationSchema;
