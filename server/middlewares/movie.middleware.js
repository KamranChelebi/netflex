const MoviesSchema = require("../validations/movie.validation");

const MoviePostAndPutMiddleware = (req, res, next) => {
  const { error } = MoviesSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = MoviePostAndPutMiddleware;