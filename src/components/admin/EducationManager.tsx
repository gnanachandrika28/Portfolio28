import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSEducation } from '../../types/cms';
import { GraduationCap, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export const EducationManager: React.FC = () => {
  const { education, addEducation, updateEducation, deleteEducation } = useCMS();
  const [editingItem, setEditingItem] = useState<CMSEducation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    institution: '',
    location: '',
    degree: '',
    field: '',
    duration: '',
    highlightsInput: '',
    displayOrder: education.length + 1,
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      institution: '',
      location: 'Andhra Pradesh, India',
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      duration: '2023 – 2027',
      highlightsInput: 'Data Structures and Algorithms\nDatabase Management Systems\nPython & Web Development',
      displayOrder: education.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: CMSEducation) => {
    setEditingItem(item);
    setFormData({
      institution: item.institution,
      location: item.location,
      degree: item.degree,
      field: item.field,
      duration: item.duration,
      highlightsInput: item.highlights.join('\n'),
      displayOrder: item.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.institution.trim()) return;

    const highlights = formData.highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const payload = {
      institution: formData.institution,
      location: formData.location,
      degree: formData.degree,
      field: formData.field,
      duration: formData.duration,
      highlights,
      displayOrder: Number(formData.displayOrder) || 1,
    };

    if (editingItem) {
      updateEducation(editingItem.id, payload);
    } else {
      addEducation(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteEducation(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Academic Education Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your degrees, institutions, study streams, and academic milestones.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((item) => (
          <div
            key={item.id}
            className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-bold text-white">{item.institution}</h3>
                  <div className="text-xs text-violet-400 font-semibold mt-0.5">
                    {item.degree} — {item.field}
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
                  {item.duration}
                </span>
              </div>

              <div className="text-xs text-slate-400">{item.location}</div>

              <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                {item.highlights.map((h, i) => (
                  <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-violet-400">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500">Order: {item.displayOrder}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-white/5 rounded-lg"
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
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0f20] border border-violet-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">
                {editingItem ? 'Edit Education Entry' : 'Add Education Entry'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="Gates Institute of Technology"
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Degree *</label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="Bachelor of Technology"
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Field / Stream *</label>
                  <input
                    type="text"
                    required
                    value={formData.field}
                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                    placeholder="Computer Science & Engineering"
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="2023 – 2027"
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
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
                <label className="block text-slate-300 font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Gooty, Anantapur District, Andhra Pradesh"
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Highlights (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.highlightsInput}
                  onChange={(e) => setFormData({ ...formData, highlightsInput: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 resize-none"
                />
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
                  Save Entry
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
            <h3 className="text-sm font-bold text-white">Delete Education Entry?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove this academic credential?
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
