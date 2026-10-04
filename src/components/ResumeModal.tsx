import React, { useEffect, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { X, Copy, Check, Printer, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { profile, skills, projects, education, socialLinks } = useCMS();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const resumeText = `
${profile.name}
${profile.title} | ${profile.locationShort}
Email: ${profile.email} | Phone: ${profile.phone}
LinkedIn: ${socialLinks.linkedin} | GitHub: ${socialLinks.github}

SUMMARY:
${profile.intro}

EDUCATION:
${education.map((e) => `• ${e.institution} (${e.duration})\n  ${e.degree} - ${e.field}`).join('\n')}

TECHNICAL SKILLS:
• Programming: ${skills.filter((s) => s.category === 'Programming').map((s) => s.name).join(', ')}
• Data & Analytics: ${skills.filter((s) => s.category === 'Data & Analytics').map((s) => s.name).join(', ')}
• Web Development: ${skills.filter((s) => s.category === 'Web Development').map((s) => s.name).join(', ')}
• Tools: ${skills.filter((s) => s.category === 'Tools').map((s) => s.name).join(', ')}

PROJECTS:
${projects.map((p, i) => `${i + 1}. ${p.title} (${p.tech.join(', ')})\n   - ${p.shortDescription}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0e1a] border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0d1222]/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
            <h2 id="resume-title" className="text-sm sm:text-base font-semibold text-white tracking-wide">
              {profile.name} — Resume Preview
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
              title="Copy plain text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors shadow-sm cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1 cursor-pointer"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#070912] text-slate-200">
          <div className="max-w-3xl mx-auto bg-[#0c101e] border border-white/10 rounded-xl p-6 sm:p-10 shadow-lg text-slate-200 print:bg-white print:text-black print:p-0 print:border-none">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {profile.name}
              </h1>
              <p className="text-base text-violet-400 font-medium mt-1">
                {profile.title} • {profile.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs sm:text-sm text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                  {profile.email}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  {profile.phone}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {profile.locationShort}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 mt-2.5 text-xs text-slate-400">
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet-300 inline-flex items-center gap-1"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 inline-flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-6">
              <h2 className="text-xs uppercase tracking-wider font-semibold text-violet-400 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {profile.intro}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
              <h2 className="text-xs uppercase tracking-wider font-semibold text-violet-400 mb-2.5">
                Technical Arsenal
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <span className="font-semibold text-white">Programming: </span>
                  <span className="text-slate-300">
                    {skills.filter((s) => s.category === 'Programming').map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <span className="font-semibold text-white">Data &amp; Analytics: </span>
                  <span className="text-slate-300">
                    {skills.filter((s) => s.category === 'Data & Analytics').map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <span className="font-semibold text-white">Web Development: </span>
                  <span className="text-slate-300">
                    {skills.filter((s) => s.category === 'Web Development').map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <span className="font-semibold text-white">Developer Tools: </span>
                  <span className="text-slate-300">
                    {skills.filter((s) => s.category === 'Tools').map((s) => s.name).join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="mb-6">
              <h2 className="text-xs uppercase tracking-wider font-semibold text-violet-400 mb-3">
                Key Engineering Projects
              </h2>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="border-l-2 border-violet-500/50 pl-3.5 py-0.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-sm font-semibold text-white">{proj.title}</h3>
                      <span className="text-[11px] font-mono text-cyan-400">
                        {proj.tech.join(' • ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {proj.shortDescription}
                    </p>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-slate-400">
                      {proj.keyFeatures.slice(0, 3).map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-xs uppercase tracking-wider font-semibold text-violet-400 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start text-xs sm:text-sm">
                    <div>
                      <div className="font-semibold text-white">{edu.institution}</div>
                      <div className="text-slate-400 text-xs">
                        {edu.degree} — {edu.field}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs text-violet-400">{edu.duration}</div>
                      <div className="text-[11px] text-slate-500">{edu.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footnote */}
            <div className="text-center pt-4 border-t border-white/5 text-[11px] text-slate-500 font-mono">
              Location: {profile.locationShort} • Open for Software Engineering Opportunities
            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-4 py-2.5 bg-[#090c16] border-t border-white/5 text-center text-xs text-slate-400">
          Tip: You can print or save as PDF directly using the Print button above.
        </div>
      </div>
    </div>
  );
};
