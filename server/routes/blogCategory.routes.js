const express = require("express");
const blogCategoriesController = require("../controllers/blogCategory.controller");
const BlogCategoriesPostAndPutMiddleware = require("../middlewares/blogCategory.middleware");
const blogCategories_router = express.Router();

blogCategories_router.get("/", blogCategoriesController.getAll);

blogCategories_router.get("/:id", blogCategoriesController.getOne);

blogCategories_router.delete("/:id", blogCategoriesController.delete);

blogCategories_router.post(
  "/",
  BlogCategoriesPostAndPutMiddleware,
  blogCategoriesController.post
);

blogCategories_router.put(
  "/:id",
  BlogCategoriesPostAndPutMiddleware,
  blogCategoriesController.edit
);

module.exports = blogCategories_router;
