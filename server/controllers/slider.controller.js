const fs = require("fs");
const SliderModel = require("../models/slider.model");

const sliderController = {
  getAll: async (req, res) => {
    const sliders = await SliderModel.find();
    res.status(200).send(sliders);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const slider = await SliderModel.findById(id);
    res.status(200).send(slider);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const deleted = await SliderModel.findByIdAndDelete(id);
    const idx = deleted.imageURL.indexOf("uploads/slider/");
    const imageName = deleted.imageURL.substr(idx);
    fs.unlinkSync("./" + imageName);
    res.status(200).send({
      message: "deleted successfully!",
    });
  },
  post: async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const newSlider = new SliderModel({
      title: req.body.title,
      imageURL: url + "/uploads/slider/" + req.file.filename,
      trailerURL: req.body.trailerURL,
    });
    newSlider.uploadDate = new Date();
    newSlider.updateDate = new Date();
    newSlider
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Slider posted successfully!",
          sliderCreated: newSlider,
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
    const slider = await SliderModel.findById(id);
    const url = req.protocol + "://" + req.get("host");
    const editSlider = {
      title: req.body.title,
      trailerURL: req.body.trailerURL,
    };
    editSlider.updateDate = new Date();
    if (req.file) {
      const idx = slider.imageURL.indexOf("uploads/slider/");
      const imageName = slider.imageURL.substr(idx);
      fs.unlinkSync("./" + imageName);
      editSlider.imageURL = url + "/uploads/slider/" + req.file.filename
    }
    await SliderModel.findByIdAndUpdate(id, editSlider);
    res.status(200).send({
      message: "edited successfully!",
    });
  },
};

module.exports = sliderController;
