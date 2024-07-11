const ContactSchema = require("../validations/contact.validation");

const ContactPostMiddleware = (req, res, next) => {
  const { error } = ContactSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = ContactPostMiddleware;