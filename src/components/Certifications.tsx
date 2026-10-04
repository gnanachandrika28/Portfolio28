import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Award, Clock, ExternalLink } from 'lucide-react';

export const Certifications: React.FC = () => {
  const { certifications } = useCMS();

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Skill Validation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Certifications &amp; Learning
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Continuous skill validation across programming, database management, and business intelligence.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Award className="w-4 h-4" />
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/40 border border-violet-500/30 text-violet-300">
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                  {cert.name}
                </h3>
                <div className="text-xs text-slate-400 mt-1">{cert.issuer}</div>

                {cert.note && (
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    {cert.note}
                  </p>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:underline"
                  >
                    <span>View Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{cert.date}</span>
                <span className="text-cyan-400 flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  <span>{cert.status === 'Completed' ? 'Verified' : 'Ongoing'}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
