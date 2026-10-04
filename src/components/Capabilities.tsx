import React from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  Terminal,
  BarChart3,
  Database,
  Globe,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

export const Capabilities: React.FC = () => {
  const getIcon = (title: string) => {
    switch (title) {
      case 'Python Applications':
        return <Terminal className="w-5 h-5 text-violet-400" />;
      case 'Data Dashboards':
        return <BarChart3 className="w-5 h-5 text-cyan-400" />;
      case 'SQL & Data Solutions':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'Full-Stack Web Applications':
        return <Globe className="w-5 h-5 text-emerald-400" />;
      case 'Student / Education Platforms':
        return <GraduationCap className="w-5 h-5 text-fuchsia-400" />;
      default:
        return <Terminal className="w-5 h-5 text-violet-400" />;
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Capabilities & Deliverables
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            What I Can Build
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Practical technical solutions tailored for analytical insight, process automation, and full-stack software needs.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.capabilities.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(item.title)}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-cyan-300">{item.tech}</span>
                <span className="text-violet-400 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
