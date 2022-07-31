import { Link } from "react-router-dom";
import ChatIcon from "../../components/Icons/ChatIcon";
import styles from "../../styles/components/Chat/Conversations.module.css";

export default function Conversations() {
  return (
    <div className={styles.conversations}>
      <div className={styles.header}>
        <div className={styles.title}>
          <ChatIcon />
          <h1 className="h1">Chat</h1>
        </div>
        <p className={styles.subtitle}>00 Conversations</p>
      </div>

      <div className={styles.list}>
        <Link
          to="/chat/conversations/public"
          className={`${styles.conversations__conversation} ${styles.conversation}`}
        >
          <h3 className={styles.conversation__name}>Public</h3>
          <p className={styles.conversation__last_message}>
            Lorem ipsum sit dolore amet dad addaddadada
          </p>
        </Link>
      </div>
    </div>
  );
}
