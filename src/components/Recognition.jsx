import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ChevronRight, X } from 'lucide-react';
import { RECOGNITION_ITEMS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Recognition() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const gridRef = useRef(null);
  const [activeDossier, setActiveDossier] = useState(null);

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
        gridRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
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
      id="recognition"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#26313B]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C5FF4A] uppercase">
          04 / VERIFIED RECOGNITION
        </span>
        <div className="h-[1px] w-12 bg-[#26313B]" />
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-section-headline text-[#F3F4F6] uppercase leading-[1.05]"
        >
          DISCOVERED RESPONSIBLY.<br />
          <span className="text-[#C5FF4A]">RECOGNIZED INTERNATIONALLY.</span>
        </h2>

        <p className="max-w-md text-sm text-[#9299A5] font-light leading-relaxed">
          Authentic recognition from international institutions, national governments, and competitive security programs for coordinated vulnerability disclosure.
        </p>
      </div>

      {/* Digital Credential Archive Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RECOGNITION_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveDossier(item)}
            className="p-8 rounded-2xl bg-[#141920] border border-[#26313B] hover:border-[#C5FF4A]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            data-cursor-text="DOSSIER"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono px-3 py-1 rounded bg-[#090B0E] border border-[#26313B] text-[#C5FF4A] font-semibold">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-[#9299A5] tracking-wider">
                  {item.year}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl text-[#F3F4F6] group-hover:text-white mb-2 leading-tight">
                {item.title}
              </h3>

              <div className="text-xs font-mono text-[#9299A5] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>ENTITY: {item.entity}</span>
                <span>·</span>
                <span className="text-[#C5FF4A]">{item.code}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#090B0E] border border-[#26313B] text-xs font-mono text-[#9299A5] mb-4">
                <span className="text-[#F3F4F6] font-semibold block mb-1">VULNERABILITY CLASS:</span>
                <span className="text-[#C5FF4A]">{item.vulnerability}</span>
              </div>

              <p className="text-sm text-[#9299A5] font-light leading-relaxed mb-6">
                {item.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#26313B] text-xs font-mono">
              <div className="flex items-center gap-2 text-[#C5FF4A]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">{item.status}</span>
              </div>

              <span className="text-[#9299A5] group-hover:text-[#C5FF4A] flex items-center gap-1 transition-colors text-[11px]">
                INSPECT DOSSIER
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dossier Drawer */}
      {activeDossier && (
        <div
          className="fixed inset-0 z-50 bg-[#090B0E]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveDossier(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#141920] border border-[#26313B] rounded-2xl p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 mb-6 border-b border-[#26313B]">
              <div>
                <span className="text-xs font-mono px-3 py-1 rounded bg-[#090B0E] border border-[#26313B] text-[#C5FF4A] font-semibold">
                  {activeDossier.badge}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F3F4F6] mt-3">
                  {activeDossier.title}
                </h3>
                <div className="text-xs font-mono text-[#9299A5] mt-1">
                  OFFICIAL RECORD // REF: {activeDossier.code}
                </div>
              </div>

              <button
                onClick={() => setActiveDossier(null)}
                className="p-2 rounded-lg bg-[#090B0E] border border-[#26313B] text-[#9299A5] hover:text-white transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#090B0E] border border-[#26313B]">
                <div className="text-[#9299A5] text-[10px] uppercase mb-1">VULNERABILITY CLASSIFICATION</div>
                <div className="text-[#C5FF4A] text-sm font-semibold">{activeDossier.vulnerability}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090B0E] border border-[#26313B]">
                <div className="text-[#9299A5] text-[10px] uppercase mb-1">TECHNICAL IMPACT & SCOPE</div>
                <div className="text-[#F3F4F6] text-xs leading-relaxed font-sans">{activeDossier.impact}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090B0E] border border-[#26313B]">
                <div className="text-[#9299A5] text-[10px] uppercase mb-1">DISCLOSURE PROTOCOL & VERIFICATION</div>
                <div className="text-[#9299A5] text-xs leading-relaxed font-sans">{activeDossier.summary}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-6 border-t border-[#26313B] flex items-center justify-between text-xs font-mono">
              <span className="text-[#C5FF4A] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                STATUS: VERIFIED & SAFELY MITIGATED
              </span>

              <button
                onClick={() => setActiveDossier(null)}
                className="px-4 py-2 rounded-lg bg-[#090B0E] hover:bg-white/[0.05] border border-[#26313B] text-[#F3F4F6] transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
