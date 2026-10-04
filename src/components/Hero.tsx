import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  ArrowRight,
  Terminal,
  FileDown,
  Mail,
  Code2,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { profile, projects, skills, education, settings } = useCMS();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'whoami' | 'skills' | 'status'>('whoami');

  const roles = [
    profile.title || 'Software Engineer',
    'Python Developer',
    'Data Analyst',
    'Web Developer',
    'Problem Solver',
  ];

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const stats = [
    { label: 'Major Projects', value: `${projects.length}+`, detail: `${projects.filter((p) => p.featured).length} Featured Works` },
    { label: 'Core Skills', value: `${skills.length}+`, detail: 'Python, SQL, Power BI, Web' },
    { label: 'Education', value: education[0]?.degree ? 'B.Tech' : 'Engineering', detail: education[0]?.field || 'Computer Science' },
    { label: 'Specialization', value: 'Data + Web', detail: 'Analytics & Full Stack Development' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status indicator */}
            {settings.openToWork && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-950/40 border border-violet-500/30 text-xs text-violet-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono">Open to Software Engineering Opportunities</span>
              </div>
            )}

            {/* Primary Headline with text-wrap: balance */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] [text-wrap:balance]">
                Hi, I'm <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-cyan-300">
                  {profile.name}
                </span>
              </h1>

              {/* Subtitle */}
              <div className="text-base sm:text-xl font-medium text-slate-300 pt-1">
                <span>{profile.title}</span>
                <span className="mx-2 text-violet-400">|</span>
                <span className="text-cyan-300 font-semibold font-mono h-7 inline-block">
                  {displayText}
                  <span className="cursor-blink text-violet-400">|</span>
                </span>
              </div>
            </div>

            {/* Introduction paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {profile.intro}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.02] active:scale-95 border border-violet-400/30"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-xl border border-white/10 hover:border-violet-500/40 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Mail className="w-4 h-4 text-violet-400" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-violet-300 bg-transparent hover:bg-violet-950/20 rounded-xl border border-white/5 hover:border-violet-500/30 transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Quick Tech Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-500 font-mono">Core Focus:</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300 font-mono">
                Python
              </span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300 font-mono">
                SQL
              </span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300 font-mono">
                Power BI
              </span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300 font-mono">
                Web Dev
              </span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300 font-mono">
                Basic DSA
              </span>
            </div>
          </div>

          {/* Right Column: Glowing Interactive Terminal Workspace */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 to-cyan-500/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Terminal Window Box */}
            <div className="relative bg-[#0a0e1c] border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden text-left font-mono">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1428] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-violet-400" />
                    gnana-chandrika@workspace: ~
                  </span>
                </div>

                <div className="text-[10px] text-cyan-400 font-mono">bash 5.2</div>
              </div>

              {/* Interactive Command Tabs */}
              <div className="flex items-center gap-1 px-3 py-1.5 bg-[#0b1022] border-b border-white/5 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('whoami')}
                  className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                    activeTab === 'whoami'
                      ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  $ whoami
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                    activeTab === 'skills'
                      ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  $ cat skills.txt
                </button>
                <button
                  onClick={() => setActiveTab('status')}
                  className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                    activeTab === 'status'
                      ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  $ python status.py
                </button>
              </div>

              {/* Terminal Screen Body */}
              <div className="p-4 sm:p-5 text-xs text-slate-300 space-y-3 min-h-[220px]">
                {activeTab === 'whoami' && (
                  <div className="space-y-2 animate-in fade-in duration-150">
                    <div className="text-violet-400 flex items-center gap-1">
                      <span>$</span>
                      <span className="text-slate-200">whoami</span>
                    </div>

                    <div className="pl-2 space-y-1 border-l-2 border-violet-500/30">
                      <div className="text-sm font-bold text-white tracking-wide">
                        {profile.name}
                      </div>
                      <div className="text-violet-400 font-semibold">
                        {profile.title}
                      </div>
                      <div className="text-slate-400 text-[11px] pt-1">
                        Python • SQL • Power BI • Web Development
                      </div>
                    </div>

                    <div className="pt-2 text-cyan-300 flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>&gt; Building ideas into reality...</span>
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-2 animate-in fade-in duration-150 text-[11px]">
                    <div className="text-violet-400 flex items-center gap-1">
                      <span>$</span>
                      <span className="text-slate-200">cat skills.txt</span>
                    </div>
                    <div className="text-slate-300 space-y-1 pl-2 border-l-2 border-cyan-500/30">
                      <div>[Programming]  Python, SQL, Basic Java, Basic DSA</div>
                      <div>[Analytics]    Power BI, Excel, Data Visualization</div>
                      <div>[Web Dev]      React.js, Node.js, Express, MongoDB</div>
                      <div>[Tools]        Git, GitHub, VS Code</div>
                    </div>
                  </div>
                )}

                {activeTab === 'status' && (
                  <div className="space-y-2 animate-in fade-in duration-150 text-[11px]">
                    <div className="text-violet-400 flex items-center gap-1">
                      <span>$</span>
                      <span className="text-slate-200">python status.py</span>
                    </div>
                    <div className="text-slate-300 space-y-1 pl-2 border-l-2 border-emerald-500/30">
                      <div className="text-emerald-400">status = "Continuous Learning"</div>
                      <div>degree = "{education[0]?.degree || 'B.Tech CSE'}"</div>
                      <div>location = "{profile.locationShort}"</div>
                      <div className="text-cyan-300">print("Ready for new challenges!")</div>
                    </div>
                  </div>
                )}

                {/* Prompt Line */}
                <div className="pt-2 flex items-center gap-2 text-slate-400 text-[11px]">
                  <span className="text-emerald-400">gc@engineer</span>
                  <span className="text-slate-600">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-violet-400">$</span>
                  <span className="cursor-blink text-white">_</span>
                </div>
              </div>

              {/* Floating Code Snippets Ribbon */}
              <div className="px-4 py-2 bg-[#080c18] border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-violet-400" />
                  def solve_problem(data):
                </span>
                <span className="text-cyan-400 font-mono">return insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#0b0f20]/80 border border-white/10 hover:border-violet-500/40 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 group"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 font-mono tabular-nums group-hover:scale-105 transition-transform origin-left">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
