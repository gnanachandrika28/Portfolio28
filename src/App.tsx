/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CMSProvider, useCMS } from './context/CMSContext';
import { CMSProject } from './types/cms';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { HowIBuild } from './components/HowIBuild';
import { Capabilities } from './components/Capabilities';
import { GitHubSection } from './components/GitHubSection';
import { ResumeCTA } from './components/ResumeCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminTab } from './components/admin/AdminSidebar';

function AppContent() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { projects } = useCMS();

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedProject, setSelectedProject] = useState<CMSProject | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync route on mount and browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync project detail modal if on a project route
  useEffect(() => {
    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '').replace(/\/$/, '');
      const match = projects.find((p) => p.slug === slug || p.id === slug);
      if (match) {
        setSelectedProject(match);
      }
    } else if (!currentPath.startsWith('/projects/')) {
      setSelectedProject(null);
    }
  }, [currentPath, projects]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: CMSProject) => {
    setSelectedProject(project);
    navigate(`/projects/${project.slug}`);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    navigate('/');
  };

  // Route 1: Admin Login (/admin/login)
  if (currentPath === '/admin/login') {
    if (isAuthenticated) {
      navigate('/admin');
      return null;
    }
    return (
      <AdminLogin
        onSuccess={() => navigate('/admin')}
        onNavigateHome={() => navigate('/')}
      />
    );
  }

  // Route 2: Admin Dashboard (/admin and /admin/*)
  if (currentPath.startsWith('/admin')) {
    if (isAuthLoading) {
      return (
        <div className="min-h-screen bg-[#060810] flex items-center justify-center text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs">Authenticating administrator...</span>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => navigate('/admin')}
          onNavigateHome={() => navigate('/')}
        />
      );
    }

    // Determine active tab from pathname
    let tab: AdminTab = 'dashboard';
    const subRoute = currentPath.replace('/admin', '').replace(/^\//, '');
    const validTabs: AdminTab[] = [
      'dashboard',
      'profile',
      'skills',
      'projects',
      'experience',
      'education',
      'certifications',
      'achievements',
      'social',
      'messages',
      'settings',
    ];

    if (validTabs.includes(subRoute as AdminTab)) {
      tab = subRoute as AdminTab;
    }

    return (
      <AdminLayout
        currentTab={tab}
        onSelectTab={(newTab) => navigate(`/admin/${newTab}`)}
        onNavigateHome={() => navigate('/')}
      />
    );
  }

  // Route 3: Public Portfolio (/)
  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 relative selection:bg-violet-600/30 selection:text-violet-200">
      {/* Background canvas & subtle neon particle effects */}
      <BackgroundEffects />

      {/* Sticky Top Navigation Bar with dynamic profile & admin link */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onNavigateAdmin={() => navigate('/admin')}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects onSelectProject={handleSelectProject} />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <HowIBuild />
        <Capabilities />
        <GitHubSection />
        <ResumeCTA onOpenResume={() => setIsResumeOpen(true)} />
        <Contact />
      </main>

      {/* Footer with admin access link */}
      <Footer onNavigateAdmin={() => navigate('/admin')} />

      {/* Project Detail Modal / Route View */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProject}
      />

      {/* In-App Resume Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <AppContent />
      </CMSProvider>
    </AuthProvider>
  );
}
