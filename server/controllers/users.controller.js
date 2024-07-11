const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const fs = require("fs");

const usersController = {
  getAll: async (req, res) => {
    const { name } = req.query;
    const users = await Users.find();
    if (!name) {
      res.status(200).send(users);
    } else {
      res
        .status(200)
        .send(
          users.filter((x) =>
            x.username.toLowerCase().trim().includes(name.toLowerCase().trim())
          )
        );
    }
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const user = await Users.findById(id);
    res.status(200).send(user);
  },
  edit: async (req, res) => {
    const { username, currentPassword, newPassword, plan, favorites } = req.body;
    const id = req.params.id;
    const user = await Users.findById(id);
    const url = req.protocol + "://" + req.get("host");
    const existedUsername = await Users.findOne({ username: username });
    if (existedUsername) {
      res.send({
        auth: false,
        message: "username already exists!",
      });
      return;
    }
    const updatedUser = {
      username: username,
      favorites: favorites,
      plan: plan,
    };
    if (currentPassword && newPassword) {
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        res.send({ auth: false, message: "Current Password is wrong!" });
        return;
      }
      else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        updatedUser.password = hashedPassword;
      }

    }
    if (req.file) {
      if (user.userIMG !== null) {
        const idx = user.userIMG.indexOf("uploads/avatars/");
        const imageName = user.userIMG.substr(idx);
        fs.unlinkSync("./" + imageName);
        updatedUser.userIMG = url + "/uploads/avatars/" + req.file.filename;
      }
      else if (user.userIMG === null) {
        updatedUser.userIMG = url + "/uploads/avatars/" + req.file.filename;
      }
    }
    else if (req.body.userIMGDelete) {
      const idx = user.userIMG.indexOf("uploads/avatars/");
      const imageName = user.userIMG.substr(idx);
      fs.unlinkSync("./" + imageName);
      updatedUser.userIMG = null
    }

    await Users.findByIdAndUpdate(id, updatedUser);
    res.status(200).send({
      auth: true,
      message: `edited successfully!`,
    });
  },
};

module.exports = usersController;
