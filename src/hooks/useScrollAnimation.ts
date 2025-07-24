'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              setHasTriggered(true);
            }
          } else if (!triggerOnce && !hasTriggered) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { elementRef, isVisible };
}

// Hook for animating multiple elements with stagger effect
export function useStaggeredScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const elementRefs = useRef<(HTMLElement | null)[]>([]);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elementRefs.current.findIndex(ref => ref === entry.target);
          if (entry.isIntersecting && index !== -1) {
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elementRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elementRefs.current.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [threshold, rootMargin]);

  const setElementRef = (index: number) => (el: HTMLElement | null) => {
    elementRefs.current[index] = el;
  };

  const isVisible = (index: number) => visibleItems.has(index);

  return { setElementRef, isVisible };
}