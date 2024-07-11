const Joi = require("joi");

const PricingSchema = Joi.object({
  planName: Joi.string().min(3).required(),
  quality: Joi.string().min(3).required(),
  price: Joi.number().positive().min(0).required(),
  qualityID: Joi.string().required(),
  screenCount: Joi.number().positive().min(0).required(),
  downloadCount: Joi.number().positive().min(0).required(),
});

module.exports = PricingSchema;
