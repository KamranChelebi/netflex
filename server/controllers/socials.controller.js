const SocialsModel = require("../models/socials.model");

const socialsController = {
    getAll: async (req, res) => {
        const socials = await SocialsModel.find();
        res.status(200).send(socials);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const social = await SocialsModel.findById(id);
        res.status(200).send(social);
    },
    delete: async (req, res) => {
        const id = req.params.id;
        await SocialsModel.findByIdAndDelete(id);
        res.status(200).send({
            message: `deleted successfully!`,
        });
    },
    post: async (req, res) => {
        const newSocials = new SocialsModel({
            icon: req.body.icon,
            link: req.body.link
        });
        newSocials.uploadDate = new Date();
        newSocials.updateDate = new Date();
        await newSocials.save();
        res.send({ massage: `Posted successfully!` });
    },
    edit: async (req, res) => {
        const id = req.params.id;
        const updatedSocials = {
            icon: req.body.icon,
            link: req.body.link
        };
        updatedSocials.updateDate = new Date();
        await SocialsModel.findByIdAndUpdate(id, updatedSocials);
        res.status(200).send({
            message: `Edited successfully!`,
        });
    },
};

module.exports = socialsController;
