import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Shield, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar({ onOpenTerminal, activeSection = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Recognition', href: '#recognition' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#08090B]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group select-none"
            data-cursor-text="ROOT"
          >
            <div className="w-9 h-9 rounded-lg bg-[#111318] border border-white/15 flex items-center justify-center font-display font-bold text-sm tracking-tighter text-[#F3F3F0] group-hover:border-[#C7FF4A]/50 transition-colors relative overflow-hidden">
              <span>S<span className="text-[#C7FF4A]">F</span>.</span>
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#C7FF4A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider uppercase text-[#F3F3F0] group-hover:text-white transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4A] animate-pulse" />
                <span className="text-[10px] font-mono text-[#8E93A0] tracking-widest uppercase">
                  CYBERSECURITY RESEARCHER
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#111318]/70 border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1 text-xs font-mono tracking-wider uppercase transition-colors rounded-full ${
                    isActive
                      ? 'text-[#08090B] font-semibold bg-[#C7FF4A]'
                      : 'text-[#8E93A0] hover:text-[#F3F3F0] hover:bg-white/5'
                  }`}
                  data-cursor-text="GOTO"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Terminal Trigger + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#111318] border border-white/10 hover:border-[#C7FF4A]/50 text-xs font-mono text-[#8E93A0] hover:text-[#C7FF4A] transition-all group"
              data-cursor-text="CLI"
              title="Open Interactive Cyber Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-[#C7FF4A] group-hover:scale-110 transition-transform" />
              <span>TERMINAL</span>
              <span className="text-[9px] px-1 py-0.2 bg-white/10 rounded text-white/50 group-hover:text-[#C7FF4A]">
                `
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#111318] border border-white/10 text-[#F3F3F0] hover:text-[#C7FF4A] hover:border-[#C7FF4A]/40 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#08090B]/95 backdrop-blur-xl lg:hidden transition-all duration-300 flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C7FF4A] mb-2 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" /> NAVIGATION INDEX
          </div>

          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center justify-between text-2xl font-display font-medium tracking-tight py-2.5 border-b border-white/[0.06] transition-colors ${
                  isActive ? 'text-[#C7FF4A] pl-2' : 'text-[#8E93A0] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/30">0{idx + 1}</span>
                  {link.label}
                </span>
                <ArrowUpRight className="w-5 h-5 opacity-40" />
              </a>
            );
          })}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTerminal();
            }}
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#111318] border border-[#C7FF4A]/40 text-[#C7FF4A] font-mono text-xs uppercase tracking-wider"
          >
            <Terminal className="w-4 h-4" />
            <span>LAUNCH INTERACTIVE TERMINAL</span>
          </button>
        </div>

        <div className="text-xs font-mono text-[#8E93A0] pt-6 border-t border-white/10 flex flex-col gap-1">
          <span>SALMANUL FARIS · KERALA, INDIA</span>
          <span className="text-white/40">salmanul060@gmail.com</span>
        </div>
      </div>
    </>
  );
}
