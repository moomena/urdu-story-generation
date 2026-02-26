"use client";
import { useState } from "react";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  const [messages, setMessages] = useState([]);

  return (
    <ChatBox messages={messages} setMessages={setMessages} />
  );
}