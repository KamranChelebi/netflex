const Joi = require("joi");

const BlogCategoriesSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = BlogCategoriesSchema;