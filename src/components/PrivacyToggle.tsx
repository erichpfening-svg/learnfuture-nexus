import { motion } from 'framer-motion';
import { Lock, Users, Shield } from 'lucide-react';
import { useState } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

export const PrivacyToggle = () => {
  const [isPrivate, setIsPrivate] = useState(true);
  const { triggerSmallConfetti } = useConfetti();

  const handleToggle = (e: React.MouseEvent) => {
    setIsPrivate(!isPrivate);
    triggerSmallConfetti(e.clientX, e.clientY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h2 className="font-display text-lg">Privatsphäre</h2>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-muted/50 
          hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-3">
          {isPrivate ? (
            <Lock className="w-5 h-5 text-neon-green" />
          ) : (
            <Users className="w-5 h-5 text-primary" />
          )}
          <div className="text-left">
            <p className="font-medium">Statistik mit Freunden teilen</p>
            <p className="text-sm text-muted-foreground">
              {isPrivate ? 'Privat - nur du siehst deine Stats' : 'Öffentlich - Freunde können sehen'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <div
          className={`w-14 h-8 rounded-full p-1 transition-colors duration-300
            ${isPrivate ? 'bg-muted' : 'bg-gradient-to-r from-primary to-secondary'}`}
        >
          <motion.div
            animate={{ x: isPrivate ? 0 : 24 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-6 h-6 rounded-full ${isPrivate ? 'bg-muted-foreground' : 'bg-foreground'}`}
          />
        </div>
      </motion.button>

      {isPrivate && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-xs text-neon-green mt-3 flex items-center gap-1"
        >
          <Lock className="w-3 h-3" />
          Deine Daten sind sicher und privat
        </motion.p>
      )}
    </motion.div>
  );
};
