'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Trusted() {
  const trustedRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([ titleRef.current, descRef.current ], {
        opacity: 0,
        y: 30,
      });

      gsap.set('.logo-item', {
        opacity: 0,
        y: 50,
        scale: 0.8,
      });

      // Create scroll-triggered animations
      gsap.timeline({
        scrollTrigger: {
          trigger: trustedRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4')
        .to('.logo-item', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
        }, '-=0.2');
    }, trustedRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={trustedRef} className="container w-full py-12 md:py-16 lg:py-24" data-background="light">
      <div className="flex justify-center text-center mb-8 md:mb-10 lg:mb-12">
        <div className="w-full max-w-[600px]">
          <h1 ref={titleRef} className="text-black font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-4 md:mb-6 lg:mb-8">More than 3000 companies have <span className="text-[#00A06A]">trusted us</span></h1>
          <p ref={descRef} className="text-base md:text-lg lg:text-xl">We are a team of passionate developers and designers who are dedicated to transforming ideas into visually stunning and immersive experiences that captivate and engage audiences.</p>
        </div>
      </div>
      <div ref={logosRef} className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
        <div className="logo-item bg-[#f7f7f7] w-full h-[100px] md:h-[120px] lg:h-[130px] rounded-2xl flex justify-center items-center group hover:shadow-[10px_10px_50px_0px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-300">
          <Image
            src="/app/img/logo/unpad.png"
            width={120}
            height={60}
            quality={90}
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
            className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px] max-w-[80px] md:max-w-[100px] lg:max-w-[120px] w-auto h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            alt="Universitas Padjadjaran Logo"
          />
        </div>
        <div className="logo-item bg-[#f7f7f7] w-full h-[100px] md:h-[120px] lg:h-[130px] rounded-2xl flex justify-center items-center group hover:shadow-[10px_10px_50px_0px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-300">
          <Image
            src="/app/img/logo/stmik-bandung.png"
            width={120}
            height={60}
            quality={90}
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
            className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px] max-w-[80px] md:max-w-[100px] lg:max-w-[120px] w-auto h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            alt="STMIK Bandung Logo"
          />
        </div>
        <div className="logo-item bg-[#f7f7f7] w-full h-[100px] md:h-[120px] lg:h-[130px] rounded-2xl flex justify-center items-center group hover:shadow-[10px_10px_50px_0px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-300">
          <Image
            src="/app/img/logo/unwim.png"
            width={120}
            height={60}
            quality={90}
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
            className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px] max-w-[80px] md:max-w-[100px] lg:max-w-[120px] w-auto h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            alt="Universitas Widyatama Logo"
          />
        </div>
        <div className="logo-item bg-[#f7f7f7] w-full h-[100px] md:h-[120px] lg:h-[130px] rounded-2xl hidden lg:flex justify-center items-center group hover:shadow-[10px_10px_50px_0px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-300">
          <Image
            src="/app/img/logo/google.png"
            width={120}
            height={60}
            quality={90}
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
            className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px] max-w-[80px] md:max-w-[100px] lg:max-w-[120px] w-auto h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            alt="Google Logo"
          />
        </div>
        <div className="logo-item bg-[#f7f7f7] w-full h-[100px] md:h-[120px] lg:h-[130px] rounded-2xl hidden lg:flex justify-center items-center group hover:shadow-[10px_10px_50px_0px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-300">
          <Image
            src="/app/img/logo/google.png"
            width={120}
            height={60}
            quality={90}
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
            className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px] max-w-[80px] md:max-w-[100px] lg:max-w-[120px] w-auto h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            alt="Google Logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Trusted;
