import React, { useState } from "react";

const dummyConversations = [
  {
    id: 1,
    name: "Luis - Github",
    messages: [
      { sender: "them", text: "Hey! I have a question..." },
      { sender: "me", text: "Sure, go ahead!", timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 2,
    name: "Ivan - Nike",
    messages: [
      { sender: "them", text: "Hi, I need help with my order." }
    ]
  },
  {
    id: 3,
    name: "Lead from New York",
    messages: []
  }
];

const getCurrentTimestamp = () => new Date().toISOString();
const canEditMessage = (timestamp) => {
  const now = new Date();
  const sentTime = new Date(timestamp);
  const diff = (now - sentTime) / 1000;
  return diff <= 600; // 10 minutes
};

function Chats() {
  const [activeChat, setActiveChat] = useState(null);
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState(dummyConversations);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: "me", text: inputText, timestamp: getCurrentTimestamp() }
          ]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setActiveChat(updatedChats.find(c => c.id === activeChat.id));
    setInputText("");
  };

  return (
    <div className="wa-container">
      {/* Sidebar */}
      <div className="wa-sidebar">
        <h2>Your Inbox</h2>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`wa-chat-item ${activeChat?.id === chat.id ? "active" : ""}`}
            onClick={() => setActiveChat(chat)}
          >
            {chat.name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="wa-chat-window">
        {activeChat ? (
          <>
            <div className="wa-chat-header">
              <span className="wa-chat-title">{activeChat.name}</span>
              <div className="wa-chat-header-buttons">
                <button title="Options">⋯</button>
                <button title="Toggle Theme">🌓</button>
                <button title="Close">✕</button>
              </div>
            </div>

            <div className="wa-chat-messages">
              {activeChat.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`wa-message ${msg.sender === "me" ? "sent" : "received"}`}
                >
                  <div className="wa-msg-content">
                    {msg.isEditing ? (
                      <input
                        value={msg.text}
                        onChange={(e) => {
                          const updatedChats = chats.map(chat => {
                            if (chat.id === activeChat.id) {
                              const updatedMessages = [...chat.messages];
                              updatedMessages[idx].text = e.target.value;
                              return { ...chat, messages: updatedMessages };
                            }
                            return chat;
                          });
                          setChats(updatedChats);
                        }}
                        onBlur={() => {
                          const updatedChats = chats.map(chat => {
                            if (chat.id === activeChat.id) {
                              const updatedMessages = [...chat.messages];
                              updatedMessages[idx].isEditing = false;
                              return { ...chat, messages: updatedMessages };
                            }
                            return chat;
                          });
                          setChats(updatedChats);
                        }}
                        autoFocus
                      />
                    ) : (
                      <>
                        {msg.text}
                        {msg.sender === "me" && msg.timestamp && canEditMessage(msg.timestamp) && (
                          <button
                            className="wa-edit-btn"
                            onClick={() => {
                              const updatedChats = chats.map(chat => {
                                if (chat.id === activeChat.id) {
                                  const updatedMessages = [...chat.messages];
                                  updatedMessages[idx].isEditing = true;
                                  return { ...chat, messages: updatedMessages };
                                }
                                return chat;
                              });
                              setChats(updatedChats);
                            }}
                          >
                            ✎
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="wa-chat-input">
              <div className="wa-input-actions">
                <button title="Quick Action">⚡</button>
                <button title="Upload">📁</button>
                <button title="Emoji">😊</button>
              </div>
              <input
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="wa-placeholder">
            Select a conversation to start chatting
          </div>
        )}
      </div>

      {/* AI Copilot */}
      {activeChat && (
        <div className="wa-copilot">
          <h3>Hi, I'm Fin AI Copilot</h3>
          <p>Ask me anything about this conversation.</p>
          <input placeholder="Ask a question..." />
        </div>
      )}
    </div>
  );
}

export default Chats;
