const MovieOfTheDayModel = require("../models/movieoftheday.model");

const movieOfTheDayController = {
  getAll: async (req, res) => {
    const movies = await MovieOfTheDayModel.find();
    res.status(200).send(movies);
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const movie = await MovieOfTheDayModel.findById(id);
    res.status(200).send(movie);
  },
  post: async (req, res) => {
    const newMovieOfTheDay = new MovieOfTheDayModel({
      title: req.body.title,
      desc: req.body.desc,
      qualityID: req.body.qualityID,
      IMDB: req.body.IMDB,
      trailerURL: req.body.trailerURL,
    });
    await newMovieOfTheDay.save();
    res.send({ massage: `${newMovieOfTheDay.title} posted successfully!` });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const updatedMovieOfTheDay = {
      title: req.body.title,
      desc: req.body.desc,
      qualityID: req.body.qualityID,
      IMDB: req.body.IMDB,
      trailerURL: req.body.trailerURL,
    };
    updatedMovieOfTheDay.updateDate = new Date();
    await MovieOfTheDayModel.findByIdAndUpdate(id, updatedMovieOfTheDay);
    res.status(200).send({
      message: `${updatedMovieOfTheDay.title} edited successfully!`,
    });
  },
};

module.exports = movieOfTheDayController;
