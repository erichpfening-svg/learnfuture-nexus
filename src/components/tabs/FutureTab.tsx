import { motion } from 'framer-motion';
import { EchoAIChat } from '@/components/EchoAIChat';
import { AdultingSkills } from '@/components/AdultingSkills';

export const FutureTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <EchoAIChat />
      <AdultingSkills />
    </motion.div>
  );
};
