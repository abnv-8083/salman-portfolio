import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, Shield, Terminal, MapPin, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import Scene3D from './Scene3D';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenTerminal }) {
  const heroRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 });

      // Animate headline with clip masks
      tl.fromTo(
        headlineLine1Ref.current,
        { yPercent: 110, rotateX: 25, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.1 }
      )
      .fromTo(
        headlineLine2Ref.current,
        { yPercent: 110, rotateX: 25, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.1 },
        '-=0.85'
      )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        metaRef.current?.children || [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        '-=0.5'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Hero Scroll exit parallax
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        },
        y: 100,
        opacity: 0.45
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const aboutSec = document.querySelector('#about');
    if (aboutSec) {
      aboutSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-[#C7FF4A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-5 w-96 h-96 bg-[#6C8CFF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Grid: Left Typography, Right 3D Visual */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Headlines & Intro */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Top Tag & Security Status */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111318] border border-white/10 text-xs font-mono text-[#C7FF4A]">
              <span className="w-2 h-2 rounded-full bg-[#C7FF4A] animate-ping" />
              <span>OFFENSIVE SECURITY & VULN RESEARCH</span>
            </span>
            <span className="text-xs font-mono text-[#8E93A0] hidden sm:inline">
              // RECOGNIZED BY WHO & EU
            </span>
          </div>

          {/* Oversized Headline with Clipping Masks */}
          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[0.95] tracking-tight uppercase text-[#F3F3F0] mb-6">
            <div className="overflow-hidden">
              <span ref={headlineLine1Ref} className="block clip-text-reveal">
                {PERSONAL_INFO.heroHeadingLine1}
              </span>
            </div>
            <div className="overflow-hidden mt-1">
              <span
                ref={headlineLine2Ref}
                className="block clip-text-reveal text-transparent bg-clip-text bg-gradient-to-r from-[#F3F3F0] via-[#C7FF4A] to-[#6C8CFF]"
              >
                {PERSONAL_INFO.heroHeadingLine2}
              </span>
            </div>
          </h1>

          {/* Supporting Bio Text */}
          <p
            ref={bioRef}
            className="text-base sm:text-lg md:text-xl text-[#8E93A0] leading-relaxed max-w-2xl font-light mb-8"
          >
            {PERSONAL_INFO.heroBio}
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#C7FF4A] text-[#08090B] font-display font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(199,255,74,0.4)] hover:translate-y-[-2px] active:translate-y-0"
              data-cursor-text="VIEW"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#111318] hover:bg-white/5 border border-white/10 hover:border-white/20 text-[#F3F3F0] font-display font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:translate-y-[-2px]"
              data-cursor-text="CONTACT"
            >
              <span>LET'S CONNECT</span>
            </a>

            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#111318]/60 hover:bg-[#111318] border border-white/10 hover:border-[#C7FF4A]/40 text-[#8E93A0] hover:text-[#C7FF4A] text-xs font-mono transition-colors"
              title="Open Terminal Shell"
              data-cursor-text="CLI"
            >
              <Terminal className="w-4 h-4 text-[#C7FF4A]" />
              <span className="hidden sm:inline">LAUNCH CLI</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive 3D Cyber Hologram */}
        <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] lg:h-[550px] w-full flex items-center justify-center">
          {/* Subtle Cyber Radar Backdrop */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-white/[0.06] animate-subtle-pulse" />
            <div className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-[#C7FF4A]/10" />
            <div className="w-[120px] h-[120px] rounded-full border border-[#6C8CFF]/15" />
          </div>

          {/* Three.js Interactive Cryptographic Mesh */}
          <Scene3D className="z-10" />

          {/* Technical HUD Overlays */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none bg-[#111318]/85 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-[#8E93A0] flex flex-col gap-0.5">
            <span className="text-[#C7FF4A] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4A] animate-pulse" />
              CYBER_NODE: ONLINE
            </span>
            <span className="text-white/50">HASH: SHA256//VALIDATED</span>
          </div>

          <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-[#111318]/85 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-[#8E93A0]">
            <span>COORDINATES: 11.2588° N, 75.7804° E</span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Metadata Row */}
      <div
        ref={metaRef}
        className="relative z-10 pt-8 mt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#8E93A0]"
      >
        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-[#C7FF4A] shrink-0" />
          <div>
            <div className="text-[10px] uppercase text-white/40">LOCATION</div>
            <div className="text-[#F3F3F0] font-medium">Kerala, India</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-[#6C8CFF] shrink-0" />
          <div>
            <div className="text-[10px] uppercase text-white/40">PRIMARY FOCUS</div>
            <div className="text-[#F3F3F0] font-medium">Penetration Testing / AppSec</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#C7FF4A] shrink-0" />
          <div>
            <div className="text-[10px] uppercase text-white/40">RESEARCH DOMAIN</div>
            <div className="text-[#F3F3F0] font-medium">Bug Bounty & Vulnerability Research</div>
          </div>
        </div>
      </div>

      {/* Looping Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="flex justify-center mt-8 select-none"
      >
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 text-[11px] font-mono text-[#8E93A0] hover:text-[#C7FF4A] transition-colors"
          aria-label="Scroll to About section"
          data-cursor-text="DOWN"
        >
          <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-[#C7FF4A]/50 transition-colors">
            <div className="w-1.5 h-2.5 bg-[#C7FF4A] rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
