import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function useSocket(eventHandlers = []) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("http://localhost:8080");

    eventHandlers.map(({ event, handler }) => {
      s.on(event, handler);
    });

    setSocket(s);

    return () => {
      s.disconnect();

      console.log("disconnected");
    };
  }, []);

  return socket;
}
