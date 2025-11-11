'use client';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const currentIndexRef = useRef(0);

  const testimonialsData = [
    {
      name: 'Miftakhul Rizky',
      role: 'Founder Termicons',
      text:
        'Agathis Solution truly exceeded our expectations. They translated our vision into a refined, polished interface with meticulous attention to detail. The process was fast, communication was clear, and the final result feels solid and easy to use.',
      image: '/app/img/testimonials/miftakhul-rizky.jpg',
    },
    {
      name: 'Qolby Fahrul Rizky',
      role: 'Client',
      text:
        'Agathis delivered a clean, intuitive UX. Timelines were well managed and every revision handled quickly and accurately. From kickoff to delivery, the team was responsive, transparent, and focused on quality.',
      image: '/app/img/testimonials/miftakhul-rizky.jpg',
    },
    {
      name: 'Ibnu Rizqia Ramadan',
      role: 'Client',
      text:
        'Collaboration felt smooth from the start. Communication was clear, documentation tidy, and design decisions always backed by solid reasoning. The resulting interface is simple yet functional—our users love it.',
      image: '/app/img/testimonials/miftakhul-rizky.jpg',
    },
    {
      name: 'Dicky Arya Pratama',
      role: 'Client',
      text:
        'The output quality is high with great attention to small details often overlooked. Performance and accessibility were considered from the start, so we shipped with confidence and strong support.',
      image: '/app/img/testimonials/miftakhul-rizky.jpg',
    },
    {
      name: 'Gita Purnamasari',
      role: 'Client',
      text:
        'Our ideas were shaped into a mature, consistent product. The team is professional, creative, and friendly—offering valuable input so the final solution truly fits our business needs.',
      image: '/app/img/testimonials/miftakhul-rizky.jpg',
    },
    {
      name: 'Mutiara Azzahra',
      role: 'Client',
      text:
        'Design was beautifully executed with intuitive flows. Every component was considered for consistency, resulting in a smooth user experience. We’re very happy with both the outcome and the process.',
      image: '/app/img/testimonials/miftakhul-rizky.jpg',
    },
  ];

  const changeTo = (nextIndex: number, direction: 1 | -1 = 1) => {
    const tl = gsap.timeline();
    tl.to([textRef.current, profileRef.current], {
      opacity: 0,
      x: direction === 1 ? -40 : 40,
      duration: 0.25,
      ease: 'power2.out',
    })
      .add(() => {
        setCurrent(nextIndex);
        currentIndexRef.current = nextIndex;
        gsap.set([textRef.current, profileRef.current], {
          x: direction === 1 ? 40 : -40,
          opacity: 0,
        });
      })
      .to([textRef.current, profileRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.35,
        ease: 'power2.out',
      });
  };

  const nextTestimonial = () => {
    const nextIndex = (currentIndexRef.current + 1) % testimonialsData.length;
    changeTo(nextIndex, 1);
  };

  const prevTestimonial = () => {
    const prevIndex = (currentIndexRef.current - 1 + testimonialsData.length) % testimonialsData.length;
    changeTo(prevIndex, -1);
  };

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

  useEffect(() => {
    const id = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={testimonialsRef} className="container py-12 md:py-16 lg:py-24 max-w-7xl mx-auto">
      <Image ref={quoteRef} src="/app/img/quote.png" width={52} height={42} className="w-[40px] h-[32px] md:w-[52px] md:h-[42px] mb-6 md:mb-8 lg:mb-[34px] mx-auto lg:mx-0" alt="quote" />
      <p
        ref={textRef}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed md:leading-[45px] mb-6 md:mb-8 lg:mb-[34px] text-center lg:text-left h-[105px] md:h-[135px]"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {testimonialsData[current].text}
      </p>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
        <div className="w-full lg:w-auto">
          <div ref={profileRef} className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center lg:justify-start">
            <Image src={testimonialsData[current].image} width={68} height={68} className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] rounded-full" alt="profile" />
            <div className="" id="name">
              <h1 className="text-lg md:text-xl lg:text-2xl font-medium">{testimonialsData[current].name}</h1>
              <p className="text-sm md:text-base font-medium text-white/50">{testimonialsData[current].role}</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto">
          <div ref={buttonsRef} className="flex gap-4 md:gap-5 justify-center lg:justify-end">
            <button onClick={prevTestimonial} className="bg-white/10 rounded-[16px] p-2 md:p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer"><ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /></button>
            <button onClick={nextTestimonial} className="bg-white/10 rounded-[16px] p-2 md:p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer"><ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
