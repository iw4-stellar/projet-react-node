import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Messages from "./Messages";
import { useSearchParams } from "react-router-dom";

export default function Channel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const s = io("http://localhost:8080");
    setSocket(s);

    s.on("connect", () => {
      console.log("connect");

      s.emit("chat/join", searchParams.get("chatId"));
    });

    s.on("chat/not-found", () => {
      alert("Chat not found");
    });

    s.on("chat/joined", (chat) => {
      alert(`Successfully connected to chat: ${chat._id}`);

      setMessages(chat.messages);
    });

    s.on("chat/message", (chat) => {
      console.log("chat/message");
      setMessages(chat.messages);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message === "") return;

    const chatId = searchParams.get("chatId");

    socket.emit("message", { message: { text: message }, chatId });
    setMessage("");
  };

  return (
    <div className="channel">
      <Messages messages={messages} />
      <div className="channel-input">
        <input
          className="input"
          type="text"
          id="message"
          name="message"
          placeholder="Type something great"
          value={message}
          onChange={onMessageChange}
        />
        <button className="button is-text" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
