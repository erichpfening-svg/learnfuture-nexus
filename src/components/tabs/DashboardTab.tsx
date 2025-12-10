import { motion } from 'framer-motion';
import { GamificationHeader } from '@/components/GamificationHeader';
import { SmartPlan } from '@/components/SmartPlan';
import { SalaryPreview } from '@/components/SalaryPreview';

export const DashboardTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <GamificationHeader
        level={5}
        levelTitle="Future Architect"
        xp={2450}
        maxXp={3000}
        streak={7}
        coins={1250}
      />
      <SmartPlan />
      <SalaryPreview />
    </motion.div>
  );
};
