const Joi = require("joi");

const MoviesSchema = Joi.object({
  title: Joi.string().min(3),
  moviePoster: Joi.string()
    .regex(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      "Invalid Url"
    ),
  movie: Joi.string()
    .regex(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      "Invalid Url"
    ),
  duration: Joi.number().positive().min(0),
  IMDB: Joi.number().positive().min(0),
  releaseDate: Joi.date(),
  categoryID: Joi.string(),
  qualityID: Joi.string(),
  languageID: Joi.string(),
  viewCount: Joi.number().positive().min(0),
  desc: Joi.string().min(35),
  trailerURL: Joi.string().min(25),
  history: Joi.string().min(40),
});

module.exports = MoviesSchema;
