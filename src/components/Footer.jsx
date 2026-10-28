import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MediumIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer({ onOpenTerminal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#26313B] bg-[#090B0E] pt-16 pb-12 px-6 md:px-12 max-w-7xl mx-auto select-none">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#26313B]">
        {/* Left: Brand Identity */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5FF4A] animate-pulse" />
            <span className="font-display font-bold text-lg tracking-wider text-[#F3F4F6]">
              {PERSONAL_INFO.name.toUpperCase()}
            </span>
          </div>
          <div className="text-xs font-mono text-[#9299A5] tracking-wider uppercase">
            PENETRATION TESTER · CYBERSECURITY RESEARCHER
          </div>
          <div className="text-[11px] font-mono text-[#9299A5]/60 pt-1">
            BASED IN KERALA, INDIA · OPEN FOR OFFENSIVE SECURITY COLLABORATIONS
          </div>
        </div>

        {/* Center: Quick Links & Terminal Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="px-3.5 py-2 rounded-lg bg-[#141920] border border-[#26313B] hover:border-[#C5FF4A]/50 text-xs font-mono text-[#9299A5] hover:text-[#C5FF4A] transition-colors flex items-center gap-2"
          >
            <Terminal className="w-3.5 h-3.5 text-[#C5FF4A]" />
            <span>OPEN CLI ( ` )</span>
          </button>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-[#141920] hover:bg-white/[0.05] border border-[#26313B] text-[#F3F4F6] transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-[#141920] hover:bg-white/[0.05] border border-[#26313B] text-[#C5FF4A] transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socials.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-[#141920] hover:bg-white/[0.05] border border-[#26313B] text-[#C5FF4A] transition-colors"
            title="Medium"
          >
            <MediumIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Smooth Back-to-Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141920] hover:bg-[#141920]/80 border border-[#26313B] hover:border-[#C5FF4A]/40 text-xs font-mono text-[#9299A5] hover:text-[#F3F4F6] transition-all"
            data-cursor-text="TOP"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C5FF4A] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Terminal Closing Line & Copyright */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9299A5]">
        <div className="flex items-center gap-2 text-[11px]">
          <Terminal className="w-3 h-3 text-[#C5FF4A]" />
          <span>
            salmanul@security-node:~$ exit 0 // SESSION SECURE
          </span>
        </div>

        <div>
          {PERSONAL_INFO.name.toUpperCase()} © 2026. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
