import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Github, Linkedin, Mail, ArrowUp, Shield } from 'lucide-react';

interface FooterProps {
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin }) => {
  const { profile, socialLinks, settings } = useCMS();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#060812] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand Info */}
          <div className="text-center md:text-left space-y-1">
            <div className="text-lg font-bold text-white tracking-tight">
              {profile.name}
            </div>
            <div className="text-xs text-violet-400 font-mono">
              {profile.title} • {profile.subtitle}
            </div>
          </div>

          {/* Clean Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-300">
            <a href="#home" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-white transition-colors">
              Experience
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Social Links, Admin Gateway & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Email Gnana Chandrika Boya"
            >
              <Mail className="w-4 h-4" />
            </a>

            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {/* Admin CMS Access Link */}
            <button
              onClick={onNavigateAdmin}
              className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              title="Admin CMS Portal"
              aria-label="Admin CMS Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 text-violet-400 hover:text-white hover:bg-violet-950/40 border border-violet-500/20 rounded-lg transition-colors ml-2 cursor-pointer"
              title="Back to Top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {settings.footerText || `© 2026 ${profile.name}. All rights reserved.`}
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>Built with passion &amp; code.</span>
            <span>•</span>
            <button
              onClick={onNavigateAdmin}
              className="text-slate-500 hover:text-violet-400 transition-colors cursor-pointer"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
