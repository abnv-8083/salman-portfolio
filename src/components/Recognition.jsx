import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, FileCheck, CheckCircle2, ChevronRight, X, Lock, ExternalLink } from 'lucide-react';
import { RECOGNITION_ITEMS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Recognition() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const [activeDossier, setActiveDossier] = useState(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="recognition"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Background Accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#C7FF4A]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C7FF4A] uppercase">
          04 / RECOGNITION
        </span>
        <div className="h-[1px] w-12 bg-[#C7FF4A]/40" />
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-[#F3F3F0] leading-[1.05]"
        >
          DISCOVERED RESPONSIBLY.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7FF4A] via-[#F3F3F0] to-[#6C8CFF]">
            RECOGNIZED INTERNATIONALLY.
          </span>
        </h2>

        <p className="max-w-md text-[#8E93A0] text-sm font-light leading-relaxed">
          Authentic recognition from international institutions, national governments, and competitive security programs for coordinated vulnerability disclosure.
        </p>
      </div>

      {/* Digital Credential Archive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RECOGNITION_ITEMS.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveDossier(item)}
            className="p-8 rounded-3xl bg-[#111318] border border-white/10 hover:border-[#C7FF4A]/40 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(199,255,74,0.06)]"
            data-cursor-text="DOSSIER"
          >
            {/* Top Bar with Status & Year */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#C7FF4A] font-semibold">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-white/40 tracking-wider">
                  {item.year}
                </span>
              </div>

              {/* Title & Entity */}
              <h3 className="font-display font-bold text-2xl lg:text-3xl text-white group-hover:text-[#F3F3F0] mb-2 leading-tight">
                {item.title}
              </h3>

              <div className="text-xs font-mono text-[#8E93A0] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>ENTITY: {item.entity}</span>
                <span>·</span>
                <span className="text-white/40">ID: {item.code}</span>
              </div>

              {/* Vulnerability Vector */}
              <div className="p-3.5 rounded-xl bg-[#08090B] border border-white/[0.06] mb-4">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">
                  DISCLOSED VULNERABILITY
                </div>
                <div className="text-sm font-mono text-[#C7FF4A] font-semibold">
                  {item.vulnerability}
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-[#8E93A0] leading-relaxed font-light mb-6">
                {item.summary}
              </p>
            </div>

            {/* Bottom Status & Click Action */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-white/60">
                <CheckCircle2 className="w-4 h-4 text-[#C7FF4A]" />
                {item.status}
              </span>
              <span className="text-[#C7FF4A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>VIEW DOSSIER</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Dossier Details Modal */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 bg-[#08090B]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="w-full max-w-xl rounded-3xl bg-[#111318] border border-white/20 p-6 sm:p-8 relative shadow-2xl overflow-hidden">
            <button
              onClick={() => setActiveDossier(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#C7FF4A] mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>SECURITY RESEARCH DOSSIER // AUTHENTICATED</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
              {activeDossier.title}
            </h3>
            <div className="text-xs font-mono text-[#8E93A0] mb-6">
              COORDINATED DISCLOSURE ARCHIVE REF: {activeDossier.code}
            </div>

            <div className="space-y-4 text-sm font-mono mb-8">
              <div className="p-4 rounded-xl bg-[#08090B] border border-white/[0.06]">
                <div className="text-[10px] text-white/40 uppercase mb-1">SCOPE & TARGET</div>
                <div className="text-white font-sans">{activeDossier.entity}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#08090B] border border-white/[0.06]">
                <div className="text-[10px] text-white/40 uppercase mb-1">FINDING CLASSIFICATION</div>
                <div className="text-[#C7FF4A]">{activeDossier.vulnerability}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#08090B] border border-white/[0.06]">
                <div className="text-[10px] text-white/40 uppercase mb-1">PREVENTED IMPACT</div>
                <div className="text-[#F3F3F0] font-sans font-light leading-relaxed">{activeDossier.impact}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#08090B] border border-white/[0.06]">
                <div className="text-[10px] text-white/40 uppercase mb-1">COORDINATION PROTOCOL</div>
                <div className="text-white/70 font-sans font-light leading-relaxed">
                  Conducted under coordinated vulnerability disclosure principles. Target authorities verified, isolated, and deployed security mitigations prior to public acknowledgment.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
              <span className="text-white/40">STATUS: REMEDIATED & RECORDED</span>
              <button
                onClick={() => setActiveDossier(null)}
                className="px-4 py-2 rounded-lg bg-[#C7FF4A] text-[#08090B] font-semibold text-xs uppercase"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
