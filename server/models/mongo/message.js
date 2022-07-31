const { mongoose } = require("./");

const schema = new mongoose.Schema({
  text: String,
  reported: { type: Boolean, default: false },
});

const Message = mongoose.model("Message", schema);

module.exports = Message;
