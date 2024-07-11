const InformationModel = require("../models/information.model");
const fs = require("fs");

const informationController = {
  getAll: async (req, res) => {
    const informations = await InformationModel.find();
    res.status(200).send(informations);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const information = await InformationModel.findById(id);
    res.status(200).send(information);
  },
  post: async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const newInformation = new InformationModel({
      logoIMG: url + "/uploads/logo/" + req.file.filename,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      iframe: req.body.iframe,
    });
    await newInformation.save();
    res.send({ massage: `posted successfully!` });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const logo = await InformationModel.findById(id);
    const url = req.protocol + "://" + req.get("host");
    const updatedInformation = {
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      iframe: req.body.iframe,
    };
    updatedInformation.updateDate = new Date();
    if (req.file) {
      const idx = logo.logoIMG.indexOf("uploads/logo/");
      const imageName = logo.logoIMG.substr(idx);
      fs.unlinkSync("./" + imageName);
      updatedInformation.logoIMG = url + "/uploads/logo/" + req.file.filename
    }
    await InformationModel.findByIdAndUpdate(id, updatedInformation);
    res.status(200).send({
      message: `edited successfully!`,
    });
  },
};

module.exports = informationController;
