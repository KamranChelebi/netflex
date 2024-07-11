const SubscriberSchema = require("../validations/subscriber.validation");

const SubscriberPostMiddleware = (req, res, next) => {
  const { error } = SubscriberSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = SubscriberPostMiddleware;