// components/Chatbot.js
"use client";

import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const initialMessages = [
    {
      sender: "bot",
      text: "Ingrese una opción:\n1. Información académica y administrativa\n2. Recursos y servicios del campus\n3. Apoyo y bienestar estudiantil\n4. Orientación sobre carrera y desarrollo profesional\n5. Vida estudiantil y eventos sociales",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (message) => {
    const userMessage = { sender: "user", text: message };

    let botMessage;

    switch (message.trim()) {
      case "1":
        botMessage = {
          sender: "bot",
          text: "Información académica y administrativa",
        };
        break;
      case "2":
        botMessage = { sender: "bot", text: "Recursos y servicios del campus" };
        break;
      case "3":
        botMessage = { sender: "bot", text: "Apoyo y bienestar estudiantil" };
        break;
      case "4":
        botMessage = {
          sender: "bot",
          text: "Orientación sobre carrera y desarrollo profesional",
        };
        break;
      case "5":
        botMessage = {
          sender: "bot",
          text: "Vida estudiantil y eventos sociales",
        };
        break;
      default:
        botMessage = {
          sender: "bot",
          text: "Opción no válida. Por favor ingrese un número del 1 al 5.",
        };
        break;
    }

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
  };

  return (
    <div className={styles.chatbot}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>Asistente Universitario</div>
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chatbot;
