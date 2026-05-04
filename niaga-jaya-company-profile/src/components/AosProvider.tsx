'use client'; // Ini adalah Client Component

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AosProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return <>{children}</>;
};