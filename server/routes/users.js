const express = require("express");
const router = express.Router();
const userController = require("../controllers/").user;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/users", userController.find);
router.post("/users", userController.create);

module.exports = router;
