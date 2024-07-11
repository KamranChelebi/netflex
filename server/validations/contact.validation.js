const Joi = require("joi");

const ContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .regex(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    )
    .required(),
  subject: Joi.string().min(10).required(),
  message: Joi.string().required(),
});

module.exports = ContactSchema;
