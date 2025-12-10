import { motion } from 'framer-motion';
import { Receipt, Shirt, Home, CreditCard, Car, Utensils } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';

const skills = [
  {
    icon: Receipt,
    title: 'Steuern erklärt in 3 min',
    category: 'Finanzen',
    gradient: 'from-neon-green to-secondary',
  },
  {
    icon: Shirt,
    title: 'Wäsche sortieren (ohne Verfärben)',
    category: 'Haushalt',
    gradient: 'from-neon-pink to-primary',
  },
  {
    icon: Home,
    title: 'Erste Wohnung budgetieren',
    category: 'Wohnen',
    gradient: 'from-warning to-neon-orange',
  },
  {
    icon: CreditCard,
    title: 'Konto eröffnen - so geht\'s',
    category: 'Finanzen',
    gradient: 'from-primary to-neon-cyan',
  },
  {
    icon: Car,
    title: 'Führerschein-Kosten planen',
    category: 'Mobilität',
    gradient: 'from-secondary to-neon-green',
  },
  {
    icon: Utensils,
    title: 'Meal Prep für Anfänger',
    category: 'Ernährung',
    gradient: 'from-neon-orange to-neon-pink',
  },
];

export const AdultingSkills = () => {
  const { triggerSmallConfetti } = useConfetti();

  return (
    <div className="mt-6">
      <h2 className="font-display text-xl mb-4 flex items-center gap-2">
        <span className="text-2xl">🎓</span>
        Adulting 101
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => triggerSmallConfetti(e.clientX, e.clientY)}
              className="cyber-card p-4 cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.gradient} 
                flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-background" />
              </div>
              <h3 className="font-medium text-sm leading-tight mb-1">{skill.title}</h3>
              <span className="text-xs text-muted-foreground">{skill.category}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
