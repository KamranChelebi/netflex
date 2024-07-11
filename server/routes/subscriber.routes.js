const express = require("express");
const SubscriberPostMiddleware = require("../middlewares/subscriber.middleware");
const subscriberController = require("../controllers/subscriber.controller");
const subscribers_router = express.Router();

subscribers_router.get("/", subscriberController.getAll);

subscribers_router.delete("/:id", subscriberController.delete);

subscribers_router.post(
  "/",
  SubscriberPostMiddleware,
  subscriberController.post
);

module.exports = subscribers_router;
