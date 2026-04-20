"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hey! I'm <strong>Athena</strong> — your Motion-U AI. 🚀<br>Ask me anything about the course or the stack!", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        const input = document.getElementById('chatInput') as HTMLInputElement;
        input?.focus();
      }, 300);
    }
  };

  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, isUser }]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    
    addMessage(text, true);
    setInput("");
    simulateTyping();
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "Great question! Vue 3's Composition API gives you better TypeScript inference and logic reuse. 🎯",
        "PocketBase handles auth, database, and file storage in one 15MB binary. Deploy anywhere! ⚡",
        "Our curriculum is project-based. You'll ship 8 production-ready apps by week 12. 🚀",
        "TypeScript is non-negotiable here. We teach advanced types from day one. 💪"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, false);
    }, 1500);
  };

  return (
    <>
      {/* FAB Button */}
      <button 
        className="chat-fab fixed bottom-6 right-6 z-100 w-14 h-14 rounded-full bg-[linear-gradient(135deg,var(--color-purple),var(--color-yellow))] flex items-center justify-center cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_40px_rgba(234,234,0,0.15)] animate-fab-float transition-transform duration-300 hover:scale-110 hover:translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_60px_rgba(221,183,255,0.5)] [animation-play-state:running] hover:[animation-play-state:paused]"
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <span className="material-symbols-outlined text-6.5 text-dark font-semibold">smart_toy</span>
      </button>
      
      {/* Chat Window */}
      <div 
        className={`chat-window fixed bottom-20 right-6 z-99 w-[min(370px,calc(100vw-2rem))] max-h-[520px] bg-[#1b1b20] border border-outline rounded-2xl flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_80px_rgba(75,0,130,0.2)] transform-origin-bottom-right transition-all duration-300 cubic-bezier(0.34,1.56,0.64,1) origin-bottom-right ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-95 translate-y-5'
        }`}
      >
        {/* Header */}
        <div className="chat-header py-3.5 px-4.5 bg-[linear-gradient(135deg,rgba(75,0,130,0.8),rgba(45,53,0,0.8))] border-b border-outline flex items-center gap-3">
          <div className="chat-avatar w-9.5 h-9.5 rounded-full bg-[linear-gradient(135deg,var(--color-purple),var(--color-yellow))] flex items-center justify-center flex-shrink-0 animate-avatar-pulse">
            <span className="material-symbols-outlined text-dark text-4.75 font-semibold">psychology</span>
          </div>
          <div>
            <p className="chat-name font-space-grotesk font-bold text-base text-white">Athena</p>
            <p className="chat-status text-sm text-lime flex items-center gap-1 mt-0.5">
              <span className="status-dot w-1.5 h-1.5 bg-lime rounded-full animate-blink" />
              Motion-U AI
            </p>
          </div>
          <button 
            className="chat-close ml-auto bg-none border-none text-muted cursor-pointer p-1 rounded-full transition-all duration-200 flex items-center hover:bg-white/10 hover:text-white"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Messages */}
        <div className="chat-messages flex-1 p-4 overflow-y-auto flex flex-col gap-2.5 bg-dark scrollbar-thin scrollbar-thumb-[#35343a] scrollbar-track-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`msg ${msg.isUser ? 'user' : 'bot'}`}>
              {!msg.isUser && (
                <div className="msg-avatar w-7 h-7 rounded-full bg-[linear-gradient(135deg,var(--color-purple),var(--color-yellow))] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-dark text-3.5">psychology</span>
                </div>
              )}
              <div 
                className={`bubble py-2.5 px-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isUser 
                    ? 'bg-[linear-gradient(135deg,var(--color-purple),#ba7ef4)] text-[#2c0050] font-medium border-br-3' 
                    : 'bg-dark3 text-text border-bl-3'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}
          
          {isTyping && (
            <div className="typing flex gap-1 py-2.5 px-3.5 bg-dark3 rounded-2xl border-bl-3 w-fit self-start">
              <span className="w-1.5 h-1.5 bg-lime rounded-full animate-typing-bounce" />
              <span className="w-1.5 h-1.5 bg-lime rounded-full animate-typing-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-lime rounded-full animate-typing-bounce [animation-delay:0.4s]" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="chat-input-area py-2.5 px-3.5 border-t border-outline bg-dark2 flex gap-2 items-center">
          <input 
            className="chat-input flex-1 bg-dark border border-outline rounded-full py-2 px-3.5 text-text font-manrope text-sm outline-none transition-border-color duration-200 focus:border-purple placeholder-[#5a5866]"
            id="chatInput"
            placeholder="Ask Athena anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            autoComplete="off"
          />
          <button 
            className="send-btn w-9 h-9 rounded-full bg-[linear-gradient(135deg,var(--color-purple),var(--color-yellow))] border-none flex items-center justify-center cursor-pointer transition-all duration-200 flex-shrink-0 hover:scale-110 hover:shadow-[0_0_16px_rgba(234,234,0,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            <span className="material-symbols-outlined text-dark text-4.25 font-semibold">send</span>
          </button>
        </div>
      </div>
    </>
  );
}