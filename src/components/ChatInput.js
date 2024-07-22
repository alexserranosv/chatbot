// components/ChatInput.js
"use client";

import React, { useState } from "react";
import styles from "./Chatbot.module.css";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escribe un mensaje..."
        className={styles.chatInputField}
      />
      <button onClick={handleSend} className={styles.chatInputButton}>
        Enviar
      </button>
    </div>
  );
};

export default ChatInput;
