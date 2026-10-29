import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar({ onOpenTerminal, activeSection = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Recognition', href: '#recognition' },
    { label: 'Experience', href: '#experience' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const yOffset = -80;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#000000]/90 backdrop-blur-md border-b border-[#2D2D2D]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Identity / Left Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group select-none cursor-pointer"
            data-cursor-text="ROOT"
            aria-label="Salmanul Faris Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0D0D0D] border border-[#2D2D2D] flex items-center justify-center font-display font-bold text-xs tracking-tight text-[#F3F4F6] group-hover:border-[#2CFF05] transition-colors relative overflow-hidden">
              <span>S<span className="text-[#2CFF05]">F</span>.</span>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-wider uppercase text-[#F3F4F6] group-hover:text-white transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2CFF05] animate-pulse" />
                <span className="text-[10px] font-mono text-[#9E9E9E] tracking-widest uppercase">
                  OFFENSIVE SECURITY
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0D0D0D]/90 border border-[#2D2D2D] rounded-full px-3 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 rounded-full ${
                    isActive
                      ? 'text-[#000000] font-bold bg-[#2CFF05] shadow-[0_0_15px_rgba(44,255,5,0.4)]'
                      : 'text-[#9E9E9E] hover:text-[#F3F4F6] hover:bg-white/[0.04]'
                  }`}
                  data-cursor-text="GOTO"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: CLI Terminal & Contact CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D0D0D] hover:bg-[#141414] border border-[#2D2D2D] hover:border-[#BF00FF]/60 text-xs font-mono text-[#9E9E9E] hover:text-[#BF00FF] transition-all"
              title="Open Terminal Shell (`)"
              data-cursor-text="CLI"
              aria-label="Open CLI Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-[#BF00FF]" />
              <span className="text-[11px]">CLI (` )</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2CFF05] hover:bg-[#28e604] text-[#000000] font-display font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(44,255,5,0.25)]"
              data-cursor-text="CONTACT"
            >
              <span>CONTACT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-[#0D0D0D] border border-[#2D2D2D] text-[#BF00FF]"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0D0D0D] border border-[#2D2D2D] text-[#F3F4F6] hover:text-[#2CFF05] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#000000]/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-10 flex flex-col justify-between border-b border-[#2D2D2D]">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-mono text-[#9E9E9E] uppercase tracking-widest mb-2">
              NAVIGATION DIRECTORY
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-3 px-4 rounded-xl font-display font-semibold text-xl tracking-tight text-[#F3F4F6] hover:text-[#2CFF05] hover:bg-[#0D0D0D] border border-transparent hover:border-[#2D2D2D] transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#BF00FF]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#2D2D2D] flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full py-3.5 rounded-xl bg-[#2CFF05] text-[#000000] font-display font-bold text-center tracking-wider uppercase text-sm shadow-[0_0_20px_rgba(44,255,5,0.3)]"
            >
              CONTACT SALMANUL
            </a>
            <div className="flex items-center justify-between text-xs font-mono text-[#9E9E9E] px-2 pt-2">
              <span>STATUS: AVAILABLE FOR AUDITS</span>
              <span className="text-[#BF00FF]">v2.6.4</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
