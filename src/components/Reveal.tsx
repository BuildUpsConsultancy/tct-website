import type { ElementType } from 'react';
import { useInView } from '../hooks/useInView';

type Animation = 'fade-up' | 'fade-left' | 'fade-right' | 'scale';

const animationClass: Record<Animation, string> = {
  'fade-up':    'reveal',
  'fade-left':  'reveal-left',
  'fade-right': 'reveal-right',
  'scale':      'reveal-scale',
};

interface RevealProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;          // ms delay before the transition starts
  className?: string;
  as?: ElementType;
  threshold?: number;
}

/**
 * Wraps children in a scroll-triggered reveal animation.
 *
 * Usage:
 *   <Reveal animation="fade-up" delay={200}>
 *     <MyComponent />
 *   </Reveal>
 */
const Reveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold = 0.12,
}: RevealProps) => {
  const { ref, inView } = useInView(threshold);

  const classes = `${animationClass[animation]} ${inView ? 'in-view' : ''} ${className}`;
  const transitionDelay = delay ? `${delay}ms` : undefined;

  return (
    <Tag
      ref={ref as any}
      className={classes}
      style={{ transitionDelay }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
