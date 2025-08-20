import React, { useState } from "react";
import "./ChatWindow.css";


function ChatWindow() {
    const [messages,setMessages]=useState([]);
    const[input,setInput]= useState("")
  return (
    <>
    <div className="chat-container">
        <div className="chat-box">
            <div className="chat-header">🤖 ChatBot</div>
            <div className="chat-messages">
                
            </div>
        </div>

    </div>
    </>
  )
}

export default ChatWindow