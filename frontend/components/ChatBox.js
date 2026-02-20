"use client";

import { useState } from "react";

const BACKEND_URL = "http://localhost:8000/generate";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUrdu, setIsUrdu] = useState(true);
  const typeWriterEffect = (text) => {
    let i = 0;
    let currentText = "";

    const interval = setInterval(() => {
      currentText += text[i];
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = currentText;
        return updated;
      });
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const botMessage = { role: "bot", text: "" };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prefix: input,
          max_sentences: 5,
        }),
      });

      const data = await res.json();
      typeWriterEffect(data.story);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

 return (
  <div className="w-full max-w-2xl bg-gradient-to-br from-pink-200 via-yellow-200 to-blue-200 shadow-2xl rounded-3xl p-6 flex flex-col h-[600px] border-4 border-purple-400">
    
    <h1 className="text-3xl font-extrabold text-center mb-4 text-purple-700">
      🌈 Urdu Kids Story Generator 📖
    </h1>

    <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-2xl max-w-[80%] shadow-md ${
            msg.role === "user"
              ? "bg-blue-400 text-white ml-auto"
              : "bg-green-300 text-black"
          }`}
        >
          {msg.text}
        </div>
      ))}

      {loading && (
        <div className="text-purple-700 italic text-sm">
          🤖 Story Fairy is writing...
        </div>
      )}
    </div>

    <div className="flex">
      <div className="flex justify-end mb-2">
  <button
    onClick={() => setIsUrdu(!isUrdu)}
    className="text-sm bg-yellow-300 px-3 py-1 rounded-full"
  >
    {isUrdu ? "Switch to English" : "اردو میں لکھیں"}
  </button>
</div>
      <input
    type="text"
    dir={isUrdu ? "rtl" : "ltr"}
  placeholder={isUrdu ? "✨ کہانی شروع کریں..." : "Start your story..."}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  className="flex-1 border-2 border-purple-400 rounded-l-2xl p-2 focus:outline-none"
/>
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 rounded-r-2xl transition-all"
      >
        🚀
      </button>
    </div>
  </div>
);
}