const express = require("express");
const router = express.Router();
const userController = require("../controllers/").user;


router.get("/users", userController.find);
router.post("/users", userController.create);

module.exports = router;
