'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(logoRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set('.footer-column', {
        opacity: 0,
        y: 40,
      });

      gsap.set(copyrightRef.current, {
        opacity: 0,
        y: 20,
      });

      // Create scroll-triggered animations
      gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      })
        .to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .to('.footer-column', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.4')
        .to(copyrightRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.2');
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={footerRef} className="container mx-auto max-w-7xl pt-12 md:pt-14 lg:pt-16 pb-8 md:pb-10 lg:pb-11">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-4 mb-8 md:mb-10 lg:mb-11">
        <div ref={logoRef} className="lg:col-span-6 flex flex-col gap-3 md:gap-4 text-center md:text-left">
          <Image src="/app/img/logo-dark.png" alt="logo" width={256} height={73} className="mx-auto md:mx-0" />
          <p className="text-white/50 text-sm md:text-base">Elevate Your Digital Experience with Us</p>
        </div>
        <div className="footer-column lg:col-span-2">
          <ul className="flex flex-col gap-3 md:gap-4 text-center md:text-left">
            <h1 className="font-bold text-lg md:text-xl lg:text-[20px] mb-4 md:mb-6 lg:mb-8">About</h1>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Company</li>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Our Services</li>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Features</li>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Testimonials</li>
          </ul>
        </div>
        <div className="footer-column lg:col-span-2">
          <ul className="flex flex-col gap-3 md:gap-4 text-center md:text-left">
            <h1 className="font-bold text-lg md:text-xl lg:text-[20px] mb-4 md:mb-6 lg:mb-8">Help</h1>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Contact Us</li>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">FAQ</li>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Terms of Service</li>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Customer Support</li>
          </ul>
        </div>
        <div className="footer-column lg:col-span-2">
          <ul className="flex flex-col gap-3 md:gap-4 text-center md:text-left">
            <h1 className="font-bold text-lg md:text-xl lg:text-[20px] mb-4 md:mb-6 lg:mb-8">Legal</h1>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Privacy Policy</li>
            <li className="text-white/50 text-sm md:text-base hover:text-white transition-all duration-300 cursor-pointer">Copyright</li>
          </ul>
        </div>
      </div>
      <p ref={copyrightRef} className="text-white/50 text-center text-sm md:text-base">©2025 PT Aghatis Karya Indonesia. All rights reserved.</p>
    </div>
  );
}

export default Footer;
