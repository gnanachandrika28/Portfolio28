import React from 'react';
import { useCMS } from '../context/CMSContext';
import { GraduationCap, MapPin, BookOpen, CheckCircle2 } from 'lucide-react';

export const Education: React.FC = () => {
  const { education } = useCMS();

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Academic Foundations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Education
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Formal engineering discipline and quantitative foundation.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>

                  <span className="text-xs font-mono text-cyan-300 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                    {edu.duration}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                  {edu.degree}
                </h3>
                <div className="text-sm font-semibold text-violet-400 mt-0.5">
                  {edu.field}
                </div>

                <div className="text-xs text-slate-300 mt-2 font-medium">
                  {edu.institution}
                </div>
                {edu.location && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.location}</span>
                  </div>
                )}

                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                    <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                      <span>Focus &amp; Learning Highlights</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {edu.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Computer Science &amp; Quantitative</span>
                <span className="text-emerald-400">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
