const Joi = require("joi");

const ServicesSchema = Joi.object({
  title: Joi.string().min(10).required(),
  iconClass: Joi.string().min(10).required(),
  desc: Joi.string().min(35).required(),
});

module.exports = ServicesSchema;
