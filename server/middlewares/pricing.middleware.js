const PricingSchema = require("../validations/pricing.validation");

const PricingPutMiddleware = (req, res, next) => {
  const { error } = PricingSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = PricingPutMiddleware;