"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Main  from "@/components/Main";

export default function Home() {
  // Tracks whether the sidebar is open or closed, initially set to true (sidebar open)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  function handleInputChange(e) {
    setInput(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height =
      Math.min(e.target.scrollHeight, 180) + "px";
  }

  async function sendMessage(customMessage = null) {
    const text = customMessage || input.trim();

    if (!text || loading) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const assistantMessage = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please check your Gemini API key and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function newChat() {
    setMessages([]);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  }

  return (
    <div className="app">

     {/* Sidebar */}
      <Sidebar messages={messages} newChat={newChat} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Main messages={messages} messageEndRef={messagesEndRef} input={input} textareaRef={textareaRef} loading={loading} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
      handleKeyDown={handleKeyDown} sendMessage={sendMessage} handleInputChange={handleInputChange} />

    </div>
  );
}