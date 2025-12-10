import { motion } from 'framer-motion';
import { Flame, Coins, Zap } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';

interface GamificationHeaderProps {
  level: number;
  levelTitle: string;
  xp: number;
  maxXp: number;
  streak: number;
  coins: number;
}

export const GamificationHeader = ({
  level,
  levelTitle,
  xp,
  maxXp,
  streak,
  coins,
}: GamificationHeaderProps) => {
  const { triggerSmallConfetti } = useConfetti();
  const xpPercentage = (xp / maxXp) * 100;

  const handleClick = (e: React.MouseEvent) => {
    triggerSmallConfetti(e.clientX, e.clientY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card p-4 mb-6"
    >
      {/* Level Badge */}
      <div className="flex items-center justify-between mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-border">
              <span className="font-display text-xl font-bold">{level}</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neon-green flex items-center justify-center"
            >
              <Zap className="w-3 h-3 text-background" />
            </motion.div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Level {level}</p>
            <h3 className="font-display text-lg gradient-text">{levelTitle}</h3>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="flex items-center gap-2 cursor-pointer bg-muted/50 px-3 py-2 rounded-lg"
          >
            <span className="streak-flame">🔥</span>
            <span className="font-semibold text-warning">{streak}</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="flex items-center gap-2 cursor-pointer bg-muted/50 px-3 py-2 rounded-lg"
          >
            <span className="coin-icon">🪙</span>
            <span className="font-semibold text-warning">{coins.toLocaleString()}</span>
          </motion.div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Experience Points</span>
          <span className="text-primary font-semibold">
            {xp.toLocaleString()} / {maxXp.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-bar">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="xp-bar-fill"
          />
        </div>
      </div>
    </motion.div>
  );
};
