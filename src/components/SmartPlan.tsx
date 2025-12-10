import { motion } from 'framer-motion';
import { CheckCircle, Play, Coffee, BookOpen, Timer } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';

interface PlanItem {
  time: string;
  title: string;
  duration: string;
  type: 'study' | 'break' | 'lifeskill';
  verified?: boolean;
}

const planItems: PlanItem[] = [
  {
    time: '15:00',
    title: 'Mathe - Quadratische Funktionen',
    duration: '20 min',
    type: 'study',
    verified: true,
  },
  {
    time: '15:20',
    title: 'Bewegungspause',
    duration: '5 min',
    type: 'break',
  },
  {
    time: '15:25',
    title: 'Life-Skill: Wäsche waschen für Anfänger',
    duration: '10 min',
    type: 'lifeskill',
  },
];

const typeConfig = {
  study: {
    icon: BookOpen,
    gradient: 'from-primary to-neon-cyan',
    glow: 'neon-border',
  },
  break: {
    icon: Coffee,
    gradient: 'from-neon-green to-secondary',
    glow: 'neon-border-cyan',
  },
  lifeskill: {
    icon: Timer,
    gradient: 'from-neon-pink to-neon-orange',
    glow: 'neon-border',
  },
};

export const SmartPlan = () => {
  const { triggerSmallConfetti } = useConfetti();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="cyber-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        <h2 className="font-display text-lg">Dein Smart-Plan</h2>
        <span className="text-muted-foreground text-sm ml-auto">Heute</span>
      </div>

      <div className="space-y-3">
        {planItems.map((item, index) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => triggerSmallConfetti(e.clientX, e.clientY)}
              className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer
                bg-gradient-to-r ${config.gradient} bg-opacity-10 border border-border/30
                hover:border-primary/50 transition-all duration-300 group`}
            >
              {/* Time */}
              <div className="text-center min-w-[60px]">
                <span className="font-display text-lg text-primary">{item.time}</span>
              </div>

              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} 
                flex items-center justify-center transition-transform group-hover:scale-110`}>
                <Icon className="w-5 h-5 text-background" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.title}</h3>
                  {item.verified && (
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="flex items-center gap-1 text-neon-green text-xs"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Von Lehrern geprüft</span>
                    </motion.div>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{item.duration}</p>
              </div>

              {/* Play Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center
                  hover:bg-primary/40 transition-colors"
              >
                <Play className="w-5 h-5 text-primary fill-primary" />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
