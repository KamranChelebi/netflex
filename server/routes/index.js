const blogCategories_router = require("./blogCategory.routes");
const blogs_router = require("./blogs.routes");
const categories_router = require("./category.routes");
const contact_router = require("./contact.routes");
const information_router = require("./information.routes");
const languages_router = require("./language.routes");
const movieoftheday_router = require("./movieoftheday.routes");
const movies_router = require("./movies.routes");
const pricing_router = require("./pricing.routes");
const qualities_router = require("./quality.routes");
const services_router = require("./services.routes");
const sliders_router = require("./slider.routes");
const socials_router = require("./socials.routes");
const subscribers_router = require("./subscriber.routes");
const users_router = require("./users.routes");

const router = {
  sliders: sliders_router,
  categories: categories_router,
  qualities: qualities_router,
  movies: movies_router,
  languages: languages_router,
  services: services_router,
  movieoftheday: movieoftheday_router,
  subscribers: subscribers_router,
  pricing: pricing_router,
  blogCategories: blogCategories_router,
  blogs: blogs_router,
  contact: contact_router,
  information: information_router,
  users: users_router,
  socials: socials_router,
};
module.exports = router;
