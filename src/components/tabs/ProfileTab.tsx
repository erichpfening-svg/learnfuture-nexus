import { motion } from 'framer-motion';
import { ProfileStats } from '@/components/ProfileStats';
import { LearningTypeSelector } from '@/components/LearningTypeSelector';
import { PrivacyToggle } from '@/components/PrivacyToggle';
import { useConfetti } from '@/hooks/useConfetti';

export const ProfileTab = () => {
  const { triggerConfetti } = useConfetti();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      {/* Profile Header */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-6"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={triggerConfetti}
          className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary 
            flex items-center justify-center text-4xl cursor-pointer neon-border mb-4"
        >
          🚀
        </motion.div>
        <h1 className="font-display text-2xl gradient-text">Future Architect</h1>
        <p className="text-muted-foreground">Level 5 • 2,450 XP</p>
      </motion.div>

      <ProfileStats />
      <LearningTypeSelector />
      <PrivacyToggle />
    </motion.div>
  );
};
