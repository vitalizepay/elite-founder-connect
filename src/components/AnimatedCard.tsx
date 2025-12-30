import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = 0,
  index = 0 
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ 
        duration: 0.5, 
        delay: delay + index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
