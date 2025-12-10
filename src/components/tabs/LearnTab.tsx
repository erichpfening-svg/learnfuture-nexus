import { motion } from 'framer-motion';
import { useState } from 'react';
import { LearnCard } from '@/components/LearnCard';
import { Play, Video } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';

const subjects = ['Alle', 'Mathe', 'Deutsch', 'Englisch', 'Physik'];

const learnContent = [
  {
    id: '1',
    title: 'Quadratische Funktionen',
    altTitle: 'Mathe-Rap: Der Parabel-Flow 🎤',
    subject: 'Mathe',
    duration: '15 min',
    difficulty: 'medium' as const,
    xpReward: 50,
  },
  {
    id: '2',
    title: 'Gedichtanalyse Basics',
    altTitle: 'Meme-Erklärung: Wenn Goethe TikTok hätte 📱',
    subject: 'Deutsch',
    duration: '20 min',
    difficulty: 'easy' as const,
    xpReward: 35,
  },
  {
    id: '3',
    title: 'Past Perfect Tense',
    altTitle: 'Gaming English: Past Perfect in RPGs 🎮',
    subject: 'Englisch',
    duration: '12 min',
    difficulty: 'medium' as const,
    xpReward: 40,
  },
  {
    id: '4',
    title: 'Thermodynamik Grundlagen',
    altTitle: 'Pizza-Physik: Warum wird meine Pizza kalt? 🍕',
    subject: 'Physik',
    duration: '25 min',
    difficulty: 'hard' as const,
    xpReward: 75,
  },
];

const tutorVideos = [
  { title: 'Kurvendiskussion einfach erklärt', teacher: 'Herr Müller', duration: '18 min' },
  { title: 'Erörterung schreiben - Schritt für Schritt', teacher: 'Frau Schmidt', duration: '22 min' },
];

export const LearnTab = () => {
  const [activeSubject, setActiveSubject] = useState('Alle');
  const { triggerSmallConfetti } = useConfetti();

  const filteredContent = activeSubject === 'Alle' 
    ? learnContent 
    : learnContent.filter(c => c.subject === activeSubject);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      {/* Subject Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-cyber mb-6">
        {subjects.map((subject) => (
          <motion.button
            key={subject}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              setActiveSubject(subject);
              triggerSmallConfetti(e.clientX, e.clientY);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${activeSubject === subject 
                ? 'bg-gradient-to-r from-primary to-secondary text-foreground neon-border' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
          >
            {subject}
          </motion.button>
        ))}
      </div>

      {/* Adaptive Playlist */}
      <h2 className="font-display text-xl mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        Adaptive Playlist
      </h2>

      <div className="space-y-4 mb-8">
        {filteredContent.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <LearnCard {...content} />
          </motion.div>
        ))}
      </div>

      {/* Tutoring Videos */}
      <h2 className="font-display text-xl mb-4 flex items-center gap-2">
        <Video className="w-6 h-6 text-secondary" />
        Tutoring Videos
      </h2>

      <div className="space-y-3">
        {tutorVideos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={(e) => triggerSmallConfetti(e.clientX, e.clientY)}
            className="cyber-card p-4 flex items-center gap-4 cursor-pointer group"
          >
            <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-secondary to-neon-green 
              flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-background fill-background" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{video.title}</h3>
              <p className="text-sm text-muted-foreground">
                {video.teacher} • {video.duration}
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-neon-green/20 text-neon-green text-xs font-semibold">
              Von Lehrern erklärt
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
