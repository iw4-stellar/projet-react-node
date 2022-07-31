export default function Message({ message }) {
  return (
    <div className="message-wrapper">
      <div className="message">
        <p>{message.text}</p>
      </div>
    </div>
  );
}
