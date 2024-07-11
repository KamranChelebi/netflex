const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const blogsController = require("../controllers/blogs.controller");
const BlogPostAndPutMiddleware = require("../middlewares/blogs.middleware");
const blogs_router = express.Router();

const DIR = "./uploads/blogIMG/";
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

blogs_router.get("/", blogsController.getAll);

blogs_router.get("/:id", blogsController.getOne);

blogs_router.delete("/:id", blogsController.delete);

blogs_router.post(
  "/",
  upload.single("imageURL"),
  BlogPostAndPutMiddleware,
  blogsController.post
);

blogs_router.put(
  "/:id",
  upload.single("imageURL"),
  BlogPostAndPutMiddleware,
  blogsController.edit
);

module.exports = blogs_router;
