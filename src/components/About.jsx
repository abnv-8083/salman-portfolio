import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const bioRef = useRef(null);
  const pillarsRef = useRef(null);
  const diagramRef = useRef(null);

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
        bioRef.current,
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        pillarsRef.current?.children || [],
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        diagramRef.current,
        { opacity: 0, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: diagramRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#26313B]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C5FF4A] uppercase">
          01 / PHILOSOPHY & METHODOLOGY
        </span>
        <div className="h-[1px] w-12 bg-[#26313B]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Editorial Headline & Biography */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h2
              ref={headlineRef}
              className="font-display font-bold text-section-headline text-[#F3F4F6] uppercase mb-8"
            >
              CURIOUS BY NATURE.<br />
              <span className="text-[#C5FF4A]">SECURITY BY PURPOSE.</span>
            </h2>

            <div ref={bioRef} className="space-y-6 text-body-editorial font-light">
              <p className="text-[#F3F4F6] font-normal leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
              <p>
                My approach bridges offensive exploration with defensive engineering. Rather than simply scanning for superficial vulnerabilities, I analyze system logic, dissect trust boundaries, and emulate real-world adversary workflows to detect high-impact architectural flaws.
              </p>
              <p>
                Every disclosure is conducted adhering strictly to responsible disclosure guidelines, coordinating with system owners and national computer emergency response teams to ensure comprehensive remediation before any coordinated disclosure.
              </p>
            </div>
          </div>

          {/* Technical Telemetry Diagram */}
          <div
            ref={diagramRef}
            className="mt-10 p-6 rounded-xl bg-[#141920] border border-[#26313B] relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 border-b border-[#26313B] pb-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#F3F4F6]">
                <Terminal className="w-3.5 h-3.5 text-[#C5FF4A]" />
                <span>INSPECTION_CORE // ARCHITECTURE_FLOW</span>
              </div>
              <span className="text-[10px] text-[#C5FF4A] px-2 py-0.5 rounded bg-[#C5FF4A]/10 border border-[#C5FF4A]/30">
                ACTIVE
              </span>
            </div>

            {/* Clean SVG Circuit / Inspection Diagram */}
            <div className="h-32 w-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Connection lines */}
                <line x1="40" y1="60" x2="460" y2="60" stroke="#26313B" strokeWidth="1.5" />
                <line x1="120" y1="60" x2="220" y2="60" stroke="#C5FF4A" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="280" y1="60" x2="380" y2="60" stroke="#C5FF4A" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Node 1: Surface Discovery */}
                <rect x="30" y="40" width="70" height="40" rx="6" fill="#090B0E" stroke="#26313B" strokeWidth="1.5" />
                <text x="65" y="64" fill="#F3F4F6" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">TARGET</text>

                {/* Node 2: Inspection Core */}
                <rect x="210" y="35" width="80" height="50" rx="8" fill="#141920" stroke="#C5FF4A" strokeWidth="1.5" />
                <text x="250" y="58" fill="#C5FF4A" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600" textAnchor="middle">DISSECT</text>
                <text x="250" y="72" fill="#9299A5" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">AUTH / LOGIC</text>

                {/* Node 3: Remediated Baseline */}
                <rect x="380" y="40" width="90" height="40" rx="6" fill="#090B0E" stroke="#26313B" strokeWidth="1.5" />
                <text x="425" y="64" fill="#F3F4F6" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">HARDENED</text>

                {/* Animated Packet indicator */}
                <circle cx="170" cy="60" r="3" fill="#C5FF4A">
                  <animate attributeName="cx" values="100;210;100" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="330" cy="60" r="3" fill="#C5FF4A">
                  <animate attributeName="cx" values="290;380;290" dur="2.8s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#9299A5] pt-2 border-t border-[#26313B]">
              <span>VALIDATION: SYSTEMATIC RECON</span>
              <span className="text-[#C5FF4A]">DISCLOSURE: RESPONSIBLE ONLY</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Core Methodology Pillars */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="text-xs font-mono uppercase tracking-widest text-[#9299A5] mb-6">
            CORE PRINCIPLES
          </div>

          <div ref={pillarsRef} className="space-y-4">
            <div className="p-6 rounded-xl bg-[#141920] border border-[#26313B] hover:border-[#C5FF4A]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#C5FF4A]">PILLAR // 01</span>
                <span className="text-[10px] font-mono text-[#9299A5]">OFFENSIVE</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F3F4F6] mb-2">
                Adversary Emulation
              </h3>
              <p className="text-sm text-[#9299A5] leading-relaxed font-light">
                Testing application workflows, APIs, and business logic from the exact perspective of a dedicated adversary to uncover critical privilege escalations and IDOR flaws.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#141920] border border-[#26313B] hover:border-[#C5FF4A]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#C5FF4A]">PILLAR // 02</span>
                <span className="text-[10px] font-mono text-[#9299A5]">GOVERNANCE</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F3F4F6] mb-2">
                Responsible Disclosure
              </h3>
              <p className="text-sm text-[#9299A5] leading-relaxed font-light">
                Strict adherence to coordinated vulnerability disclosure timelines, coordinating with international bodies and CERT teams before any public discussion.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#141920] border border-[#26313B] hover:border-[#C5FF4A]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#C5FF4A]">PILLAR // 03</span>
                <span className="text-[10px] font-mono text-[#9299A5]">ENGINEERING</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F3F4F6] mb-2">
                Actionable Remediation
              </h3>
              <p className="text-sm text-[#9299A5] leading-relaxed font-light">
                Delivering complete reproduction steps, proof-of-concept payloads, and specific architectural fixes that enable engineering teams to eliminate root causes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
