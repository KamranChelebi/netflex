const Joi = require("joi");

const SubscriberSchema = Joi.object({
  email: Joi.string()
    .regex(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    )
    .required(),
});

module.exports = SubscriberSchema;
