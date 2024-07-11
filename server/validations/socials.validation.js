const Joi = require("joi");

const SocialsSchema = Joi.object({
    icon: Joi.string().min(3).required(),
    link: Joi.string()
        .regex(
            /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
            "Invalid Url"
        ),
});

module.exports = SocialsSchema;
