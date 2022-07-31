const express = require("express");
const router = express.Router();
const chatController = require("../controllers/").chat;

router.get("/conversations", chatController.find);
router.post("/conversations", chatController.createConversation);
router.post("/conversations/:id", chatController.findOneConversation);
router.get("/conversations/:id/messages", chatController.findMessages);
router.post("/conversations/:id/messages", chatController.createMessage);

module.exports = router;
