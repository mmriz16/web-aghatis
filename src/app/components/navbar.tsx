'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const [ isDarkBackground, setIsDarkBackground ] = useState(true);
  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef<number>(0);
  const scrollingDown = useRef<boolean>(true);

  useEffect(() => {
    // Define the sections to observe
    const sections = document.querySelectorAll('[data-background]');

    const handleScroll = () => {
      if (!navbarRef.current) return;

      // Determine scroll direction
      const currentScrollY = window.scrollY;
      scrollingDown.current = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Get the navbar's height
      const navbarHeight = navbarRef.current.offsetHeight;

      // Find which section the navbar is currently overlapping with
      let foundDarkBackground = false;
      let sectionFound = false;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const rect = section.getBoundingClientRect();

        // Different detection logic based on scroll direction
        if (scrollingDown.current) {
          // When scrolling DOWN: detect when navbar hits the START of a section
          if (rect.top <= navbarHeight && rect.top >= 0) {
            sectionFound = true;
            foundDarkBackground = section.dataset.background === 'dark';
            break;
          }
        } else {
          // When scrolling UP: detect when navbar hits the END of a section
          // We check if the next section's top is within the navbar
          if (i < sections.length - 1) {
            const nextSection = sections[i + 1] as HTMLElement;
            const nextRect = nextSection.getBoundingClientRect();

            if (nextRect.top <= navbarHeight && nextRect.top >= 0) {
              // We're at the boundary between this section and next
              sectionFound = true;
              foundDarkBackground = section.dataset.background === 'dark';
              break;
            }
          }

          // For the last section or if not at boundary
          if (!sectionFound && rect.top <= navbarHeight && rect.bottom > 0) {
            sectionFound = true;
            foundDarkBackground = section.dataset.background === 'dark';
          }
        }
      }

      // Only update if we found an overlapping section
      if (sectionFound) {
        setIsDarkBackground(foundDarkBackground);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 ${
        isDarkBackground ?
          'bg-white/0 text-white' :
          'bg-black/0 text-black'
      } backdrop-blur-lg border-b ${
        isDarkBackground ?
          'border-white/10' :
          'border-black/10'
      } z-50 transition-colors duration-300`}
    >
      <div className="container mx-auto max-w-7xl py-3">
        <div className="flex justify-between items-center">
          <Link href="/" aria-label="Go to Home" className="h-[54px] relative w-[178px] block">
            {isDarkBackground ? (
              <Image
                src="/app/img/logo-dark.png"
                alt="Aghatis Light Logo"
                width={178}
                height={54}
                className="object-contain"
                priority
              />
            ) : (
              <Image
                src="/app/img/logo-light.png"
                alt="Aghatis Dark Logo"
                width={178}
                height={54}
                className="object-contain"
                priority
              />
            )}
          </Link>
          <ul className="flex gap-6">
            <li className="hover:text-[#00A06A] cursor-pointer transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-[#00A06A] cursor-pointer transition-colors">
              <Link href="/pages/about">About</Link>
            </li>
            <li className="hover:text-[#00A06A] cursor-pointer transition-colors">
              <Link href="/pages/services">Services</Link>
            </li>
            <li className="hover:text-[#00A06A] cursor-pointer transition-colors">
              <Link href="/pages/portfolio">Portfolio</Link>
            </li>
          </ul>
          <ul className="flex gap-6">
            <li className="hover:text-[#00A06A] cursor-pointer transition-colors flex items-center">
              <a href="https://www.instagram.com/aghatis.id/" target="_blank" className="flex items-center">
                <Instagram size={20} className="mr-1" />
              </a>
            </li>
            <li className="hover:text-[#00A06A] cursor-pointer transition-colors flex items-center">
              <a href="https://www.linkedin.com/company/aghatis-solution17/" target="_blank" className="flex items-center">
                <Linkedin size={20} className="mr-1" />
              </a>
            </li>
            <a href="https://wa.me/628814547922?text=Hai%20Aghatis!%20Saya%20ingin%20konsultasi%20terkait%20pembuatan%20website%20atau%20aplikasi.%20Apakah%20bisa%20dibantu%3F" target="_blank"><button className="bg-[#00704A] hover:bg-[#00704A]/80 transition-colors duration-300 rounded-[16px] text-sm text-white px-5 py-3 cursor-pointer">Contact</button></a>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
