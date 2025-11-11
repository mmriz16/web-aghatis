'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Portfolio() {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([ headerRef.current, buttonRef.current ], {
        opacity: 0,
        y: 30,
      });

      gsap.set('.portfolio-item', {
        opacity: 0,
        y: 60,
        scale: 0.9,
      });

      // Create scroll-triggered animations
      gsap.timeline({
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      })
        .to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4')
        .to('.portfolio-item', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.2,
        }, '-=0.3');
    }, portfolioRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={portfolioRef} className="container py-12 md:py-16 lg:py-24 max-w-7xl mx-auto" data-background="light">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
        <div ref={headerRef} className="w-full lg:w-[580px]">
          <h1 className="text-[#00A06A] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-4 lg:mb-8 text-center lg:text-left">Our <span className="text-black">Portfolios</span></h1>
          <p className="text-base md:text-lg lg:text-xl text-center lg:text-left">A portfolio is a showcase of your work and achievements that demonstrate Our skills, expertise, and experience.</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <button ref={buttonRef} className="bg-[#00704A] rounded-[16px] text-sm md:text-base lg:text-lg font-semibold text-white px-4 md:px-5 h-[48px] md:h-[57px] flex items-center gap-2 hover:bg-[#00A06A] transition-colors duration-300">See More <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-8 md:mt-10">
        <Image className="portfolio-item object-cover rounded-2xl w-full" src="/app/img/portfolio/barterin.jpg" width={600} height={400} alt="Barterin Portfolio" />
        <div className="portfolio-item flex flex-col gap-4 md:gap-6 mt-0 lg:mt-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">Barterin Mobile App</h1>
          <p className="text-sm md:text-base text-center lg:text-left">Barterin redefines transactions through barter, eliminating the need for money. Discover a diverse marketplace, enjoy a seamless experience, and build trust with secure transactions.</p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
            <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">Mobile App</button>
            <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">Marketplace</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
