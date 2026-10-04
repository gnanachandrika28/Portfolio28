import React from 'react';
import { useCMS } from '../context/CMSContext';

export const Experience: React.FC = () => {
  const { experience } = useCMS();

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Trajectory &amp; Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Software Engineering &amp; Technical Development
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Focus: Python • SQL • Data Analytics • Power BI • Web Development • Problem Solving
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/50 border border-violet-500/40 text-xs text-violet-200">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono font-medium tracking-wide">
              Currently Building • Learning • Improving
            </span>
          </div>
        </div>

        {experience.length === 0 ? (
          <div className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-2">
            <div className="text-sm font-semibold text-white">Continuous Technical Growth</div>
            <p className="text-xs text-slate-400">
              Continuously building software engineering projects and expanding algorithmic knowledge.
            </p>
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-violet-500/30 space-y-10">
            {experience.map((milestone) => (
              <div key={milestone.id} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#0b0e1a] border-2 border-violet-400 group-hover:border-cyan-400 group-hover:scale-125 transition-all shadow-sm shadow-violet-500/50" />

                <div className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-violet-400 font-semibold px-2.5 py-0.5 rounded bg-violet-950/40 border border-violet-500/30">
                      {milestone.period}
                    </span>

                    {milestone.currentPosition && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Active Focus
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {milestone.role}
                  </h3>

                  <div className="text-xs font-medium text-cyan-300 mt-1">
                    {milestone.focus}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {milestone.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                    {milestone.technologies.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[11px] font-mono bg-white/[0.03] border border-white/5 text-slate-300 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
