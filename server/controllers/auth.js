const { Sequelize } = require("../models/sqlite");

const User = require("../models/sqlite").User;

module.exports = {
  async register(req, res) {
    try {
      const user = await User.build(req.body);

      await user.save();

      res.json({ user });
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        res.status(400).json({ error: { reason: "email" } });
      } else {
        res.status(500).json({ error: { reason: "server" } });
      }
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          ...req.body,
        },
      });

      if (!user) {
        res.status(404).json({ error: { reason: "credentials" } });
      } else {
        res.json({ user });
      }
    } catch (error) {
      res.status(500).json({ error: { reason: "server" } });
    }
  },
};
