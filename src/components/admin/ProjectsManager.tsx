import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSProject } from '../../types/cms';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  Github,
  X,
  Check,
  Search,
} from 'lucide-react';

export const ProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, toggleProjectFeatured } = useCMS();
  const [editingProject, setEditingProject] = useState<CMSProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    detailedDescription: '',
    techInput: '',
    categoriesInput: '',
    problem: '',
    solution: '',
    featuresInput: '',
    impact: '',
    architecture: '',
    developmentProcessInput: '',
    githubUrl: '',
    liveDemoUrl: '',
    featured: true,
    displayOrder: projects.length + 1,
  });

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      detailedDescription: '',
      techInput: 'Python, SQL',
      categoriesInput: 'Data Analytics, Business Intelligence',
      problem: '',
      solution: '',
      featuresInput: 'Interactive KPI metrics\nDynamic filtering\nData extraction pipeline',
      impact: '',
      architecture: 'Data Sources -> Extraction -> Transformation -> Visualization',
      developmentProcessInput: 'Requirement Analysis\nData Modeling\nImplementation\nTesting',
      githubUrl: 'https://github.com/gnanachandrika28',
      liveDemoUrl: '',
      featured: true,
      displayOrder: projects.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj: CMSProject) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      shortDescription: proj.shortDescription,
      detailedDescription: proj.detailedDescription || proj.shortDescription,
      techInput: proj.tech.join(', '),
      categoriesInput: proj.categories.join(', '),
      problem: proj.problem,
      solution: proj.solution,
      featuresInput: proj.keyFeatures.join('\n'),
      impact: proj.impact,
      architecture: proj.architecture,
      developmentProcessInput: proj.developmentProcess.join('\n'),
      githubUrl: proj.githubUrl,
      liveDemoUrl: proj.liveDemoUrl || '',
      featured: proj.featured,
      displayOrder: proj.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tech = formData.techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const categories = formData.categoriesInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const keyFeatures = formData.featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const developmentProcess = formData.developmentProcessInput
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const slug =
      formData.slug.trim() ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const projectPayload: Omit<CMSProject, 'id' | 'createdAt' | 'updatedAt'> = {
      title: formData.title,
      slug,
      shortDescription: formData.shortDescription,
      detailedDescription: formData.detailedDescription,
      tech,
      categories,
      problem: formData.problem,
      solution: formData.solution,
      keyFeatures,
      impact: formData.impact,
      architecture: formData.architecture,
      developmentProcess,
      githubUrl: formData.githubUrl,
      liveDemoUrl: formData.liveDemoUrl,
      featured: formData.featured,
      displayOrder: Number(formData.displayOrder) || 1,
    };

    if (editingProject) {
      updateProject(editingProject.id, projectPayload);
    } else {
      addProject(projectPayload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setDeleteConfirmId(null);
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-violet-400" />
            <span>Projects Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, feature, and showcase your engineering works.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search projects by name or technology..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500">#{project.displayOrder}</span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                </div>

                {/* Featured Toggle Button */}
                <button
                  onClick={() => toggleProjectFeatured(project.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors cursor-pointer ${
                    project.featured
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-white/5 text-slate-500 border border-white/5'
                  }`}
                  title={project.featured ? 'Featured on public website' : 'Not featured'}
                >
                  <Star className={`w-3 h-3 ${project.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>{project.featured ? 'Featured: ON' : 'Featured: OFF'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {project.shortDescription}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mt-3">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.04] border border-white/10 text-cyan-300 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Problem / Solution preview */}
              <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400 line-clamp-2">
                <strong className="text-slate-300">Solution: </strong>
                {project.solution}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(project)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-cyan-400" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(project.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-[#0b0e1a] border border-violet-500/30 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0d1222]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-violet-400" />
                <span>{editingProject ? 'Edit Project' : 'Create New Project'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-medium mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Placement Readiness Dashboard"
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Route Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="placement-readiness-dashboard"
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="1-2 sentences summarizing the project..."
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Technologies (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.techInput}
                    onChange={(e) => setFormData({ ...formData, techInput: e.target.value })}
                    placeholder="Power BI, SQL, Python, Excel"
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Categories (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.categoriesInput}
                    onChange={(e) => setFormData({ ...formData, categoriesInput: e.target.value })}
                    placeholder="Data Analytics, Business Intelligence"
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    The Problem
                  </label>
                  <textarea
                    rows={3}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    The Solution
                  </label>
                  <textarea
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Key Features (one per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.featuresInput}
                  onChange={(e) => setFormData({ ...formData, featuresInput: e.target.value })}
                  placeholder="Interactive KPI cards&#10;Dynamic filters&#10;SQL data extraction"
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Outcome &amp; Impact
                  </label>
                  <input
                    type="text"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Architecture &amp; Data Pipeline
                  </label>
                  <input
                    type="text"
                    value={formData.architecture}
                    onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-white/10 text-violet-600 focus:ring-violet-500 bg-[#070912]"
                  />
                  <span className="text-slate-300 font-medium">
                    Display this project in Featured Projects on the public portfolio
                  </span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white bg-white/5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md cursor-pointer"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0f20] border border-rose-500/30 rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center space-y-3">
            <h3 className="text-sm font-bold text-white">Delete Project?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this project? It will be removed from your portfolio immediately.
            </p>
            <div className="flex items-center justify-center gap-2 pt-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
