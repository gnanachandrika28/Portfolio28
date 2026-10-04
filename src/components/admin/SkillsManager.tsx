import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSSkill } from '../../types/cms';
import { Plus, Edit2, Trash2, Search, Wrench, X, Check, ArrowUpDown } from 'lucide-react';

export const SkillsManager: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useCMS();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSkill, setEditingSkill] = useState<CMSSkill | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<CMSSkill, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    category: 'Programming',
    level: 'Strong Foundation',
    description: '',
    icon: 'FileCode2',
    displayOrder: skills.length + 1,
    status: 'active',
  });

  const categories = ['All', 'Programming', 'Data & Analytics', 'Web Development', 'Tools', 'Other'];

  const filteredSkills = skills.filter((skill) => {
    const matchesCat = filterCategory === 'All' || skill.category === filterCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const openAddModal = () => {
    setFormData({
      name: '',
      category: 'Programming',
      level: 'Strong Foundation',
      description: '',
      icon: 'FileCode2',
      displayOrder: skills.length + 1,
      status: 'active',
    });
    setEditingSkill(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (skill: CMSSkill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      description: skill.description,
      icon: skill.icon,
      displayOrder: skill.displayOrder,
      status: skill.status,
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingSkill) {
      updateSkill(editingSkill.id, formData);
    } else {
      addSkill(formData);
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteSkill(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-5 h-5 text-cyan-400" />
            <span>Technical Arsenal Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Organize programming languages, analytical suites, web frameworks, and developer tools.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === cat
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Skills Table / Card View */}
      <div className="bg-[#0a0e1c] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0d1224] text-slate-400 uppercase font-mono text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Skill Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Proficiency Level</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSkills.map((skill) => (
                <tr key={skill.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500">{skill.displayOrder}</td>
                  <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                    {skill.name}
                  </td>
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                    {skill.category}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        skill.level === 'Strong Foundation'
                          ? 'text-emerald-300 bg-emerald-950/30 border-emerald-500/30'
                          : skill.level === 'Working Knowledge'
                          ? 'text-cyan-300 bg-cyan-950/30 border-cyan-500/30'
                          : 'text-violet-300 bg-violet-950/30 border-violet-500/30'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                    {skill.description}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(skill)}
                        className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(skill.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0f20] border border-violet-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">
                {editingSkill ? 'Edit Technical Skill' : 'Add New Technical Skill'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Python, SQL"
                    className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as CMSSkill['category'] })
                    }
                    className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Data & Analytics">Data & Analytics</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Proficiency Level *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value as CMSSkill['level'] })
                    }
                    className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Strong Foundation">Strong Foundation</option>
                    <option value="Working Knowledge">Working Knowledge</option>
                    <option value="Familiar">Familiar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Practical Description &amp; Usage *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Core scripting, data manipulation, automation, and backend logic."
                  className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white bg-white/5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md"
                >
                  {editingSkill ? 'Save Changes' : 'Create Skill'}
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
            <h3 className="text-sm font-bold text-white">Delete Technical Skill?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove this skill from your portfolio? This action cannot be undone.
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
                Delete Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
