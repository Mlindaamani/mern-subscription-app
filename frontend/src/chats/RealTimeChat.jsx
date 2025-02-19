import React, { useState, useEffect, useRef } from "react";
import "./chats.css";
import { authStore } from "../stores/authStore";
import { messageStore } from "../stores/messaggeStore";
import { formatDate, getEmoji } from "../utils/functions";
import { Toaster } from "react-hot-toast";
import { useSocket } from "../stores/useSocket";

export const RealTimeChat = () => {
  const lastMessageRef = useRef();
  const [textMessage, setTextMessage] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { user } = authStore();
  const { connectToSocketServer, onlineUsers } = useSocket();

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
      <div className="container bg-black d-flex justify-content-between align-items-center mt-4 mb-5 rounded-2 bg-opacity-75 p-3">
        <h2 className="text-light">
          {getEmoji()}
          It's You <span className="fw-bold fs-2 text-danger me-1">vs</span>
          {selected?.username ?? "World"}
          {getEmoji()}
        </h2>
        <p className="text-light fw-bold">Welcome {user?.username}!</p>
      </div>
      <div className="chat-layout p-4 mb-3 bg-primary rounded-2">
        <div className="sidebar bg-warning text-light vh-100 p-3">
          <h3 className="text-secondary p-3 fw-bold">Buddies</h3>

          <div className="mb-2 mt-1 form-check form-switch">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              className="form-check-input"
              onChange={() => setShowOnlineOnly(!showOnlineOnly)}
            />
            <label className="form-check-label">
              {showOnlineOnly ? "Online" : "All"}
            </label>
          </div>

          <hr
            className="w-100 bg-primary"
            style={{ height: "8px", border: "none", marginBottom: "2rem" }}
          />
          <ul>
            {filteredUsers.map((user) => (
              <li
                onClick={() => {
                  handleUserClick(user);
                }}
                key={user?._id}
                className={`d-flex justify-content-between align-items-center fw-bold ${
                  selected?._id === user?._id ? "bg-primary rounded-4" : ""
                }`}
              >
                <div className="d-flex align-items-center">
                  <span
                    className={`status-indicator me-2 ${
                      onlineUsers.includes(user._id) ? "online" : "offline"
                    }`}
                  ></span>
                  <p className={`fw-bold text-light`}>{user.username}</p>
                </div>
                <span className="fw-bold fs-3">{getEmoji()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="messages w-100">
          {messages.length === 0 ? (
            <div className="no-messages text-light d-flex justify-content-center align-items-center mt-5">
              <p>No messages yet. Start chatting!</p>
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
          onChange={(e) => setTextMessage(e.target.value)}
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
