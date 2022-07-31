import { useRef } from "react";
import { useEffect } from "react";
import Message from "./Message";

export default function Messages({ messages }) {
  return (
    <div className="messages">
      {messages.map((message) => (
        <Message key={`message-${message._id}`} message={message} />
      ))}
    </div>
  );
}
