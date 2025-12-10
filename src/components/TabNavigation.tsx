import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Rocket, User } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Mein Weg', icon: LayoutDashboard },
  { id: 'learn', label: 'Lernen', icon: BookOpen },
  { id: 'future', label: 'Zukunft', icon: Rocket },
  { id: 'profile', label: 'Ich', icon: User },
];

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const { triggerSmallConfetti } = useConfetti();

  const handleTabClick = (tabId: string, e: React.MouseEvent) => {
    onTabChange(tabId);
    triggerSmallConfetti(e.clientX, e.clientY);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleTabClick(tab.id, e)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'neon-text' : ''}`} />
              </motion.div>
              <span className={`text-xs font-medium ${isActive ? 'gradient-text' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute -bottom-2 w-8 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ boxShadow: '0 0 10px hsl(var(--primary))' }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
