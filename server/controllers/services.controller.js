const ServiceModel = require("../models/services.model");

const serviceController = {
  getAll: async (req, res) => {
    const services = await ServiceModel.find();
    res.status(200).send(services);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const service = await ServiceModel.findById(id);
    res.status(200).send(service);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    await ServiceModel.findByIdAndDelete(id);
    res.status(200).send({
      message: `deleted successfully!`,
    });
  },
  post: async (req, res) => {
    const newService = new ServiceModel({
      title: req.body.title,
      iconClass: req.body.iconClass,
      desc: req.body.desc,
    });
    newService.uploadDate = new Date();
    newService.updateDate = new Date();
    await newService.save();
    res.send({ message: "Service posted successfully!" })
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const editService = {
      title: req.body.title,
      iconClass: req.body.iconClass,
      desc: req.body.desc,
    };
    editService.updateDate = new Date();
    await ServiceModel.findByIdAndUpdate(id, editService);
    res.status(200).send({
      message: "edited successfully!",
    });
  },
};

module.exports = serviceController;
