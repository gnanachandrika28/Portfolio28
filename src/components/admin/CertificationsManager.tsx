import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSCertification } from '../../types/cms';
import { Award, Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';

export const CertificationsManager: React.FC = () => {
  const { certifications, addCertification, updateCertification, deleteCertification } = useCMS();
  const [editingItem, setEditingItem] = useState<CMSCertification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: 'Continuous Practice',
    credentialUrl: '',
    status: 'In Progress' as CMSCertification['status'],
    note: '',
    displayOrder: certifications.length + 1,
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      issuer: 'Certification Track',
      date: 'Continuous Practice',
      credentialUrl: '',
      status: 'In Progress',
      note: '',
      displayOrder: certifications.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: CMSCertification) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      issuer: item.issuer,
      date: item.date,
      credentialUrl: item.credentialUrl || '',
      status: item.status,
      note: item.note || '',
      displayOrder: item.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      name: formData.name,
      issuer: formData.issuer,
      date: formData.date,
      credentialUrl: formData.credentialUrl,
      status: formData.status,
      note: formData.note,
      displayOrder: Number(formData.displayOrder) || 1,
    };

    if (editingItem) {
      updateCertification(editingItem.id, payload);
    } else {
      addCertification(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteCertification(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Certifications &amp; Learning Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Maintain verified credential records, coursework validations, and issuing organizations.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((item) => (
          <div
            key={item.id}
            className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/40 border border-violet-500/30 text-violet-300">
                  {item.status}
                </span>
                <span className="text-xs font-mono text-slate-500">#{item.displayOrder}</span>
              </div>

              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <div className="text-xs text-slate-400 mt-0.5">{item.issuer}</div>

              {item.note && (
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.note}</p>
              )}

              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Credential Link</span>
                </a>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500 text-[11px]">{item.date}</span>
              <div className="flex items-center gap-1">
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
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0f20] border border-violet-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">
                {editingItem ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as CMSCertification['status'] })
                    }
                    className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date / Target</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. Continuous Practice"
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
                <label className="block text-slate-300 font-medium mb-1">Credential URL (Optional)</label>
                <input
                  type="url"
                  value={formData.credentialUrl}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description / Note</label>
                <textarea
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
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
                  Save Certification
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
            <h3 className="text-sm font-bold text-white">Delete Certification?</h3>
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
