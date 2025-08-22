import React from 'react';
import './ChatBox.css';
import { IoSend } from "react-icons/io5";

function ChatBox({darkMode}) {
  
  return (
    <div className={`chatbox ${darkMode ? 'dark' : 'light'}`}>
      <div className="chatbox-header">
        <span>Chatbox</span>
      </div>
      <div className="chatbox-messages">
        <p>Hello! How can I help you?</p>
      </div>
      <div className="chatbox-input">
        <input type="text" placeholder="Type a message..." />
        <button><IoSend />
</button>
      </div>
    </div>
  );
}

export default ChatBox;