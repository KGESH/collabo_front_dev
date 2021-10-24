import React, { useState, useRef, useEffect } from 'react';

export const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = (e: any) => {
    requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
      console.log(e.target.scrollTop);
    });
  };
  useEffect(() => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', onScroll);
      setScrollTop(scrollContainer.scrollTop);
    }

    return () => {
      scrollContainer?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { scrollTop, ref };
};
