import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSAchievement } from '../../types/cms';
import { Sparkles, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export const AchievementsManager: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useCMS();
  const [editingItem, setEditingItem] = useState<CMSAchievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: 'Engineering',
    icon: 'Sparkles',
    displayOrder: achievements.length + 1,
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      tag: 'Development',
      icon: 'Sparkles',
      displayOrder: achievements.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: CMSAchievement) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      tag: item.tag,
      icon: item.icon,
      displayOrder: item.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      tag: formData.tag,
      icon: formData.icon,
      displayOrder: Number(formData.displayOrder) || 1,
    };

    if (editingItem) {
      updateAchievement(editingItem.id, payload);
    } else {
      addAchievement(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteAchievement(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
            <span>Achievements &amp; Focus Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Showcase validated milestones, project executions, and continuous learning achievements.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/40 border border-violet-500/30 text-violet-300">
                  {item.tag}
                </span>
                <span className="text-xs font-mono text-slate-500">#{item.displayOrder}</span>
              </div>

              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end gap-1">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 text-slate-400 hover:text-cyan-300 rounded"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0f20] border border-violet-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">
                {editingItem ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. End-to-End Analytics Dashboard"
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tag / Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="Data Analytics, Full Stack, DSA"
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
                <label className="block text-slate-300 font-medium mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  Save Achievement
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
            <h3 className="text-sm font-bold text-white">Delete Achievement?</h3>
            <p className="text-xs text-slate-300">Are you sure you want to remove this record?</p>
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
