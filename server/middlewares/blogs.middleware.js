const BlogsSchema = require("../validations/blogs.validation");

const BlogPostAndPutMiddleware = (req, res, next) => {
  const { error } = BlogsSchema.validate(req.body);

  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = BlogPostAndPutMiddleware;