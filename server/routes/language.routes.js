const express = require("express");
const movieLanguagesController = require("../controllers/language.controller");
const LanguagesPostAndPutMiddleware = require("../middlewares/language.middleware");
const languages_router = express.Router();

languages_router.get("/", movieLanguagesController.getAll);

languages_router.get("/:id", movieLanguagesController.getOne);

languages_router.delete("/:id", movieLanguagesController.delete);

languages_router.post(
  "/",
  LanguagesPostAndPutMiddleware,
  movieLanguagesController.post
);

languages_router.put(
  "/:id",
  LanguagesPostAndPutMiddleware,
  movieLanguagesController.edit
);

module.exports = languages_router;
