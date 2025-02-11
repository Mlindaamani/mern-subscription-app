import React, { useState, useEffect } from "react";
import "./chats.css";
import { authStore } from "../stores/authStore";
import { socket } from "./socket";
import { formatDate } from "../utils/functions";

export const RealTimeChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = authStore();

  useEffect(() => {
    socket.on("messageReceived", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.off("messageReceived");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message === "") return;

    const messageData = {
      sender: user?.name,
      message,
      sentAt: formatDate(Date.now()),
    };
    socket.emit("newMessage", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage("");
  };

  return (
    <div className="chat-container container p-5 mt-5">
      <h2 className="chat-title text-center text-secondary mb-5">
        Chat({user?.name})
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
