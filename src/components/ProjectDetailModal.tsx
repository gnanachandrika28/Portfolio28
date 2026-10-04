import React, { useEffect } from 'react';
import { CMSProject } from '../types/cms';
import { PlacementReadinessMockup, StudyShareHubMockup } from './ProjectMockups';
import { X, Github, ArrowLeft, CheckCircle, Cpu, Layers, Terminal } from 'lucide-react';

interface ProjectDetailModalProps {
  project: CMSProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isPlacement =
    project.slug === 'placement-readiness-dashboard' ||
    project.id === 'placement-readiness-dashboard';
  const isStudyShare =
    project.slug === 'study-share-hub' || project.id === 'study-share-hub';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0e1a] border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0d1222]/95">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1 cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-[#070912]">
          {/* Header Title & Tags */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-violet-400 font-medium mb-2">
              {project.categories.map((cat, i) => (
                <React.Fragment key={cat}>
                  <span>{cat}</span>
                  {i < project.categories.length - 1 && <span className="text-slate-600">·</span>}
                </React.Fragment>
              ))}
            </div>

            <h1 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono bg-violet-950/40 border border-violet-500/30 text-violet-300 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Project Preview UI */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Interactive UI Simulation
              </h2>
              <span className="text-xs text-cyan-400 font-mono">Live Simulation</span>
            </div>

            {isPlacement ? (
              <PlacementReadinessMockup />
            ) : isStudyShare ? (
              <StudyShareHubMockup />
            ) : (
              <div className="bg-[#0a0e1c] border border-violet-500/25 rounded-xl p-6 text-slate-300 font-mono text-xs space-y-2">
                <div className="text-cyan-400 font-bold">// System Flow Architecture</div>
                <div className="p-3 bg-black/40 rounded border border-white/5 text-slate-200">
                  {project.architecture || 'Data -> Service -> View'}
                </div>
              </div>
            )}
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0e1324] border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wide flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                The Problem
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="bg-[#0e1324] border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                The Engineered Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Overview */}
          <div className="bg-[#0d1222] border border-violet-500/20 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-violet-300 uppercase tracking-wide flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-violet-400" />
              Architecture &amp; Data Flow
            </h3>
            <div className="p-3 bg-[#080b16] rounded-lg border border-white/5 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto">
              {project.architecture}
            </div>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="bg-[#0e1324] border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-cyan-400" />
                Key Features &amp; Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Development Process */}
          {project.developmentProcess && project.developmentProcess.length > 0 && (
            <div className="bg-[#0e1324] border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-violet-400" />
                Development Process
              </h3>
              <div className="space-y-3">
                {project.developmentProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="font-mono text-xs text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-500/30 shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact & Outcome */}
          <div className="bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-[#0e1324] border border-violet-500/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-violet-300 uppercase tracking-wide mb-2">
              Project Outcome &amp; Impact
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {project.impact}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-4 sm:px-6 py-3 bg-[#0d1222] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Source code repository
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
