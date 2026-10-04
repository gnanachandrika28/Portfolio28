export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  lastLogin?: string;
}

export interface ProfileData {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  locationShort: string;
  github: string;
  linkedin: string;
  profileImage?: string;
  resumeUrl: string;
  intro: string;
  aboutMain: string;
  aboutSecondary: string;
  developerStatement: string;
  developerStatementSub: string;
  updatedAt?: string;
}

export interface CMSSkill {
  id: string;
  name: string;
  category: 'Programming' | 'Data & Analytics' | 'Web Development' | 'Tools' | 'Other';
  level: 'Strong Foundation' | 'Working Knowledge' | 'Familiar';
  description: string;
  icon: string;
  displayOrder: number;
  status: 'active' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface CMSProject {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription?: string;
  projectImage?: string;
  tech: string[];
  categories: string[];
  problem: string;
  solution: string;
  keyFeatures: string[];
  impact: string;
  architecture: string;
  developmentProcess: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  displayOrder: number;
  accentColor?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CMSEducation {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field: string;
  duration: string;
  startYear?: string;
  endYear?: string;
  highlights: string[];
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CMSExperience {
  id: string;
  role: string;
  organization: string;
  startDate?: string;
  endDate?: string;
  period: string;
  focus: string;
  description: string;
  technologies: string[];
  currentPosition: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CMSCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  certificateImage?: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  note?: string;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CMSAchievement {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  date?: string;
  link?: string;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CMSSocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  twitter?: string;
  website?: string;
  updatedAt?: string;
}

export interface CMSContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface CMSSiteSettings {
  websiteTitle: string;
  metaDescription: string;
  keywords: string;
  faviconUrl?: string;
  contactEmail: string;
  contactPhone: string;
  footerText: string;
  resumeFileName: string;
  resumeUrl: string;
  openToWork: boolean;
  theme: 'dark-neon' | 'dark-minimal';
  updatedAt?: string;
}

export interface CMSState {
  profile: ProfileData;
  skills: CMSSkill[];
  projects: CMSProject[];
  education: CMSEducation[];
  experience: CMSExperience[];
  certifications: CMSCertification[];
  achievements: CMSAchievement[];
  socialLinks: CMSSocialLinks;
  messages: CMSContactMessage[];
  settings: CMSSiteSettings;
  lastUpdated: string;
}
