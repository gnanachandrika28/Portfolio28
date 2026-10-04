import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { DashboardOverview } from './DashboardOverview';
import { ProfileManager } from './ProfileManager';
import { SkillsManager } from './SkillsManager';
import { ProjectsManager } from './ProjectsManager';
import { ExperienceManager } from './ExperienceManager';
import { EducationManager } from './EducationManager';
import { CertificationsManager } from './CertificationsManager';
import { AchievementsManager } from './AchievementsManager';
import { SocialManager } from './SocialManager';
import { MessagesManager } from './MessagesManager';
import { SettingsManager } from './SettingsManager';
import { Menu, Shield, ExternalLink, Bell } from 'lucide-react';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onNavigateHome: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onNavigateHome,
}) => {
  const { user } = useAuth();
  const { unreadMessagesCount } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardOverview onSelectTab={onSelectTab} onNavigateHome={onNavigateHome} />;
      case 'profile':
        return <ProfileManager />;
      case 'skills':
        return <SkillsManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'education':
        return <EducationManager />;
      case 'certifications':
        return <CertificationsManager />;
      case 'achievements':
        return <AchievementsManager />;
      case 'social':
        return <SocialManager />;
      case 'messages':
        return <MessagesManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardOverview onSelectTab={onSelectTab} onNavigateHome={onNavigateHome} />;
    }
  };

  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'System Overview';
      case 'profile':
        return 'Profile Management';
      case 'skills':
        return 'Skills Arsenal';
      case 'projects':
        return 'Projects Management';
      case 'experience':
        return 'Experience & Milestones';
      case 'education':
        return 'Academic Education';
      case 'certifications':
        return 'Certifications & Learning';
      case 'achievements':
        return 'Achievements';
      case 'social':
        return 'Social & Public Links';
      case 'messages':
        return 'Contact Inquiries';
      case 'settings':
        return 'Site Settings';
      default:
        return 'Admin Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 flex relative selection:bg-violet-600/30">
      {/* Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        onNavigateHome={onNavigateHome}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-[#090d1c]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">
                {getTabTitle()}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                CMS v2.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {unreadMessagesCount > 0 && (
              <button
                onClick={() => onSelectTab('messages')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-rose-300 bg-rose-950/40 border border-rose-500/30 rounded-lg hover:bg-rose-950/60 transition-colors"
                title={`${unreadMessagesCount} unread message(s)`}
              >
                <Bell className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                <span className="font-mono">{unreadMessagesCount}</span>
              </button>
            )}

            <button
              onClick={onNavigateHome}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center font-bold text-xs text-violet-300 font-mono">
                GC
              </div>
              <span className="hidden md:inline text-xs font-medium text-slate-300">
                {user?.name || 'Gnana Chandrika'}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};
