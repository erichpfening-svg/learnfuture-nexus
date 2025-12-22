import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Play, Pause } from 'lucide-react';
import { useState } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  buttons?: { label: string; action: string }[];
  image?: string;
  voiceMemo?: { duration: string };
}

const initialMessage: Message = {
  id: '1',
  role: 'ai',
  content: 'Hey! Ich bin dein Ich aus 2035. Frag mich mal, wofür wir Mathe brauchen! 🦊',
};

const INITIAL_QUICK_REPLIES = [
  'Wofür Parabeln?',
  'Was machst du beruflich?',
  'Brauche ich Englisch?',
];

const PLACEHOLDER_BUILDING =
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop';

const PLACEHOLDER_GAMEDEV =
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop';

const getAiScenario = (userText: string): { ai: Omit<Message, 'id'>; nextChips: string[] } => {
  switch (userText) {
    case 'Wofür Parabeln?':
      return {
        ai: {
          role: 'ai',
          content:
            'Parabeln sind wie die Flugkurve beim Elfmeter! ⚽ Als Event-Manager nutze ich das heute für Stadion-Planung.',
        },
        nextChips: ['Zeig mir Jobs', 'Echt jetzt?'],
      };

    case 'Zeig mir Jobs':
    case 'Mehr Jobs anzeigen':
    case 'Mehr Jobs':
      return {
        ai: {
          role: 'ai',
          content: 'Klar! Wo soll ich Parabeln noch zeigen?',
        },
        nextChips: ['Game-Dev 🎮', 'Architekt 🏠'],
      };

    case 'Game-Dev 🎮':
      return {
        ai: {
          role: 'ai',
          content:
            'In Games brauchen wir Parabeln für Sprung-Animationen. Ohne Mathe fällt Mario runter! 📉',
          image: PLACEHOLDER_GAMEDEV,
        },
        nextChips: INITIAL_QUICK_REPLIES,
      };

    case 'Architekt 🏠':
      return {
        ai: {
          role: 'ai',
          content:
            'Schau mal, an dem Wolkenkratzer arbeite ich gerade. Ohne Geometrie wäre das eingestürzt!',
          image: PLACEHOLDER_BUILDING,
        },
        nextChips: INITIAL_QUICK_REPLIES,
      };

    case 'Echt jetzt?':
      return {
        ai: {
          role: 'ai',
          content:
            'Echt. Mathe versteckt sich überall – willst du ein paar Jobs sehen, wo du’s später wirklich nutzt?',
        },
        nextChips: ['Zeig mir Jobs'],
      };

    case 'Was machst du beruflich?':
      return {
        ai: {
          role: 'ai',
          content:
            'Ich organisiere große Events (Konzerte, Sport, Messen) – und ja: Mathe hilft bei Planung, Wegen und Sicherheit. 🎟️ Willst du sehen, was meine Kollegen so machen?',
        },
        nextChips: ['Architekt 🏠', 'Game-Dev 🎮', 'Influencer 📱'],
      };

    case 'Influencer 📱':
      return {
        ai: {
          role: 'ai',
          content:
            'Als Influencer brauche ich Statistik für Analytics! Engagement-Raten, Follower-Wachstum... alles Mathe. 📊 Plus: Steuern muss ich auch können!',
        },
        nextChips: INITIAL_QUICK_REPLIES,
      };

    case 'Brauche ich Englisch?':
      return {
        ai: {
          role: 'ai',
          content:
            'Ja! Englisch ist dein Cheatcode für Jobs, Reisen und Internet-Wissen – und in 2035 erst recht. 🌍',
        },
        nextChips: INITIAL_QUICK_REPLIES,
      };

    default:
      return {
        ai: {
          role: 'ai',
          content:
            'Nice Frage! Tippe am besten auf einen Chip – dann kann ich dir aus 2035 ein konkretes Beispiel zeigen. 🦊',
        },
        nextChips: INITIAL_QUICK_REPLIES,
      };
  }
};

// Glitch text animation for "Connecting to 2035"
const ConnectingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-start gap-3 mb-4"
  >
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
      <span className="text-lg">🦊</span>
    </div>
    <motion.div 
      className="bg-muted/80 rounded-2xl rounded-tl-none px-4 py-3 overflow-hidden"
      animate={{ 
        boxShadow: [
          '0 0 0px hsl(var(--neon-cyan))',
          '0 0 15px hsl(var(--neon-cyan))',
          '0 0 0px hsl(var(--neon-cyan))',
        ]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <motion.div
        animate={{ x: [-2, 2, -1, 1, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 0.5 }}
        className="flex items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-neon-cyan font-mono text-sm"
        >
          📶
        </motion.span>
        <motion.span
          className="text-neon-cyan font-mono text-sm font-bold glitch-text"
          animate={{ 
            textShadow: [
              '0 0 5px hsl(var(--neon-cyan))',
              '2px 0 5px hsl(var(--neon-pink)), -2px 0 5px hsl(var(--neon-green))',
              '0 0 5px hsl(var(--neon-cyan))',
            ]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          Connecting to 2035...
        </motion.span>
      </motion.div>
    </motion.div>
  </motion.div>
);

// Voice Memo UI Component
const VoiceMemoPlayer = ({ duration }: { duration: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Fake playback animation
      let prog = 0;
      const interval = setInterval(() => {
        prog += 7;
        setProgress(prog);
        if (prog >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          setProgress(0);
        }
      }, 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 rounded-xl p-3 mt-2 border border-neon-green/30"
    >
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlay}
          className="w-10 h-10 rounded-full bg-neon-green flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-background" />
          ) : (
            <Play className="w-5 h-5 text-background ml-0.5" />
          )}
        </motion.button>
        
        {/* Waveform visualization */}
        <div className="flex-1 flex items-center gap-[2px] h-8">
          {[...Array(25)].map((_, i) => {
            const height = Math.sin(i * 0.5) * 12 + 16;
            const isActive = (i / 25) * 100 <= progress;
            return (
              <motion.div
                key={i}
                className={`w-1 rounded-full transition-colors duration-150 ${
                  isActive ? 'bg-neon-green' : 'bg-muted-foreground/30'
                }`}
                style={{ height: `${height}px` }}
                animate={isPlaying && isActive ? { scaleY: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0, delay: i * 0.02 }}
              />
            );
          })}
        </div>
        
        <span className="text-xs text-muted-foreground font-mono">{duration}</span>
      </div>
      <p className="text-xs text-neon-green mt-2 font-medium">🎙️ Voice Memo vom Future-Me</p>
    </motion.div>
  );
};

// Image Bubble Component
const ImageBubble = ({ src }: { src: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3 }}
    className="mt-3 rounded-xl overflow-hidden border-2 border-neon-cyan/30 shadow-lg"
    style={{ boxShadow: '0 0 20px hsla(var(--neon-cyan), 0.3)' }}
  >
    <img 
      src={src} 
      alt="Future project" 
      className="w-full h-40 object-cover"
    />
    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-3 py-2">
      <p className="text-xs text-neon-cyan">📸 Live aus 2035</p>
    </div>
  </motion.div>
);

export const EchoAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [availableQuickReplies, setAvailableQuickReplies] = useState<string[]>(INITIAL_QUICK_REPLIES);
  const { triggerSmallConfetti } = useConfetti();

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleQuickReply = (text: string) => {
    addMessage({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role: 'user',
      content: text,
    });

    setAvailableQuickReplies([]);
    setIsTyping(true);

    setTimeout(() => {
      const { ai, nextChips } = getAiScenario(text);

      setIsTyping(false);
      addMessage({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ...ai,
      });
      setAvailableQuickReplies(nextChips);
    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    addMessage({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role: 'user',
      content: text,
    });
    setInputValue('');

    setIsTyping(true);
    setAvailableQuickReplies([]);

    setTimeout(() => {
      const { ai, nextChips } = getAiScenario(text);

      setIsTyping(false);
      addMessage({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ...ai,
      });
      setAvailableQuickReplies(nextChips);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card p-4 flex flex-col h-[500px] max-h-[500px]"
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
          <h2 className="font-display text-lg flex items-center gap-2">
            EchoAI
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm"
            >
              ✨
            </motion.span>
          </h2>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <motion.span 
              className="w-2 h-2 rounded-full bg-neon-green"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {isTyping ? 'Zeitreise aktiv...' : 'Dein Zukunfts-Ich ist online'}
          </p>
        </div>
        <Sparkles className="w-5 h-5 text-warning animate-pulse" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-cyber space-y-4 mb-4 pr-1">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {message.role === 'ai' && (
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-lg">🦊</span>
                </motion.div>
              )}
              
              <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-neon-green to-neon-green/80 text-background rounded-tr-sm shadow-lg'
                      : 'bg-gradient-to-r from-muted/90 to-muted/70 text-foreground rounded-tl-sm border border-border/50'
                  }`}
                  style={message.role === 'user' ? { boxShadow: '0 4px 15px hsla(var(--neon-green), 0.3)' } : {}}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </motion.div>
                
                {/* Image Bubble */}
                {message.image && <ImageBubble src={message.image} />}
                
                {/* Voice Memo */}
                {message.voiceMemo && <VoiceMemoPlayer duration={message.voiceMemo.duration} />}
                
                {/* Inline Buttons */}
                {message.buttons && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mt-3"
                  >
                    {message.buttons.map((button, idx) => (
                      <motion.button
                        key={button.label}
                        type="button"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          triggerSmallConfetti(e.clientX, e.clientY);
                          handleQuickReply(button.label);
                        }}
                        className="cursor-pointer pointer-events-auto px-4 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 
                          border border-primary/50 text-sm font-medium hover:from-primary/50 hover:to-secondary/50 
                          transition-all hover:border-primary shadow-sm"
                      >
                        {button.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
              
              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green/30 to-neon-cyan/30 flex items-center justify-center flex-shrink-0 border border-neon-green/30">
                  <span className="text-lg">👤</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Connecting Indicator */}
        <AnimatePresence>
          {isTyping && <ConnectingIndicator />}
        </AnimatePresence>
      </div>

      {/* Quick Replies */}
      <AnimatePresence>
        {availableQuickReplies.length > 0 && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="flex flex-wrap gap-2 mb-3"
          >
            {availableQuickReplies.map((reply, idx) => (
              <motion.button
                key={reply}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  triggerSmallConfetti(e.clientX, e.clientY);
                  handleQuickReply(reply);
                }}
                className="cursor-pointer pointer-events-auto px-4 py-2 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 
                  border border-neon-cyan/50 text-sm font-medium hover:from-neon-cyan/40 hover:to-neon-pink/40 
                  transition-all text-foreground hover:border-neon-cyan shadow-sm"
              >
                {reply}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Schreib deinem Zukunfts-Ich..."
          className="flex-1 bg-muted/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm border border-border/50"
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
