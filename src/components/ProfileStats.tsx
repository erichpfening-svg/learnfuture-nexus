import { motion } from 'framer-motion';
import { Clock, CheckCircle, Trophy, Target } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';

const stats = [
  { icon: Clock, label: 'Lernzeit', value: '24h 30m', color: 'text-primary' },
  { icon: CheckCircle, label: 'Tests', value: '47', color: 'text-neon-green' },
  { icon: Trophy, label: 'Achievements', value: '12', color: 'text-warning' },
  { icon: Target, label: 'Ziele erreicht', value: '8/10', color: 'text-neon-cyan' },
];

export const ProfileStats = () => {
  const { triggerSmallConfetti } = useConfetti();

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => triggerSmallConfetti(e.clientX, e.clientY)}
            className="cyber-card p-4 cursor-pointer"
          >
            <Icon className={`w-6 h-6 ${stat.color} mb-2`} />
            <p className="font-display text-2xl">{stat.value}</p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
