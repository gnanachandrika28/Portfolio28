import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Share2, Save, Github, Linkedin, Mail, Phone, Globe, Twitter, RefreshCw } from 'lucide-react';

export const SocialManager: React.FC = () => {
  const { socialLinks, updateSocialLinks } = useCMS();
  const [formData, setFormData] = useState({ ...socialLinks });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateSocialLinks(formData);
      setIsSaving(false);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <span>Social Links &amp; Public Handles</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update repository links, professional networks, and direct communication channels.
          </p>
        </div>

        <button
          type="submit"
          form="social-form"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 self-start sm:self-auto cursor-pointer"
        >
          {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>Save Social Links</span>
        </button>
      </div>

      <form id="social-form" onSubmit={handleSubmit} className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub Profile URL *</span>
            </label>
            <input
              type="url"
              required
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/gnanachandrika28"
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
              <span>LinkedIn Profile URL *</span>
            </label>
            <input
              type="url"
              required
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://www.linkedin.com/in/gnana-chandrika-boya"
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-violet-400" />
              <span>Primary Email *</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="gnanignani989@gmail.com"
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Contact Phone *</span>
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 9100428285"
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Twitter className="w-3.5 h-3.5 text-sky-400" />
              <span>Twitter / X (Optional)</span>
            </label>
            <input
              type="text"
              value={formData.twitter || ''}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              placeholder="https://x.com/..."
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Personal Website / Custom Domain</span>
            </label>
            <input
              type="text"
              value={formData.website || ''}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://gnanachandrika.dev"
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
