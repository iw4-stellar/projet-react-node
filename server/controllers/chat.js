const { Conversation, Message } = require("../models/sqlite");

module.exports = {
  async find(req, res) {
    const conversations = await Conversation.findAll();

    res.status(200).json({ conversations });
  },
  async findOneConversation(req, res) {
    const { id } = req.params;
    const conversation = await Conversation.findByPk(id);
    const messages = await Message.find({
      where: {
        conversation: id,
      },
    });

    if (!conversation) {
      res.status(404).json({ conversation, messages: [] });
    } else {
      res.status(200).json({ conversation, messages });
    }
  },
  async createConversation(req, res) {
    const { name } = req.body;
    const conversation = await Conversation.create({
      name,
    });

    res.status(201).json({ conversation });
  },
  async findMessages(req, res) {
    const messages = await Message.findAll({
      order: ["createdAt"],
    });

    res.status(200).json({ messages });
  },
  async createMessage(req, res) {
    const { authorId, text } = req.body;
    const message = await Message.create({
      authorId,
      text,
    });

    res.status(201).json({ message });
  },
};

// const Chat = require("../models/mongo/chat");
// const Message = require("../models/mongo/message");

// const chat = (socket) => {
//   socket.on("chat/join", async (chatId) => {
//     console.log(chatId);
//     console.log(await Chat.find({}));

//     if (!chatId) {
//       socket.join("public");
//       return;
//     }

//     const chat = await Chat.findOne({
//       _id: chatId,
//     });

//     if (!chat) {
//       socket.emit("chat/not-found");
//     }

//     socket.join(chat._id.toString());
//     socket.emit("chat/joined", chat);
//   });

//   socket.on("message", async ({ message, chatId }) => {
//     const chat = await Chat.findOne({ _id: chatId });
//     const msg = await Message.create(message);

//     chat.messages.push(msg);
//     chat.save();

//     socket.emit("chat/message", chat);

//     console.log(chatId, msg);
//   });
// };
// module.exports = chat;
