import { motion } from 'framer-motion';
import { Eye, Ear, Hand } from 'lucide-react';
import { useState } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

const learningTypes = [
  {
    id: 'visual',
    icon: Eye,
    title: 'Visuell',
    description: 'Zeig mir Bilder',
    gradient: 'from-primary to-neon-cyan',
  },
  {
    id: 'auditory',
    icon: Ear,
    title: 'Auditiv',
    description: 'Erzähl es mir',
    gradient: 'from-neon-pink to-primary',
  },
  {
    id: 'kinesthetic',
    icon: Hand,
    title: 'Haptisch',
    description: 'Lass mich machen',
    gradient: 'from-neon-green to-secondary',
  },
];

export const LearningTypeSelector = () => {
  const [selected, setSelected] = useState('visual');
  const { triggerConfetti } = useConfetti();

  const handleSelect = (id: string) => {
    setSelected(id);
    triggerConfetti();
  };

  return (
    <div className="cyber-card p-5 mb-6">
      <h2 className="font-display text-lg mb-4">Mein Lerntyp</h2>

      <div className="space-y-3">
        {learningTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selected === type.id;

          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(type.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                ${isSelected 
                  ? `bg-gradient-to-r ${type.gradient} neon-border` 
                  : 'bg-muted/50 hover:bg-muted'
                }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center
                ${isSelected ? 'bg-background/20' : `bg-gradient-to-br ${type.gradient}`}`}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-foreground' : 'text-background'}`} />
              </div>
              <div className="text-left">
                <h3 className={`font-semibold ${isSelected ? 'text-foreground' : ''}`}>
                  {type.title}
                </h3>
                <p className={`text-sm ${isSelected ? 'text-foreground/80' : 'text-muted-foreground'}`}>
                  {type.description}
                </p>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-6 h-6 rounded-full bg-background/30 flex items-center justify-center"
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
