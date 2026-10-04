import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSExperience } from '../../types/cms';
import { Briefcase, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export const ExperienceManager: React.FC = () => {
  const { experience, addExperience, updateExperience, deleteExperience } = useCMS();
  const [editingItem, setEditingItem] = useState<CMSExperience | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    period: '',
    focus: '',
    description: '',
    technologiesInput: '',
    currentPosition: true,
    displayOrder: experience.length + 1,
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      role: '',
      organization: 'Technical Development',
      period: '2025 – Present',
      focus: 'Python • SQL • Power BI',
      description: '',
      technologiesInput: 'Python, SQL, React',
      currentPosition: true,
      displayOrder: experience.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: CMSExperience) => {
    setEditingItem(item);
    setFormData({
      role: item.role,
      organization: item.organization,
      period: item.period,
      focus: item.focus,
      description: item.description,
      technologiesInput: item.technologies.join(', '),
      currentPosition: item.currentPosition,
      displayOrder: item.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role.trim()) return;

    const technologies = formData.technologiesInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      role: formData.role,
      organization: formData.organization,
      period: formData.period,
      focus: formData.focus,
      description: formData.description,
      technologies,
      currentPosition: formData.currentPosition,
      displayOrder: Number(formData.displayOrder) || 1,
    };

    if (editingItem) {
      updateExperience(editingItem.id, payload);
    } else {
      addExperience(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteExperience(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-violet-400" />
            <span>Journey &amp; Experience Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Maintain your technical development milestones and engineering trajectories.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((item) => (
          <div
            key={item.id}
            className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/30 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-violet-400 px-2 py-0.5 rounded bg-violet-950/40 border border-violet-500/30">
                  {item.period}
                </span>
                {item.currentPosition && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Active Focus
                  </span>
                )}
                <span className="text-xs text-slate-500 font-mono">#{item.displayOrder}</span>
              </div>

              <h3 className="text-base font-bold text-white">{item.role}</h3>
              <div className="text-xs text-cyan-300 font-medium">{item.focus}</div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.03] border border-white/5 text-slate-300 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openEditModal(item)}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 rounded-lg"
              >
                <Edit2 className="w-3.5 h-3.5 inline mr-1" />
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0f20] border border-violet-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">
                {editingItem ? 'Edit Journey Milestone' : 'Add Milestone'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Title / Role *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Core Foundations & Python Development"
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Time Period *</label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2025 – Present"
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Focus Areas *</label>
                <input
                  type="text"
                  required
                  value={formData.focus}
                  onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                  placeholder="Python • SQL • Power BI • Problem Solving"
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologiesInput}
                  onChange={(e) => setFormData({ ...formData, technologiesInput: e.target.value })}
                  placeholder="React, Node.js, Express, MongoDB"
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.currentPosition}
                    onChange={(e) => setFormData({ ...formData, currentPosition: e.target.checked })}
                    className="rounded text-violet-600 bg-[#070912]"
                  />
                  <span className="text-slate-300">Mark as Active Current Focus</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 text-slate-300 hover:text-white bg-white/5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0f20] border border-rose-500/30 rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center space-y-3">
            <h3 className="text-sm font-bold text-white">Delete Milestone?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove this journey entry?
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
