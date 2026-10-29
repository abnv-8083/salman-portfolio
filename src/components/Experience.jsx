import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { TIMELINE_EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const timelineRef = useRef(null);
  const certsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        timelineRef.current?.children || [],
        { opacity: 0, x: -25 },
        {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        certsRef.current?.children || [],
        { opacity: 0, x: 25 },
        {
          scrollTrigger: {
            trigger: certsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#2D2D2D]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#00F0FF] uppercase">
          05 / TRAJECTORY & CREDENTIALS
        </span>
        <div className="h-[1px] w-12 bg-[#2D2D2D]" />
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-section-headline text-[#F3F4F6] uppercase leading-[1.05]"
        >
          PRACTICE. EVOLUTION.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#BF00FF]">
            PROVEN PEDIGREE.
          </span>
        </h2>

        <p className="max-w-md text-sm text-[#9E9E9E] font-light leading-relaxed">
          Structured professional journey across offensive penetration testing, defensive network inspection, and software engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Professional Experience Timeline */}
        <div className="lg:col-span-7">
          <div className="text-xs font-mono uppercase tracking-widest text-[#9E9E9E] mb-6 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>PROFESSIONAL TIMELINE</span>
          </div>

          <div ref={timelineRef} className="space-y-8 relative pl-6 border-l border-[#2D2D2D]">
            {TIMELINE_EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node marker */}
                <div className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                  exp.current
                    ? 'bg-[#00F0FF] border-[#000000] shadow-[0_0_12px_rgba(0,240,255,0.7)]'
                    : 'bg-[#0D0D0D] border-[#2D2D2D]'
                }`} />

                <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#2D2D2D] group-hover:border-[#00F0FF]/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-[#00F0FF]">
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                        ACTIVE ROLE
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#F3F4F6] mb-1">
                    {exp.role}
                  </h3>

                  <div className="text-xs font-mono text-[#9E9E9E] uppercase tracking-wider mb-4">
                    {exp.organization}
                  </div>

                  <ul className="space-y-2 text-sm text-[#9E9E9E] font-light">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#00F0FF] font-mono text-xs mt-1">▹</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Education entry */}
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0D0D0D] border-2 border-[#2D2D2D]" />

                <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#2D2D2D]">
                  <span className="text-xs font-mono text-[#9E9E9E] block mb-2">
                    {edu.period}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#F3F4F6] mb-1">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-mono text-[#9E9E9E] uppercase">
                    {edu.institution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Verified Certifications */}
        <div className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[#9E9E9E] mb-6 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#BF00FF]" />
            <span>TECHNICAL CERTIFICATIONS</span>
          </div>

          <div ref={certsRef} className="space-y-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#0D0D0D] border border-[#2D2D2D] hover:border-[#BF00FF]/50 hover:shadow-[0_0_20px_rgba(191,0,255,0.12)] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#000000] border border-[#2D2D2D] text-[#BF00FF]">
                    {cert.badge}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>

                <h3 className="font-display font-bold text-lg text-[#F3F4F6] mb-1">
                  {cert.name}
                </h3>

                <div className="text-xs font-mono text-[#9E9E9E] uppercase mb-3">
                  ISSUED BY: {cert.issuer}
                </div>

                <p className="text-xs text-[#9E9E9E] leading-relaxed font-light">
                  {cert.description}
                </p>
              </div>
            ))}

            {/* Verification Note */}
            <div className="p-4 rounded-xl bg-[#000000] border border-[#2D2D2D] text-xs font-mono text-[#9E9E9E]">
              <span className="text-[#00F0FF] block mb-1">// CREDENTIAL INTEGRITY</span>
              All listed certifications and program completions are backed by original verifiable certificates.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
