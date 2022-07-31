import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ConversationSkeleton from "./ConversationSkeleton";
import ConversationInput from "./ConversationInput";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import styles from "../../styles/components/Chat/Conversation.module.css";

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [getMessages, isMessagesLoading] = useFetch(
    "/api/conversations/public/messages"
  );
  useEffect(() => {
    (async () => {
      const data = await getMessages({ method: "GET" });
      setMessages(data.messages);
    })();
  }, []);
  const messageFeed = useMemo(() => {
    return (
      <div className={styles.message_feed}>
        {messages.map((msg) => (
          <div className={styles.message_wrapper}>
            <div className={styles.message}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }, [messages]);

  return (
    <div className={styles.conversation}>
      <div className={styles.conversation__header}>
        <Link to="/chat/conversations" className="button is-icon is-text">
          <ArrowLeftIcon />
        </Link>

        <h4 className={styles.title}>Public</h4>
      </div>

      <div className={styles.conversation__body}>
        {isMessagesLoading ? <ConversationSkeleton /> : messageFeed}
      </div>
      <div className={styles.conversation__footer}></div>
      <ConversationInput />
    </div>
    // <div className="conversation">
    // </div>
  );
}
