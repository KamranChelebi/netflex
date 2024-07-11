const LanguagesSchema = require("../validations/language.validation");

const LanguagesPostAndPutMiddleware = (req, res, next) => {
  const { error } = LanguagesSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = LanguagesPostAndPutMiddleware;
