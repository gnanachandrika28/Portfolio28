import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CMSState,
  ProfileData,
  CMSSkill,
  CMSProject,
  CMSEducation,
  CMSExperience,
  CMSCertification,
  CMSAchievement,
  CMSSocialLinks,
  CMSContactMessage,
  CMSSiteSettings,
} from '../types/cms';
import { cmsStore } from '../services/cmsStore';

interface ToastInfo {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface CMSContextType {
  state: CMSState;
  profile: ProfileData;
  skills: CMSSkill[];
  projects: CMSProject[];
  featuredProjects: CMSProject[];
  education: CMSEducation[];
  experience: CMSExperience[];
  certifications: CMSCertification[];
  achievements: CMSAchievement[];
  socialLinks: CMSSocialLinks;
  messages: CMSContactMessage[];
  settings: CMSSiteSettings;
  unreadMessagesCount: number;
  lastUpdated: string;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Actions
  updateProfile: (data: Partial<ProfileData>) => void;
  addSkill: (skill: Omit<CMSSkill, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSkill: (id: string, data: Partial<CMSSkill>) => void;
  deleteSkill: (id: string) => void;

  addProject: (proj: Omit<CMSProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, data: Partial<CMSProject>) => void;
  deleteProject: (id: string) => void;
  toggleProjectFeatured: (id: string) => void;

  addEducation: (edu: Omit<CMSEducation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEducation: (id: string, data: Partial<CMSEducation>) => void;
  deleteEducation: (id: string) => void;

  addExperience: (exp: Omit<CMSExperience, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateExperience: (id: string, data: Partial<CMSExperience>) => void;
  deleteExperience: (id: string) => void;

  addCertification: (cert: Omit<CMSCertification, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCertification: (id: string, data: Partial<CMSCertification>) => void;
  deleteCertification: (id: string) => void;

  addAchievement: (ach: Omit<CMSAchievement, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAchievement: (id: string, data: Partial<CMSAchievement>) => void;
  deleteAchievement: (id: string) => void;

  updateSocialLinks: (data: Partial<CMSSocialLinks>) => void;

  addMessage: (msg: Omit<CMSContactMessage, 'id' | 'read' | 'createdAt'>) => CMSContactMessage;
  markMessageRead: (id: string, read?: boolean) => void;
  deleteMessage: (id: string) => void;

  updateSettings: (data: Partial<CMSSiteSettings>) => void;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CMSState>(cmsStore.getState());
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  useEffect(() => {
    const unsubscribe = cmsStore.subscribe(() => {
      setState({ ...cmsStore.getState() });
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateProfile = (data: Partial<ProfileData>) => {
    cmsStore.updateProfile(data);
    showToast('Profile updated successfully.');
  };

  const addSkill = (skill: Omit<CMSSkill, 'id' | 'createdAt' | 'updatedAt'>) => {
    cmsStore.addSkill(skill);
    showToast('Skill added successfully.');
  };

  const updateSkill = (id: string, data: Partial<CMSSkill>) => {
    cmsStore.updateSkill(id, data);
    showToast('Skill updated successfully.');
  };

  const deleteSkill = (id: string) => {
    cmsStore.deleteSkill(id);
    showToast('Skill removed.');
  };

  const addProject = (proj: Omit<CMSProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    cmsStore.addProject(proj);
    showToast('Project created successfully.');
  };

  const updateProject = (id: string, data: Partial<CMSProject>) => {
    cmsStore.updateProject(id, data);
    showToast('Project updated successfully.');
  };

  const deleteProject = (id: string) => {
    cmsStore.deleteProject(id);
    showToast('Project deleted.');
  };

  const toggleProjectFeatured = (id: string) => {
    cmsStore.toggleProjectFeatured(id);
    showToast('Project featured status updated.');
  };

  const addEducation = (edu: Omit<CMSEducation, 'id' | 'createdAt' | 'updatedAt'>) => {
    cmsStore.addEducation(edu);
    showToast('Education entry added.');
  };

  const updateEducation = (id: string, data: Partial<CMSEducation>) => {
    cmsStore.updateEducation(id, data);
    showToast('Education entry updated.');
  };

  const deleteEducation = (id: string) => {
    cmsStore.deleteEducation(id);
    showToast('Education entry removed.');
  };

  const addExperience = (exp: Omit<CMSExperience, 'id' | 'createdAt' | 'updatedAt'>) => {
    cmsStore.addExperience(exp);
    showToast('Experience milestone added.');
  };

  const updateExperience = (id: string, data: Partial<CMSExperience>) => {
    cmsStore.updateExperience(id, data);
    showToast('Experience milestone updated.');
  };

  const deleteExperience = (id: string) => {
    cmsStore.deleteExperience(id);
    showToast('Experience milestone removed.');
  };

  const addCertification = (cert: Omit<CMSCertification, 'id' | 'createdAt' | 'updatedAt'>) => {
    cmsStore.addCertification(cert);
    showToast('Certification added.');
  };

  const updateCertification = (id: string, data: Partial<CMSCertification>) => {
    cmsStore.updateCertification(id, data);
    showToast('Certification updated.');
  };

  const deleteCertification = (id: string) => {
    cmsStore.deleteCertification(id);
    showToast('Certification removed.');
  };

  const addAchievement = (ach: Omit<CMSAchievement, 'id' | 'createdAt' | 'updatedAt'>) => {
    cmsStore.addAchievement(ach);
    showToast('Achievement added.');
  };

  const updateAchievement = (id: string, data: Partial<CMSAchievement>) => {
    cmsStore.updateAchievement(id, data);
    showToast('Achievement updated.');
  };

  const deleteAchievement = (id: string) => {
    cmsStore.deleteAchievement(id);
    showToast('Achievement removed.');
  };

  const updateSocialLinks = (data: Partial<CMSSocialLinks>) => {
    cmsStore.updateSocialLinks(data);
    showToast('Social links updated.');
  };

  const addMessage = (msg: Omit<CMSContactMessage, 'id' | 'read' | 'createdAt'>) => {
    const newMsg = cmsStore.addMessage(msg);
    return newMsg;
  };

  const markMessageRead = (id: string, read?: boolean) => {
    cmsStore.markMessageRead(id, read);
  };

  const deleteMessage = (id: string) => {
    cmsStore.deleteMessage(id);
    showToast('Message deleted.');
  };

  const updateSettings = (data: Partial<CMSSiteSettings>) => {
    cmsStore.updateSettings(data);
    showToast('Settings saved successfully.');
  };

  const resetToDefaults = () => {
    cmsStore.resetToDefaults();
    showToast('Portfolio content reset to initial defaults.');
  };

  const exportData = () => {
    return cmsStore.exportData();
  };

  const importData = (json: string) => {
    const success = cmsStore.importData(json);
    if (success) {
      showToast('CMS backup data imported successfully.');
    } else {
      showToast('Failed to parse CMS backup data.', 'error');
    }
    return success;
  };

  const featuredProjects = state.projects
    .filter((p) => p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <CMSContext.Provider
      value={{
        state,
        profile: state.profile,
        skills: state.skills.sort((a, b) => a.displayOrder - b.displayOrder),
        projects: state.projects.sort((a, b) => a.displayOrder - b.displayOrder),
        featuredProjects,
        education: state.education.sort((a, b) => a.displayOrder - b.displayOrder),
        experience: state.experience.sort((a, b) => a.displayOrder - b.displayOrder),
        certifications: state.certifications.sort((a, b) => a.displayOrder - b.displayOrder),
        achievements: state.achievements.sort((a, b) => a.displayOrder - b.displayOrder),
        socialLinks: state.socialLinks,
        messages: state.messages,
        settings: state.settings,
        unreadMessagesCount: state.messages.filter((m) => !m.read).length,
        lastUpdated: state.lastUpdated,
        toasts,
        showToast,
        removeToast,
        updateProfile,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectFeatured,
        addEducation,
        updateEducation,
        deleteEducation,
        addExperience,
        updateExperience,
        deleteExperience,
        addCertification,
        updateCertification,
        deleteCertification,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        updateSocialLinks,
        addMessage,
        markMessageRead,
        deleteMessage,
        updateSettings,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-[999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto px-4 py-3 rounded-xl border shadow-xl text-xs font-medium flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200 cursor-pointer ${
              toast.type === 'success'
                ? 'bg-[#0f172a] text-emerald-300 border-emerald-500/30 shadow-emerald-950/40'
                : toast.type === 'error'
                ? 'bg-[#1e1115] text-rose-300 border-rose-500/30 shadow-rose-950/40'
                : 'bg-[#0f172a] text-cyan-300 border-cyan-500/30 shadow-cyan-950/40'
            }`}
          >
            <span>{toast.message}</span>
            <span className="text-[10px] text-slate-400">✕</span>
          </div>
        ))}
      </div>
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return ctx;
};
