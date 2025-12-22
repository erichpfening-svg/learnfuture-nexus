import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Play, Clock, Star, Zap } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';

interface LearnCardProps {
  id: string;
  title: string;
  altTitle: string;
  subject: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  onStartClick?: (e: React.MouseEvent) => void;
}

const difficultyColors = {
  easy: 'from-neon-green to-secondary',
  medium: 'from-warning to-neon-orange',
  hard: 'from-neon-pink to-primary',
};

export const LearnCard = ({
  id,
  title,
  altTitle,
  subject,
  duration,
  difficulty,
  xpReward,
  onStartClick,
}: LearnCardProps) => {
  const [isRemixed, setIsRemixed] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const { triggerSmallConfetti, triggerStreaks } = useConfetti();

  const handleBoringClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGlitching(true);
    
    setTimeout(() => {
      setIsRemixed(!isRemixed);
      setIsGlitching(false);
      triggerStreaks();
    }, 300);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    triggerSmallConfetti(e.clientX, e.clientY);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={handleCardClick}
      className={`cyber-card p-5 cursor-pointer transition-all duration-300 ${
        isGlitching ? 'glitch-effect' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${difficultyColors[difficulty]} 
          text-xs font-semibold text-background`}>
          {subject}
        </div>
        <div className="flex items-center gap-1 text-warning">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-semibold">+{xpReward} XP</span>
        </div>
      </div>

      {/* Title */}
      <AnimatePresence mode="wait">
        <motion.h3
          key={isRemixed ? 'remixed' : 'original'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`font-display text-xl mb-2 ${isRemixed ? 'gradient-text' : ''}`}
        >
          {isRemixed ? altTitle : title}
        </motion.h3>
      </AnimatePresence>

      {/* Duration */}
      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          {[...Array(difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-warning text-warning" />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartClick}
          className="flex-1 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary 
            font-semibold flex items-center justify-center gap-2 neon-border cursor-pointer"
        >
          <Play className="w-5 h-5 fill-foreground" />
          Starten
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBoringClick}
          className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300
            ${isRemixed 
              ? 'bg-gradient-to-r from-neon-pink to-neon-orange text-foreground' 
              : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
        >
          {isRemixed ? '🎵 REMIXED!' : 'LANGWEILIG? 🥱'}
        </motion.button>
      </div>

      {isRemixed && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-sm text-neon-green mt-3 text-center"
        >
          ✨ Content wurde zu deinem Stil angepasst!
        </motion.p>
      )}
    </motion.div>
  );
};
