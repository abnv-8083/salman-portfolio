import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { TIMELINE_EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

      // Animate timeline line scaleY
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: timelineLineRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5
          },
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center'
        }
      );

      // Stagger items
      gsap.fromTo(
        itemsRef.current?.children || [],
        { opacity: 0, x: -30 },
        {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C7FF4A] uppercase">
          05 / EXPERIENCE & CREDENTIALS
        </span>
        <div className="h-[1px] w-12 bg-[#C7FF4A]/40" />
      </div>

      {/* Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-[#F3F3F0] leading-[1.05]"
        >
          PRACTICE. EVOLUTION.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7FF4A] to-[#6C8CFF]">
            PROVEN PEDIGREE.
          </span>
        </h2>

        <p className="max-w-md text-[#8E93A0] text-sm font-light leading-relaxed">
          Professional security internships, foundational education, and industry-accredited certifications in penetration testing and network traffic forensics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Vertical Timeline */}
        <div className="lg:col-span-7 relative">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E93A0] mb-8 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#C7FF4A]" />
            <span>CAREER TRAJECTORY</span>
          </div>

          {/* Animated Vertical Line */}
          <div
            ref={timelineLineRef}
            className="absolute left-4 sm:left-6 top-16 bottom-6 w-[2px] bg-gradient-to-b from-[#C7FF4A] via-[#6C8CFF] to-transparent pointer-events-none"
            style={{ transformOrigin: 'top' }}
          />

          <div ref={itemsRef} className="space-y-10 pl-10 sm:pl-16">
            {TIMELINE_EXPERIENCE.map((item, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-3xl bg-[#111318] border border-white/10 hover:border-[#C7FF4A]/40 transition-all duration-300 relative group"
              >
                {/* Timeline node circle */}
                <div className="absolute -left-10 sm:-left-16 top-8 w-4 h-4 rounded-full bg-[#08090B] border-2 border-[#C7FF4A] group-hover:scale-125 transition-transform flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C7FF4A]" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#C7FF4A]/10 text-[#C7FF4A] border border-[#C7FF4A]/30 font-semibold">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    {item.organization}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                  {item.role}
                </h3>

                <ul className="space-y-2.5 text-sm text-[#8E93A0] font-light leading-relaxed">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="text-[#C7FF4A] font-mono text-xs mt-1">▹</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Education Node */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111318] border border-white/10 hover:border-[#6C8CFF]/40 transition-all duration-300 relative group">
              <div className="absolute -left-10 sm:-left-16 top-8 w-4 h-4 rounded-full bg-[#08090B] border-2 border-[#6C8CFF] group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6C8CFF]" />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#6C8CFF] mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>FORMAL EDUCATION</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
                {EDUCATION[0].degree}
              </h3>

              <div className="text-sm font-mono text-white/70 mb-2">
                {EDUCATION[0].institution}
              </div>

              <div className="text-xs font-mono text-white/40">
                Period: {EDUCATION[0].period}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Industry Certifications */}
        <div className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E93A0] mb-8 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C7FF4A]" />
            <span>ACCREDITED CERTIFICATIONS</span>
          </div>

          <div className="space-y-4">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-[#C7FF4A]/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#C7FF4A] inline-block mb-2">
                      {cert.badge}
                    </span>
                    <h4 className="font-display font-bold text-lg text-white group-hover:text-[#F3F3F0]">
                      {cert.name}
                    </h4>
                  </div>
                </div>

                <div className="text-xs font-mono text-white/60 mb-2">
                  ISSUER: {cert.issuer}
                </div>

                <p className="text-xs text-[#8E93A0] leading-relaxed font-light">
                  {cert.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center gap-1.5 text-[11px] font-mono text-[#C7FF4A]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Security Credential</span>
                </div>
              </div>
            ))}

            {/* Quick summary box */}
            <div className="p-6 rounded-2xl bg-[#08090B] border border-dashed border-white/15 text-xs font-mono text-[#8E93A0] space-y-2">
              <div className="text-white font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C7FF4A]" />
                CONTINUOUS SKILL EXPANSION
              </div>
              <p className="leading-relaxed">
                Currently engaged in advanced Active Directory exploitation labs, binary reverse engineering, and cloud security architecture research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
