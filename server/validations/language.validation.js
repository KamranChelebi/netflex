const Joi = require("joi");

const LanguagesSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = LanguagesSchema;