const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const userName = localStorage.getItem("userName");
  const userAvatar = localStorage.getItem("userAvatar"); // Assuming you store the user's avatar URL

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("typing", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000); // Hide typing indicator after 2 seconds
    });

    return () => {
      socket.off("messageResponse");
      socket.off("typing");
    };
  }, []);

  const handleSendMessage = (text) => {
    const messageData = {
      text,
      senderName: userName,
      senderAvatar: userAvatar,
      receiverAvatar: "receiverAvatarUrl", // Replace with actual receiver avatar URL
      timestamp: new Date(),
    };

    socket.emit("message", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
  };

  const handleTyping = () => {
    socket.emit("typing");
  };

  return (
    <div className="chat__main">
      <div className="message__container">
        {messages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            isSender={msg.senderName === userName}
          />
        ))}
        {isTyping && <div className="typing__indicator">Typing...</div>}
      </div>
      {/* Input field for sending messages */}
      <input
        type="text"
        onChange={handleTyping}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.target.value);
            e.target.value = ""; // Clear input after sending
          }
        }}
        placeholder="Type a message..."
      />
    </div>
  );
};
