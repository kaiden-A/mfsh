"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      // Using Markdown syntax instead of HTML tags
      text: "Hey! I'm **Athena** — your Motion-U AI. 🚀  \nAsk me anything about the course or the stack!", 
      isUser: false 
    }
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

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, text, isUser: true }]);
    setInput("");
    setIsTyping(true);
    
    // Simulate API Response with Markdown
    setTimeout(() => {
      const aiResponse = "Sorry, **Athena** is currently undergoing maintenance. \n\nIf you need immediate help, visit [our portal](https://athena.motionukict.com).";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: aiResponse, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* FAB Button */}
      <button 
        className="chat-fab fixed bottom-6 right-6 z-100 w-14 h-14 rounded-full bg-[linear-gradient(135deg,var(--color-purple),var(--color-yellow))] flex items-center justify-center cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.4)] animate-fab-float transition-transform hover:scale-110 active:scale-95"
        onClick={toggleChat}
      >
        <img src="/athena_logo_black.png" alt="Athena" className="w-33 h-33 object-contain" />
      </button>
      
      {/* Chat Window */}
      <div className={`chat-window fixed bottom-24 right-6 z-99 w-[min(370px,calc(100vw-2rem))] max-h-[520px] bg-[#1b1b20] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="chat-header p-4 bg-white/5 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-500 flex items-center justify-center animate-pulse">
            <img src="/athena_logo_black.png" alt="Avatar" className="w-20 h-20 object-contain" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Athena</p>
            <p className="text-xs text-lime-400 flex items-center gap-1">● Online</p>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-[#0f0f12]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              {!msg.isUser && (
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <img src="/athena.png" alt="AI" className="w-4 h-4 object-contain" />
                </div>
              )}
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isUser ? 'bg-purple-600 text-white' : 'bg-[#232329] text-gray-200'}`}>
                {/* SAFE MARKDOWN RENDERING */}
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isUser ? 'bg-purple-600 text-white' : 'bg-[#232329] text-gray-200'}`}>
                {/* Wrap Markdown in a div to apply the prose classes */}
                <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown 
                    components={{
                        // Use 'any' or more specific HTML types to satisfy TypeScript
                        a: ({ node, ...props }) => (
                        <a 
                            {...props} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="underline text-yellow-400 hover:text-yellow-300 transition-colors" 
                        />
                        ),
                        p: ({ node, children }) => (
                        <p className="m-0 mb-2 last:mb-0">{children}</p>
                        )
                    }}
                    >
                    {msg.text}
                    </ReactMarkdown>
                </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && <div className="text-xs text-gray-500 italic ml-9">Athena is thinking...</div>}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-3 border-t border-white/10 flex gap-2">
          <input 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            maxLength={1000}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-white text-base">send</span>
          </button>
        </div>
      </div>
    </>
  );
}