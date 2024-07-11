const BlogCategoriesModel = require("../models/blogCategory.model");

const blogCategoriesController = {
  getAll: async (req, res) => {
    const categories = await BlogCategoriesModel.find();
    res.status(200).send(categories);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const category = await BlogCategoriesModel.findById(id);
    res.status(200).send(category);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const deleted = await BlogCategoriesModel.findByIdAndDelete(id);
    res.status(200).send({
      message: `${deleted.name} delete successfully!`,
    }); 
  },
  post: async (req, res) => {
    const newCategory = new BlogCategoriesModel({
      name: req.body.name,
    });
    newCategory.uploadDate = new Date();
    newCategory.updateDate = new Date();
    await newCategory.save();
    res.send({ massage: `${newCategory.name} posted successfully!` });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const updatedCategory = {
      name: req.body.name,
    };
    updatedCategory.updateDate = new Date();
    await BlogCategoriesModel.findByIdAndUpdate(id, updatedCategory);
    res.status(200).send({
      message: `${updatedCategory.name} edited successfully!`,
    });
  },
};

module.exports = blogCategoriesController;