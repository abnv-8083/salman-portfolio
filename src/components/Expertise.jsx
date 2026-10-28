import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Bug, Search, Terminal, Radio, ChevronRight, Zap, Code2, Server, KeyRound, Cpu } from 'lucide-react';
import { EXPERTISE_CATEGORIES } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(EXPERTISE_CATEGORIES[0].id);
  const [selectedSkill, setSelectedSkill] = useState(EXPERTISE_CATEGORIES[0].skills[0]);

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

  const currentCategoryData = EXPERTISE_CATEGORIES.find(c => c.id === activeCategory) || EXPERTISE_CATEGORIES[0];

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'cat-a': return <Shield className="w-5 h-5" />;
      case 'cat-b': return <Bug className="w-5 h-5" />;
      case 'cat-c': return <Radio className="w-5 h-5" />;
      case 'cat-d': return <Code2 className="w-5 h-5" />;
      default: return <Terminal className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C7FF4A]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C7FF4A] uppercase">
          02 / EXPERTISE
        </span>
        <div className="h-[1px] w-12 bg-[#C7FF4A]/40" />
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-[#F3F3F0] leading-[1.05]"
        >
          UNDERSTAND THE ATTACK.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7FF4A] via-[#F3F3F0] to-[#6C8CFF]">
            STRENGTHEN THE DEFENSE.
          </span>
        </h2>

        <p className="max-w-md text-[#8E93A0] text-sm font-light leading-relaxed">
          Rigorous technical methodology focused on uncovering real business risk, eliminating privilege boundaries, and building resilient security posture.
        </p>
      </div>

      {/* Category Tabs: Category A to D */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {EXPERTISE_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSkill(cat.skills[0]);
              }}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                isActive
                  ? 'bg-[#111318] border-[#C7FF4A] shadow-[0_0_25px_rgba(199,255,74,0.12)]'
                  : 'bg-[#111318]/50 border-white/10 hover:border-white/20 hover:bg-[#111318]'
              }`}
              data-cursor-text="SELECT"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono font-bold tracking-widest ${isActive ? 'text-[#C7FF4A]' : 'text-[#8E93A0]'}`}>
                  {cat.number}
                </span>
                <div className={`transition-colors ${isActive ? 'text-[#C7FF4A]' : 'text-white/30 group-hover:text-white'}`}>
                  {getCategoryIcon(cat.id)}
                </div>
              </div>

              <div className={`font-display font-bold text-base md:text-lg uppercase tracking-tight mb-1 ${isActive ? 'text-white' : 'text-[#8E93A0] group-hover:text-white'}`}>
                {cat.category}
              </div>

              <div className="text-[11px] font-mono text-white/40 line-clamp-1">
                {cat.skills.length} SPECIALIZED CAPABILITIES
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7FF4A]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive Skills Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skills List */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E93A0] mb-2 flex items-center justify-between">
            <span>{currentCategoryData.category} CAPABILITIES</span>
            <span className="text-white/40">HOVER OR CLICK TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCategoryData.skills.map((skill, index) => {
              const isSelected = selectedSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 group relative ${
                    isSelected
                      ? 'bg-[#111318] border-[#C7FF4A]/60 shadow-[0_0_20px_rgba(199,255,74,0.08)]'
                      : 'bg-[#111318]/40 border-white/[0.08] hover:border-white/20 hover:bg-[#111318]'
                  }`}
                  data-cursor-text="INSPECT"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-display font-semibold text-sm text-[#F3F3F0] group-hover:text-white">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected
                        ? 'bg-[#C7FF4A]/15 text-[#C7FF4A] border border-[#C7FF4A]/30'
                        : 'bg-white/5 text-white/50 border border-white/10'
                    }`}>
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-[#8E93A0] font-light leading-relaxed line-clamp-2">
                    {skill.desc}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/[0.05] text-[10px] font-mono text-white/30">
                    <span>VEC_{String(index + 1).padStart(2, '0')}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-[#C7FF4A]' : 'opacity-30'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Skill Deep-Dive Inspector Panel */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="p-7 rounded-2xl bg-[#111318] border border-white/10 backdrop-blur-md relative overflow-hidden shadow-2xl">
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C7FF4A]">
                <Cpu className="w-4 h-4" />
                <span>SPECIFICATION INSPECTOR</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                ACTIVE FOCUS
              </span>
            </div>

            {/* Selected Skill Header */}
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              {selectedSkill.name}
            </h3>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7FF4A]/10 border border-[#C7FF4A]/30 text-xs font-mono text-[#C7FF4A] mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>CLASSIFICATION: {selectedSkill.level}</span>
            </div>

            {/* In-depth Analysis */}
            <div className="space-y-4 mb-8">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1">
                  RESEARCH METHODOLOGY
                </div>
                <p className="text-sm text-[#8E93A0] leading-relaxed">
                  {selectedSkill.desc}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1">
                  DISCLOSURE & REMEDIATION
                </div>
                <p className="text-xs text-[#8E93A0] leading-relaxed font-mono bg-[#08090B] p-3 rounded-lg border border-white/[0.06]">
                  {`// Validation criteria`}
                  <br />
                  {`1. Identify state mutation endpoints`}
                  <br />
                  {`2. Verify lack of token validation & session lock`}
                  <br />
                  {`3. Deliver PoC with CVSS severity rating`}
                </p>
              </div>
            </div>

            {/* Footer metadata */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/40">
              <span>TESTING SUITE: BURP / PYTHON</span>
              <span className="text-[#C7FF4A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C7FF4A] animate-pulse" />
                VERIFIED CAPABILITY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
