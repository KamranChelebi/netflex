const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const movieController = require("../controllers/movie.controller");
const MoviePostAndPutMiddleware = require("../middlewares/movie.middleware");
const VerifyJWTMiddleware = require("../middlewares/verifyJWT.middleware");
const movies_router = express.Router();

const DIR = "./uploads/movie/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid.v4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.mp4', '.flv', '.mov', '.m4p'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(fileExtension.toLowerCase())) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only video format allowed!"));
    }
  },
});

movies_router.get("/", movieController.getAll);

movies_router.get("/:id",VerifyJWTMiddleware, movieController.getOne);

movies_router.delete("/:id", movieController.delete);

movies_router.post(
  "/",
  MoviePostAndPutMiddleware,
  upload.fields([{ name: 'moviePoster', maxCount: 1 }, { name: 'movie', maxCount: 1 }]),
  movieController.post
);

movies_router.put(
  "/:id",
  upload.fields([{ name: 'moviePoster', maxCount: 1 }, { name: 'movie', maxCount: 1 }]),
  MoviePostAndPutMiddleware,
  movieController.edit
);

module.exports = movies_router;
