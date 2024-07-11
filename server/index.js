const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const router = require("./routes");
const RegisterMiddleware = require("./middlewares/register.middleware");
const Users = require("./models/users.model");
const nodemailer = require("nodemailer");
app.use(cors());
dotenv.config();
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/sliders", router.sliders);
app.use("/api/categories", router.categories);
app.use("/api/qualities", router.qualities);
app.use("/api/movies", router.movies);
app.use("/api/languages", router.languages);
app.use("/api/services", router.services);
app.use("/api/movieoftheday", router.movieoftheday);
app.use("/api/subscribers", router.subscribers);
app.use("/api/pricing", router.pricing);
app.use("/api/blog-categories", router.blogCategories);
app.use("/api/blogs", router.blogs);
app.use("/api/contact", router.contact);
app.use("/api/information", router.information);
app.use("/api/socials", router.socials);
app.use("/api/users", router.users);

//confirmation email send
const sendConfirmationEmail = async (username, email, confirmationCode) => {
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
      subject: "Account Confirmation",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${username}</h2>
        <p>Thank you for register. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:7070/api/confirm/${confirmationCode}> Click here</a>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
  }
};

//register
app.post(
  "/api/register",
  RegisterMiddleware,
  async (req, res) => {
    const { username, password, email } = req.body;
    const existedUsername = await Users.findOne({ username: username });
    const existedEmail = await Users.findOne({ email: email });
    if (existedUsername) {
      res.send({
        auth: false,
        message: "username already exists!",
      });
      return;
    }
    if (existedEmail) {
      res.send({
        auth: false,
        message: "email already exists!",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const confirmationToken = jwt.sign(
      { email: email },
      process.env.CONFIRMATION_SECRET_KEY
    );

    const newUser = new Users({
      username: username,
      email: email,
      password: hashedPassword,
      userIMG: null,
      plan: "",
      favorites: [],
      isAdmin: false,
      isVerified: false,
      confirmationCode: confirmationToken,
      uploadDate: new Date(),
    });
    
    await newUser.save();
    sendConfirmationEmail(username, email, confirmationToken);

    res.send({
      auth: true,
      data: newUser,
      message: "User was registered successfully! Please check your email!",
    });
  }
);

//confirm
app.get("/api/confirm/:confirmationCode", (req, res) => {
  Users.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.isVerified = true;
      user.confirmationCode = null;
      user.save()
        .then(() => {
          res.redirect('http://localhost:5173/login')
        })
        .catch((err) => {
          res.status(500).send({ message: err });
          return;
        });
    })
    .catch((e) => console.log("error", e));
});

//login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const existedUser = await Users.findOne({ username: username });
  if (!existedUser) {
    res.send({ auth: false, message: "username or password is wrong!" });
  } else {
    const isValid = await bcrypt.compare(password, existedUser.password);
    if (!isValid) {
      res.send({ auth: false, message: "username or password is wrong!" });
    } else {
      if (!existedUser.isVerified) {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      } else {
        const accessToken = jwt.sign(
          { id: existedUser._id },
          process.env.ACCESS_SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        const refreshToken = jwt.sign(
          { id: existedUser._id },
          process.env.REFRESH_SECRET_KEY,
          {
            expiresIn: "30d",
          }
        );
        res.send({
          auth: true,
          user: {
            id: existedUser._id,
            username: existedUser.username,
            userIMG: existedUser.userIMG,
            email: existedUser.email,
            plan: existedUser.plan,
            isAdmin: existedUser.isAdmin,
            favorites: existedUser.favorites,
          },
          accessToken: accessToken,
          refreshToken: refreshToken,
          message: "user logged in successfully!",
        });
      }
    }
  }
});

//refresh token
app.post("/refresh-token", (req, res) => {
  try {
    const { refreshToken } = req.body;

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
      console.log(decoded);
      if (err) {
        return res.status(401).json({ message: "Invalid refresh token!" });
      }
      const { id } = decoded;

      const accessToken = jwt.sign({ id }, process.env.ACCESS_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.send({ accessToken, refreshToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
});

//forgot-password
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generating resetPasswordToken
    const resetPasswordToken = jwt.sign(
      { email: email },
      process.env.RESET_PASS_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    user.resetPasswordToken = resetPasswordToken;

    // Email the user with a password reset link
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: 'Password Reset',
      html: `<h1>Reset Password</h1>
      <h2>Hello ${user.username}</h2>
      <p>Please use the link below to reset your password</p>
      <a href="http://localhost:5173/reset-password?token=${resetPasswordToken}"> Click here</a>
      <p>This link is valid for 1 hour.</p>
      <p>If you have not requested a password reset, you can ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);
    await user.save();

    res.json({ message: 'Password reset link has been sent to your email address' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to send e-mail' });
  }
});

//reset-password
app.put('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await Users.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Save new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;

    await user.save();

    res.json({ message: 'Your password has been successfully reset' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

//logut
app.post('/api/logout', (req, res) => {
  const { token } = req.headers['access-token'];
  jwt.destroy(token);
})

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server: ${PORT}- burda işləyirəm!`);
});

DB_CONNECTION = process.env.DB_CONNECTION;
mongoose.connect(DB_CONNECTION).then(() => {
  console.log("DB: Mən də!");
});

