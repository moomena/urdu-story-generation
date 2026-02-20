"use client";

const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/generate`;

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
      body: JSON.stringify({ prefix: input, max_sentences: 5 }),
    });

    if (!res.ok) throw new Error("Backend error");

    const data = await res.json();
    typeWriterEffect(data.story);
  } catch (error) {
    console.error(error);
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1].text =
        "⚠️ Sorry, something went wrong while generating the story.";
      return updated;
    });
  } finally {
    setLoading(false);
  }
};