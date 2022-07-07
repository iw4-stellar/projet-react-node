const User = require("../models").User;

module.exports = {
  // GET
  async find(req, res) {
    try {
      const users = await User.findAll();

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
};
