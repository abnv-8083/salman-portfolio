import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO, RECOGNITION_ITEMS, PROJECTS } from '../data/portfolioData';

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `SALMANUL FARIS // OFFENSIVE SECURITY CLI v2.6.4\nLogged in as visitor@salmanul-research-lab\nType 'help' to inspect available security dossiers and commands.`
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

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
  scan         — Run simulated client posture audit
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
   - Insecure Direct Object Reference (IDOR), XSS, CSRF, Authentication / OTP Bypass, Broken Access Control

3. SOC & Defensive Security:
   - Log Analysis & Parsing, Graylog SIEM, Threat Detection, Incident Response

4. Engineering & Protocols:
   - Python, Burp Suite Pro, Linux/Networking, HTTP/HTTPS Analysis, JavaScript, SQL, AWS/Azure, Flutter/Firebase`
        });
        break;

      case 'projects':
        newEntries.push({
          type: 'output',
          text: `FEATURED SECURITY PROJECTS:
${PROJECTS.map(p => `[${p.index}] ${p.title}\n    Focus: ${p.headline}\n    Tech: ${p.technologies.join(', ')}`).join('\n\n')}`
        });
        break;

      case 'recognition':
        newEntries.push({
          type: 'output',
          text: `AUTHENTICATED VULNERABILITY DISCLOSURE RECORDS:
${RECOGNITION_ITEMS.map(r => `• ${r.title} [${r.year}]
  Ref: ${r.code}
  Vuln: ${r.vulnerability}
  Impact: ${r.impact}
  Status: ${r.status}`).join('\n\n')}`
        });
        break;

      case 'experience':
        newEntries.push({
          type: 'output',
          text: `PROFESSIONAL RECORD:
- Cyber Security Engineer (Intern) at Brototype (Jan 2025 – Present)
- Software Intern at Tender Call (2024)

CERTIFICATIONS:
- Certified Penetration Tester (Red Team Hacker Academy)
- Introduction to Network Analysis (Security Blue Team)
- Web Expert (LetsDefend)`
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `COMMUNICATION CHANNELS:
Email:    ${PERSONAL_INFO.email}
GitHub:   ${PERSONAL_INFO.socials.github}
LinkedIn: ${PERSONAL_INFO.socials.linkedin}
Medium:   ${PERSONAL_INFO.socials.medium}
Location: ${PERSONAL_INFO.location}`
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `GUEST SESSION // ROLE: VISITOR // PRIVILEGE: READ-ONLY AUDIT ACCESS`
        });
        break;

      case 'scan':
        newEntries.push({
          type: 'output',
          text: `INITIATING RECONNAISSANCE AUDIT...
[+] Analyzing HTTP security headers... CSP, HSTS, X-Content-Type verified.
[+] Enumerating API authorization boundaries... zero unauthorized IDOR vectors found.
[+] Baseline posture check complete: Environment hardened.`
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
          text: `command not recognized: '${cmd}'. Type 'help' to list available commands.`
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
        const nextIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#000000]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className={`bg-[#000000] border border-[#2D2D2D] rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
          isMaximized ? 'w-full h-full rounded-none' : 'w-full max-w-3xl h-[560px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="bg-[#0D0D0D] px-4 py-3 border-b border-[#2D2D2D] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2D2D2D]" />
            <div className="w-3 h-3 rounded-full bg-[#BF00FF]" />
            <div className="w-3 h-3 rounded-full bg-[#00F0FF]" />
            <span className="text-xs font-mono text-[#F3F4F6] ml-2 font-semibold">
              salmanul@security-shell ~ zsh
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-[#9E9E9E] hover:text-[#F3F4F6] transition-colors"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#9E9E9E] hover:text-white transition-colors"
              title="Close (` or Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          className="flex-1 p-5 overflow-y-auto font-mono text-xs leading-relaxed space-y-3 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {entry.type === 'user' && (
                <div className="text-[#F3F4F6] font-semibold">{entry.text}</div>
              )}
              {entry.type === 'system' && (
                <div className="text-[#BF00FF]">{entry.text}</div>
              )}
              {entry.type === 'output' && (
                <div className="text-[#9E9E9E]">{entry.text}</div>
              )}
              {entry.type === 'error' && (
                <div className="text-rose-400">{entry.text}</div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Command Line */}
        <div className="p-3 bg-[#0D0D0D] border-t border-[#2D2D2D] flex items-center gap-2">
          <span className="text-xs font-mono text-[#00F0FF] font-semibold shrink-0">visitor@salmanul:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-[#F3F4F6] placeholder-[#9E9E9E]/40"
            autoFocus
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1.5 rounded bg-[#000000] border border-[#2D2D2D] text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
            title="Execute (Enter)"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
