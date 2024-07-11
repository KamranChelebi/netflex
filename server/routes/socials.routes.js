const express = require("express");
const socialsController = require("../controllers/socials.controller");
const SocialsPutMiddleware = require("../middlewares/socials.middleware");
const socials_router = express.Router();

socials_router.get("/", socialsController.getAll);

socials_router.get("/:id", socialsController.getOne);

socials_router.delete("/:id", socialsController.delete);

socials_router.post(
    "/",
    SocialsPutMiddleware,
    socialsController.post
);

socials_router.put(
    "/:id",
    SocialsPutMiddleware,
    socialsController.edit
);

module.exports = socials_router;
