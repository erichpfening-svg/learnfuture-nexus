import { motion } from 'framer-motion';
import { useState } from 'react';
import { LearnCard } from '@/components/LearnCard';
import { Play, Video } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';
import { QuizModal } from '@/components/QuizModal';

const subjects = ['Alle', 'Mathe', 'Deutsch', 'Englisch', 'Physik'];
const classLevels = ['Klasse 8', 'Klasse 9', 'Klasse 10'];

const learnContent = [
  {
    id: '1',
    title: 'Quadratische Funktionen',
    altTitle: 'Mathe-Rap: Der Parabel-Flow 🎤',
    subject: 'Mathe',
    duration: '15 min',
    difficulty: 'medium' as const,
    xpReward: 50,
    classLevel: 'Klasse 9',
    hasQuiz: true,
  },
  {
    id: '2',
    title: 'Gedichtanalyse Basics',
    altTitle: 'Meme-Erklärung: Wenn Goethe TikTok hätte 📱',
    subject: 'Deutsch',
    duration: '20 min',
    difficulty: 'easy' as const,
    xpReward: 35,
    classLevel: 'Klasse 8',
  },
  {
    id: '3',
    title: 'Past Perfect Tense',
    altTitle: 'Gaming English: Past Perfect in RPGs 🎮',
    subject: 'Englisch',
    duration: '12 min',
    difficulty: 'medium' as const,
    xpReward: 40,
    classLevel: 'Klasse 9',
  },
  {
    id: '4',
    title: 'Thermodynamik Grundlagen',
    altTitle: 'Pizza-Physik: Warum wird meine Pizza kalt? 🍕',
    subject: 'Physik',
    duration: '25 min',
    difficulty: 'hard' as const,
    xpReward: 75,
    classLevel: 'Klasse 10',
  },
];

const tutorVideos = [
  { title: 'Kurvendiskussion einfach erklärt', teacher: 'Herr Müller', duration: '18 min' },
  { title: 'Erörterung schreiben - Schritt für Schritt', teacher: 'Frau Schmidt', duration: '22 min' },
];

const matheQuiz = {
  question: 'Was ist der Scheitelpunkt von f(x) = x²?',
  answers: [
    { label: 'A', text: '(0|0)', isCorrect: true },
    { label: 'B', text: '(1|1)', isCorrect: false },
    { label: 'C', text: '(2|4)', isCorrect: false },
  ],
  xpReward: 50,
};

export const LearnTab = () => {
  const [activeSubject, setActiveSubject] = useState('Alle');
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const { triggerSmallConfetti } = useConfetti();

  const filteredContent = learnContent.filter(c => {
    const matchesSubject = activeSubject === 'Alle' || c.subject === activeSubject;
    const matchesClass = !activeClass || c.classLevel === activeClass;
    return matchesSubject && matchesClass;
  });

  const handleStartClick = (contentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerSmallConfetti(e.clientX, e.clientY);
    
    // Open quiz for Mathe - Quadratische Funktionen
    if (contentId === '1') {
      setIsQuizOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      {/* Class Level Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-cyber mb-3">
        {classLevels.map((level) => (
          <motion.button
            key={level}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              setActiveClass(activeClass === level ? null : level);
              triggerSmallConfetti(e.clientX, e.clientY);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${activeClass === level 
                ? 'bg-gradient-to-r from-neon-pink to-neon-orange text-foreground neon-border' 
                : 'bg-muted/50 text-muted-foreground hover:bg-muted/80 border border-border/50'
              }`}
          >
            {level}
          </motion.button>
        ))}
      </div>

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
        {activeClass && (
          <span className="text-sm text-neon-pink ml-2">({activeClass})</span>
        )}
      </h2>

      <div className="space-y-4 mb-8">
        {filteredContent.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <LearnCard 
              {...content} 
              onStartClick={(e) => handleStartClick(content.id, e)}
            />
          </motion.div>
        ))}
        
        {filteredContent.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            <p>Keine Inhalte für diese Filter gefunden.</p>
          </motion.div>
        )}
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

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        question={matheQuiz.question}
        answers={matheQuiz.answers}
        xpReward={matheQuiz.xpReward}
      />
    </motion.div>
  );
};
