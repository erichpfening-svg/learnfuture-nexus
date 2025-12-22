import { motion } from 'framer-motion';
import { useState } from 'react';
import { Clock, CheckCircle, Trophy, Target } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';

const initialStats = [
  { icon: Clock, label: 'Lernzeit', value: '24h 30m', altValue: '24h 45m', color: 'text-primary' },
  { icon: CheckCircle, label: 'Tests', value: '47', altValue: '48', color: 'text-neon-green' },
  { icon: Trophy, label: 'Achievements', value: '12', altValue: '13', color: 'text-warning' },
  { icon: Target, label: 'Ziele erreicht', value: '8/10', altValue: '9/10', color: 'text-neon-cyan' },
];

export const ProfileStats = () => {
  const { triggerSmallConfetti } = useConfetti();
  const [stats, setStats] = useState(initialStats);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const handleStatClick = (index: number, e: React.MouseEvent) => {
    triggerSmallConfetti(e.clientX, e.clientY);
    
    if (animatingIndex !== null) return;
    
    setAnimatingIndex(index);
    
    // Toggle value after animation
    setTimeout(() => {
      setStats(prev => prev.map((stat, i) => {
        if (i === index) {
          return {
            ...stat,
            value: stat.value === initialStats[i].value ? stat.altValue : initialStats[i].value,
          };
        }
        return stat;
      }));
      setAnimatingIndex(null);
    }, 300);
  };

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isAnimating = animatingIndex === index;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleStatClick(index, e)}
            className="cyber-card p-4 cursor-pointer group"
          >
            <Icon className={`w-6 h-6 ${stat.color} mb-2 group-hover:scale-110 transition-transform`} />
            <motion.p 
              className="font-display text-2xl"
              animate={isAnimating ? { 
                scale: [1, 1.3, 1],
                color: ['hsl(var(--foreground))', 'hsl(var(--neon-green))', 'hsl(var(--foreground))']
              } : {}}
              transition={{ duration: 0.3 }}
            >
              {stat.value}
            </motion.p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
            
            {isAnimating && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-2 right-2 text-xs text-neon-green font-bold"
              >
                +1 ✨
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
