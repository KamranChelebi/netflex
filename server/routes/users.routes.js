const express = require("express");
const usersController = require("../controllers/users.controller");
const multer = require("multer");
const uuid = require("uuid");
const RegisterMiddleware = require("../middlewares/register.middleware");
const users_router = express.Router();

const DIR = "./uploads/avatars/";
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

users_router.get("/", usersController.getAll);

users_router.get("/:id", usersController.getOne);

users_router.put("/:id",upload.single("userIMG"), usersController.edit);

module.exports = users_router;
