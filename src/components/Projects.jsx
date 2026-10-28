import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Terminal, ShieldCheck, AlertTriangle, RefreshCw, KeyRound, Check, FileCheck,
  AlertOctagon, Smartphone, Database, Lock, ArrowUpRight, Play, Eye
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  // Project 1: SIEM Log state
  const [siemFilter, setSiemFilter] = useState('ALL');
  const [isSiemStreaming, setIsSiemStreaming] = useState(true);

  // Project 2: Flask Auth demo state
  const [authPassword, setAuthPassword] = useState('PassKey_99#Secure');
  const [saltVal] = useState('$2b$12$uE3Z98kL1mQwX89Vp4');

  // Project 3: FIM simulator state
  const [fimModified, setFimModified] = useState(false);
  const baselineHash = '8f43a6d912e9b87c4f1e00a293bc58f7e2d19483c678a129ef3019842a8b91dc';
  const modifiedHash = 'e9c814b7201a93ff00b12d784a91c4983d8e901bca2849ef1827492c6819bade';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentProject = PROJECTS[activeTab];

  // SIEM logs sample data
  const siemLogs = [
    { time: '10:14:22', level: 'CRIT', msg: 'SSH Brute-Force alert: 42 failed auth attempts from 192.168.1.105', color: 'text-rose-400' },
    { time: '10:14:15', level: 'WARN', msg: 'Port Sweep detected: TCP SYN scan across range 1-1024', color: 'text-amber-400' },
    { time: '10:13:58', level: 'INFO', msg: 'UFW Firewall DROP: IN=eth0 OUT= SRC=10.0.0.14 PROTO=UDP SPT=5353', color: 'text-blue-400' },
    { time: '10:13:42', level: 'CRIT', msg: 'Suspicious privilege execution: sudo access probe by user www-data', color: 'text-rose-400' },
    { time: '10:12:05', level: 'INFO', msg: 'Syslog daemon normalized index: 1,420 events/sec ingested', color: 'text-emerald-400' },
  ];

  const filteredLogs = siemLogs.filter(log => {
    if (siemFilter === 'ALL') return true;
    return log.level === siemFilter;
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C7FF4A] uppercase">
          03 / SELECTED PROJECTS
        </span>
        <div className="h-[1px] w-12 bg-[#C7FF4A]/40" />
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-[#F3F3F0] leading-[1.05]"
        >
          BUILT TO DETECT.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7FF4A] to-[#6C8CFF]">
            DESIGNED TO PROTECT.
          </span>
        </h2>

        <p className="max-w-md text-[#8E93A0] text-sm font-light leading-relaxed">
          Applied security engineering and software tools developed to analyze logs, enforce cryptographic integrity, and secure application surfaces.
        </p>
      </div>

      {/* Project Selector Navigation Pills */}
      <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-white/[0.08]">
        {PROJECTS.map((proj, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={proj.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
                isActive
                  ? 'bg-[#C7FF4A] text-[#08090B] font-bold shadow-[0_0_20px_rgba(199,255,74,0.3)]'
                  : 'bg-[#111318] text-[#8E93A0] hover:text-white hover:bg-white/5 border border-white/10'
              }`}
              data-cursor-text="VIEW"
            >
              <span className="text-[#C7FF4A] group-hover:text-[#08090B] font-bold">{proj.index}</span>
              <span className="font-display font-semibold hidden sm:inline">{proj.title}</span>
              <span className="font-display font-semibold sm:hidden">{proj.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Project Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Project Details & Metadata */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#111318] border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            {/* Top Indicator */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-[#C7FF4A] tracking-widest uppercase">
                PROJECT {currentProject.index} / 04
              </span>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                {currentProject.badge}
              </span>
            </div>

            {/* Title & Headline */}
            <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4 leading-tight">
              {currentProject.title}
            </h3>

            <p className="text-base text-[#F3F3F0] font-normal leading-relaxed mb-4">
              {currentProject.description}
            </p>

            <p className="text-sm text-[#8E93A0] font-light leading-relaxed mb-8">
              {currentProject.extendedDetails}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-4 rounded-xl bg-[#08090B]/80 border border-white/[0.06]">
              {currentProject.metrics.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] font-mono text-white/40 uppercase mb-0.5">{m.label}</span>
                  <span className="text-xs font-mono font-semibold text-[#C7FF4A]">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="relative z-10 pt-6 border-t border-white/[0.08]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-3">
              TECHNOLOGIES EMPLOYED
            </div>
            <div className="flex flex-wrap gap-2">
              {currentProject.technologies.map(tech => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Custom Interactive Simulated Interfaces */}
        <div className="lg:col-span-7 rounded-3xl bg-[#111318] border border-white/10 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />

          {/* 1. PROJECT 01: SOC LAB WITH GRAYLOG SIEM */}
          {currentProject.interactiveType === 'siem-terminal' && (
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-[#F3F3F0] ml-2">
                      GRAYLOG SIEM // STREAM INGESTION CONSOLE
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {['ALL', 'CRIT', 'WARN', 'INFO'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setSiemFilter(filter)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                          siemFilter === filter
                            ? 'bg-[#C7FF4A] text-[#08090B] font-bold'
                            : 'bg-white/5 text-white/60 hover:text-white'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Log Event Stream */}
                <div className="space-y-2.5 font-mono text-xs bg-[#08090B] p-4 rounded-xl border border-white/[0.08] max-h-64 overflow-y-auto">
                  {filteredLogs.map((log, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 text-white/80 py-1 border-b border-white/[0.04] last:border-0">
                      <span className="text-white/30 text-[10px] shrink-0">{log.time}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                        log.level === 'CRIT' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        log.level === 'WARN' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        [{log.level}]
                      </span>
                      <span className="truncate text-white/90">{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Volume Graph Simulation */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-2">
                  <span>CORRELATED TELEMETRY VOLUME (EVENTS/MIN)</span>
                  <span className="text-[#C7FF4A]">STATUS: LIVE CORRELATION ACTIVE</span>
                </div>
                <div className="h-16 flex items-end gap-1.5 bg-[#08090B] p-2 rounded-lg border border-white/[0.06]">
                  {[30, 45, 25, 60, 40, 85, 95, 70, 40, 55, 30, 80, 65, 45, 90, 35, 50].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all duration-300 ${
                        h > 75 ? 'bg-rose-500' : h > 50 ? 'bg-[#C7FF4A]' : 'bg-[#6C8CFF]/60'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. PROJECT 02: FLASK AUTHENTICATION APP */}
          {currentProject.interactiveType === 'auth-flow' && (
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#C7FF4A]" />
                    <span className="text-xs font-mono text-[#F3F3F0]">
                      CRYPTOGRAPHIC AUTH PIPELINE // FLASK + BCRYPT
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C7FF4A]/10 text-[#C7FF4A] border border-[#C7FF4A]/30">
                    ROUNDS: 12 (ADAPTIVE)
                  </span>
                </div>

                {/* Interactive Password Input */}
                <div className="mb-4">
                  <label className="text-[11px] font-mono uppercase text-white/40 block mb-1.5">
                    TEST AUTHENTICATION INPUT
                  </label>
                  <input
                    type="text"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-[#08090B] border border-white/15 focus:border-[#C7FF4A] rounded-xl px-4 py-2.5 text-sm font-mono text-[#C7FF4A] outline-none"
                    placeholder="Enter password..."
                  />
                </div>

                {/* Auth Security Breakdown */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-[#08090B] border border-white/[0.06]">
                    <div className="text-[10px] text-white/40 mb-1">SALT GENERATION (CSPRNG):</div>
                    <div className="text-[#6C8CFF] truncate">{saltVal}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#08090B] border border-white/[0.06]">
                    <div className="text-[10px] text-white/40 mb-1">COMPUTED BCRYPT HASH ($2b$12):</div>
                    <div className="text-[#C7FF4A] truncate font-semibold">
                      $2b$12$uE3Z98kL1mQwX89Vp4...9a8f2c10b4
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-[#08090B] border border-white/[0.06] flex items-center gap-2 text-white/80">
                      <ShieldCheck className="w-4 h-4 text-[#C7FF4A] shrink-0" />
                      <span>HttpOnly + SameSite Cookie</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#08090B] border border-white/[0.06] flex items-center gap-2 text-white/80">
                      <Lock className="w-4 h-4 text-[#6C8CFF] shrink-0" />
                      <span>CSRF Token Synchronizer</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-[#8E93A0] flex items-center justify-between">
                <span>DEFENSE: BRUTE FORCE & RAINBOW TABLES MITIGATED</span>
                <span className="text-[#C7FF4A]">STATUS: PASS</span>
              </div>
            </div>
          )}

          {/* 3. PROJECT 03: FILE INTEGRITY MONITOR (FIM) */}
          {currentProject.interactiveType === 'fim-simulator' && (
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#C7FF4A]" />
                    <span className="text-xs font-mono text-[#F3F3F0]">
                      PYTHON FIM // CRYPTOGRAPHIC AUDITING ENGINE
                    </span>
                  </div>

                  <button
                    onClick={() => setFimModified(!fimModified)}
                    className={`text-[10px] font-mono px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                      fimModified
                        ? 'bg-rose-500 text-white font-bold'
                        : 'bg-[#C7FF4A] text-[#08090B] font-bold hover:shadow-[0_0_15px_rgba(199,255,74,0.4)]'
                    }`}
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{fimModified ? 'RESTORE ORIGINAL FILE' : 'SIMULATE TAMPER EVENT'}</span>
                  </button>
                </div>

                {/* Target File Meta */}
                <div className="bg-[#08090B] p-4 rounded-xl border border-white/[0.08] mb-4 font-mono text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/40">AUDITED TARGET:</span>
                    <span className="text-[#F3F3F0]">/var/www/auth_controller.py</span>
                  </div>

                  {/* Baseline Fingerprint */}
                  <div className="mb-3">
                    <div className="text-[10px] text-white/40 mb-1">BASELINE SHA-256 FINGERPRINT:</div>
                    <div className="text-xs text-white/70 truncate bg-white/5 p-2 rounded border border-white/5">
                      {baselineHash}
                    </div>
                  </div>

                  {/* Current Inspected Hash */}
                  <div>
                    <div className="text-[10px] text-white/40 mb-1">CURRENT REAL-TIME DIGEST:</div>
                    <div className={`text-xs truncate p-2 rounded border font-semibold ${
                      fimModified
                        ? 'bg-rose-950/40 text-rose-400 border-rose-500/50'
                        : 'bg-[#C7FF4A]/10 text-[#C7FF4A] border-[#C7FF4A]/30'
                    }`}>
                      {fimModified ? modifiedHash : baselineHash}
                    </div>
                  </div>
                </div>

                {/* Alert Notification Box */}
                {fimModified ? (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-3 text-rose-300">
                    <AlertOctagon className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                    <div className="text-xs font-mono">
                      <div className="font-bold text-rose-200 uppercase tracking-wide">
                        ALARM: UNAUTHORIZED TAMPER DETECTED
                      </div>
                      <div className="text-rose-300/80 mt-1">
                        Bit-level modification occurred in /var/www/auth_controller.py. Cryptographic checksum failed. Audit incident #FIM-902 dispatched.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3 text-emerald-300">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-[#C7FF4A] mt-0.5" />
                    <div className="text-xs font-mono">
                      <div className="font-bold text-emerald-200 uppercase tracking-wide">
                        INTEGRITY VERIFIED // ZERO ANOMALIES
                      </div>
                      <div className="text-emerald-300/80 mt-1">
                        Live checksum matches stored cryptographic manifest. Monitored file systems secure.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-[#8E93A0] flex items-center justify-between">
                <span>HASH ENGINE: SHA-256 HMAC</span>
                <span className={fimModified ? 'text-rose-400 font-bold' : 'text-[#C7FF4A]'}>
                  {fimModified ? 'ALERT TRIGGERED' : 'FIM STATUS: OPTIMAL'}
                </span>
              </div>
            </div>
          )}

          {/* 4. PROJECT 04: RENTAL APPLICATION */}
          {currentProject.interactiveType === 'mobile-mockup' && (
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#C7FF4A]" />
                    <span className="text-xs font-mono text-[#F3F3F0]">
                      FLUTTER & FIREBASE // SECURE CLOUD MOBILE APP
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/10">
                    CROSS-PLATFORM
                  </span>
                </div>

                {/* Layered Mobile Mockup Display */}
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-2">
                  {/* Smartphone Frame */}
                  <div className="w-56 rounded-3xl bg-[#08090B] border-2 border-white/20 p-3 shadow-2xl relative">
                    <div className="w-16 h-3 bg-white/20 rounded-full mx-auto mb-3" />

                    {/* App UI */}
                    <div className="rounded-2xl bg-[#111318] p-3 border border-white/10 text-white font-sans text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-xs text-[#C7FF4A]">RentalHub</span>
                        <div className="w-4 h-4 rounded-full bg-[#6C8CFF]" />
                      </div>

                      {/* Property Preview Card */}
                      <div className="rounded-xl bg-[#181B22] p-2.5 mb-2 border border-white/5">
                        <div className="w-full h-16 rounded-lg bg-gradient-to-tr from-cyan-900 to-indigo-900 mb-2 flex items-center justify-center text-[10px] font-mono text-white/50">
                          [PROPERTY PREVIEW]
                        </div>
                        <div className="font-semibold text-xs">Horizon Villa</div>
                        <div className="text-[10px] text-white/60">Kochi, Kerala</div>
                        <div className="text-[11px] font-bold text-[#C7FF4A] mt-1">₹35,000 / mo</div>
                      </div>

                      <div className="text-[9px] font-mono text-center text-[#8E93A0]">
                        ● SYNCED WITH FIRESTORE
                      </div>
                    </div>
                  </div>

                  {/* Security Policy Inspection Cards */}
                  <div className="space-y-3 font-mono text-xs max-w-xs">
                    <div className="p-3 rounded-xl bg-[#08090B] border border-white/[0.08]">
                      <div className="text-[10px] text-white/40 mb-1">FIRESTORE SECURITY RULE:</div>
                      <code className="text-[#C7FF4A] text-[11px] block">
                        match /rentals/{'{id}'} {'{'}<br />
                        &nbsp;&nbsp;allow read: if true;<br />
                        &nbsp;&nbsp;allow write: if request.auth != null;<br />
                        {'}'}
                      </code>
                    </div>

                    <div className="p-3 rounded-xl bg-[#08090B] border border-white/[0.08]">
                      <div className="text-[10px] text-white/40 mb-1">AUTHENTICATION:</div>
                      <div className="text-[#6C8CFF] text-[11px]">
                        Multi-Factor Firebase SMS & Email Token Validation
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-[#8E93A0] flex items-center justify-between">
                <span>STACK: FLUTTER · DART · FIREBASE</span>
                <span className="text-[#C7FF4A]">SECURITY POSTURE: HARDENED</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
