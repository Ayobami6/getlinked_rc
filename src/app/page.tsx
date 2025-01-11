"use client";

import Image from "next/image";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../firebase";
import { useEffect, useState } from "react";

type Message = {
  text: string;
  userType: string;
  timestamp: string;
  username: string;
};

export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
  const username = "Ayo";

  useEffect(() => {
    const messagesRef = ref(db, `${username}_messages`);
    const unsubsribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        setMessages(Object.values(data));
      }
    });
    return () => {
      unsubsribe();
    };
  }, []);

  const sendMessage = async (text: string) => {
    const newMessageRef = ref(db, `${username}_messages`)
    const messageRef = push(newMessageRef);
    console.log("This is the message ref", messageRef.key);
    const newMessage = {
      text: text,
      userType: "user",
      timestamp: new Date().toISOString(),
      username: username,
    };
    await set(messageRef, newMessage);
    // sends a post request to the server for ai to process the question and persist the response

  }
  return (
    <div className="text-center py-4">
      <h1>Welcome to the Next.js Firebase Starter</h1>
      <h1>Chat Messages</h1>
      <ul className="my-4">
        {messages.map((message, index) => (
          <li className="text-white" key={index}>{message.text}</li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = (e.target as HTMLFormElement).elements.namedItem("message") as HTMLInputElement;
          console.log(text.value);
          sendMessage(text.value);
          (e.target as HTMLFormElement).reset();
        }}
      >
        <input type="text" className="text-black p-2" name="message" placeholder="Type your message" />
        <button className="mx-2" type="submit">Send</button>
      </form>
    </div>
  );
}
