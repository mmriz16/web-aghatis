'use client';

import React, { useEffect } from 'react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    let lenisInstance: any;

    // Import Lenis dynamically to avoid SSR import-time side effects
    import('lenis')
      .then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        });

        lenisInstance = lenis;

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      })
      .catch(() => {
        // Ignore errors during dynamic import in non-browser contexts
      });

    return () => {
      if (lenisInstance && typeof lenisInstance.destroy === 'function') {
        lenisInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
