import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  buttons?: { label: string; action: string }[];
}

const initialMessage: Message = {
  id: '1',
  role: 'ai',
  content: 'Hey! Ich bin dein Ich aus 2035. Frag mich mal, wofür wir Mathe brauchen! 🦊',
};

const quickReplies = [
  { label: 'Wofür Parabeln?', action: 'parabeln' },
  { label: 'Was machst du beruflich?', action: 'beruf' },
  { label: 'Brauche ich Englisch?', action: 'englisch' },
];

const responses: Record<string, { content: string; buttons?: { label: string; action: string }[] }> = {
  parabeln: {
    content: 'Parabeln sind wie die Flugkurve beim Elfmeter! ⚽ Als Event-Manager nutze ich das heute für Stadion-Planung.',
    buttons: [{ label: 'Zeig mir mehr Jobs!', action: 'more_jobs' }],
  },
  beruf: {
    content: 'Ich bin jetzt Tech-Entrepreneur! 🚀 Meine Firma entwickelt AR-Brillen für Schulen. Ohne Mathe & Englisch wäre das nie passiert!',
  },
  englisch: {
    content: 'Absolut! 🌍 Letzte Woche hab ich mit Teams aus Japan, USA und Brasilien gearbeitet. Englisch ist unsere gemeinsame Sprache!',
  },
  more_jobs: {
    content: 'Klar! Wo soll ich Parabeln noch zeigen?',
    buttons: [
      { label: 'Web-Designer 🎨', action: 'webdesigner' },
      { label: 'Architekt 🏠', action: 'architekt' },
      { label: 'Game-Dev 🎮', action: 'gamedev' },
    ],
  },
  webdesigner: {
    content: 'Als Web-Designer nutze ich Parabeln für smooth scrolling Animationen und CSS-Kurven. Das macht Websites so geschmeidig! ✨',
  },
  architekt: {
    content: 'Architekten brauchen Parabeln für Brückenbögen und Kuppeln! Die Form verteilt das Gewicht perfekt. 🏗️',
  },
  gamedev: {
    content: 'In der Spieleentwicklung brauchen wir Parabeln für jede Sprung-Animation. Ohne Mathe fällt Mario einfach runter! 📉',
  },
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-start gap-3 mb-4"
  >
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
      <span className="text-lg">🦊</span>
    </div>
    <div className="bg-muted/80 rounded-2xl rounded-tl-none px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-2 h-2 rounded-full bg-neon-cyan"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export const EchoAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [availableQuickReplies, setAvailableQuickReplies] = useState(quickReplies);
  const { triggerSmallConfetti } = useConfetti();

  const addMessage = (role: 'user' | 'ai', content: string, buttons?: { label: string; action: string }[]) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role, content, buttons },
    ]);
  };

  const handleAction = (action: string, label: string) => {
    // Add user message
    addMessage('user', label);
    setAvailableQuickReplies([]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      setIsTyping(false);
      const response = responses[action];
      if (response) {
        addMessage('ai', response.content, response.buttons);
      }
    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    addMessage('user', inputValue);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Interessante Frage! 🤔 Probier mal die Quick-Replies oben, da hab ich richtig coole Antworten für dich!');
      setAvailableQuickReplies(quickReplies);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card p-4 flex flex-col"
      style={{ minHeight: '400px' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary 
            flex items-center justify-center neon-border"
        >
          <span className="text-xl">🦊</span>
        </motion.div>
        <div className="flex-1">
          <h2 className="font-display text-lg">EchoAI</h2>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            Dein Zukunfts-Ich ist online
          </p>
        </div>
        <Sparkles className="w-5 h-5 text-warning animate-pulse" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-cyber space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {message.role === 'ai' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🦊</span>
                </div>
              )}
              
              <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-neon-green/90 text-background rounded-tr-none'
                      : 'bg-muted/80 text-foreground rounded-tl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                
                {/* Inline Buttons */}
                {message.buttons && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.buttons.map((button) => (
                      <motion.button
                        key={button.action}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          triggerSmallConfetti(e.clientX, e.clientY);
                          handleAction(button.action, button.label);
                        }}
                        className="px-3 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 
                          border border-primary/50 text-sm font-medium hover:from-primary/50 hover:to-secondary/50 
                          transition-all"
                      >
                        {button.label}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">👤</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>

      {/* Quick Replies */}
      {availableQuickReplies.length > 0 && !isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-3"
        >
          {availableQuickReplies.map((reply) => (
            <motion.button
              key={reply.action}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                triggerSmallConfetti(e.clientX, e.clientY);
                handleAction(reply.action, reply.label);
              }}
              className="px-3 py-2 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 
                border border-neon-cyan/50 text-sm font-medium hover:from-neon-cyan/40 hover:to-neon-pink/40 
                transition-all text-foreground"
            >
              {reply.label}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Schreib deinem Zukunfts-Ich..."
          className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary 
            flex items-center justify-center neon-border"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
