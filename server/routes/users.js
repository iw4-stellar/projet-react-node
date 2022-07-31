const express = require("express");
const router = express.Router();
const userController = require("../controllers/").user;

router.get("/users", userController.find);
router.post("/users", userController.create);
router.get("/users/:id", userController.findOne);
router.post("/users/:id", userController.update);

module.exports = router;
