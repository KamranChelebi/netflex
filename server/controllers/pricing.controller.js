const PricingModel = require("../models/pricing.model");

const pricingController = {
  getAll: async (req, res) => {
    const prices = await PricingModel.find();
    res.status(200).send(prices);
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const price = await PricingModel.findById(id);
    res.status(200).send(price);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    await PricingModel.findByIdAndDelete(id);
    res.status(200).send({
      message: `deleted successfully!`,
    });
  },
  post: async (req, res) => {
    const newPricing = new PricingModel({
      planName: req.body.planName,
      quality: req.body.quality,
      price: req.body.price,
      qualityID: req.body.qualityID,
      screenCount: req.body.screenCount,
      downloadCount: req.body.downloadCount,
    });
    await newPricing.save();
    res.send({ massage: `posted successfully!` });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const updatedPricing = {
      planName: req.body.planName,
      quality: req.body.quality,
      price: req.body.price,
      qualityID: req.body.qualityID,
      screenCount: req.body.screenCount,
      downloadCount: req.body.downloadCount,
    };
    await PricingModel.findByIdAndUpdate(id, updatedPricing);
    res.status(200).send({
      message: `edited successfully!`,
    });
  },
};

module.exports = pricingController;
