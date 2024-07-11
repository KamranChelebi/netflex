const ServicesSchema = require("../validations/services.validation");

const ServicePostAndPutMiddleware = (req, res, next) => {
  const { error } = ServicesSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = ServicePostAndPutMiddleware;
