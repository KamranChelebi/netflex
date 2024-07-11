const MovieOfTheDaySchema = require("../validations/movieoftheday.validation");

const MovieOfTheDayPutMiddleware = (req, res, next) => {
  const { error } = MovieOfTheDaySchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = MovieOfTheDayPutMiddleware;