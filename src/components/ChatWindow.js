// components/ChatWindow.js
"use client";

import React from "react";
import styles from "./Chatbot.module.css";

const ChatWindow = ({ messages }) => {
  return (
    <div className={styles.chatWindow}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.messageGroup} ${styles[msg.sender]}`}
        >
          <div className={styles.messageSender}>
            {msg.sender === "user" ? "Tú" : "Asistente"}
          </div>
          <div className={styles.messageContent}>
            {msg.text.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
