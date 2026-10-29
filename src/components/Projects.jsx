import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  KeyRound, FileCheck, Smartphone, ArrowUpRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  // Project 1: SIEM Log state
  const [siemFilter, setSiemFilter] = useState('ALL');

  // Project 2: Flask Auth demo state
  const [authPassword, setAuthPassword] = useState('PassKey_99#Secure');
  const [saltVal] = useState('$2b$12$uE3Z98kL1mQwX89Vp4');

  // Project 3: FIM simulator state
  const [fimModified, setFimModified] = useState(false);
  const baselineHash = '8f43a6d912e9b87c4f1e00a293bc58f7e2d19483c678a129ef3019842a8b91dc';
  const modifiedHash = 'e9c814b7201a93ff00b12d784a91c4983d8e901bca2849ef1827492c6819bade';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (prefersReducedMotion || !isDesktop) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 96;
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const idx = Math.min(
              Math.floor(self.progress * PROJECTS.length),
              PROJECTS.length - 1
            );
            setCurrentPanelIndex(idx);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const siemLogs = [
    { time: '10:14:22', level: 'CRIT', msg: 'SSH Brute-Force alert: 42 failed auth attempts from 192.168.1.105' },
    { time: '10:14:15', level: 'WARN', msg: 'Port Sweep detected: TCP SYN scan across range 1-1024' },
    { time: '10:13:58', level: 'INFO', msg: 'UFW Firewall DROP: IN=eth0 SRC=10.0.0.14 PROTO=UDP SPT=5353' },
    { time: '10:13:42', level: 'CRIT', msg: 'Suspicious privilege execution: sudo access probe by user www-data' },
    { time: '10:12:05', level: 'INFO', msg: 'Syslog daemon normalized index: 1,420 events/sec ingested' }
  ];

  const filteredLogs = siemLogs.filter(log => {
    if (siemFilter === 'ALL') return true;
    return log.level === siemFilter;
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#000000] border-b border-[#2D2D2D] overflow-hidden"
    >
      {/* Top Header Information Bar */}
      <div className="pt-24 pb-10 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono tracking-[0.25em] text-[#00F0FF] uppercase">
              03 / FEATURED PROJECTS
            </span>
            <div className="h-[1px] w-12 bg-[#2D2D2D]" />
          </div>

          <h2 className="font-display font-bold text-section-headline text-[#F3F4F6] uppercase leading-[1.05]">
            BUILT TO DETECT.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#BF00FF]">
              DESIGNED TO PROTECT.
            </span>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <p className="max-w-md text-sm text-[#9E9E9E] font-light leading-relaxed md:text-right">
            Applied offensive engineering, cryptographic baseline tools, and log correlation systems.
          </p>

          {/* Desktop Horizontal Scroll Indicator */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-[#9E9E9E]">
            <span>HORIZONTAL VIEWPORT [0{currentPanelIndex + 1} / 0{PROJECTS.length}]</span>
            <div className="w-32 h-1.5 bg-[#0D0D0D] border border-[#2D2D2D] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00F0FF] to-[#BF00FF] transition-all duration-150"
                style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Track Container: Desktop Pins & Horizontal Translation / Mobile Native Stack */}
      <div className="pb-24 px-6 md:px-12 overflow-x-auto lg:overflow-visible scrollbar-none">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full lg:w-max items-stretch"
        >
          {PROJECTS.map((project, idx) => {
            const isPurpleTheme = idx % 2 === 1;
            return (
              <div
                key={project.id}
                className={`w-full lg:w-[860px] xl:w-[940px] shrink-0 rounded-2xl bg-[#0D0D0D] border border-[#2D2D2D] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  isPurpleTheme ? 'hover:border-[#BF00FF]/60' : 'hover:border-[#00F0FF]/50'
                }`}
              >
                {/* Top Meta Header */}
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#2D2D2D] text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-bold ${isPurpleTheme ? 'text-[#BF00FF]' : 'text-[#00F0FF]'}`}>
                        {project.index}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#000000] border border-[#2D2D2D] text-[#9E9E9E] tracking-wider text-[11px]">
                        {project.badge}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#9E9E9E] hidden sm:block">
                      RESEARCH FILE: SF-{project.id.toUpperCase()}
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                    {/* Left Column: Typography & Description */}
                    <div className="lg:col-span-6 flex flex-col">
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F3F4F6] mb-3 leading-tight">
                        {project.title}
                      </h3>

                      <p className={`text-xs font-mono uppercase tracking-wider mb-4 ${isPurpleTheme ? 'text-[#BF00FF]' : 'text-[#00F0FF]'}`}>
                        {project.headline}
                      </p>

                      <p className="text-sm text-[#9E9E9E] font-light leading-relaxed mb-6">
                        {project.extendedDetails}
                      </p>

                      {/* Key Technical Metrics */}
                      <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#2D2D2D] text-xs font-mono mb-6">
                        {project.metrics.map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-[10px] text-[#9E9E9E] uppercase">{m.label}</div>
                            <div className="text-[#F3F4F6] font-medium truncate">{m.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-[#000000] border border-[#2D2D2D] text-[11px] font-mono text-[#F3F4F6]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Interactive Project Simulator */}
                    <div className="lg:col-span-6 bg-[#000000] rounded-xl border border-[#2D2D2D] p-5 flex flex-col justify-between min-h-[340px]">
                      {/* Project 1: SIEM Stream Simulator */}
                      {project.interactiveType === 'siem-terminal' && (
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2D2D2D] text-xs font-mono">
                              <span className="text-[#00F0FF] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                                GRAYLOG_EVENT_STREAM
                              </span>
                              <div className="flex gap-1 text-[10px]">
                                {['ALL', 'CRIT', 'WARN'].map(f => (
                                  <button
                                    key={f}
                                    onClick={() => setSiemFilter(f)}
                                    className={`px-2 py-0.5 rounded ${
                                      siemFilter === f ? 'bg-[#00F0FF] text-[#000000] font-bold' : 'text-[#9E9E9E] hover:text-white'
                                    }`}
                                  >
                                    {f}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2 text-[11px] font-mono">
                              {filteredLogs.map((log, lIdx) => (
                                <div key={lIdx} className="p-2 rounded bg-[#0D0D0D] border border-[#2D2D2D] leading-tight">
                                  <span className="text-[#9E9E9E] mr-2">{log.time}</span>
                                  <span className={`mr-2 font-bold ${log.level === 'CRIT' ? 'text-rose-400' : log.level === 'WARN' ? 'text-[#BF00FF]' : 'text-[#00F0FF]'}`}>
                                    [{log.level}]
                                  </span>
                                  <span className="text-[#F3F4F6]">{log.msg}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-[#2D2D2D] text-[10px] font-mono text-[#9E9E9E] flex justify-between">
                            <span>INGESTION: 1,420 EVT/SEC</span>
                            <span className="text-[#00F0FF]">GROK: MATCHED</span>
                          </div>
                        </div>
                      )}

                      {/* Project 2: Flask Auth Bcrypt Demo */}
                      {project.interactiveType === 'auth-flow' && (
                        <div className="flex flex-col h-full justify-between font-mono text-xs">
                          <div>
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2D2D2D]">
                              <span className="text-[#BF00FF] flex items-center gap-1.5">
                                <KeyRound className="w-3.5 h-3.5" />
                                BCRYPT_KEY_DERIVATION
                              </span>
                              <span className="text-[10px] text-[#9E9E9E]">COST: 12 ROUNDS</span>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] text-[#9E9E9E] block mb-1">PLAINTEXT PAYLOAD</label>
                                <input
                                  type="text"
                                  value={authPassword}
                                  onChange={(e) => setAuthPassword(e.target.value)}
                                  className="w-full px-3 py-1.5 rounded bg-[#0D0D0D] border border-[#2D2D2D] text-[#F3F4F6] text-xs focus:border-[#BF00FF] focus:outline-none"
                                />
                              </div>

                              <div className="p-2.5 rounded bg-[#0D0D0D] border border-[#2D2D2D]">
                                <div className="text-[10px] text-[#9E9E9E] mb-1">SALT GENERATION</div>
                                <div className="text-[#BF00FF] text-[11px] truncate">{saltVal}</div>
                              </div>

                              <div className="p-2.5 rounded bg-[#0D0D0D] border border-[#2D2D2D]">
                                <div className="text-[10px] text-[#9E9E9E] mb-1">COMPUTED DIGEST</div>
                                <div className="text-[#F3F4F6] text-[11px] break-all leading-tight">
                                  $2b$12$uE3Z98kL1mQwX89Vp4.o{authPassword.length}K9a8vX41e
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-[#2D2D2D] text-[10px] text-[#9E9E9E] flex justify-between">
                            <span>COOKIE: HttpOnly; Secure; SameSite=Strict</span>
                            <span className="text-[#00F0FF]">CSRF: VALID</span>
                          </div>
                        </div>
                      )}

                      {/* Project 3: FIM Simulator */}
                      {project.interactiveType === 'fim-simulator' && (
                        <div className="flex flex-col h-full justify-between font-mono text-xs">
                          <div>
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2D2D2D]">
                              <span className="text-[#00F0FF] flex items-center gap-1.5">
                                <FileCheck className="w-3.5 h-3.5" />
                                FILE_INTEGRITY_MONITOR
                              </span>
                              <span className="text-[10px] text-[#9E9E9E]">SHA-256 MANIFEST</span>
                            </div>

                            <div className="space-y-3">
                              <div className="p-2.5 rounded bg-[#0D0D0D] border border-[#2D2D2D]">
                                <div className="text-[10px] text-[#9E9E9E] mb-1">MONITORED TARGET</div>
                                <div className="text-[#F3F4F6] text-[11px]">/etc/nginx/nginx.conf</div>
                              </div>

                              <div className="p-2.5 rounded bg-[#0D0D0D] border border-[#2D2D2D]">
                                <div className="text-[10px] text-[#9E9E9E] mb-1">BASELINE DIGEST</div>
                                <div className="text-[#9E9E9E] text-[10px] break-all">{baselineHash}</div>
                              </div>

                              <div className={`p-2.5 rounded border ${fimModified ? 'bg-rose-950/20 border-rose-500/50' : 'bg-[#0D0D0D] border-[#2D2D2D]'}`}>
                                <div className="text-[10px] text-[#9E9E9E] mb-1">CURRENT SCANNED DIGEST</div>
                                <div className={`text-[10px] break-all ${fimModified ? 'text-rose-400 font-bold' : 'text-[#00F0FF]'}`}>
                                  {fimModified ? modifiedHash : baselineHash}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-[#2D2D2D] flex items-center justify-between">
                            <button
                              onClick={() => setFimModified(!fimModified)}
                              className="px-3 py-1 rounded bg-[#0D0D0D] hover:bg-[#141414] border border-[#2D2D2D] text-[10px] text-[#00F0FF]"
                            >
                              {fimModified ? 'RESET BASELINE' : 'SIMULATE FILE TAMPER'}
                            </button>
                            <span className={`text-[10px] ${fimModified ? 'text-rose-400' : 'text-[#00F0FF]'}`}>
                              {fimModified ? 'STATUS: TAMPER DETECTED!' : 'STATUS: UNMODIFIED'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Project 4: Mobile Mockup / RBAC Inspection */}
                      {project.interactiveType === 'mobile-mockup' && (
                        <div className="flex flex-col h-full justify-between font-mono text-xs">
                          <div>
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2D2D2D]">
                              <span className="text-[#BF00FF] flex items-center gap-1.5">
                                <Smartphone className="w-3.5 h-3.5" />
                                FIRESTORE_SECURITY_RULES
                              </span>
                              <span className="text-[10px] text-[#9E9E9E]">RBAC ISOLATION</span>
                            </div>

                            <div className="bg-[#0D0D0D] p-3 rounded border border-[#2D2D2D] text-[10px] text-[#9E9E9E] leading-relaxed">
                              <span className="text-[#BF00FF]">service</span> cloud.firestore &#123;<br />
                              &nbsp;&nbsp;<span className="text-[#00F0FF]">match</span> /databases/&#123;database&#125;/documents &#123;<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#00F0FF]">match</span> /properties/&#123;propertyId&#125; &#123;<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">allow read:</span> if request.auth != null;<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">allow write:</span> if request.auth.uid == resource.data.landlordId;<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                              &nbsp;&nbsp;&#125;<br />
                              &#125;
                            </div>
                          </div>

                          <div className="pt-3 border-t border-[#2D2D2D] text-[10px] text-[#9E9E9E] flex justify-between">
                            <span>TENANT ISOLATION: ENFORCED</span>
                            <span className="text-[#00F0FF]">MULTI-TENANT: OK</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#2D2D2D] text-xs font-mono text-[#9E9E9E]">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPurpleTheme ? 'bg-[#BF00FF]' : 'bg-[#00F0FF]'}`} />
                    <span>STATUS: COMPLETE & TESTED</span>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-[#F3F4F6] hover:text-[#00F0FF] transition-colors"
                  >
                    <span>INQUIRE AUDIT DETAILS</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isPurpleTheme ? 'text-[#BF00FF]' : 'text-[#00F0FF]'}`} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
