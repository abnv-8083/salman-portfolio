export const PERSONAL_INFO = {
  name: "Salmanul Faris",
  monogram: "SF",
  role: "Penetration Tester & Cybersecurity Researcher",
  badge: "CYBERSECURITY RESEARCHER",
  location: "Kerala, India",
  email: "salmanul060@gmail.com",
  status: "OPEN FOR SECURITY RESEARCH & AUDITS",
  domains: [
    "Web Application Penetration Testing",
    "API Security & Vulnerability Research",
    "Responsible Disclosure & Bug Bounty",
    "SOC Architecture & Log Analysis"
  ],
  bio: "I'm a cybersecurity researcher focused on offensive security, web application penetration testing, and responsible vulnerability disclosure. My work involves identifying security weaknesses, validating their impact, documenting findings, and helping organizations understand how to address them.",
  heroHeadingLine1: "SECURING THE",
  heroHeadingLine2: "DIGITAL FRONTIER.",
  heroBio: "I'm Salmanul Faris — a penetration tester and cybersecurity researcher exploring application security, uncovering vulnerabilities, and helping build safer digital systems.",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    medium: "https://medium.com",
    email: "mailto:salmanul060@gmail.com"
  }
};

export const RECOGNITION_ITEMS = [
  {
    id: "who",
    title: "World Health Organization",
    entity: "WHO Hall of Fame",
    badge: "GLOBAL RECOGNITION",
    accent: "#2CFF05",
    vulnerability: "Insecure Direct Object Reference (IDOR)",
    summary: "Recognized in the official WHO Hall of Fame for responsible disclosure of an IDOR vulnerability affecting web systems. Safely reported, verified, and remediated.",
    impact: "Protected global health administrative endpoints from unauthorized data access.",
    status: "Verified & Hall of Fame Inductee",
    year: "2024",
    code: "WHO-SEC-2024-IDOR"
  },
  {
    id: "eu-commission",
    title: "European Commission",
    entity: "European Union",
    badge: "OFFICIAL ACKNOWLEDGMENT",
    accent: "#BF00FF",
    vulnerability: "Sensitive Backup-File Exposure Vulnerability",
    summary: "Acknowledged by the European Commission for responsible vulnerability disclosure uncovering an exposed backup archive on official commission digital infrastructure.",
    impact: "Prevented unauthorized exposure of configuration data and server artifacts.",
    status: "Verified & Acknowledged",
    year: "2024",
    code: "EC-VDP-2024-BKP"
  },
  {
    id: "belgium-certin",
    title: "Belgium Gov & CERT-In",
    entity: "National Security Authorities",
    badge: "GOVERNMENT DISCLOSURE",
    accent: "#2CFF05",
    vulnerability: "Infrastructure Vulnerability & Configuration Flaws",
    summary: "Reported validated security findings to the Belgium Government and the Indian Computer Emergency Response Team (CERT-In) following strict responsible disclosure protocol.",
    impact: "Strengthened national critical web assets against reconnaissance and unauthorized access.",
    status: "Reported & Mitigated",
    year: "2024–2025",
    code: "GOV-COORD-DISC"
  },
  {
    id: "brototype-hunt",
    title: "Brototype Cyber Hunt Challenge",
    entity: "Live Security CTF / Hackathon",
    badge: "1ST PLACE WINNER",
    accent: "#BF00FF",
    vulnerability: "8 High/Critical Vulnerabilities Identified",
    summary: "Secured 1st Place Champion in a high-intensity penetration testing challenge by finding 8 security flaws in live scope, winning ₹10,000 cash award.",
    impact: "Recognized for rapid vulnerability chain construction, thorough reporting, and precision exploitation.",
    status: "Champion · ₹10,000 Award",
    year: "2025",
    code: "CYBERHUNT-CHAMPION"
  }
];

export const EXPERTISE_CATEGORIES = [
  {
    id: "cat-a",
    number: "01",
    category: "OFFENSIVE SECURITY",
    tagline: "Proactive adversary emulation and vulnerability surface discovery",
    skills: [
      { name: "Web Application Penetration Testing", level: "Core Specialty", desc: "End-to-end vulnerability assessment of modern SPA, SSR, and microservice architectures." },
      { name: "API Security Testing", level: "Core Specialty", desc: "REST/GraphQL fuzzing, authorization logic flaws, rate limiting bypasses, and token tampering." },
      { name: "Bug Bounty Hunting", level: "Active Practice", desc: "Independent security research on commercial and governmental vulnerability disclosure programs." },
      { name: "OWASP Top 10", level: "Methodology", desc: "Rigorous testing across Injection, Broken Access Control, Security Misconfiguration, and Cryptographic Failures." },
      { name: "Application Security", level: "Specialty", desc: "Holistic software security posture evaluation from source to production deployment." }
    ]
  },
  {
    id: "cat-b",
    number: "02",
    category: "VULNERABILITY RESEARCH",
    tagline: "Deep analysis into access boundaries and logical software flaws",
    skills: [
      { name: "Insecure Direct Object Reference (IDOR)", level: "High Impact", desc: "Bypassing horizontal & vertical authorization boundaries across API endpoints." },
      { name: "Cross-Site Scripting (XSS)", level: "Exploitation", desc: "DOM-based, Reflected, and Stored XSS vectors with CSP evasion techniques." },
      { name: "Cross-Site Request Forgery (CSRF)", level: "Exploitation", desc: "State-changing request hijacking, SameSite attribute circumvention, and token validation flaws." },
      { name: "Authentication & OTP Bypass", level: "Critical", desc: "Logic vulnerabilities in multi-factor workflows, rate-limit circumvention, and replay vulnerabilities." },
      { name: "Session Management & Fixation", level: "Core", desc: "Session token hijacking, improper invalidation, and cookie security attribute misconfigurations." },
      { name: "Broken Access Control", level: "Critical", desc: "Privilege escalation from unauthenticated/standard users to administrative capabilities." },
      { name: "File Exposure & Traversal", level: "Information Disclosure", desc: "Path traversal, exposed backup archives (.bak/.sql), and sensitive environment variable leakage." }
    ]
  },
  {
    id: "cat-c",
    number: "03",
    category: "SOC & DEFENSIVE SECURITY",
    tagline: "Telemetry analysis, adversary detection, and incident containment",
    skills: [
      { name: "Security Operations Center (SOC)", level: "Architecture", desc: "Design and operation of telemetry ingestion pipelines and event alerting rules." },
      { name: "Threat Detection & Hunting", level: "Detection", desc: "Proactive log hypothesis testing and behavioral anomaly identification." },
      { name: "Incident Response", level: "Operations", desc: "Triage, containment protocols, root cause identification, and remediation guidance." },
      { name: "Log Analysis & Parsing", level: "Core", desc: "Grok pattern development, structured log parsing, and noise reduction across Linux/Windows audit logs." },
      { name: "SIEM Systems (Graylog)", level: "Implementation", desc: "Centralized index management, dashboard creation, and alert threshold configuration." }
    ]
  },
  {
    id: "cat-d",
    number: "04",
    category: "ENGINEERING & PROTOCOLS",
    tagline: "Custom tooling, script engineering, and protocol inspection",
    skills: [
      { name: "Python", level: "Scripting / Automation", desc: "Exploit PoCs, custom fuzzers, automated reconnaissance, and cryptographic hash verification." },
      { name: "Burp Suite Professional", level: "Testing Tool", desc: "Intruder, Repeater, Collaborator, customized extensions, and macro-based session handling." },
      { name: "Linux & Networking", level: "Environment", desc: "TCP/IP, Wireshark, iptables, DNS, shell automation, and Linux server hardening." },
      { name: "HTTP / HTTPS Protocol Analysis", level: "Protocol", desc: "Header manipulation, proxy interception, TLS inspection, and WebSocket protocol security." },
      { name: "JavaScript & HTML/CSS", level: "Frontend Security", desc: "DOM analysis, client-side cryptographic analysis, and prototype pollution inspection." },
      { name: "C & Java", level: "Fundamentals", desc: "Memory allocation analysis, enterprise design patterns, and JVM security principles." },
      { name: "SQL & Relational Databases", level: "Database", desc: "SQL injection assessment, schema querying, and blind timing-based data extraction." },
      { name: "AWS & Azure", level: "Cloud", desc: "Cloud IAM auditing, S3 bucket permission analysis, and cloud posture evaluation." },
      { name: "Flutter & Firebase", level: "Mobile Stack", desc: "Mobile client reverse engineering, Firestore security rules auditing, and API endpoint security." }
    ]
  }
];

export const PROJECTS = [
  {
    id: "soc-graylog-lab",
    index: "01",
    title: "SOC Lab with Graylog SIEM",
    badge: "DEFENSIVE / SIEM / LOG ANALYSIS",
    headline: "Centralized threat detection & real-time log correlation laboratory",
    description: "Built a home SOC lab for centralized log management, parsing, and correlation to help detect suspicious activity.",
    extendedDetails: "Designed and configured a dedicated home Security Operations Center (SOC) testbed using Graylog SIEM. Implemented custom Grok extractors for web server logs, firewall syslog feeds, and OS authentication events. Developed alerting rules to flag brute-force authentication attacks, abnormal port sweeps, and unauthorized privilege escalations.",
    technologies: ["Graylog", "SIEM", "Log Analysis", "SOC", "Linux Syslog", "Grok Parser"],
    metrics: [
      { label: "Parsing Engine", value: "Custom Grok" },
      { label: "Rule Coverage", value: "Brute-force & Scans" },
      { label: "Environment", value: "Isolated Lab VNet" }
    ],
    interactiveType: "siem-terminal"
  },
  {
    id: "flask-auth-app",
    index: "02",
    title: "Flask Authentication Application",
    badge: "APPLICATION SECURITY / CRYPTO",
    headline: "Hardened authentication engine with cryptographic password hashing",
    description: "Developed a login and signup application featuring bcrypt password hashing, email verification, and session security.",
    extendedDetails: "Engineered a production-ready authentication microservice prioritizing defense-in-depth web security. Integrated adaptive bcrypt hashing with automated salt generation, secure HTTP-only SameSite cookie headers, token-based email activation, rate-limiting to neutralize credential stuffing, and CSRF token verification across every form submission.",
    technologies: ["Python", "Flask", "Bcrypt", "Web Security", "CSRF Defense", "Session Security"],
    metrics: [
      { label: "Hashing Core", value: "Bcrypt (Adaptive Salt)" },
      { label: "Cookie Flags", value: "HttpOnly, SameSite, Secure" },
      { label: "Token Lifespan", value: "Time-limited Expire" }
    ],
    interactiveType: "auth-flow"
  },
  {
    id: "file-integrity-monitor",
    index: "03",
    title: "File Integrity Monitor (FIM)",
    badge: "AUDITING / CRYPTOGRAPHIC VERIFICATION",
    headline: "Cryptographic baseline auditing tool for zero-day tamper detection",
    description: "Created a Python-based tool that uses cryptographic hashing to identify unauthorized file changes for security auditing.",
    extendedDetails: "Developed an autonomous file integrity monitoring daemon in Python. The system scans designated directory trees, hashes each file using SHA-256 to establish an unalterable baseline manifest, and continuously monitors for modifications, deletions, or new unauthorized files. Triggers instant terminal alerts whenever a hash discrepancy occurs.",
    technologies: ["Python", "SHA-256", "Cryptographic Hashing", "File Integrity Monitoring", "Security Auditing"],
    metrics: [
      { label: "Digest Core", value: "SHA-256 Digest" },
      { label: "Tamper Alert", value: "Instant Bit-level" },
      { label: "Manifest", value: "JSON Cryptographic DB" }
    ],
    interactiveType: "fim-simulator"
  },
  {
    id: "rental-application",
    index: "04",
    title: "Secure Rental Application",
    badge: "MOBILE / FIREBASE / CLOUD ARCHITECTURE",
    headline: "Cross-platform mobile rental platform with strict role authorization",
    description: "Developed a cross-platform rental application with Firebase authentication, real-time database functionality, and property listings.",
    extendedDetails: "Built a responsive cross-platform mobile application using Flutter connected to Google Firebase backend. Implemented phone and email authentication workflows, real-time Firestore synchronization for property listings, secure media storage rules, and granular role-based access control (RBAC) ensuring tenant and landlord data isolation.",
    technologies: ["Flutter", "Firebase", "Firestore Security Rules", "Mobile Security", "RBAC"],
    metrics: [
      { label: "Client Stack", value: "Flutter / Dart" },
      { label: "Auth Provider", value: "Firebase Multi-provider" },
      { label: "Authorization", value: "Strict Firestore Rules" }
    ],
    interactiveType: "mobile-mockup"
  }
];

export const TIMELINE_EXPERIENCE = [
  {
    role: "CYBER SECURITY ENGINEER (INTERN)",
    organization: "Brototype, Kerala",
    period: "January 2025 – Present",
    type: "Professional Experience",
    current: true,
    points: [
      "Conducted web application and API penetration tests across diverse client projects.",
      "Performed manual testing for OWASP Top 10 vulnerabilities, including XSS, CSRF, and IDOR.",
      "Documented findings with severity ratings, proof-of-concept steps, and actionable remediation recommendations."
    ]
  },
  {
    role: "SOFTWARE INTERN",
    organization: "Tender Call",
    period: "2024",
    type: "Internship",
    current: false,
    points: [
      "Learned Flutter framework architecture and Firebase cloud integration.",
      "Built and tested mobile application features as part of an agile development team.",
      "Collaborated on API consumption and client-side data validation."
    ]
  }
];

export const EDUCATION = [
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "GVHSS Omanoor, Kerala",
    period: "2023 – 2025",
    type: "Education"
  }
];

export const CERTIFICATIONS = [
  {
    name: "Certified Penetration Tester",
    issuer: "Red Team Hacker Academy",
    badge: "OFFENSIVE SECURITY",
    description: "Practical penetration testing methodology, network pivoting, web application exploitation, and privilege escalation."
  },
  {
    name: "Introduction to Network Analysis",
    issuer: "Security Blue Team",
    badge: "DEFENSIVE / PCAP",
    description: "Packet capture analysis with Wireshark, traffic protocol inspection, anomaly detection, and malicious connection tracing."
  },
  {
    name: "Web Expert",
    issuer: "LetsDefend",
    badge: "WEB DEFENSE & ANALYSIS",
    description: "Web application attack investigation, log forensics, vulnerability triage, and web defense strategies."
  }
];
