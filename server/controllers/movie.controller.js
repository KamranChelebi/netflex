const fs = require("fs");
const MovieModel = require("../models/movie.model");

const movieController = {
  getAll: async (req, res) => {
    const { name } = req.query;
    const movies = await MovieModel.find();
    if (!name) {
      res.status(200).send(movies);
    } else {
      res
        .status(200)
        .send(
          movies.filter((x) =>
            x.title.toLowerCase().trim().includes(name.toLowerCase().trim())
          )
        );
    }
  },
  getCategoryAll: async (req, res) => {
    const { categoryID } = req.params;
    const movies = await MovieModel.find({ categoryID: categoryID });
    res.status(200).send(movies);
  },
  getQualityAll: async (req, res) => {
    const { qualityID } = req.params;
    const movies = await MovieModel.find({ qualityID: qualityID });
    res.status(200).send(movies);
  },
  getLanguageAll: async (req, res) => {
    const { languageID } = req.params;
    const movies = await MovieModel.find({ languageID: languageID });
    res.status(200).send(movies);
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const movie = await MovieModel.findById(id);
    if (!movie) {
      res.send("Movie not found");
    }
    else {
      res.status(200).send(movie);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const deleted = await MovieModel.findByIdAndDelete(id);
    const posterİdx = deleted.moviePoster.indexOf("uploads/movie/");
    const posterName = deleted.moviePoster.substr(posterİdx);
    const movieİdx = deleted.movie.indexOf("uploads/movie/");
    const movieName = deleted.movie.substr(movieİdx);
    fs.unlinkSync("./" + posterName);
    fs.unlinkSync("./" + movieName);
    res.status(200).send({
      message: "deleted successfully!",
    });
  },
  post: async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const newMovie = new MovieModel({
      title: req.body.title,
      moviePoster: url + "/uploads/movie/" + req.files["moviePoster"][0].filename,
      movie: url + "/uploads/movie/" + req.files["movie"][0].filename,
      duration: req.body.duration,
      IMDB: req.body.IMDB,
      releaseDate: req.body.releaseDate,
      categoryID: req.body.categoryID,
      qualityID: req.body.qualityID,
      languageID: req.body.languageID,
      desc: req.body.desc,
      trailerURL: req.body.trailerURL,
      history: req.body.history,
    });
    newMovie.uploadDate = new Date();
    newMovie.updateDate = new Date();
    newMovie.viewCount = 0;
    newMovie
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Movie posted successfully!",
          userCreated: newMovie,
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const movieForEdit = await MovieModel.findById(id);
    const url = req.protocol + "://" + req.get("host");

    const editMovie = {
      title: req.body.title,
      duration: req.body.duration,
      IMDB: req.body.IMDB,
      releaseDate: req.body.releaseDate,
      viewCount: req.body.viewCount,
      categoryID: req.body.categoryID,
      qualityID: req.body.qualityID,
      languageID: req.body.languageID,
      desc: req.body.desc,
      trailerURL: req.body.trailerURL,
      history: req.body.history,
    };
    editMovie.updateDate = new Date();
    if (req.files) {
      if (req.files["moviePoster"]) {
        const posterİdx = movieForEdit.moviePoster.indexOf("uploads/movie/");
        const posterName = movieForEdit.moviePoster.substr(posterİdx);
        fs.unlinkSync("./" + posterName);
        editMovie.moviePoster = url + "/uploads/movie/" + req.files["moviePoster"][0].filename
      }
      if (req.files["movie"]) {
        const movieİdx = movieForEdit.movie.indexOf("uploads/movie/");
        const movieName = movieForEdit.movie.substr(movieİdx);
        fs.unlinkSync("./" + movieName);
        editMovie.movie = url + "/uploads/movie/" + req.files["movie"][0].filename
      }
    }
    await MovieModel.findByIdAndUpdate(id, editMovie);
    res.status(200).send({
      message: "edited successfully!",
    });
  },
};

module.exports = movieController;
