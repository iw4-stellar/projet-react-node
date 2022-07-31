const { mongoose } = require("./");

const schema = new mongoose.Schema({
  messages: [mongoose.Schema.Types.Mixed],
});

const Chat = mongoose.model("Chat", schema);

module.exports = Chat;
