'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(contactRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        x: -30,
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        x: 30,
        scale: 0.9,
      });

      // Create scroll-triggered animations
      gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })
        .to(contactRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })
        .to(contentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4')
        .to(buttonRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.3');
    }, contactRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={contactRef} className="container py-8 md:py-12 lg:py-16 px-6 md:px-8 lg:px-10 my-12 md:my-16 lg:my-[100px] mx-auto max-w-7xl bg-[#00704A] text-white rounded-2xl md:rounded-3xl lg:rounded-4xl" data-background="dark">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
        <div ref={contentRef} className="w-full lg:w-[790px]">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-3 md:mb-4 lg:mb-2 text-center lg:text-left">Have a Wonderfull idea?</h1>
          <p className="text-base md:text-lg lg:text-xl text-white/75 font-medium leading-6 md:leading-7 text-center lg:text-left">Let&apos;s make your project a success together by harnessing our expertise and passion for delivering exceptional design solutions.</p>
        </div>
        <div ref={buttonRef} className="flex justify-center lg:justify-end">
          <a href="https://wa.me/628814547922?text=Hai%20Aghatis!%20Saya%20ingin%20konsultasi%20terkait%20pembuatan%20website%20atau%20aplikasi.%20Apakah%20bisa%20dibantu%3F" target="_blank"><button className="bg-white rounded-[16px] text-base md:text-lg font-semibold text-[#00704A] px-6 md:px-7 py-3 md:py-4 cursor-pointer hover:bg-white/80 transition-all duration-300">Let&apos;s Talk</button></a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
