const express = require("express");
const pricingController = require("../controllers/pricing.controller");
const PricingPutMiddleware = require("../middlewares/pricing.middleware");
const pricing_router = express.Router();

pricing_router.get("/", pricingController.getAll);

pricing_router.get("/:id", pricingController.getOne);

pricing_router.delete("/:id", pricingController.delete);

pricing_router.post("/", PricingPutMiddleware, pricingController.post);

pricing_router.put("/:id", PricingPutMiddleware, pricingController.edit);

module.exports = pricing_router;
