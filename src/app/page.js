// pages/index.js
import Head from "next/head";
import Chatbot from "../components/Chatbot";
import styles from "../components/Chatbot.module.css";

export default function Home() {
  return (
    <div className={styles.chatbot}>
      <Head>
        <title>Chatbot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Chatbot />
    </div>
  );
}
