import React from 'react';
import { useCMS } from '../context/CMSContext';
import { CMSProject } from '../types/cms';
import { PlacementReadinessMockup, StudyShareHubMockup } from './ProjectMockups';
import {
  Github,
  CheckCircle2,
  Maximize2,
  Sparkles,
  Terminal,
  Code2,
} from 'lucide-react';

interface ProjectsProps {
  onSelectProject: (project: CMSProject) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const { featuredProjects } = useCMS();

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Engineering Showcases
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Real-world applications spanning Business Intelligence data modeling, SQL pipelines, and full-stack web platforms.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-12">
          {featuredProjects.map((project) => {
            const isPlacement =
              project.slug === 'placement-readiness-dashboard' ||
              project.id === 'placement-readiness-dashboard';
            const isStudyShare =
              project.slug === 'study-share-hub' || project.id === 'study-share-hub';

            return (
              <div
                key={project.id}
                className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left Column: Project Overview, Features & CTAs */}
                  <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Category Tags */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-violet-400 mb-2.5">
                        {project.categories.map((cat, cIdx) => (
                          <React.Fragment key={cat}>
                            <span>{cat}</span>
                            {cIdx < project.categories.length - 1 && (
                              <span className="text-slate-600">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-violet-300 transition-colors">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Key Features Bullets */}
                      <div className="mt-5 space-y-2">
                        <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                          Highlighted Capabilities:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {project.keyFeatures.slice(0, 4).map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tech Stack & Action Buttons */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-200 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md shadow-violet-600/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>View Details &amp; Architecture</span>
                        </button>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Mockup Canvas */}
                  <div className="lg:col-span-6 bg-[#080b16] p-4 sm:p-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
                      <span className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-300">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        Interactive UI Preview
                      </span>
                      <button
                        onClick={() => onSelectProject(project)}
                        className="text-[11px] text-violet-400 hover:text-violet-300 underline underline-offset-4 cursor-pointer"
                      >
                        Expand details
                      </button>
                    </div>

                    {/* Interactive UI Mockup */}
                    <div className="transform transition-transform group-hover:scale-[1.008]">
                      {isPlacement ? (
                        <PlacementReadinessMockup />
                      ) : isStudyShare ? (
                        <StudyShareHubMockup />
                      ) : (
                        <div className="w-full bg-[#0a0e1c] border border-violet-500/25 rounded-xl p-5 shadow-2xl font-mono text-xs space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400">
                            <span className="flex items-center gap-1.5 text-cyan-300">
                              <Terminal className="w-3.5 h-3.5" />
                              <span>{project.slug}.sys</span>
                            </span>
                            <span className="text-emerald-400 text-[10px]">PRODUCTION</span>
                          </div>
                          <div className="text-slate-300 leading-relaxed text-xs">
                            <div className="text-violet-400 font-bold mb-1">// Architecture Flow</div>
                            <div className="text-cyan-200 bg-black/40 p-2.5 rounded border border-white/5 overflow-x-auto text-[11px]">
                              {project.architecture || 'Client SPA -> API Service -> Database'}
                            </div>
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            <strong className="text-slate-200">Outcome: </strong>
                            {project.impact}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 text-[11px] text-slate-500 italic text-center">
                      {isPlacement
                        ? 'Try clicking CSE/ECE/IT branch filters to inspect dynamic metrics'
                        : isStudyShare
                        ? 'Try searching or filtering by subject to test resource retrieval'
                        : 'Custom project configured through Admin CMS'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
