import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowLeft, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onNavigateHome }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('gnanignani989@gmail.com');
  const [password, setPassword] = useState('admin@gc2026');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide both administrator email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 flex flex-col justify-center items-center p-4 relative selection:bg-violet-600/30">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to public site button */}
      <button
        onClick={onNavigateHome}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Public Portfolio</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0a0e1c] border border-violet-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10 backdrop-blur-xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px] mx-auto shadow-lg shadow-violet-500/30">
            <div className="w-full h-full bg-[#0b0e1a] rounded-[11px] flex items-center justify-center">
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Administrator Portal
          </h1>
          <p className="text-xs text-slate-400">
            Portfolio Management &amp; Content Management System
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="gnanignani989@gmail.com"
                required
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/30 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin Dashboard</span>
            )}
          </button>
        </form>

        {/* Credentials guidance for portfolio owner */}
        <div className="mt-6 pt-4 border-t border-white/5 bg-white/[0.02] p-3 rounded-xl border border-white/5 text-[11px] text-slate-400 space-y-1">
          <div className="font-semibold text-violet-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Portfolio Administrator Credentials:</span>
          </div>
          <div>
            Email:{' '}
            <code className="text-slate-200 font-mono">gnanignani989@gmail.com</code>
          </div>
          <div>
            Default Password:{' '}
            <code className="text-slate-200 font-mono">admin@gc2026</code>
          </div>
          <div className="text-[10px] text-slate-500 pt-1">
            You can change this password anytime in Site Settings.
          </div>
        </div>
      </div>
    </div>
  );
};
