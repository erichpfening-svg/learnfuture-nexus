import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A855F7', '#06B6D4', '#EC4899', '#22C55E', '#F97316'],
    });
  };

  const triggerSmallConfetti = (x: number, y: number) => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ['#A855F7', '#06B6D4', '#EC4899'],
      scalar: 0.8,
    });
  };

  const triggerStreaks = () => {
    const duration = 500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#A855F7', '#06B6D4'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#EC4899', '#F97316'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return { triggerConfetti, triggerSmallConfetti, triggerStreaks };
};
