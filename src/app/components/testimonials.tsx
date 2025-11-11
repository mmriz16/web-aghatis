'use client';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(quoteRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -15,
      });

      gsap.set(textRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(profileRef.current, {
        opacity: 0,
        x: -30,
      });

      gsap.set(buttonsRef.current, {
        opacity: 0,
        x: 30,
      });

      // Create scroll-triggered animations
      gsap.timeline({
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      })
        .to(quoteRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        })
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3')
        .to(profileRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4')
        .to(buttonsRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.3');
    }, testimonialsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={testimonialsRef} className="container py-12 md:py-16 lg:py-24 max-w-7xl mx-auto">
      <Image ref={quoteRef} src="/app/img/quote.png" width={52} height={42} className="w-[40px] h-[32px] md:w-[52px] md:h-[42px] mb-6 md:mb-8 lg:mb-[34px] mx-auto lg:mx-0" alt="quote" />
      <p ref={textRef} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed md:leading-[45px] mb-6 md:mb-8 lg:mb-[34px] text-center lg:text-left">Agathis Solution expertise exceeded my expectations. They brought our vision to life with precision and creativity, delivering a stunning and user-friendly interface.</p>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
        <div className="w-full lg:w-auto">
          <div ref={profileRef} className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center lg:justify-start">
            <Image src="/app/img/testimonials/miftakhul-rizky.jpg" width={68} height={68} className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] rounded-full" alt="profile" />
            <div className="" id="name">
              <h1 className="text-lg md:text-xl lg:text-2xl font-medium">Miftakhul Rizky</h1>
              <p className="text-sm md:text-base font-medium text-white/50">Founder Termicons</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto">
          <div ref={buttonsRef} className="flex gap-4 md:gap-5 justify-center lg:justify-end">
            <button className="bg-white/10 rounded-[16px] p-2 md:p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer"><ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /></button>
            <button className="bg-white/10 rounded-[16px] p-2 md:p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer"><ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
