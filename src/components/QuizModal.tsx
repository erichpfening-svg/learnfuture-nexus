import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answers: { label: string; text: string; isCorrect: boolean }[];
  xpReward: number;
}

export const QuizModal = ({ isOpen, onClose, question, answers, xpReward }: QuizModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { triggerConfetti, triggerSmallConfetti } = useConfetti();

  const handleAnswerClick = (answer: { label: string; isCorrect: boolean }, e: React.MouseEvent) => {
    if (showResult) return;
    
    setSelectedAnswer(answer.label);
    setShowResult(true);

    if (answer.isCorrect) {
      triggerConfetti();
      setTimeout(() => {
        onClose();
        setSelectedAnswer(null);
        setShowResult(false);
      }, 2000);
    } else {
      triggerSmallConfetti(e.clientX, e.clientY);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = answers.find(a => a.label === selectedAnswer)?.isCorrect;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="cyber-card border-primary/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-2xl"
            >
              🎯
            </motion.span>
            Quiz Mode
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-auto px-3 py-1 rounded-full bg-gradient-to-r from-warning/20 to-neon-orange/20 border border-warning/50"
            >
              <span className="text-sm text-warning font-semibold">+{xpReward} XP</span>
            </motion.div>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <p className="text-lg font-medium text-foreground mb-6">{question}</p>

          <div className="space-y-3">
            {answers.map((answer, idx) => {
              const isSelected = selectedAnswer === answer.label;
              const showCorrectness = showResult && isSelected;
              
              return (
                <motion.button
                  key={answer.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={(e) => handleAnswerClick(answer, e)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer
                    ${showCorrectness && answer.isCorrect 
                      ? 'bg-gradient-to-r from-neon-green/30 to-neon-green/10 border-2 border-neon-green' 
                      : showCorrectness && !answer.isCorrect
                        ? 'bg-gradient-to-r from-destructive/30 to-destructive/10 border-2 border-destructive'
                        : 'bg-muted/50 border border-border/50 hover:border-primary/50 hover:bg-muted/80'
                    }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${showCorrectness && answer.isCorrect 
                      ? 'bg-neon-green text-background' 
                      : showCorrectness && !answer.isCorrect
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    {answer.label}
                  </span>
                  <span className="flex-1 font-medium">{answer.text}</span>
                  
                  <AnimatePresence>
                    {showCorrectness && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                      >
                        {answer.isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-neon-green" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-6 p-4 rounded-xl text-center ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-neon-green/20 to-secondary/20 border border-neon-green/50' 
                    : 'bg-gradient-to-r from-destructive/20 to-warning/20 border border-destructive/50'
                }`}
              >
                {isCorrect ? (
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles className="w-6 h-6 text-warning animate-pulse" />
                    <span className="font-display text-xl text-neon-green">Richtig! +{xpReward} XP</span>
                    <Sparkles className="w-6 h-6 text-warning animate-pulse" />
                  </div>
                ) : (
                  <div>
                    <p className="font-display text-lg text-destructive mb-2">Leider falsch!</p>
                    <p className="text-sm text-muted-foreground">
                      Die richtige Antwort ist: <span className="text-neon-green font-semibold">
                        {answers.find(a => a.isCorrect)?.label}: {answers.find(a => a.isCorrect)?.text}
                      </span>
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
