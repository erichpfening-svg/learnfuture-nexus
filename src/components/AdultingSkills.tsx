import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Briefcase, Key, Shirt, X } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const skills = [
  {
    icon: Briefcase,
    title: '💰 Steuern in 3 min',
    category: 'Finanzen',
    gradient: 'from-neon-green to-secondary',
    tip: 'Tipp: Als Schüler bekommst du oft Lohnsteuer zurück! Heb alle Quittungen auf.',
    emoji: '💰',
  },
  {
    icon: Key,
    title: '🏠 Erste Wohnung checken',
    category: 'Wohnen',
    gradient: 'from-warning to-neon-orange',
    tip: 'Achtung: Warmmiete = Kaltmiete + Nebenkosten (Heizung, Müll).',
    emoji: '🏠',
  },
  {
    icon: Shirt,
    title: '👕 Wäsche waschen ohne Panik',
    category: 'Haushalt',
    gradient: 'from-neon-pink to-primary',
    tip: 'Tipp: Neue Jeans immer separat waschen, die färben ab!',
    emoji: '👕',
  },
];

export const AdultingSkills = () => {
  const { triggerSmallConfetti } = useConfetti();
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);

  const handleCardClick = (skill: typeof skills[0], e: React.MouseEvent) => {
    triggerSmallConfetti(e.clientX, e.clientY);
    setSelectedSkill(skill);
  };

  return (
    <div className="mt-6">
      <h2 className="font-display text-xl mb-4 flex items-center gap-2">
        <span className="text-2xl">🎓</span>
        Adulting 101 & Finance
      </h2>

      {/* Horizontal Scroll Container - TikTok Style */}
      <div className="overflow-x-auto scrollbar-cyber pb-4 -mx-4 px-4">
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleCardClick(skill, e)}
                className="cyber-card p-5 cursor-pointer group min-w-[200px] w-[200px] flex-shrink-0"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.gradient} 
                  flex items-center justify-center mb-4 group-hover:scale-110 transition-transform
                  shadow-lg`}>
                  <Icon className="w-7 h-7 text-background" />
                </div>
                <h3 className="font-semibold text-base leading-tight mb-2">{skill.title}</h3>
                <span className="text-xs text-muted-foreground">{skill.category}</span>
                
                <motion.div 
                  className="mt-3 text-xs text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                >
                  Tippe für Tipp →
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal for Tip */}
      <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
        <DialogContent className="cyber-card border-primary/30 max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <span className="text-3xl">{selectedSkill?.emoji}</span>
              {selectedSkill?.title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-foreground/80 text-base leading-relaxed pt-2">
            {selectedSkill?.tip}
          </DialogDescription>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
          >
            <p className="text-sm text-neon-green font-medium">
              ✨ +10 XP für's Lesen!
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
