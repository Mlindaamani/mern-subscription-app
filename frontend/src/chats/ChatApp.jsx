import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("messageResponse");
    };
  }, []);

  //   return <div>{/* Render messages here */}</div>;
  return (
    <div>
      return (
      <div className="chat__main">
        <div className="message__container">
          {messages.map((msg, index) => (
            <Message
              key={index}
              message={msg}
              isSender={msg.name === userName}
            />
          ))}
        </div>
      </div>
      );
    </div>
  );
};

export default ChatPage;
