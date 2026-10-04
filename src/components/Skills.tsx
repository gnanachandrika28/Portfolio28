import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { CMSSkill } from '../types/cms';
import {
  FileCode2,
  Coffee,
  Database,
  Boxes,
  BarChart2,
  Table,
  PieChart,
  LineChart,
  Layout,
  Server,
  Network,
  HardDrive,
  Globe,
  GitBranch,
  Github,
  Terminal,
  Layers,
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Programming', 'Data & Analytics', 'Web Development', 'Tools'];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform' };
    switch (iconName) {
      case 'FileCode2':
        return <FileCode2 {...props} className="w-5 h-5 text-violet-400" />;
      case 'Coffee':
        return <Coffee {...props} className="w-5 h-5 text-amber-400" />;
      case 'Database':
        return <Database {...props} className="w-5 h-5 text-cyan-400" />;
      case 'Boxes':
        return <Boxes {...props} className="w-5 h-5 text-indigo-400" />;
      case 'BarChart2':
        return <BarChart2 {...props} className="w-5 h-5 text-yellow-400" />;
      case 'Table':
        return <Table {...props} className="w-5 h-5 text-emerald-400" />;
      case 'PieChart':
        return <PieChart {...props} className="w-5 h-5 text-violet-400" />;
      case 'LineChart':
        return <LineChart {...props} className="w-5 h-5 text-fuchsia-400" />;
      case 'Layout':
        return <Layout {...props} className="w-5 h-5 text-sky-400" />;
      case 'Server':
        return <Server {...props} className="w-5 h-5 text-emerald-400" />;
      case 'Network':
        return <Network {...props} className="w-5 h-5 text-indigo-400" />;
      case 'HardDrive':
        return <HardDrive {...props} className="w-5 h-5 text-teal-400" />;
      case 'Globe':
        return <Globe {...props} className="w-5 h-5 text-blue-400" />;
      case 'GitBranch':
        return <GitBranch {...props} className="w-5 h-5 text-orange-400" />;
      case 'Github':
        return <Github {...props} className="w-5 h-5 text-slate-200" />;
      case 'Terminal':
        return <Terminal {...props} className="w-5 h-5 text-cyan-400" />;
      case 'Layers':
        return <Layers {...props} className="w-5 h-5 text-purple-400" />;
      default:
        return <FileCode2 {...props} />;
    }
  };

  const getLevelBadgeClass = (level: CMSSkill['level']) => {
    switch (level) {
      case 'Strong Foundation':
        return 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30';
      case 'Working Knowledge':
        return 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30';
      case 'Familiar':
        return 'text-violet-300 bg-violet-950/40 border-violet-500/30';
      default:
        return 'text-slate-300 bg-white/5 border-white/10';
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Core Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Technical Arsenal
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Structured into practical programming languages, data analytics suites, web frameworks, and engineering tools.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0e1324] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon + Level Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    {renderIcon(skill.icon)}
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getLevelBadgeClass(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>

                {/* Skill Name & Category */}
                <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                  {skill.name}
                </h3>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {skill.category}
                </div>

                {/* Practical Description */}
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Domain Ready</span>
                <span className="text-violet-400/80 group-hover:text-violet-300 transition-colors">
                  &lt;/&gt;
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          Focused on solid foundations, clean implementations, and continuous learning — no inflated percentages.
        </div>
      </div>
    </section>
  );
};
