import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
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

export default function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'about', 'expertise', 'projects', 'recognition', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
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

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F3F3F0] font-sans selection:bg-[#C7FF4A] selection:text-[#08090B] relative overflow-x-hidden">
      {/* Preloader */}
      {!isPreloaderDone && (
        <Preloader onComplete={() => setIsPreloaderDone(true)} />
      )}

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Fixed Navbar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main className="relative">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        <Expertise />
        <Projects />
        <Recognition />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive Modal Terminal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
