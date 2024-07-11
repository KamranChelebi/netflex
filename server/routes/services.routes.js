const express = require("express");
const serviceController = require("../controllers/services.controller");
const ServicePostAndPutMiddleware = require("../middlewares/services.middleware");
const services_router = express.Router();

services_router.get("/", serviceController.getAll);

services_router.get("/:id", serviceController.getOne);

services_router.delete("/:id", serviceController.delete);

services_router.post("/", ServicePostAndPutMiddleware, serviceController.post);

services_router.put(
  "/:id",
  ServicePostAndPutMiddleware,
  serviceController.edit
);

module.exports = services_router;
