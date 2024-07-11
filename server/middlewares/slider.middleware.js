const SlidersSchema = require("../validations/slider.validation");

const SliderPostAndPutMiddleware = (req, res, next) => {
  const { error } = SlidersSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = SliderPostAndPutMiddleware;
