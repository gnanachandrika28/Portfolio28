import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Github, ExternalLink, GitBranch, Code2, Star, Sparkles } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Open Source & Code
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              GitHub & Repositories
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Explore source repositories, data analysis scripts, and project implementations on GitHub.
            </p>
          </div>

          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#161b2e] hover:bg-[#1e2540] border border-white/10 hover:border-violet-500/50 rounded-xl transition-all shadow-md active:scale-95 self-start md:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>Visit My GitHub (@gnanachandrika28)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {portfolioData.githubRepos.map((repo, idx) => (
            <div
              key={idx}
              className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                    <Code2 className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>{repo.name}</span>
                  </div>

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    aria-label={`Open ${repo.name} on GitHub`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-mono bg-white/[0.03] border border-white/5 text-slate-400 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{repo.language}</span>
                </span>
                <span className="text-[11px] text-slate-500">Public Repository</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
