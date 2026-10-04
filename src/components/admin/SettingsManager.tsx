import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import {
  Settings,
  Save,
  Download,
  Upload,
  RotateCcw,
  Key,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const { settings, updateSettings, resetToDefaults, exportData, importData, showToast } = useCMS();
  const { changePassword } = useAuth();

  const [formData, setFormData] = useState({ ...settings });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ success?: string; error?: string }>({});
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({});

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ error: 'New passwords do not match.' });
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setPasswordStatus({ success: 'Administrator password changed successfully.' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Admin password updated successfully.');
    } catch (err: unknown) {
      setPasswordStatus({
        error: err instanceof Error ? err.message : 'Failed to update password.',
      });
    }
  };

  const handleExportBackup = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CMS backup exported successfully.');
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importData(importJsonText);
    if (ok) {
      setShowImportModal(false);
      setImportJsonText('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-violet-400" />
          <span>Site Settings &amp; Configuration</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure site metadata, SEO tags, resume routing, security, and full database backups.
        </p>
      </div>

      {/* SEO & Global Metadata */}
      <form onSubmit={handleSaveSettings} className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            SEO &amp; General Configuration
          </h3>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-slate-300 font-medium mb-1">Website HTML Title</label>
            <input
              type="text"
              required
              value={formData.websiteTitle}
              onChange={(e) => setFormData({ ...formData, websiteTitle: e.target.value })}
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-medium mb-1">
              Meta Description (Search Engines &amp; Social Previews)
            </label>
            <textarea
              rows={2}
              required
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 resize-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Resume File Name</label>
            <input
              type="text"
              value={formData.resumeFileName}
              onChange={(e) => setFormData({ ...formData, resumeFileName: e.target.value })}
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Resume Download URL / Path</label>
            <input
              type="text"
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Footer Copyright Text</label>
            <input
              type="text"
              value={formData.footerText}
              onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input
                type="checkbox"
                checked={formData.openToWork}
                onChange={(e) => setFormData({ ...formData, openToWork: e.target.checked })}
                className="rounded text-violet-600 bg-[#070912]"
              />
              <span className="text-slate-300 font-medium">
                Show "Open to Software Engineering Opportunities" badge
              </span>
            </label>
          </div>
        </div>
      </form>

      {/* Admin Password Change Card */}
      <form onSubmit={handlePasswordSubmit} className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5" /> Change Administrator Password
          </h3>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md cursor-pointer"
          >
            <span>Update Password</span>
          </button>
        </div>

        {passwordStatus.error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{passwordStatus.error}</span>
          </div>
        )}

        {passwordStatus.success && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{passwordStatus.success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Current Password *</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">New Password (min 6 chars) *</label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Confirm New Password *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200"
            />
          </div>
        </div>
      </form>

      {/* Database Backup & Recovery Card */}
      <div className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
        <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 pb-2 border-b border-white/10">
          <Download className="w-3.5 h-3.5" /> CMS Data Backup &amp; Disaster Recovery
        </h3>

        <p className="text-slate-300 text-xs leading-relaxed">
          Export your complete portfolio data model into a portable JSON backup file, or restore previous states at any time.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export JSON Backup</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-violet-400" />
            <span>Import JSON Backup</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all CMS content to original initial defaults?')) {
                resetToDefaults();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-300 hover:text-white bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/20 rounded-xl transition-colors ml-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Initial Defaults</span>
          </button>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0f20] border border-violet-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-xs space-y-3">
            <h3 className="text-sm font-bold text-white">Import JSON Backup</h3>
            <p className="text-slate-400">
              Paste the exported JSON data below to restore your portfolio configuration:
            </p>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON here..."
              className="w-full px-3 py-2 bg-[#070912] border border-white/10 rounded-xl text-slate-200 font-mono text-[11px] resize-none"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-1.5 text-slate-300 hover:text-white bg-white/5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                className="px-4 py-1.5 font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md"
              >
                Apply Backup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
