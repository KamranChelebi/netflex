const express = require("express");
const informationController = require("../controllers/information.controller");
const InformationPutMiddleware = require("../middlewares/information.middleware");
const multer = require("multer");
const uuid = require("uuid");
const information_router = express.Router();

const DIR = "./uploads/logo/";
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

information_router.get("/", informationController.getAll);

information_router.get("/:id", informationController.getOne);

information_router.post(
  "/",
  upload.single("logoIMG"),
  InformationPutMiddleware,
  informationController.post
);

information_router.put(
  "/:id",
  upload.single("logoIMG"),
  InformationPutMiddleware,
  informationController.edit
);

module.exports = information_router;
