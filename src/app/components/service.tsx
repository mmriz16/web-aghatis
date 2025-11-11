'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Service() {
  const serviceRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins only in the browser
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([ headerRef.current, buttonRef.current ], {
        opacity: 0,
        y: 30,
      });

      gsap.set('.service-card', {
        opacity: 0,
        y: 60,
        scale: 0.9,
      });

      // Create scroll-triggered animations
      gsap.timeline({
        scrollTrigger: {
          trigger: serviceRef.current,
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
        .to('.service-card', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.2,
        }, '-=0.3');
    }, serviceRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={serviceRef} className="container py-12 md:py-16 lg:py-24" data-background="light">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
        <div ref={headerRef} className="w-full lg:w-[580px]">
          <h1 className="text-[#00A06A] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-4 lg:mb-8 text-center lg:text-left">Our <span className="text-black">Services</span></h1>
          <p className="text-base md:text-lg lg:text-xl text-center lg:text-left">We showcase the comprehensive range of solutions that we offer to help you achieve your goals.</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <button ref={buttonRef} className="bg-[#00704A] rounded-[16px] text-sm md:text-base lg:text-lg font-semibold text-white px-4 md:px-5 h-[48px] md:h-[57px] flex items-center gap-2 hover:bg-[#00A06A] transition-colors duration-300">See Other Service <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></button>
        </div>
      </div>
      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 pt-8 md:pt-10 lg:pt-11">
        <div className="service-card col-span-1">
          <Image
            src="/app/img/services/code.jpg"
            alt="Custom Software Development - Tailored solutions for your business"
            width={500}
            height={300}
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-fit rounded-[20px] object-cover hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-black font-bold text-xl md:text-2xl lg:text-[28px] my-4 md:my-5 lg:my-6">Custom Software Development</h1>
          <p className="text-base md:text-lg text-black/80">Tailored software solutions designed to meet your unique business needs and objectives.</p>
        </div>
        <div className="service-card col-span-1">
          <Image
            src="/app/img/services/ai.jpg"
            alt="Artificial Intelligence Development - AI and machine learning solutions"
            width={500}
            height={300}
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-fit rounded-[20px] object-cover hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-black font-bold text-xl md:text-2xl lg:text-[28px] my-4 md:my-5 lg:my-6">Artificial Intelligence Development</h1>
          <p className="text-base md:text-lg text-black/80">Leveraging AI and machine learning to unlock new possibilities and drive efficiency.</p>
        </div>
      </div>
    </div>
  );
}

export default Service;
