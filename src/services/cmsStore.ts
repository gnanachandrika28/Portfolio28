import { portfolioData } from '../data/portfolioData';
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

const STORAGE_KEY = 'gnana_chandrika_portfolio_cms_v1';

// Initial default state seeded directly from portfolioData.ts
export const getDefaultCMSState = (): CMSState => ({
  profile: {
    name: portfolioData.personal.name,
    shortName: portfolioData.personal.shortName,
    initials: portfolioData.personal.initials,
    title: portfolioData.personal.title,
    subtitle: portfolioData.personal.subtitle,
    email: portfolioData.personal.email,
    phone: portfolioData.personal.phone,
    location: portfolioData.personal.location,
    locationShort: portfolioData.personal.locationShort,
    github: portfolioData.personal.github,
    linkedin: portfolioData.personal.linkedin,
    resumeUrl: '#resume',
    intro: portfolioData.personal.intro,
    aboutMain: portfolioData.personal.aboutMain,
    aboutSecondary: portfolioData.personal.aboutSecondary,
    developerStatement: portfolioData.personal.developerStatement,
    developerStatementSub: portfolioData.personal.developerStatementSub,
    updatedAt: new Date().toISOString(),
  },
  skills: portfolioData.skills.map((s, idx) => ({
    id: `skill-${idx + 1}`,
    name: s.name,
    category: s.category as CMSSkill['category'],
    level: s.level,
    description: s.description,
    icon: s.icon,
    displayOrder: idx + 1,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  projects: portfolioData.projects.map((p, idx) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    shortDescription: p.shortDescription,
    detailedDescription: p.shortDescription,
    tech: p.tech,
    categories: p.categories,
    problem: p.problem,
    solution: p.solution,
    keyFeatures: p.keyFeatures,
    impact: p.impact,
    architecture: p.architecture,
    developmentProcess: p.developmentProcess,
    githubUrl: p.githubUrl,
    liveDemoUrl: p.liveDemoUrl || '',
    featured: true,
    displayOrder: idx + 1,
    accentColor: p.accentColor,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  education: portfolioData.education.map((e, idx) => ({
    id: `edu-${idx + 1}`,
    institution: e.institution,
    location: e.location,
    degree: e.degree,
    field: e.stream,
    duration: e.duration,
    highlights: e.highlights,
    displayOrder: idx + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  experience: portfolioData.journey.milestones.map((m, idx) => ({
    id: `exp-${idx + 1}`,
    role: m.title,
    organization: 'Technical Development',
    period: m.period,
    focus: m.focus,
    description: m.description,
    technologies: m.skills,
    currentPosition: m.status === 'Active Focus',
    displayOrder: idx + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  certifications: portfolioData.certifications.map((c, idx) => ({
    id: c.id,
    name: c.name,
    issuer: c.issuer,
    date: c.date,
    credentialUrl: c.credentialUrl || '',
    status: c.status as CMSCertification['status'],
    note: c.note || '',
    displayOrder: idx + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  achievements: portfolioData.achievements.map((a, idx) => ({
    id: `ach-${idx + 1}`,
    title: a.title,
    description: a.description,
    tag: a.tag,
    icon: a.icon,
    displayOrder: idx + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  socialLinks: {
    github: portfolioData.personal.github,
    linkedin: portfolioData.personal.linkedin,
    email: portfolioData.personal.email,
    phone: portfolioData.personal.phone,
    updatedAt: new Date().toISOString(),
  },
  messages: [
    {
      id: 'msg-seed-1',
      name: 'Campus Placement Coordinator',
      email: 'placement.cell@example.edu',
      subject: 'Interview for Associate Software Engineer Role',
      message: 'Hello Gnana Chandrika, We reviewed your Placement Readiness Dashboard and Study Share Hub projects. We would love to discuss an engineering role with our team.',
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ],
  settings: {
    websiteTitle: 'Gnana Chandrika Boya | Software Engineer | Python, SQL & Power BI',
    metaDescription: 'Portfolio of Gnana Chandrika Boya, a Software Engineer skilled in Python, SQL, Power BI, data analytics, and full-stack web development.',
    keywords: 'Gnana Chandrika Boya, Software Engineer, Python, SQL, Power BI, React',
    contactEmail: portfolioData.personal.email,
    contactPhone: portfolioData.personal.phone,
    footerText: '© 2026 Gnana Chandrika Boya. All rights reserved.',
    resumeFileName: 'Gnana_Chandrika_Boya_Resume.pdf',
    resumeUrl: '#resume',
    openToWork: true,
    theme: 'dark-neon',
    updatedAt: new Date().toISOString(),
  },
  lastUpdated: new Date().toISOString(),
});

class CMSStore {
  private state: CMSState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): CMSState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all keys exist
        const defaults = getDefaultCMSState();
        return {
          ...defaults,
          ...parsed,
          profile: { ...defaults.profile, ...(parsed.profile || {}) },
          settings: { ...defaults.settings, ...(parsed.settings || {}) },
          socialLinks: { ...defaults.socialLinks, ...(parsed.socialLinks || {}) },
        };
      }
    } catch (e) {
      console.error('Failed to load CMS state from localStorage:', e);
    }
    const defaultState = getDefaultCMSState();
    this.saveState(defaultState);
    return defaultState;
  }

  private saveState(state: CMSState) {
    try {
      state.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      this.state = state;
      this.notifyListeners();
    } catch (e) {
      console.error('Failed to save CMS state to localStorage:', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in CMS listener:', err);
      }
    });
  }

  public getState(): CMSState {
    return this.state;
  }

  // --- Profile Operations ---
  public updateProfile(data: Partial<ProfileData>) {
    const updatedProfile = {
      ...this.state.profile,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.saveState({
      ...this.state,
      profile: updatedProfile,
    });
  }

  // --- Skills Operations ---
  public addSkill(skill: Omit<CMSSkill, 'id' | 'createdAt' | 'updatedAt'>) {
    const newSkill: CMSSkill = {
      ...skill,
      id: `skill-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveState({
      ...this.state,
      skills: [...this.state.skills, newSkill],
    });
  }

  public updateSkill(id: string, data: Partial<CMSSkill>) {
    const updatedSkills = this.state.skills.map((s) =>
      s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
    );
    this.saveState({
      ...this.state,
      skills: updatedSkills,
    });
  }

  public deleteSkill(id: string) {
    this.saveState({
      ...this.state,
      skills: this.state.skills.filter((s) => s.id !== id),
    });
  }

  // --- Projects Operations ---
  public addProject(project: Omit<CMSProject, 'id' | 'createdAt' | 'updatedAt'>) {
    const newProject: CMSProject = {
      ...project,
      id: project.slug || `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveState({
      ...this.state,
      projects: [...this.state.projects, newProject],
    });
  }

  public updateProject(id: string, data: Partial<CMSProject>) {
    const updatedProjects = this.state.projects.map((p) =>
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    );
    this.saveState({
      ...this.state,
      projects: updatedProjects,
    });
  }

  public deleteProject(id: string) {
    this.saveState({
      ...this.state,
      projects: this.state.projects.filter((p) => p.id !== id),
    });
  }

  public toggleProjectFeatured(id: string) {
    const project = this.state.projects.find((p) => p.id === id);
    if (project) {
      this.updateProject(id, { featured: !project.featured });
    }
  }

  // --- Education Operations ---
  public addEducation(edu: Omit<CMSEducation, 'id' | 'createdAt' | 'updatedAt'>) {
    const newEdu: CMSEducation = {
      ...edu,
      id: `edu-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveState({
      ...this.state,
      education: [...this.state.education, newEdu],
    });
  }

  public updateEducation(id: string, data: Partial<CMSEducation>) {
    const updatedEdu = this.state.education.map((e) =>
      e.id === id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e
    );
    this.saveState({
      ...this.state,
      education: updatedEdu,
    });
  }

  public deleteEducation(id: string) {
    this.saveState({
      ...this.state,
      education: this.state.education.filter((e) => e.id !== id),
    });
  }

  // --- Experience Operations ---
  public addExperience(exp: Omit<CMSExperience, 'id' | 'createdAt' | 'updatedAt'>) {
    const newExp: CMSExperience = {
      ...exp,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveState({
      ...this.state,
      experience: [...this.state.experience, newExp],
    });
  }

  public updateExperience(id: string, data: Partial<CMSExperience>) {
    const updatedExp = this.state.experience.map((e) =>
      e.id === id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e
    );
    this.saveState({
      ...this.state,
      experience: updatedExp,
    });
  }

  public deleteExperience(id: string) {
    this.saveState({
      ...this.state,
      experience: this.state.experience.filter((e) => e.id !== id),
    });
  }

  // --- Certifications Operations ---
  public addCertification(cert: Omit<CMSCertification, 'id' | 'createdAt' | 'updatedAt'>) {
    const newCert: CMSCertification = {
      ...cert,
      id: `cert-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveState({
      ...this.state,
      certifications: [...this.state.certifications, newCert],
    });
  }

  public updateCertification(id: string, data: Partial<CMSCertification>) {
    const updatedCerts = this.state.certifications.map((c) =>
      c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c
    );
    this.saveState({
      ...this.state,
      certifications: updatedCerts,
    });
  }

  public deleteCertification(id: string) {
    this.saveState({
      ...this.state,
      certifications: this.state.certifications.filter((c) => c.id !== id),
    });
  }

  // --- Achievements Operations ---
  public addAchievement(ach: Omit<CMSAchievement, 'id' | 'createdAt' | 'updatedAt'>) {
    const newAch: CMSAchievement = {
      ...ach,
      id: `ach-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveState({
      ...this.state,
      achievements: [...this.state.achievements, newAch],
    });
  }

  public updateAchievement(id: string, data: Partial<CMSAchievement>) {
    const updatedAchs = this.state.achievements.map((a) =>
      a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString() } : a
    );
    this.saveState({
      ...this.state,
      achievements: updatedAchs,
    });
  }

  public deleteAchievement(id: string) {
    this.saveState({
      ...this.state,
      achievements: this.state.achievements.filter((a) => a.id !== id),
    });
  }

  // --- Social Links Operations ---
  public updateSocialLinks(data: Partial<CMSSocialLinks>) {
    this.saveState({
      ...this.state,
      socialLinks: {
        ...this.state.socialLinks,
        ...data,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  // --- Contact Messages Operations ---
  public addMessage(msg: Omit<CMSContactMessage, 'id' | 'read' | 'createdAt'>) {
    const newMessage: CMSContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.saveState({
      ...this.state,
      messages: [newMessage, ...this.state.messages],
    });
    return newMessage;
  }

  public markMessageRead(id: string, read: boolean = true) {
    const updatedMessages = this.state.messages.map((m) =>
      m.id === id ? { ...m, read } : m
    );
    this.saveState({
      ...this.state,
      messages: updatedMessages,
    });
  }

  public deleteMessage(id: string) {
    this.saveState({
      ...this.state,
      messages: this.state.messages.filter((m) => m.id !== id),
    });
  }

  public getUnreadMessageCount(): number {
    return this.state.messages.filter((m) => !m.read).length;
  }

  // --- Settings Operations ---
  public updateSettings(data: Partial<CMSSiteSettings>) {
    this.saveState({
      ...this.state,
      settings: {
        ...this.state.settings,
        ...data,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  // --- Reset & Import/Export ---
  public resetToDefaults() {
    const defaultState = getDefaultCMSState();
    this.saveState(defaultState);
  }

  public exportData(): string {
    return JSON.stringify(this.state, null, 2);
  }

  public importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object' && parsed.profile) {
        this.saveState(parsed);
        return true;
      }
    } catch (e) {
      console.error('Failed to parse imported CMS data:', e);
    }
    return false;
  }
}

export const cmsStore = new CMSStore();
