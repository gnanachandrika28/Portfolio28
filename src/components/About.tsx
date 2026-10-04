import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Code2,
  BarChart3,
  Cpu,
  Sparkles,
  MapPin,
  GraduationCap,
  Terminal,
  Quote,
} from 'lucide-react';

export const About: React.FC = () => {
  const { profile, education } = useCMS();
  const [activeInterest, setActiveInterest] = useState<string | null>(null);

  const interests = [
    'Python',
    'SQL',
    'Power BI',
    'Data Analytics',
    'Web Development',
    'DSA',
    'APIs',
    'AI/ML',
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Background &amp; Mindset
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            About Me
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Turning data and code into practical solutions through hands-on development.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative, Developer Statement & Interests */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0b0f20]/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                I'm {profile.name}, a {profile.title} passionate about building practical technology solutions.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-wrap">
                {profile.aboutMain}
              </p>

              {profile.aboutSecondary && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {profile.aboutSecondary}
                </p>
              )}

              {/* Personal Developer Statement Blockquote */}
              <div className="mt-6 p-4 rounded-xl bg-violet-950/30 border-l-4 border-violet-500 border-y border-r border-violet-500/20 relative">
                <Quote className="w-6 h-6 text-violet-500/40 absolute right-4 top-3" />
                <p className="text-sm sm:text-base font-semibold text-violet-200 italic">
                  "{profile.developerStatement}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                  {profile.developerStatementSub}
                </p>
              </div>

              {/* Developer Interests Interactive Tags */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-slate-400 mb-2.5">
                  Developer Interests (click to highlight):
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() =>
                        setActiveInterest(activeInterest === interest ? null : interest)
                      }
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        activeInterest === interest
                          ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/25 scale-105'
                          : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-violet-500/40 hover:text-white'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Info Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0b0e1d] border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400">Location</div>
                  <div className="font-semibold text-white mt-0.5">
                    {profile.location}
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0e1d] border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400">Education</div>
                  <div className="font-semibold text-white mt-0.5">
                    {education[0]?.degree ? `${education[0].degree} — ${education[0].field}` : 'B.Tech CSE'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Four Profile Highlight Cards & Animated Micro-Terminal */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <div className="group relative bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-violet-300 transition-colors">
                      Software Development
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Building practical applications using Python and modern web technologies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-violet-300 transition-colors">
                      Data &amp; Analytics
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Working with SQL, Excel, and Power BI to transform data into useful insights.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-violet-300 transition-colors">
                      Problem Solving
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Strengthening programming fundamentals and DSA to develop better solutions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-violet-300 transition-colors">
                      Continuous Learning
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Exploring new technologies and continuously improving through hands-on projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Micro-Terminal */}
            <div className="bg-[#070a14] border border-violet-500/30 rounded-xl p-4 font-mono shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] pb-2 mb-2 border-b border-white/10 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>runtime.loop</span>
                </div>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <div className="text-violet-400">&gt; learning()</div>
                <div className="text-cyan-400">&gt; building()</div>
                <div className="text-indigo-400">&gt; solving()</div>
                <div className="text-fuchsia-400">&gt; improving()</div>
              </div>

              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span>Always Learning</span>
                  <span>🚀</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
