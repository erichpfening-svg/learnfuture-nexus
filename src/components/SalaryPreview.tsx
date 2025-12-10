import { motion } from 'framer-motion';
import { TrendingUp, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

export const SalaryPreview = () => {
  const [salary, setSalary] = useState(2350);
  const [bonus, setBonus] = useState(15);
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    const interval = setInterval(() => {
      setBonus((prev) => {
        const newBonus = prev + Math.floor(Math.random() * 3);
        if (newBonus > prev + 2) {
          triggerConfetti();
        }
        return newBonus;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      onClick={triggerConfetti}
      className="cyber-card p-5 mt-6 cursor-pointer overflow-hidden relative group"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-transparent to-primary/10 opacity-50" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-neon-green" />
          <h2 className="font-display text-lg">Netto-Gehalts-Vorschau</h2>
          <Sparkles className="w-4 h-4 text-warning animate-pulse ml-auto" />
        </div>

        <div className="flex items-baseline gap-2">
          <motion.span
            key={salary}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-display text-4xl gradient-text"
          >
            {salary.toLocaleString('de-DE')} €
          </motion.span>
          <motion.span
            key={bonus}
            initial={{ scale: 1.5, color: '#22C55E' }}
            animate={{ scale: 1 }}
            className="text-neon-green font-semibold"
          >
            +{bonus} €
          </motion.span>
        </div>

        <p className="text-muted-foreground text-sm mt-2">
          durch heutiges Lernen verdient
        </p>

        {/* Animated Progress Line */}
        <motion.div
          className="h-1 rounded-full bg-gradient-to-r from-neon-green via-secondary to-primary mt-4"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>
    </motion.div>
  );
};
