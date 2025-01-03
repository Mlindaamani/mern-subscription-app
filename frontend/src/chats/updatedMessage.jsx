const Message = ({ message, isSender }) => {
  return (
    <div className={isSender ? "message__sender" : "message__recipient"}>
      <div className="message__avatar">
        <img
          src={isSender ? message.senderAvatar : message.receiverAvatar}
          alt="User  Avatar"
        />
      </div>
      <div className="message__content">
        <p>{message.text}</p>
        <span className="message__timestamp">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
