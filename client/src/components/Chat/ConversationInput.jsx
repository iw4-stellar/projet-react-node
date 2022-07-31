import useFetch from "../../hooks/useFetch";
import useField from "../../hooks/useField";
import useLocalStorage from "../../hooks/useLocalStorage";
import styles from "../../styles/components/Chat/ConversationInput.module.css";

export default function ConversationInput() {
  const [user] = useLocalStorage("user");
  const [text, handleTextChange, setText] = useField("");
  const [sendMessage, isSendLoading] = useFetch(
    "/api/conversations/public/messages"
  );

  const handleSendClick = async () => {
    const body = JSON.stringify({ authorId: user.id, text });
    await sendMessage({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    setText("");
  };

  return (
    <div className={styles.conversation_input}>
      <input
        id={styles.input}
        type="text"
        placeholder="Message"
        value={text}
        onChange={handleTextChange}
      />

      <button
        onClick={handleSendClick}
        className="button is-primary"
        title="Send"
        disabled={isSendLoading}
      >
        Send
      </button>
    </div>
  );
}
