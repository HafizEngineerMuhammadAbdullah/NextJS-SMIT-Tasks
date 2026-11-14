"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiSend, FiX, FiZap } from "react-icons/fi";
import { answer } from "@/lib/dashboard/assistant";

const SUGGESTIONS = {
  admin: ["How many active employees are there?", "What is the monthly payroll cost?", "When is an employee marked late?"],
  hr: ["Who is on leave today?", "Who came late most often?", "What is the attendance rate?"],
  employee: ["How many sick leaves do I have left?", "What is my colleague's salary?", "When am I marked late?"],
};

function Dots() {
  return (
    <span className="inline-flex gap-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }} />
      ))}
    </span>
  );
}

export default function AssistantPanel({ open, onClose, role, data, profile }) {
  const [messages, setMessages] = useState([{ from: "ai", text: `Hi ${profile.firstName}, ask me about your dashboard data or company policy.` }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 250); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const ask = (q) => {
    const question = q.trim();
    if (!question || typing) return;
    setMessages((m) => [...m, { from: "me", text: question }]);
    setText("");
    setTyping(true);
    // Real build: POST /ai/chat with the user's JWT. The backend runs tools with the same scope as the REST API.
    setTimeout(() => {
      setMessages((m) => [...m, { from: "ai", text: answer(question, { role, data, profile }) }]);
      setTyping(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px]" aria-hidden />
          <motion.aside role="dialog" aria-label="AI assistant" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl sm:w-[400px]">
            <header className="flex items-center justify-between bg-[#1C2640] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--on-accent)]"><FiZap className="h-4 w-4" aria-hidden /></span>
                <div><p className="text-sm font-bold">Assistant</p><p className="text-[11px] text-slate-300">Answers from your own data</p></div>
              </div>
              <button type="button" onClick={onClose} aria-label="Close assistant" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"><FiX className="h-5 w-5" /></button>
            </header>

            <div className="flex-1 space-y-3 overflow-auto bg-slate-50 px-4 py-5" aria-live="polite">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === "me" ? "rounded-br-md bg-[color:var(--accent)] text-[color:var(--on-accent)]" : "rounded-bl-md bg-white text-slate-700 ring-1 ring-slate-200"}`}>
                    {m.text}
                    {m.from === "ai" && i > 0 && <span className="mt-1.5 block text-[10px] font-semibold text-violet-600">AI-generated</span>}
                  </div>
                </motion.div>
              ))}
              {typing && <div className="flex"><div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 ring-1 ring-slate-200"><Dots /></div></div>}
              <div ref={endRef} />
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS[role].map((s) => (
                  <button key={s} type="button" onClick={() => ask(s)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200">{s}</button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); ask(text); }} className="flex items-center gap-2">
                <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask a question" maxLength={300}
                  className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]" />
                <button type="submit" disabled={!text.trim() || typing} aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--on-accent)] disabled:opacity-50"><FiSend className="h-4 w-4" /></button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
