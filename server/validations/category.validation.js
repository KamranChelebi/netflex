const Joi = require("joi");

const CategoriesSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = CategoriesSchema;