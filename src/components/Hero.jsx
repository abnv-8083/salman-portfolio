import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Terminal, MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import Scene3D from './Scene3D';

export default function Hero({ onOpenTerminal }) {
  const heroRef = useRef(null);
  const tagRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(
        headlineLine1Ref.current,
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0 },
        '-=0.4'
      )
      .fromTo(
        headlineLine2Ref.current,
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0 },
        '-=0.8'
      )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(
        metaRef.current?.children || [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.1 },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projSec = document.querySelector('#projects');
    if (projSec) {
      projSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSec = document.querySelector('#contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#2D2D2D]"
    >
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-editorial-grid opacity-35 pointer-events-none" />

      {/* Main Hero Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
        {/* Left Column: Editorial Typography & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Introductory Technical Tag */}
          <div ref={tagRef} className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D0D0D] border border-[#2D2D2D] text-[11px] font-mono text-[#2CFF05] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2CFF05] animate-pulse" />
              <span>{PERSONAL_INFO.status}</span>
            </span>
            <span className="text-xs font-mono text-[#9E9E9E] hidden sm:inline">
              // MALABAR · KERALA
            </span>
          </div>

          {/* Oversized Headline with Neon Noir Gradient Accent */}
          <h1 className="font-display font-bold text-hero-headline text-[#F3F4F6] uppercase mb-8">
            <div className="overflow-hidden">
              <span ref={headlineLine1Ref} className="block">
                {PERSONAL_INFO.heroHeadingLine1}
              </span>
            </div>
            <div className="overflow-hidden mt-1">
              <span
                ref={headlineLine2Ref}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2CFF05] via-[#2CFF05] to-[#BF00FF]"
              >
                {PERSONAL_INFO.heroHeadingLine2}
              </span>
            </div>
          </h1>

          {/* Supporting Bio */}
          <p
            ref={bioRef}
            className="text-body-editorial max-w-2xl font-light mb-10 text-[#9E9E9E]"
          >
            {PERSONAL_INFO.heroBio}
          </p>

          {/* Action Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#2CFF05] hover:bg-[#28e604] text-[#000000] font-display font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(44,255,5,0.3)]"
              data-cursor-text="VIEW"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#0D0D0D] hover:bg-[#141414] border border-[#2D2D2D] hover:border-[#BF00FF]/60 text-[#F3F4F6] font-display font-medium text-xs tracking-wider uppercase transition-all duration-200"
              data-cursor-text="CONTACT"
            >
              <span>GET IN TOUCH</span>
            </a>

            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-lg bg-[#0D0D0D]/80 hover:bg-[#0D0D0D] border border-[#2D2D2D] hover:border-[#2CFF05]/50 text-[#9E9E9E] hover:text-[#2CFF05] text-xs font-mono transition-colors"
              title="Open Interactive Shell (`)"
              data-cursor-text="CLI"
            >
              <Terminal className="w-4 h-4 text-[#BF00FF]" />
              <span className="hidden sm:inline">LAUNCH CLI</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Mesh & Technical Telemetry */}
        <div ref={visualRef} className="lg:col-span-5 relative w-full flex items-center justify-center">
          <div className="w-full aspect-square max-h-[460px] rounded-2xl bg-[#0D0D0D] border border-[#2D2D2D] relative overflow-hidden flex items-center justify-center p-4">
            {/* Corner HUD markers */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-[#9E9E9E] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2CFF05]" />
              <span>SF-SEC-RESEARCH</span>
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-[#BF00FF]">
              NODE: ACTIVE
            </div>
            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#9E9E9E]">
              COORD: 11.2588° N, 75.7804° E
            </div>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#2CFF05]">
              HASH: SHA256 // OK
            </div>

            {/* Three.js Interactive Cryptographic Mesh */}
            <Scene3D className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Hero Bottom Metadata Row */}
      <div
        ref={metaRef}
        className="relative z-10 pt-8 mt-12 border-t border-[#2D2D2D] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono"
      >
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-[#2CFF05] shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase text-[#9E9E9E] tracking-wider">LOCATION</div>
            <div className="text-[#F3F4F6] font-medium">{PERSONAL_INFO.location}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="w-4 h-4 text-[#BF00FF] shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase text-[#9E9E9E] tracking-wider">PRIMARY DISCIPLINE</div>
            <div className="text-[#F3F4F6] font-medium">Web App Pentesting & Vulnerability Research</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#2CFF05] shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase text-[#9E9E9E] tracking-wider">VERIFIED DISCLOSURES</div>
            <div className="text-[#F3F4F6] font-medium">WHO Hall of Fame & European Commission</div>
          </div>
        </div>
      </div>
    </section>
  );
}
