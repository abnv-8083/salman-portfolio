import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, RECOGNITION_ITEMS, PROJECTS, EXPERTISE_CATEGORIES } from '../data/portfolioData';

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `SALMANUL FARIS // SECURITY TERMINAL v2.6.4\nLogged in as visitor@salmanul-research-lab\nType 'help' to inspect available security dossiers and commands.`
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Global backtick shortcut to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Update command history
    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIdx(-1);

    const newEntries = [
      { type: 'user', text: `visitor@salmanul:~$ ${rawCmd}` }
    ];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `AVAILABLE PREDEFINED COMMANDS:
  about        — Display researcher background & ethical focus
  skills       — Display technical capabilities & offensive stack
  projects     — Display selected security engineering projects
  recognition  — Display international Hall of Fame & VDP records
  experience   — Display professional trajectory & certifications
  contact      — Display contact coordinates & verified channels
  whoami       — Display current session identity & privilege
  scan         — Run automated simulated client posture audit
  date         — Show active system timestamp
  clear        — Wipe terminal history
  exit         — Close this interactive terminal window`
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `RESEARCHER PROFILE:
Name: ${PERSONAL_INFO.name}
Role: ${PERSONAL_INFO.role}
Location: ${PERSONAL_INFO.location}

Bio:
"${PERSONAL_INFO.bio}"

Ethical Focus:
Dedicated to responsible vulnerability disclosure, securing sensitive data pipelines, and eliminating software logic flaws before malicious actors find them.`
        });
        break;

      case 'skills':
        newEntries.push({
          type: 'output',
          text: `OFFENSIVE SECURITY & TESTING EXPERTISE:
1. Offensive Security:
   - Web Application Penetration Testing, API Security, OWASP Top 10, Bug Bounty Hunting

2. Vulnerability Research:
   - IDOR, XSS, CSRF, Authentication & OTP Bypass, Session Fixation, Broken Access Control

3. Defensive & SOC:
   - Security Operations Center (SOC), Threat Detection, Log Correlation, Graylog SIEM

4. Languages & Protocols:
   - Python, Burp Suite, Linux & Networking, HTTP/HTTPS, JavaScript, C, Java, SQL, Flutter/Firebase`
        });
        break;

      case 'projects':
        newEntries.push({
          type: 'output',
          text: `SELECTED SECURITY RESEARCH PROJECTS:
[01] SOC LAB WITH GRAYLOG SIEM
     Centralized log aggregation, Grok parsing & alert correlation testbed.
     Tech: Graylog, SIEM, Log Analysis, SOC

[02] FLASK AUTHENTICATION APP
     Hardened auth engine with 12-round bcrypt hashing, CSPRNG salt & session security.
     Tech: Python, Flask, Bcrypt, Web Security

[03] FILE INTEGRITY MONITOR (FIM)
     Cryptographic SHA-256 baseline auditing tool for zero-day tamper detection.
     Tech: Python, SHA-256, File Integrity Monitoring

[04] SECURE RENTAL APPLICATION
     Cross-platform Flutter application with Firebase authentication & Firestore security rules.
     Tech: Flutter, Firebase, RBAC`
        });
        break;

      case 'recognition':
        newEntries.push({
          type: 'output',
          text: `RECOGNITION & RESPONSIBLE DISCLOSURE:
★ World Health Organization (WHO)
  Inducted into official WHO Hall of Fame for IDOR vulnerability discovery (2024).

★ European Commission
  Official acknowledgment for responsible disclosure of exposed backup archive (2024).

★ Belgium Government & CERT-In
  Coordinated vulnerability disclosures on public national web infrastructure (2024-2025).

★ Brototype Cyber Hunt Challenge
  1st Place Champion — 8 vulnerabilities exploited, ₹10,000 award (2025).`
        });
        break;

      case 'experience':
        newEntries.push({
          type: 'output',
          text: `PROFESSIONAL RECORD:
- Cyber Security Engineer (Intern) | Brototype (Jan 2025 - Present)
  Web App & API pentesting, manual OWASP Top 10 testing, PoC documentation.

- Software Intern | Tender Call (2024)
  Flutter & Firebase mobile development, client-side data validation.

CERTIFICATIONS:
✓ Certified Penetration Tester (Red Team Hacker Academy)
✓ Introduction to Network Analysis (Security Blue Team)
✓ Web Expert (LetsDefend)`
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `CONTACT & COORDINATION:
Email:    ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}
Social:   LinkedIn · GitHub · Medium
Status:   Open for Security Engagements & Vulnerability Research`
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `visitor@salmanul-research-lab
Privilege: Guest (Read-Only)
Encryption: TLS 1.3 // 256-bit AES-GCM
Session: Ephemeral Sandboxed Terminal`
        });
        break;

      case 'date':
        newEntries.push({
          type: 'output',
          text: `Current System Time: ${new Date().toUTCString()} (Local: ${new Date().toLocaleDateString()})`
        });
        break;

      case 'scan':
        newEntries.push({
          type: 'output',
          text: `[+] Initializing client-side CSP & header check...
[+] Inspecting DOM sanitization... [OK]
[+] Validating sandbox boundaries... [OK]
[+] TLS 1.3 Transport Cipher... [AES_256_GCM - VERIFIED]
[+] Rate limit thresholds... [NORMAL]
AUDIT COMPLETE: 0 vulnerabilities found on portfolio client.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newEntries.push({
          type: 'error',
          text: `Command '${rawCmd}' not recognized. Type 'help' to see valid commands.`
        });
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const validCmds = ['about', 'skills', 'projects', 'recognition', 'experience', 'contact', 'whoami', 'scan', 'date', 'clear', 'help', 'exit'];
      const match = validCmds.find(c => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9990] bg-[#08090B]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className={`w-full rounded-2xl bg-[#0B0D11] border border-[#C7FF4A]/30 shadow-[0_0_50px_rgba(199,255,74,0.15)] flex flex-col overflow-hidden transition-all duration-300 font-mono ${
          isMaximized ? 'h-[94vh] max-w-6xl' : 'h-[620px] max-w-3xl'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="px-4 py-3 bg-[#111318] border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity"
                title="Close Terminal"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity"
                title="Toggle Size"
              />
              <button
                onClick={() => setHistory([])}
                className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity"
                title="Clear Output"
              />
            </div>
            <span className="text-xs text-[#F3F3F0] flex items-center gap-1.5 font-semibold">
              <TerminalIcon className="w-3.5 h-3.5 text-[#C7FF4A]" />
              salmanul@security-node: ~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-white/50 hover:text-white transition-colors"
              title="Maximize"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-white/50 hover:text-rose-400 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Action Toolbar for fast mobile execution */}
        <div className="px-4 py-2 bg-[#171A21] border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto text-[11px] select-none scrollbar-none">
          <span className="text-white/40 uppercase text-[10px] shrink-0">QUICK:</span>
          {['help', 'about', 'skills', 'projects', 'recognition', 'contact', 'scan', 'clear'].map(cmd => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-0.5 rounded bg-white/5 hover:bg-[#C7FF4A]/20 hover:text-[#C7FF4A] text-white/70 transition-colors shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen & Logs */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm bg-[#08090B] text-white/90 selection:bg-[#C7FF4A] selection:text-[#08090B]"
        >
          {history.map((entry, idx) => (
            <div key={idx} className="leading-relaxed">
              {entry.type === 'user' && (
                <div className="text-[#C7FF4A] font-semibold flex items-center gap-2">
                  <span>{entry.text}</span>
                </div>
              )}
              {entry.type === 'system' && (
                <div className="text-[#8E93A0] whitespace-pre-wrap border-l-2 border-[#C7FF4A]/40 pl-3 py-1 my-2">
                  {entry.text}
                </div>
              )}
              {entry.type === 'output' && (
                <div className="text-[#F3F3F0] whitespace-pre-wrap pl-2 bg-[#111318]/50 p-2.5 rounded border border-white/[0.04]">
                  {entry.text}
                </div>
              )}
              {entry.type === 'error' && (
                <div className="text-rose-400 whitespace-pre-wrap pl-2">
                  {entry.text}
                </div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[#C7FF4A] shrink-0 font-bold">
              visitor@salmanul:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#F3F3F0] font-mono text-xs sm:text-sm caret-[#C7FF4A]"
              placeholder="Type command ('help', 'skills', 'scan')..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer status */}
        <div className="px-4 py-2 bg-[#111318] border-t border-white/[0.08] flex items-center justify-between text-[10px] text-white/40">
          <div className="flex items-center gap-3">
            <span>PRESS TAB FOR AUTOCOMPLETE</span>
            <span>·</span>
            <span>PRESS UP/DOWN FOR HISTORY</span>
          </div>
          <span className="text-[#C7FF4A]">SANDBOXED SHELL</span>
        </div>
      </div>
    </div>
  );
}
