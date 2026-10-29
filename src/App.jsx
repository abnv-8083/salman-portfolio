import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Recognition from './components/Recognition';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import InteractiveTerminal from './components/InteractiveTerminal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section for clean navigation indicators
  useEffect(() => {
    const sections = ['home', 'about', 'expertise', 'projects', 'recognition', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Refresh ScrollTrigger after initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#F3F4F6] font-sans selection:bg-[#00F0FF] selection:text-[#000000] relative overflow-x-hidden">
      {/* Precision Desktop Cursor */}
      <CustomCursor />

      {/* Sticky Navigation Header */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Experience Flow */}
      <main className="relative">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        <Expertise />
        <Projects />
        <Recognition />
        <Experience />
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
