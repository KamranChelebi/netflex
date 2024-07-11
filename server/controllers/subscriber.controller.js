const SubscribersModel = require("../models/subscriber.model");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

const sendToSubscriberEmail = async (email) => {
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
      subject: "Welcome to Netflex!",
      html: `
        <h2>Dear Subscriber,</h2>
        <p><strong>Welcome to Netflex, your ultimate movie destination! We are thrilled to have you as part of our community.</strong></p>
        <p>If you have any questions or need assistance, our dedicated support team is available to help you. Feel free to reach out to us whenever you need.</p>
        <p>Once again, thank you for choosing Netflex. Get ready to embark on an incredible cinematic journey!</p>
        <p>Best regards, <br />
        The Netflex Team</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
  }
};

const subscriberController = {
  getAll: async (req, res) => {
    const { name } = req.query;
    if (!name) {
      const subscribers = await SubscribersModel.find();
      res.status(200).send(subscribers);
    }
    else {
      const existedEmail = await SubscribersModel.findOne({ email: name });
      res.status(200).send(existedEmail);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    await SubscribersModel.findByIdAndDelete(id);
    res.status(200).send({
      message: `deleted successfully!`,
    });
  },
  post: async (req, res) => {
    const newSubscriber = new SubscribersModel({
      email: req.body.email,
    });
    newSubscriber.uploadDate = new Date();
    await newSubscriber.save();
    sendToSubscriberEmail(req.body.email)
    
    res.send({ message: `${newSubscriber.email} posted successfully!` });
  },
};

module.exports = subscriberController;
