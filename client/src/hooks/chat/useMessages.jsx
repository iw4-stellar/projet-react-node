import { useState } from "react";
import useSocket from "../useSocket";

export default function useMessages() {
  const [messages, setMessages] = useState([]);
  const socket = useSocket([
    {
      event: "connect",
      handler() {
        console.log("connect from messages");
      },
    },
    {
      event: "new-message",
      handler(newMessage) {
        console.log(newMessage);
      },
    },
  ]);

  return messages;
}
