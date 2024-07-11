const express = require("express");
const qualitiesController = require("../controllers/quality.controller");
const QualitiesPostAndPutMiddleware = require("../middlewares/quality.middleware");
const qualities_router = express.Router();

qualities_router.get("/", qualitiesController.getAll);

qualities_router.get("/:id", qualitiesController.getOne);

qualities_router.delete("/:id", qualitiesController.delete);

qualities_router.post(
  "/",
  QualitiesPostAndPutMiddleware,
  qualitiesController.post
);

qualities_router.put(
  "/:id",
  QualitiesPostAndPutMiddleware,
  qualitiesController.edit
);

module.exports = qualities_router;
