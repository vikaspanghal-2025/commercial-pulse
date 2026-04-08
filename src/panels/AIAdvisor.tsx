import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { data } from "../data";
import { aiResponses, defaultResponse, quickQuestions } from "../aiResponses";
import TopBar from "../components/TopBar";

interface Message {
  role: "user" | "ai";
  content: string;
}

import type { Panel } from "../components/Sidebar";

interface Props {
  initialQuestion: string | null;
  onQuestionConsumed: () => void;
  onNavigate: (panel: Panel) => void;
}

export default function AIAdvisor({ initialQuestion, onQuestionConsumed, onNavigate }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const processedRef = useRef<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialQuestion && initialQuestion !== processedRef.current) {
      processedRef.current = initialQuestion;
      handleSend(initialQuestion);
      onQuestionConsumed();
    }
  }, [initialQuestion]);

  const handleSend = (text?: string) => {
    const question = text || input.trim();
    if (!question) return;
    setInput("");

    const userMsg: Message = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[question] || defaultResponse;
      setMessages((prev) => [...prev, { role: "ai", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2.5rem)]">
      <TopBar title="AI Advisor" criticalCount={3} onNavigateOverview={() => onNavigate("overview")} />
      <div className="text-xs text-white/40 mb-3 -mt-4">
        {data.client} · {data.period} · Conversational commercial intelligence
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-full bg-bain-red-bg flex items-center justify-center mb-4">
              <span className="text-bain-red-light text-lg font-bold">AI</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Commercial Excellence Advisor</p>
            <p className="text-white/35 text-xs max-w-md">
              Ask me about pipeline health, pricing leakage, territory coverage, or marketing ROI.
              I'll give you root causes, specific recommendations, and quantified impact estimates.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-bain-red text-white"
                  : "bg-navy-surface/80 border border-white/10 text-white/85"
              }`}
            >
              <div className="whitespace-pre-line" dangerouslySetInnerHTML={{
                __html: msg.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
              }} />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-navy-surface/80 border border-white/10 rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-bain-red rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-bain-red rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-bain-red rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-xs bg-navy-surface/60 border border-white/10 text-white/60 px-3 py-1.5 rounded-lg hover:bg-navy-card/60 hover:text-white transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about commercial performance..."
            className="flex-1 bg-navy-surface/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 outline-none focus:border-bain-red/50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="bg-bain-red hover:bg-bain-red-light disabled:opacity-40 text-white rounded-xl px-4 py-3 transition-colors cursor-pointer"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
