import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { AdminTab } from './AdminSidebar';
import {
  FolderGit2,
  Wrench,
  GraduationCap,
  Award,
  Mail,
  Clock,
  PlusCircle,
  Edit,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface DashboardOverviewProps {
  onSelectTab: (tab: AdminTab) => void;
  onNavigateHome: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onSelectTab,
  onNavigateHome,
}) => {
  const {
    projects,
    skills,
    education,
    certifications,
    messages,
    unreadMessagesCount,
    lastUpdated,
    profile,
  } = useCMS();

  const formattedLastUpdated = new Date(lastUpdated).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      detail: `${projects.filter((p) => p.featured).length} Featured`,
      icon: <FolderGit2 className="w-5 h-5 text-violet-400" />,
      tab: 'projects' as AdminTab,
    },
    {
      label: 'Total Skills',
      value: skills.length,
      detail: `${skills.filter((s) => s.category === 'Programming').length} Programming`,
      icon: <Wrench className="w-5 h-5 text-cyan-400" />,
      tab: 'skills' as AdminTab,
    },
    {
      label: 'Education Entries',
      value: education.length,
      detail: 'B.Tech CSE & Intermediate',
      icon: <GraduationCap className="w-5 h-5 text-indigo-400" />,
      tab: 'education' as AdminTab,
    },
    {
      label: 'Certifications',
      value: certifications.length,
      detail: 'Track credentials',
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      tab: 'certifications' as AdminTab,
    },
    {
      label: 'Contact Messages',
      value: messages.length,
      detail: `${unreadMessagesCount} Unread`,
      icon: <Mail className="w-5 h-5 text-rose-400" />,
      badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} New` : undefined,
      tab: 'messages' as AdminTab,
    },
    {
      label: 'Last Updated',
      value: 'Synced',
      detail: formattedLastUpdated,
      icon: <Clock className="w-5 h-5 text-yellow-400" />,
      tab: 'settings' as AdminTab,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-violet-950/40 via-[#0a0e1c] to-cyan-950/30 border border-violet-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Content Management Engine Online</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs text-slate-400">
            Manage public portfolio sections, update projects, review inquiries, and configure credentials.
          </p>
        </div>

        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <span>Preview Live Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Metrics Stat Cards Grid */}
      <div>
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
          Overview Statistics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTab(stat.tab)}
              className="bg-[#0a0e1c] border border-white/10 hover:border-violet-500/40 rounded-xl p-4 transition-all duration-200 hover:shadow-lg text-left group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                {stat.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {stat.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {stat.detail}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions Row */}
      <div>
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <Edit className="w-4 h-4 text-violet-400 shrink-0" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => onSelectTab('projects')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Add Project</span>
          </button>

          <button
            onClick={() => onSelectTab('skills')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Add Skill</span>
          </button>

          <button
            onClick={() => onSelectTab('certifications')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Add Certification</span>
          </button>

          <button
            onClick={() => onSelectTab('messages')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-rose-400 shrink-0" />
            <span>View Messages</span>
          </button>
        </div>
      </div>

      {/* Recent Contact Messages Preview */}
      <div className="bg-[#0a0e1c] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white">Recent Inquiries</h3>
          </div>
          <button
            onClick={() => onSelectTab('messages')}
            className="text-xs text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <span>All Messages ({messages.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 font-mono">
            No contact messages received yet.
          </div>
        ) : (
          <div className="space-y-2">
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                onClick={() => onSelectTab('messages')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  !msg.read
                    ? 'bg-violet-950/20 border-violet-500/40 hover:bg-violet-950/30'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white truncate">
                      {msg.name}
                    </span>
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    )}
                    <span className="text-[11px] text-slate-500 font-mono truncate">
                      {msg.email}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 truncate mt-0.5">
                    {msg.subject}
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 whitespace-nowrap font-mono shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
