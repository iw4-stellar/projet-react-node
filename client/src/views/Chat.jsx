import { useCallback } from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/Chat.css";

function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const onMessageChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const sendMessage = useCallback(() => {
    socket.emit("message", { text: message });
  }, [message, socket]);

  useEffect(() => {
    const s = io("http://localhost:8080");
    setSocket(s);

    s.emit("message", { text: "toto" });

    s.on("new-message", (newMessage) => {
      console.log(newMessage);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div className="Chat">
      <h1>Hello Studypals</h1>

      <div className="Chat__input">
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={onMessageChange}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
