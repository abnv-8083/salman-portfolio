import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Terminal, Cpu } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SECURE HANDSHAKE...');
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const messages = [
      { at: 15, text: 'ESTABLISHING SECURE HANDSHAKE...' },
      { at: 35, text: 'LOCATING RESEARCH DOSSIER [SF-SEC-2026]...' },
      { at: 60, text: 'VERIFYING VULNERABILITY DISCLOSURE RECORDS...' },
      { at: 85, text: 'INITIALIZING SECURE CONNECTION...' },
      { at: 100, text: 'ACCESS GRANTED // SESSION ENCRYPTED' }
    ];

    const duration = 1800; // 1.8 seconds total
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(rawProgress);

      const currentMsg = [...messages].reverse().find(m => rawProgress >= m.at);
      if (currentMsg) {
        setStatusText(currentMsg.text);
      }

      if (rawProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(finishPreloader, 250);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);

    const finishPreloader = () => {
      if (!containerRef.current) {
        onComplete?.();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        }
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.7,
        ease: 'power4.inOut'
      }, '-=0.1');
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finishPreloader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#08090B] flex flex-col items-center justify-center p-6 text-white scanlines select-none"
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }}
    >
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div ref={contentRef} className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Monogram Symbol */}
        <div className="relative mb-8 group">
          <div className="w-20 h-20 rounded-2xl bg-[#111318] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(199,255,74,0.15)]">
            <span className="font-display font-bold text-3xl tracking-tighter text-[#F3F3F0]">
              S<span className="text-[#C7FF4A]">F</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-[#C7FF4A]/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C7FF4A] shadow-[0_0_10px_#C7FF4A] animate-pulse" />
          </div>

          {/* Status badge */}
          <div className="absolute -bottom-2 -right-2 bg-[#08090B] border border-[#C7FF4A]/40 rounded-full p-1 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#C7FF4A]" />
          </div>
        </div>

        {/* Identity */}
        <div className="text-center mb-6">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#8E93A0] mb-1">
            SALMANUL FARIS
          </div>
          <div className="text-sm font-mono text-[#C7FF4A] tracking-wider flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>SECURITY_CORE.SH</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#111318] border border-white/10 rounded-full h-1.5 mb-4 overflow-hidden p-[1px] relative">
          <div
            className="h-full bg-[#C7FF4A] rounded-full transition-all duration-75 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_8px_#fff]" />
          </div>
        </div>

        {/* Progress Details */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#8E93A0]">
          <span className="truncate pr-2 text-[#F3F3F0]">{statusText}</span>
          <span className="text-[#C7FF4A] font-semibold tracking-wider tabular-nums">
            {progress}%
          </span>
        </div>

        {/* Skip instruction */}
        <button
          onClick={() => onComplete?.()}
          className="mt-8 text-[11px] font-mono tracking-widest text-white/30 hover:text-[#C7FF4A] transition-colors uppercase border-b border-transparent hover:border-[#C7FF4A]/40 pb-0.5"
        >
          [ SKIP INTRO / ESC ]
        </button>
      </div>
    </div>
  );
}
