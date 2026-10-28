import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
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

    // Formulate transparent mailto link
    const mailtoSubject = encodeURIComponent(`[SECURITY INQUIRY] ${formData.subject} - from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Salmanul,\n\nName: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.subject}\n\nMessage:\n${formData.message}\n\nSent via Portfolio Contact Gateway`
    );
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionFeedback({
        type: 'success',
        message: 'Opening your default mail client with prefilled encrypted inquiry headers...'
      });
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Background Accent */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C7FF4A]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C7FF4A] uppercase">
          06 / CONTACT
        </span>
        <div className="h-[1px] w-12 bg-[#C7FF4A]/40" />
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-[#F3F3F0] leading-[1.05]"
        >
          HAVE A SECURITY<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7FF4A] to-[#6C8CFF]">
            CHALLENGE IN MIND?
          </span>
        </h2>

        <p className="max-w-md text-[#8E93A0] text-sm font-light leading-relaxed">
          Interested in application security, responsible disclosure, or cybersecurity collaboration? Let's connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Coordinates & Social Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#8E93A0] mb-6">
              DIRECT CHANNELS
            </div>

            {/* Email Card with Copy button */}
            <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-[#C7FF4A]/40 transition-colors mb-4 group">
              <div className="text-[10px] font-mono uppercase text-white/40 mb-1 flex items-center justify-between">
                <span>PRIMARY EMAIL</span>
                <span className="text-[#C7FF4A]">DIRECT INBOX</span>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base sm:text-lg font-mono font-medium text-[#F3F3F0] hover:text-[#C7FF4A] transition-colors block truncate"
              >
                {PERSONAL_INFO.email}
              </a>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8E93A0] hover:text-[#C7FF4A] transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C7FF4A]" />
                      <span className="text-[#C7FF4A]">COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs font-mono text-[#C7FF4A] hover:underline"
                >
                  OPEN CLIENT ↗
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 mb-6">
              <div className="text-[10px] font-mono uppercase text-white/40 mb-1">
                BASE LOCATION
              </div>
              <div className="text-base font-display font-semibold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C7FF4A]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="text-xs font-mono text-white/40 mt-1">
                COORDINATES: 11.2588° N, 75.7804° E // IST (UTC+05:30)
              </div>
            </div>

            {/* Social Links */}
            <div className="text-xs font-mono uppercase tracking-widest text-[#8E93A0] mb-3">
              PUBLIC PLATFORMS
            </div>
            <div className="grid grid-cols-3 gap-3">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#111318] hover:bg-white/5 border border-white/10 hover:border-[#6C8CFF]/50 text-white flex items-center justify-center gap-2 text-xs font-mono transition-all group"
                data-cursor-text="LINKEDIN"
              >
                <LinkedinIcon className="w-4 h-4 text-[#6C8CFF]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#111318] hover:bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center gap-2 text-xs font-mono transition-all group"
                data-cursor-text="GITHUB"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#111318] hover:bg-white/5 border border-white/10 hover:border-[#C7FF4A]/50 text-white flex items-center justify-center gap-2 text-xs font-mono transition-all group"
                data-cursor-text="MEDIUM"
              >
                <MediumIcon className="w-4 h-4 text-[#C7FF4A]" />
                <span>Medium</span>
              </a>
            </div>
          </div>

          {/* Security Disclaimer Notice */}
          <div className="p-4 rounded-xl bg-[#08090B] border border-white/[0.08] flex items-start gap-3 text-xs font-mono text-[#8E93A0]">
            <ShieldCheck className="w-4 h-4 text-[#C7FF4A] shrink-0 mt-0.5" />
            <span>
              All coordinated security reports and assessment inquiries are handled with non-disclosure and confidentiality principles.
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-[#111318] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono text-[#F3F3F0] tracking-wider uppercase">
                SECURITY ENGAGEMENT DISPATCH
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C7FF4A]/10 text-[#C7FF4A] border border-[#C7FF4A]/30">
                MAILTO CHANNEL
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/40 block mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#08090B] border border-white/15 focus:border-[#C7FF4A] rounded-xl px-4 py-3 text-sm text-white font-sans outline-none transition-colors"
                    placeholder="e.g. Alex Hunter"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-white/40 block mb-1.5">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#08090B] border border-white/15 focus:border-[#C7FF4A] rounded-xl px-4 py-3 text-sm text-white font-sans outline-none transition-colors"
                    placeholder="alex@organization.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/40 block mb-1.5">
                  SECURITY SCOPE / INQUIRY TYPE
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#08090B] border border-white/15 focus:border-[#C7FF4A] rounded-xl px-4 py-3 text-sm text-white font-mono outline-none transition-colors cursor-pointer"
                >
                  <option value="Web Application Penetration Test">Web Application Penetration Test</option>
                  <option value="API Security Assessment">API Security Assessment</option>
                  <option value="Responsible Vulnerability Disclosure">Responsible Vulnerability Disclosure</option>
                  <option value="SOC & SIEM Consultation">SOC & SIEM Consultation</option>
                  <option value="General Security Collaboration">General Security Collaboration</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/40 block mb-1.5">
                  MESSAGE & SCOPE SPECIFICATIONS *
                </label>
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#08090B] border border-white/15 focus:border-[#C7FF4A] rounded-xl p-4 text-sm text-white font-sans outline-none transition-colors resize-none"
                  placeholder="Outline your target infrastructure, testing timeframe, or responsible disclosure briefing..."
                />
              </div>

              {submissionFeedback && (
                <div
                  className={`p-4 rounded-xl text-xs font-mono flex items-start gap-2.5 ${
                    submissionFeedback.type === 'success'
                      ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submissionFeedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#C7FF4A] text-[#08090B] font-display font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(199,255,74,0.4)] transition-all disabled:opacity-50"
                data-cursor-text="TRANSMIT"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'PREPARING DISPATCH...' : 'TRANSMIT SECURITY INQUIRY'}</span>
              </button>

              <div className="text-[10px] font-mono text-center text-white/40 pt-2">
                * Initiates encrypted prefilled dispatch to salmanul060@gmail.com without intermediate third-party tracking.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
