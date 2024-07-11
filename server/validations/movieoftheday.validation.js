const Joi = require("joi");

const MovieOfTheDaySchema = Joi.object({
  title: Joi.string().min(3).required(),
  IMDB: Joi.number().positive().min(0).required(),
  qualityID: Joi.string().required(),
  desc: Joi.string().min(35).required(),
  trailerURL: Joi.string().min(25).required(),
});

module.exports = MovieOfTheDaySchema;
