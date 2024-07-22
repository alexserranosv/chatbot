// components/Chatbot.js
"use client";

import React, { useState } from "react";
import stringSimilarity from "string-similarity";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const mainMenu = `Bienvenido al Asistente Universitario. ¿En qué puedo ayudarte hoy?`;

  const knowledgeBase = [
    {
      keywords: ["calendario", "académico", "semestre"],
      answer:
        "El calendario académico para este semestre está disponible en el portal estudiantil. Las clases comienzan el 1 de septiembre y terminan el 15 de diciembre, con un período de exámenes del 18 al 22 de diciembre.",
    },
    {
      keywords: ["horario", "clases"],
      answer:
        "Puedes encontrar tu horario de clases en el portal estudiantil, en la sección 'Mi Horario'. Asegúrate de iniciar sesión con tu cuenta de estudiante.",
    },
    {
      keywords: ["inscripción", "cursos", "períodos"],
      answer:
        "Los períodos de inscripción para cursos son del 15 al 30 de agosto para el semestre de otoño, y del 1 al 15 de enero para el semestre de primavera.",
    },
    {
      keywords: ["biblioteca", "horarios"],
      answer:
        "La biblioteca principal está ubicada en el edificio central del campus. Está abierta de lunes a viernes de 8:00 AM a 10:00 PM, y los fines de semana de 10:00 AM a 6:00 PM.",
    },
    {
      keywords: ["servicios", "estudiantiles", "contactar", "departamento"],
      answer:
        "Puedes contactar al departamento de servicios estudiantiles llamando al 555-123-4567 o enviando un correo electrónico a serviciosestudiantiles@universidad.edu.",
    },
    {
      keywords: ["evento", "importante", "campus", "semana"],
      answer:
        "Sí, esta semana hay una feria de clubes estudiantiles el jueves de 11:00 AM a 3:00 PM en la plaza central del campus.",
    },
    {
      keywords: ["ayuda", "estrés", "problemas", "emocionales"],
      answer:
        "El Centro de Bienestar Estudiantil ofrece servicios de consejería gratuitos. Puedes programar una cita llamando al 555-987-6543 o visitando su oficina en el edificio de Servicios Estudiantiles.",
    },
    {
      keywords: ["recursos", "estudiantes", "discapacidades"],
      answer:
        "La Oficina de Accesibilidad y Servicios para Discapacitados ofrece una variedad de recursos, incluyendo tecnología de asistencia, intérpretes de lenguaje de señas y acomodaciones para exámenes. Visita su oficina en el primer piso del edificio administrativo.",
    },
    {
      keywords: ["asesoramiento", "tutoría", "rendimiento", "académico"],
      answer:
        "El Centro de Éxito Académico ofrece tutoría gratuita en diversas materias, talleres de habilidades de estudio y asesoramiento académico individual. Está ubicado en el segundo piso de la biblioteca.",
    },
    {
      keywords: ["pasantías", "prácticas", "profesionales", "carrera"],
      answer:
        "La Oficina de Desarrollo Profesional mantiene una base de datos de pasantías y prácticas profesionales. Puedes acceder a ella a través del portal de carreras en línea o visitar su oficina para obtener ayuda personalizada.",
    },
    {
      keywords: ["currículum", "vitae", "CV"],
      answer:
        "El Centro de Carreras ofrece talleres semanales sobre cómo escribir un currículum vitae efectivo. También puedes programar una cita individual para revisión de tu CV.",
    },
    {
      keywords: ["talleres", "entrevistas", "trabajo"],
      answer:
        "Sí, el Centro de Carreras ofrece talleres mensuales de preparación para entrevistas, que incluyen simulacros de entrevistas y consejos para destacar tus habilidades.",
    },
    {
      keywords: ["clubes", "actividades", "extracurriculares"],
      answer:
        "Hay más de 50 clubes y organizaciones estudiantiles en el campus, que van desde clubes académicos hasta grupos de interés especial. Puedes encontrar una lista completa en el sitio web de Vida Estudiantil.",
    },
    {
      keywords: ["actividad", "interesante", "fin de semana"],
      answer:
        "Este fin de semana hay un concierto al aire libre el sábado a las 7:00 PM en el anfiteatro del campus, y un torneo de fútbol intramural el domingo desde las 10:00 AM.",
    },
    {
      keywords: ["opciones", "alimentación", "campus"],
      answer:
        "El campus cuenta con varias opciones de alimentación, incluyendo la cafetería principal en el Centro Estudiantil, varios cafés distribuidos por el campus, y food trucks que visitan regularmente. También hay opciones vegetarianas y veganas disponibles.",
    },
  ];

  const [messages, setMessages] = useState([{ sender: "bot", text: mainMenu }]);

  const findBestMatch = (input) => {
    let bestMatch = { index: -1, rating: 0 };
    knowledgeBase.forEach((item, index) => {
      const similarity = stringSimilarity.findBestMatch(input, item.keywords);
      if (similarity.bestMatch.rating > bestMatch.rating) {
        bestMatch = { index, rating: similarity.bestMatch.rating };
      }
    });
    return bestMatch.rating > 0.3
      ? knowledgeBase[bestMatch.index].answer
      : null;
  };

  const handleSend = (message) => {
    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse =
      findBestMatch(message) ||
      "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla o ser más específico?";

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botResponse },
    ]);
  };

  const handleReset = () => {
    setMessages([{ sender: "bot", text: mainMenu }]);
  };

  return (
    <div className={styles.chatbot}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          Asistente Universitario
          <button onClick={handleReset} className={styles.resetButton}>
            Reiniciar
          </button>
        </div>
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chatbot;
