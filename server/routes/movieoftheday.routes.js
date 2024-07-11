const express = require("express");
const movieOfTheDayController = require("../controllers/movieoftheday.controller");
const MovieOfTheDayPutMiddleware = require("../middlewares/movieoftheday.middleware");
const movieoftheday_router = express.Router();

movieoftheday_router.get("/", movieOfTheDayController.getAll);

movieoftheday_router.get("/:id", movieOfTheDayController.getOne);

movieoftheday_router.post(
  "/",
  MovieOfTheDayPutMiddleware,
  movieOfTheDayController.post
);

movieoftheday_router.put(
  "/:id",
  MovieOfTheDayPutMiddleware,
  movieOfTheDayController.edit
);

module.exports = movieoftheday_router;
