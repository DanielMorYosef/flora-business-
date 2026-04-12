import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export function Typewriter({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 2000,
  className = ""
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const timeout = setTimeout(() => {
        setPause(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    if (!isDeleting && subIndex === words[index].length) {
      setPause(true);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, pause, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span>{words[index].substring(0, subIndex)}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[0.8em] bg-current mx-0.5"
      />
    </span>
  );
}
