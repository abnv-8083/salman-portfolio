import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Check, Send, MapPin, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MediumIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Web Application Penetration Test',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmissionFeedback({
        type: 'error',
        message: 'Please complete all required fields before initiating dispatch.'
      });
      return;
    }

    setIsSubmitting(true);

    const mailtoSubject = encodeURIComponent(`[SECURITY INQUIRY] ${formData.subject} - from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Salmanul,\n\nName: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.subject}\n\nMessage:\n${formData.message}\n\nSent via Portfolio Contact Gateway`
    );
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionFeedback({
        type: 'success',
        message: 'Opening your mail client with prefilled encrypted inquiry headers...'
      });
      window.location.href = mailtoUrl;
    }, 450);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#00F0FF] uppercase">
          06 / INITIATE DIALOGUE
        </span>
        <div className="h-[1px] w-12 bg-[#2D2D2D]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Big Headline & Direct Channels */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h2
              ref={headlineRef}
              className="font-display font-bold text-section-headline text-[#F3F4F6] uppercase leading-[1.05] mb-8"
            >
              LET'S SECURE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#BF00FF]">
                WHAT MATTERS.
              </span>
            </h2>

            <p className="text-body-editorial font-light mb-10 max-w-lg text-[#9E9E9E]">
              Available for application penetration testing, vulnerability research collaborations, and security audits. Let’s identify and resolve critical security risks.
            </p>

            {/* Direct Email Pill */}
            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#2D2D2D] mb-8">
              <div className="text-xs font-mono text-[#9E9E9E] uppercase tracking-wider mb-2">
                DIRECT INBOX
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-display font-semibold text-xl text-[#F3F4F6] hover:text-[#00F0FF] transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#000000] hover:bg-white/[0.05] border border-[#2D2D2D] text-xs font-mono text-[#F3F4F6] transition-colors shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span className="text-[#00F0FF]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#9E9E9E]" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Channels */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#9E9E9E] uppercase tracking-wider mb-2">
                AUTHENTIC CHANNELS
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2D2D2D] hover:border-[#00F0FF]/50 text-xs font-mono text-[#F3F4F6] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9E9E9E]" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2D2D2D] hover:border-[#BF00FF]/50 text-xs font-mono text-[#F3F4F6] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#BF00FF]" />
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9E9E9E]" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2D2D2D] hover:border-[#00F0FF]/50 text-xs font-mono text-[#F3F4F6] transition-colors"
                >
                  <MediumIcon className="w-4 h-4 text-[#00F0FF]" />
                  <span>MEDIUM</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9E9E9E]" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-xs font-mono text-[#9E9E9E] flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>BASE OF OPERATIONS: KERALA, INDIA</span>
          </div>
        </div>

        {/* Right Column: Encrypted Inquiry Gateway Form */}
        <div className="lg:col-span-6">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0D0D0D] border border-[#2D2D2D]">
            <div className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider mb-2">
              DISPATCH GATEWAY
            </div>
            <h3 className="font-display font-bold text-2xl text-[#F3F4F6] mb-6">
              Send a Security Inquiry
            </h3>

            {submissionFeedback && (
              <div
                className={`p-3.5 rounded-xl mb-6 text-xs font-mono ${
                  submissionFeedback.type === 'error'
                    ? 'bg-rose-950/30 border border-rose-500/50 text-rose-300'
                    : 'bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF]'
                }`}
              >
                {submissionFeedback.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#9E9E9E] mb-1.5 uppercase">
                  NAME / ENTITY *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2D2D2D] focus:border-[#00F0FF] text-[#F3F4F6] text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9E9E9E] mb-1.5 uppercase">
                  CONTACT EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2D2D2D] focus:border-[#00F0FF] text-[#F3F4F6] text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9E9E9E] mb-1.5 uppercase">
                  ENGAGEMENT SCOPE
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2D2D2D] focus:border-[#BF00FF] text-[#F3F4F6] text-sm focus:outline-none transition-colors"
                >
                  <option value="Web Application Penetration Test">Web Application Penetration Test</option>
                  <option value="API Security & Logic Audit">API Security & Logic Audit</option>
                  <option value="Responsible Disclosure Consultation">Responsible Disclosure Consultation</option>
                  <option value="General Professional Inquiry">General Professional Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9E9E9E] mb-1.5 uppercase">
                  MESSAGE / SCOPE DETAILS *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Briefly describe your systems, objectives, or testing requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2D2D2D] focus:border-[#00F0FF] text-[#F3F4F6] text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#00F0FF] hover:bg-[#00d8e6] disabled:opacity-50 text-[#000000] font-display font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                data-cursor-text="SEND"
              >
                <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH INQUIRY'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
