import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Bug, Radio, Code2 } from 'lucide-react';
import { EXPERTISE_CATEGORIES } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const contentRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(EXPERTISE_CATEGORIES[0].id);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentCategoryData = EXPERTISE_CATEGORIES.find(c => c.id === activeCategory) || EXPERTISE_CATEGORIES[0];

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'cat-a': return <Shield className="w-4 h-4 text-[#C5FF4A]" />;
      case 'cat-b': return <Bug className="w-4 h-4 text-[#C5FF4A]" />;
      case 'cat-c': return <Radio className="w-4 h-4 text-[#C5FF4A]" />;
      case 'cat-d': return <Code2 className="w-4 h-4 text-[#C5FF4A]" />;
      default: return <Shield className="w-4 h-4 text-[#C5FF4A]" />;
    }
  };

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#26313B]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C5FF4A] uppercase">
          02 / TECHNICAL EXPERTISE
        </span>
        <div className="h-[1px] w-12 bg-[#26313B]" />
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-section-headline text-[#F3F4F6] uppercase leading-[1.05]"
        >
          UNDERSTAND THE ATTACK.<br />
          <span className="text-[#C5FF4A]">STRENGTHEN THE DEFENSE.</span>
        </h2>

        <p className="max-w-md text-[#9299A5] text-sm font-light leading-relaxed">
          Rigorous offensive methodology focused on uncovering real business risk, eliminating privilege boundaries, and building resilient security posture.
        </p>
      </div>

      {/* Category Navigation Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {EXPERTISE_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                isActive
                  ? 'bg-[#141920] border-[#C5FF4A] text-[#F3F4F6]'
                  : 'bg-[#141920]/40 border-[#26313B] text-[#9299A5] hover:text-[#F3F4F6] hover:border-[#26313B]'
              }`}
              data-cursor-text="TAB"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#C5FF4A] font-semibold">{cat.number}</span>
                {getCategoryIcon(cat.id)}
              </div>
              <div className="font-display font-semibold text-xs tracking-wider uppercase">
                {cat.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Structured Category Details & Editorial List */}
      <div
        ref={contentRef}
        className="p-8 md:p-12 rounded-2xl bg-[#141920] border border-[#26313B]"
      >
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#26313B] gap-4">
          <div>
            <div className="text-xs font-mono text-[#C5FF4A] uppercase tracking-wider mb-1">
              CATEGORY {currentCategoryData.number}
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F3F4F6] uppercase">
              {currentCategoryData.category}
            </h3>
          </div>
          <div className="max-w-md text-sm text-[#9299A5] font-light">
            {currentCategoryData.tagline}
          </div>
        </div>

        {/* Editorial Skill Items List */}
        <div className="divide-y divide-[#26313B]/60">
          {currentCategoryData.skills.map((skill, index) => (
            <div
              key={skill.name}
              className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group hover:bg-[#090B0E]/30 transition-colors -mx-4 px-4 rounded-lg"
            >
              <div className="md:col-span-5 flex items-center gap-3">
                <span className="text-xs font-mono text-[#9299A5] group-hover:text-[#C5FF4A] transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="font-display font-semibold text-base sm:text-lg text-[#F3F4F6] group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>

              <div className="md:col-span-2">
                <span className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#090B0E] border border-[#26313B] text-[#C5FF4A]">
                  {skill.level}
                </span>
              </div>

              <div className="md:col-span-5 text-sm text-[#9299A5] font-light leading-relaxed">
                {skill.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
