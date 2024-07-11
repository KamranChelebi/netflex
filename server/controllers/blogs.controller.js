const fs = require("fs");
const BlogsModel = require("../models/blogs.model");

const blogsController = {
  getAll: async (req, res) => {
    const { name } = req.query;
    const blogs = await BlogsModel.find();
    if (!name) {
      res.status(200).send(blogs);
    } else {
      res
        .status(200)
        .send(
          blogs.filter((x) =>
            x.title.toLowerCase().trim().includes(name.toLowerCase().trim())
          )
        );
    }
  },
  getCategoryAll: async (req, res) => {
    const { categoryID } = req.params;
    const blogs = await BlogsModel.find({ categoryID: categoryID });
    res.status(200).send(blogs);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const blog = await BlogsModel.findById(id);
    res.status(200).send(blog);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const deleted = await BlogsModel.findByIdAndDelete(id);
    const idx = deleted.imageURL.indexOf("uploads/blogIMG/");
    const imageName = deleted.imageURL.substr(idx);
    fs.unlinkSync("./" + imageName);
    res.status(200).send({
      message: "deleted successfully!",
    });
  },
  post: async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const newBlog = new BlogsModel({
      title: req.body.title,
      imageURL: url + "/uploads/blogIMG/" + req.file.filename,
      firstDesc: req.body.firstDesc,
      secondDesc: req.body.secondDesc,
      categoryID: req.body.categoryID,
      likeCount: 0,
      commentCount: 0,
    });
    newBlog.uploadDate = new Date();
    newBlog.updateDate = new Date();
    newBlog
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Movie posted successfully!",
          userCreated: newBlog,
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const blogForEdit = await BlogsModel.findById(id);
    const url = req.protocol + "://" + req.get("host");
    const editBlog = {
      title: req.body.title,
      firstDesc: req.body.firstDesc,
      secondDesc: req.body.secondDesc,
      categoryID: req.body.categoryID,
      likeCount: req.body.likeCount,
      commentCount: req.body.commentCount,
    };
    editBlog.updateDate = new Date();
    if (req.file) {
      const idx = blogForEdit.imageURL.indexOf("uploads/blogIMG/");
      const imageName = blogForEdit.imageURL.substr(idx);
      fs.unlinkSync("./" + imageName);
      editBlog.imageURL = url + "/uploads/blogIMG/" + req.file.filename;
    }
    await BlogsModel.findByIdAndUpdate(id, editBlog);
    res.status(200).send({
      message: "edited successfully!",
    });
  },
};

module.exports = blogsController;
