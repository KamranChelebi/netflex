const InformationSchema = require("../validations/information.validation");

const InformationPutMiddleware = (req, res, next) => {
  const { error } = InformationSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = InformationPutMiddleware;