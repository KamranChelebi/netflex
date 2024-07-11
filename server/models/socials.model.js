const mongoose = require("mongoose");

const SocialsModel = new mongoose.model(
    "socials",
    new mongoose.Schema({
        icon: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
        },
        link: {
            type: String,
            required: true,
            trim: true,
            minlength: 15,
            match: [
                /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
                "Invalid Url",
            ],
        },
        uploadDate: {
            type: Date,
            required: true,
            trim: true,
        },
        updateDate: {
            type: Date,
            required: true,
            trim: true,
        },
    })
);
module.exports = SocialsModel;