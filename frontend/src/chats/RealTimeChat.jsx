import "./chats.css";
import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { authStore } from "../stores/authStore";
import { messageStore } from "../stores/messageStore";
import { formatDate, getEmoji } from "../utils/functions";
import { useSocket } from "../stores/socketStore";

export const RealTimeChat = () => {
  const lastMessageRef = useRef();
  const [textMessage, setTextMessage] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { user } = authStore();
  const {
    connectToSocketServer,
    onlineUsers,
    disconnect,
    typingUser,
    typing,
    handleTyping,
  } = useSocket();

  const {
    messages,
    sendNewMessage,
    users,
    getChatUsers,
    getMessages,
    selected,
    setSelectedUser,
  } = messageStore();

  const sendMessage = (e) => {
    e.preventDefault();
    sendNewMessage(textMessage);
    setTextMessage("");
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    getMessages();
  };

  useEffect(() => {
    connectToSocketServer();
    getChatUsers();

    return () => disconnect();
  }, [getChatUsers]);

  useEffect(() => {
    if (lastMessageRef.current && messages) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Filter users based on the checkbox state
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <div className="chat-container container-fluid mb-5 mt-5">
      <div className="container chat-header d-flex justify-content-between align-items-center rounded-2 p-5 mb-4 mt-5">
        <h5 className="text-light fw-bold">
          {selected?.username ?? "Select to chat"}
        </h5>
        <p className="text-secondary fw-bold">Welcome, {user?.username}</p>
      </div>
      <div className="chat-layout p-4 mb-3 bg-primary rounded-2">
        <div className="sidebar bg-warning text-light vh-100 p-3">
          <h3 className="text-info-subtle p-3 fw-bold">
            <span className="fs-1">🗣️</span>EChat
          </h3>
          <hr
            className="w-100 bg-primary"
            style={{ height: "4px", border: "none", marginBottom: "2rem" }}
          />

          {typing && user?.id !== typingUser?.id && (
            <h5>{`${typingUser?.username} is typing...`}</h5>
          )}

          <div className="mb-5 mt-1 form-check form-switch">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              className="form-check-input"
              onChange={() => setShowOnlineOnly(!showOnlineOnly)}
            />
            <label className="form-check-label text-secondary">
              {showOnlineOnly ? "Back to users" : " Show online users"}
            </label>
          </div>

          <ul>
            {filteredUsers.map((user) => (
              <li
                onClick={() => {
                  handleUserClick(user);
                }}
                key={user?._id}
                className={`d-flex justify-content-between align-items-center fw-bold ${
                  selected?._id === user?._id ? "bg-info-subtle rounded-4" : ""
                }`}
              >
                <div className="d-flex align-items-center">
                  <span
                    className={`status-indicator me-2 ${
                      onlineUsers.includes(user._id) ? "online" : "offline"
                    }`}
                  ></span>
                  <p className="fw-bold text-dark">{user.username}</p>
                </div>
                <span className="fw-bold fs-3">{getEmoji()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="messages w-100">
          {messages.length === 0 ? (
            <div className="no-messages text-light d-flex justify-content-center align-items-center mt-5 vh-100">
              <p>No messages yet. Start chatting!</p>
              <h1>🗨️ 😴</h1>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                ref={lastMessageRef}
                className={`message ${
                  message.senderId === user?.id
                    ? "message-sent"
                    : "message-received"
                }`}
              >
                <p className="message-content text-secondary">
                  <code className="fs-5 text-success">
                    {message.senderId === user?.id ? "You" : selected?.username}
                    :{" "}
                  </code>
                  {message.message}
                </p>
                <small className="text-secondary fw-bold">
                  {formatDate(message.created_at)}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="input-container container bg-success-subtle p-3 rounded-5">
        <input
          className="input-message form-control rounded-5 p-3"
          type="text"
          value={textMessage}
          onChange={(e) => {
            setTextMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="btn btn-success rounded-5 fw-bold"
          disabled={textMessage.length === 0 || textMessage.trim() === ""}
        >
          Send
        </button>
      </div>
      <Toaster />
    </div>
  );
};
