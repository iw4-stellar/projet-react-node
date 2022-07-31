const { Sequelize } = require("../models/sqlite");

const User = require("../models/sqlite").User;

module.exports = {
  // GET
  async find(req, res) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).send(users);
    } catch (error) {}
  },
  // POST
  async create(req, res) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password,
      });

      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async findOne(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password"],
        },
      });

      if (!user) {
        res.status(404).json({ user });
      } else {
        res.status(200).json({ user });
      }
    } catch (error) {
      res.status(500).json({ error: { reason: "server" } });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, newPassword } = req.body;
      const user = await User.findOne({
        where: {
          id,
          password,
        },
        attributes: {
          exclude: ["password"],
        },
      });

      if (!user) {
        res.status(404).json({ error: { reason: "credentials" } });
      } else {
        user.name = name;
        user.email = email;

        if (newPassword) {
          user.password = newPassword;
        }

        await user.save();

        res.json({ user });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Sequelize.UniqueConstraintError) {
        res.status(403).json({ error: { reason: "email" } });
      } else {
        res.status(500).json({ error: { reason: "server" } });
      }
    }
  },
};
