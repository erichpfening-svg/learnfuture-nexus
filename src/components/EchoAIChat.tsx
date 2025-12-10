import { motion } from 'framer-motion';
import { Bot, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

const futureMessages = [
  "Hey, hier ist dein Ich aus 2030! 👋 Danke, dass du Englisch gelernt hast! Ich konnte gerade den Deal in London abschließen.",
  "Wusstest du, dass Mathe mir heute geholfen hat, mein Startup zu finanzieren? Danke, Past-Me! 🚀",
  "Die Life-Skills zahlen sich aus - ich hab gerade meine eigene Wohnung eingerichtet! 🏠",
];

export const EchoAIChat = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const { triggerSmallConfetti } = useConfetti();

  const handleNextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % futureMessages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary 
            flex items-center justify-center neon-border"
        >
          <Bot className="w-6 h-6" />
        </motion.div>
        <div>
          <h2 className="font-display text-lg">Echo AI</h2>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            Dein Zukunfts-Ich ist online
          </p>
        </div>
        <Sparkles className="w-5 h-5 text-warning ml-auto animate-pulse" />
      </div>

      {/* Chat Bubble */}
      <motion.div
        key={currentMessage}
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        onClick={(e) => {
          handleNextMessage();
          triggerSmallConfetti(e.clientX, e.clientY);
        }}
        className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl rounded-tl-none 
          p-4 mb-4 cursor-pointer hover:from-primary/30 hover:to-secondary/30 transition-all"
      >
        <p className="text-foreground">{futureMessages[currentMessage]}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Klicke für nächste Nachricht →
        </p>
      </motion.div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Frag dein Zukunfts-Ich..."
          className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary 
            flex items-center justify-center neon-border"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
