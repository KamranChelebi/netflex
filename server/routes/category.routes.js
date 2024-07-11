const express = require("express");
const categoriesController = require("../controllers/category.controller");
const CategoriesPostAndPutMiddleware = require("../middlewares/category.middleware");
const categories_router = express.Router();

categories_router.get("/", categoriesController.getAll);

categories_router.get("/:id", categoriesController.getOne);

categories_router.delete("/:id", categoriesController.delete);

categories_router.post("/", CategoriesPostAndPutMiddleware, categoriesController.post);

categories_router.put("/:id", CategoriesPostAndPutMiddleware, categoriesController.edit);

module.exports = categories_router;