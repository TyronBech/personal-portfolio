import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock Sanity client globally
vi.mock('@/data/sanity', () => {
  return {
    client: {
      fetch: vi.fn(),
    },
    urlFor: vi.fn(() => ({
      url: () => 'https://mock-image-url.com/image.jpg',
    })),
  };
});

// Mock react-multi-carousel
vi.mock('react-multi-carousel', () => {
  return {
    default: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', { 'data-testid': 'mock-carousel' }, children),
  };
});

// Mock framer-motion to avoid animation timing/runtime issues in JSDOM
vi.mock('framer-motion', () => {
  interface MockProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  const motionComponent = (Tag: string) => {
    return React.forwardRef<HTMLElement, MockProps>(
      ({ children, className, style, ...props }: MockProps, ref) => {
        // Filter out framer motion specific props that shouldn't go to raw DOM
        const {
          initial: _initial,
          animate: _animate,
          exit: _exit,
          transition: _transition,
          variants: _variants,
          whileInView: _whileInView,
          viewport: _viewport,
          whileHover: _whileHover,
          whileTap: _whileTap,
          onAnimationComplete: _onAnimationComplete,
          ...domProps
        } = props;
        
        return React.createElement(
          Tag,
          { ...domProps, className, style, ref },
          children
        );
      }
    );
  };

  return {
    motion: {
      div: motionComponent('div'),
      h1: motionComponent('h1'),
      p: motionComponent('p'),
      span: motionComponent('span'),
      section: motionComponent('section'),
      img: motionComponent('img'),
      ul: motionComponent('ul'),
      li: motionComponent('li'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
    useTransform: () => ({}),
    useSpring: () => ({}),
  };
});

// Mock three / @react-three/fiber if they get loaded in tests
vi.mock('three', () => ({}));
vi.mock('@react-three/fiber', () => ({}));
