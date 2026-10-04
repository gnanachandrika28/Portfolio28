import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Lightbulb, Compass, Code2, RefreshCw, ArrowRight } from 'lucide-react';

export const HowIBuild: React.FC = () => {
  const getIcon = (step: string) => {
    switch (step) {
      case '01':
        return <Lightbulb className="w-5 h-5 text-amber-400" />;
      case '02':
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case '03':
        return <Code2 className="w-5 h-5 text-violet-400" />;
      case '04':
        return <RefreshCw className="w-5 h-5 text-emerald-400" />;
      default:
        return <Code2 className="w-5 h-5 text-violet-400" />;
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Engineering Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            How I Build
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            A disciplined, 4-stage engineering lifecycle focused on user clarity, clean architecture, and continuous refinement.
          </p>
        </div>

        {/* 4 Cards Grid with Connecting Visual Flow */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/20 via-cyan-500/30 to-emerald-500/20 -translate-y-12 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {portfolioData.howIBuild.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                      {item.step}
                    </span>

                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(item.step)}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs font-semibold text-cyan-300 mt-0.5">
                    {item.summary}
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Phase {idx + 1} of 4</span>
                  {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-violet-400 hidden lg:block" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
