import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save, RefreshCw, CheckCircle2, User, Mail, Phone, MapPin, FileText, Quote } from 'lucide-react';

export const ProfileManager: React.FC = () => {
  const { profile, updateProfile } = useCMS();
  const [formData, setFormData] = useState({ ...profile });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateProfile(formData);
      setIsSaving(false);
    }, 400);
  };

  const handleReset = () => {
    setFormData({ ...profile });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <User className="w-5 h-5 text-violet-400" />
            <span>Profile Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update personal information, headlines, developer statements, and contact details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors cursor-pointer"
          >
            Cancel / Reset
          </button>
          <button
            type="submit"
            form="profile-form"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Core Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Short Name (Wordmark) *
              </label>
              <input
                type="text"
                required
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Initials / Monogram
              </label>
              <input
                type="text"
                value={formData.initials}
                onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Hero Subtitle / Catchphrase
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Narrative & Introductions */}
        <div className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Narratives &amp; About Me
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Hero Short Introduction
            </label>
            <textarea
              rows={3}
              value={formData.intro}
              onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                About Me — Main Introduction Paragraph
              </label>
              <textarea
                rows={5}
                value={formData.aboutMain}
                onChange={(e) => setFormData({ ...formData, aboutMain: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                About Me — Projects &amp; Learning Growth Paragraph
              </label>
              <textarea
                rows={5}
                value={formData.aboutSecondary}
                onChange={(e) => setFormData({ ...formData, aboutSecondary: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Developer Quote / Statement
              </label>
              <input
                type="text"
                value={formData.developerStatement}
                onChange={(e) => setFormData({ ...formData, developerStatement: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Statement Subtitle
              </label>
              <input
                type="text"
                value={formData.developerStatementSub}
                onChange={(e) => setFormData({ ...formData, developerStatementSub: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Contact & Location Details */}
        <div className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Contact Channels &amp; Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Location String
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Short Location (e.g. for Badges)
              </label>
              <input
                type="text"
                value={formData.locationShort}
                onChange={(e) => setFormData({ ...formData, locationShort: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Resume URL / Path
              </label>
              <input
                type="text"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
