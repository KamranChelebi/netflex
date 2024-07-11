const RegisterSchema = require("../validations/register.validation");

const RegisterMiddleware = (req, res, next) => {
  const { error } = RegisterSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = RegisterMiddleware;
