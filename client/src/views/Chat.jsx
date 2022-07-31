import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "../styles/Chat.module.css";

function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/chat/conversations");
  }, []);

  return (
    <div id={styles.chat}>
      <Outlet />
    </div>
  );
}

export default Chat;
