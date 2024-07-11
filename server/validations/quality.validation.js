const Joi = require("joi");

const QualitiesSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

module.exports = QualitiesSchema;