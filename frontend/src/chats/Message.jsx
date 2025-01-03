const Message = ({ message, isSender }) => {
  return (
    <div className={isSender ? 'message__sender' : 'message__recipient'}>
      <p>{message.text}</p>
    </div>
  );
};