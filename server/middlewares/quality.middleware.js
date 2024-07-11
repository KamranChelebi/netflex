const QualitiesSchema = require("../validations/quality.validation");

const QualitiesPostAndPutMiddleware = (req, res, next) => {
  const { error } = QualitiesSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = QualitiesPostAndPutMiddleware;
