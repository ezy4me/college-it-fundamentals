import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnchorScroll = () => {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;

    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [hash]);
};
