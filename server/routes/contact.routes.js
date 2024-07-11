const express = require("express");
const ContactPostMiddleware = require("../middlewares/contact.middleware");
const contactController = require("../controllers/contact.controller");
const contact_router = express.Router();

contact_router.get("/", contactController.getAll);

contact_router.delete("/:id", contactController.delete);


contact_router.post("/", ContactPostMiddleware, contactController.post);

module.exports = contact_router;
