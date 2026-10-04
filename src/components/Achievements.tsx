import React from 'react';
import { useCMS } from '../context/CMSContext';
import {
  BarChart3,
  Layers,
  Database,
  Code,
  Cpu,
  Layout,
  Sparkles,
} from 'lucide-react';

export const Achievements: React.FC = () => {
  const { achievements } = useCMS();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-violet-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-fuchsia-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-sky-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-violet-400" />;
    }
  };

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Milestones &amp; Focus
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Achievements &amp; Continuous Learning
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Demonstrated technical execution and continuous pursuit of software engineering craftsmanship.
          </p>
        </div>

        {/* Futuristic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-mono text-violet-400 bg-violet-950/40 border border-violet-500/30 px-2.5 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Hands-on Application</span>
                <span className="text-cyan-400">Validated</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
