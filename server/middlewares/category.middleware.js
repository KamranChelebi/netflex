const CategoriesSchema = require("../validations/category.validation");

const CategoriesPostAndPutMiddleware = (req, res, next) => {
  const { error } = CategoriesSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = CategoriesPostAndPutMiddleware;