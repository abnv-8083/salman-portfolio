import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldAlert, FileCode2, Trophy, Terminal, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, RECOGNITION_ITEMS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const bioRef = useRef(null);
  const cardsRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
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

      // Bio text reveal
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out'
        }
      );

      // Credential cards stagger
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        }
      );

      // Visual blueprint entrance
      gsap.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          scale: 1,
          duration: 1.1,
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
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C7FF4A] uppercase">
          01 / ABOUT
        </span>
        <div className="h-[1px] w-12 bg-[#C7FF4A]/40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Biography & Philosophy */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h2
              ref={headlineRef}
              className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-[#F3F3F0] leading-[1.05] mb-8"
            >
              CURIOUS BY NATURE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7FF4A] to-[#6C8CFF]">
                SECURITY BY PURPOSE.
              </span>
            </h2>

            <div ref={bioRef} className="space-y-6 text-[#8E93A0] text-base sm:text-lg leading-relaxed font-light">
              <p className="text-[#F3F3F0] font-normal">
                {PERSONAL_INFO.bio}
              </p>
              <p>
                My approach bridges offensive exploration with defensive engineering. Rather than simply scanning for superficial vulnerabilities, I analyze system logic, dissect trust boundaries, and emulate real-world adversary workflows to detect high-impact architectural flaws.
              </p>
              <p>
                Every disclosure is conducted adhering strictly to responsible disclosure guidelines, coordinating with system owners and national computer emergency response teams to ensure comprehensive patching before public disclosure.
              </p>
            </div>
          </div>

          {/* Animated Security Blueprint / Telemetry Visual */}
          <div
            ref={visualRef}
            className="mt-10 p-6 rounded-2xl bg-[#111318]/70 border border-white/10 backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#C7FF4A]" />
                <span className="text-xs font-mono text-[#F3F3F0] tracking-wider">
                  TELEMETRY_HUD // ARCHITECTURE_INSPECTION
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#C7FF4A] px-2 py-0.5 rounded bg-[#C7FF4A]/10 border border-[#C7FF4A]/30">
                ACTIVE
              </span>
            </div>

            {/* Blueprint SVG Graphic */}
            <div className="relative h-44 w-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Grid Lines */}
                <line x1="50" y1="20" x2="450" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="50" y1="80" x2="450" y2="80" stroke="rgba(255,255,255,0.08)" />
                <line x1="50" y1="140" x2="450" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                {/* Nodes */}
                <circle cx="80" cy="80" r="14" fill="#08090B" stroke="#6C8CFF" strokeWidth="2" />
                <circle cx="80" cy="80" r="6" fill="#6C8CFF" />
                <text x="80" y="112" fill="#8E93A0" fontSize="9" fontFamily="monospace" textAnchor="middle">TARGET API</text>

                <path d="M96 80 H 210" stroke="#C7FF4A" strokeWidth="1.5" strokeDasharray="6 3" />

                <circle cx="230" cy="80" r="20" fill="#111318" stroke="#C7FF4A" strokeWidth="2" className="animate-pulse" />
                <circle cx="230" cy="80" r="10" fill="rgba(199,255,74,0.2)" />
                <text x="230" y="118" fill="#C7FF4A" fontSize="9" fontFamily="monospace" textAnchor="middle">INSPECTION CORE</text>

                <path d="M252 80 H 380" stroke="#6C8CFF" strokeWidth="1.5" strokeDasharray="6 3" />

                <circle cx="400" cy="80" r="14" fill="#08090B" stroke="#00E5FF" strokeWidth="2" />
                <circle cx="400" cy="80" r="6" fill="#00E5FF" />
                <text x="400" y="112" fill="#8E93A0" fontSize="9" fontFamily="monospace" textAnchor="middle">HARDENED SYS</text>

                {/* Animated Packet */}
                <circle cx="160" cy="80" r="3" fill="#C7FF4A">
                  <animate attributeName="cx" values="96;210;96" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="310" cy="80" r="3" fill="#6C8CFF">
                  <animate attributeName="cx" values="250;380;250" dur="2.4s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#8E93A0] pt-2 border-t border-white/[0.05]">
              <span>ID: SALMANUL-RESEARCH-SPEC</span>
              <span className="text-[#C7FF4A]">STATUS: NO UNMITIGATED POINTERS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Credibility Signals & Hall of Fame Records */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E93A0] mb-4 flex items-center justify-between">
            <span>VERIFIED DISCLOSURE RECORD</span>
            <span className="text-[#C7FF4A]">AUTHENTICATED FINDINGS</span>
          </div>

          <div ref={cardsRef} className="space-y-4">
            {/* Card 1: WHO Hall of Fame */}
            <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-[#C7FF4A]/50 transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C7FF4A]/10 border border-[#C7FF4A]/30 flex items-center justify-center text-[#C7FF4A]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#F3F3F0] group-hover:text-white">
                      World Health Organization (WHO)
                    </h3>
                    <div className="text-xs font-mono text-[#C7FF4A] tracking-wider uppercase">
                      Inducted to Official Hall of Fame · 2024
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                  IDOR FLUID
                </span>
              </div>
              <p className="text-sm text-[#8E93A0] leading-relaxed mb-3">
                Recognized in the WHO Hall of Fame for responsibly discovering, validating, and reporting an Insecure Direct Object Reference (IDOR) vulnerability on critical health platforms.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C7FF4A]" />
                <span>Verified by WHO Security Operations · Remediated</span>
              </div>
            </div>

            {/* Card 2: European Commission */}
            <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-[#6C8CFF]/50 transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6C8CFF]/10 border border-[#6C8CFF]/30 flex items-center justify-center text-[#6C8CFF]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#F3F3F0] group-hover:text-white">
                      European Commission
                    </h3>
                    <div className="text-xs font-mono text-[#6C8CFF] tracking-wider uppercase">
                      Official Vulnerability Disclosure Acknowledgment · 2024
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                  BACKUP EXPOSURE
                </span>
              </div>
              <p className="text-sm text-[#8E93A0] leading-relaxed mb-3">
                Acknowledged by the European Commission for identifying an exposed backup archive vulnerability containing sensitive server configurations on official commission web assets.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6C8CFF]" />
                <span>Coordinated EU-VDP Channel · Confirmed & Patched</span>
              </div>
            </div>

            {/* Card 3: Belgium Government & CERT-In */}
            <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-white/30 transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-[#F3F3F0]">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#F3F3F0]">
                      Belgium Gov & CERT-In
                    </h3>
                    <div className="text-xs font-mono text-white/70 tracking-wider uppercase">
                      National Infrastructure Disclosure Reports · 2024–2025
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                  GOV DISCLOSURE
                </span>
              </div>
              <p className="text-sm text-[#8E93A0] leading-relaxed mb-3">
                Submitted coordinated vulnerability assessments to the Belgium Federal Government and CERT-In (Indian Computer Emergency Response Team) strengthening public digital infrastructure.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C7FF4A]" />
                <span>Followed ISO/IEC 29147 standard vulnerability handling</span>
              </div>
            </div>

            {/* Card 4: Brototype Cyber Hunt Champion */}
            <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-[#FFB020]/50 transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB020]/10 border border-[#FFB020]/30 flex items-center justify-center text-[#FFB020]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#F3F3F0] group-hover:text-white">
                      Brototype Cyber Hunt Challenge
                    </h3>
                    <div className="text-xs font-mono text-[#FFB020] tracking-wider uppercase">
                      1st Place Champion · ₹10,000 Cash Prize Award · 2025
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FFB020]/10 border border-[#FFB020]/30 text-[#FFB020]">
                  8 VULNS EXPLOITED
                </span>
              </div>
              <p className="text-sm text-[#8E93A0] leading-relaxed mb-3">
                Winner of the competitive Cyber Hunt penetration testing hackathon. Uncovered and documented 8 distinct vulnerabilities across web scopes within rigorous time limits.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB020]" />
                <span>1st Place Winner Trophy & Verified ₹10,000 Award</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
