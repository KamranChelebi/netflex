const express = require("express");
const sliderController = require("../controllers/slider.controller");
const SliderPostAndPutMiddleware = require("../middlewares/slider.middleware");
const multer = require("multer");
const uuid = require("uuid");
const sliders_router = express.Router();

const DIR = "./uploads/slider/";
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
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

sliders_router.get("/", sliderController.getAll);

sliders_router.get("/:id", sliderController.getOne);

sliders_router.delete("/:id", sliderController.delete);

sliders_router.post(
  "/",
  upload.single("imageURL"),
  SliderPostAndPutMiddleware,
  sliderController.post
);

sliders_router.put(
  "/:id",
  upload.single("imageURL"),
  SliderPostAndPutMiddleware,
  sliderController.edit
);

module.exports = sliders_router;
