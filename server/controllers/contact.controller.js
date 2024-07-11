const ContactModel = require("../models/contact.model");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

const sendContactsEmail = async (name, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Your Message Has Been Received!",
      html: `
        <h2>Dear ${name},</h2>
        <p><strong>We have received your message and will be in touch with you shortly. Thank you.</strong></p>
        <p>Best regards, <br />
        The Netflex Team</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
  }
};

const contactController = {
  getAll: async (req, res) => {
    const contacts = await ContactModel.find();
    res.status(200).send(contacts);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    await ContactModel.findByIdAndDelete(id);
    res.status(200).send({
      message: `deleted successfully!`,
    });
  },
  post: async (req, res) => {
    const newContact = new ContactModel({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });
    newContact.uploadDate = new Date();
    await newContact.save();
    sendContactsEmail(req.body.name, req.body.email)
    res.send({ message: `message posted successfully!` });
  },
};

module.exports = contactController;