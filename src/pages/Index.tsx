import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabNavigation } from '@/components/TabNavigation';
import { DashboardTab } from '@/components/tabs/DashboardTab';
import { LearnTab } from '@/components/tabs/LearnTab';
import { FutureTab } from '@/components/tabs/FutureTab';
import { ProfileTab } from '@/components/tabs/ProfileTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'learn':
        return <LearnTab />;
      case 'future':
        return <FutureTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary 
              flex items-center justify-center neon-border">
              <span className="text-xl">🦊</span>
            </div>
            <div>
              <h1 className="font-display text-lg gradient-text">LearnyFox</h1>
              <p className="text-xs text-muted-foreground">Deine Zukunft beginnt hier</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="streak-flame">🔥</span>
            <span className="text-sm font-semibold text-warning">7</span>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
