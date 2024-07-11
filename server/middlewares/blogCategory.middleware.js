const BlogCategoriesSchema = require("../validations/blogCategory.validation");

const BlogCategoriesPostAndPutMiddleware = (req, res, next) => {
  const { error } = BlogCategoriesSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = BlogCategoriesPostAndPutMiddleware;