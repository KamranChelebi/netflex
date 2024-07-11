const MovieLanguageModel = require("../models/language.model");

const movieLanguagesController = {
  getAll: async (req, res) => {
    const languages = await MovieLanguageModel.find();
    res.status(200).send(languages);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const language = await MovieLanguageModel.findById(id);
    res.status(200).send(language);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const deleted = await MovieLanguageModel.findByIdAndDelete(id);
    res.status(200).send({
      message: `${deleted.name} delete successfully!`,
    });
  },
  post: async (req, res) => {
    const newLanguage = new MovieLanguageModel({
      name: req.body.name,
    });
    await newLanguage.save();
    res.send({ massage: `${newLanguage.name} posted successfully!` });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const updatedLanguage = {
      name: req.body.name,
    };
    await MovieLanguageModel.findByIdAndUpdate(id, updatedLanguage);
    res.status(200).send({
      message: `${updatedLanguage.name} edited successfully!`,
    });
  },
};

module.exports = movieLanguagesController;