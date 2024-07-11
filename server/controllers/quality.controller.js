const QualitiesModel = require("../models/quality.model");

const qualitiesController = {
  getAll: async (req, res) => {
    const qualities = await QualitiesModel.find();
    res.status(200).send(qualities);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const quality = await QualitiesModel.findById(id);
    res.status(200).send(quality);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const deleted = await QualitiesModel.findByIdAndDelete(id);
    res.status(200).send({
      message: `${deleted.name} delete successfully!`,
    });
  },
  post: async (req, res) => {
    const newQuality = new QualitiesModel({
      name: req.body.name,
    });
    await newQuality.save();
    res.send({ message: `${newQuality.name} posted successfully!` });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const updatedQuality = {
      name: req.body.name,
    };
    await QualitiesModel.findByIdAndUpdate(id, updatedQuality);
    res.status(200).send({
      message: `${updatedQuality.name} edited successfully!`,
    });
  },
};

module.exports = qualitiesController;