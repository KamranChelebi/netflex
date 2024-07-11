const CategoriesModel = require("../models/category.model");

const categoriesController = {
  getAll: async (req, res) => {
    const categories = await CategoriesModel.find();
    res.status(200).send(categories);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const category = await CategoriesModel.findById(id);
    res.status(200).send(category);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const deleted = await CategoriesModel.findByIdAndDelete(id);
    res.status(200).send({
      message: `${deleted.name} delete successfully!`,
    });
  },
  post: async (req, res) => {
    const newCategory = new CategoriesModel({
      name: req.body.name,
    });
    await newCategory.save();
    res.send({ massage: `${newCategory.name} posted successfully!` });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const updatedCategory = {
      name: req.body.name,
    };
    await CategoriesModel.findByIdAndUpdate(id, updatedCategory);
    res.status(200).send({
      message: `${updatedCategory.name} edited successfully!`,
    });
  },
};

module.exports = categoriesController;