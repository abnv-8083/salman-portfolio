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
      // Offset for sticky navbar
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
            ? 'py-3.5 bg-[#090B0E]/90 backdrop-blur-md border-b border-[#26313B]'
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
            <div className="w-9 h-9 rounded-lg bg-[#141920] border border-[#26313B] flex items-center justify-center font-display font-bold text-xs tracking-tight text-[#F3F4F6] group-hover:border-[#C5FF4A] transition-colors relative overflow-hidden">
              <span>S<span className="text-[#C5FF4A]">F</span>.</span>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-wider uppercase text-[#F3F4F6] group-hover:text-white transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5FF4A] animate-pulse" />
                <span className="text-[10px] font-mono text-[#9299A5] tracking-widest uppercase">
                  OFFENSIVE SECURITY
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#141920]/80 border border-[#26313B] rounded-full px-3 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 rounded-full ${
                    isActive
                      ? 'text-[#090B0E] font-semibold bg-[#C5FF4A]'
                      : 'text-[#9299A5] hover:text-[#F3F4F6] hover:bg-white/[0.04]'
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141920] hover:bg-[#141920]/80 border border-[#26313B] hover:border-[#C5FF4A]/50 text-xs font-mono text-[#9299A5] hover:text-[#C5FF4A] transition-colors"
              title="Open Terminal Shell (`)"
              data-cursor-text="CLI"
              aria-label="Open CLI Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-[#C5FF4A]" />
              <span className="text-[11px]">CLI (` )</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C5FF4A] hover:bg-[#b8f53a] text-[#090B0E] font-display font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95"
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
              className="p-2 rounded-lg bg-[#141920] border border-[#26313B] text-[#C5FF4A]"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141920] border border-[#26313B] text-[#F3F4F6] hover:text-[#C5FF4A] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090B0E]/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-10 flex flex-col justify-between border-b border-[#26313B]">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-mono text-[#9299A5] uppercase tracking-widest mb-2">
              NAVIGATION DIRECTORY
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-3 px-4 rounded-xl font-display font-semibold text-xl tracking-tight text-[#F3F4F6] hover:text-[#C5FF4A] hover:bg-[#141920] border border-transparent hover:border-[#26313B] transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#9299A5]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#26313B] flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full py-3.5 rounded-xl bg-[#C5FF4A] text-[#090B0E] font-display font-bold text-center tracking-wider uppercase text-sm"
            >
              CONTACT SALMANUL
            </a>
            <div className="flex items-center justify-between text-xs font-mono text-[#9299A5] px-2 pt-2">
              <span>STATUS: AVAILABLE FOR AUDITS</span>
              <span className="text-[#C5FF4A]">v2.6.4</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
