import React, { useState, useEffect } from "react";
import "./chats.css";
import { authStore } from "../stores/authStore";
import { io } from "socket.io-client";
const { VITE_SOCKET_URL } = import.meta.env;

const socket = io(VITE_SOCKET_URL);

export const RealTimeChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = authStore();

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      const messageData = { sender: user?.name, message };
      socket.emit("newMessage", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container container p-5 mt-5">
      <h2 className="chat-title text-center text-light mb-5">
        Chat({user.name})
      </h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === user?.name ? "message-sent" : "message-received"
            }`}
          >
            <p className="message-content text-secondary">
              <code className="fs-5 text-success">{user?.name}: </code>
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="input-container container bg-success-subtle p-3 rounded-5">
        <input
          className="input-message form-control rounded-5 p-3 "
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="btn btn-success rounded-5 fw-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
};
