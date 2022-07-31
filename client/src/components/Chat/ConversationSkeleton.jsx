import styles from "../../styles/components/Chat/ConversationSkeleton.module.css";

export default function ConversationSkeleton() {
  return (
    <div className={styles.conversation_skeleton}>
      <div className={`${styles.message_wrapper} ${styles.is_me}`}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.message_wrapper}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.message_wrapper}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={`${styles.message_wrapper} ${styles.is_me}`}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.message_wrapper}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={`${styles.message_wrapper} ${styles.is_me}`}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.message_wrapper}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={`${styles.message_wrapper} ${styles.is_me}`}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={`${styles.message_wrapper} ${styles.is_me}`}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.message_wrapper}>
        <div className={styles.message}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
