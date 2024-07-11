const SocialsSchema = require("../validations/socials.validation");

const SocialsPutMiddleware = (req, res, next) => {
  const { error } = SocialsSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = SocialsPutMiddleware;