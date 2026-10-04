import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, FileDown, Shield, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onNavigateAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onNavigateAdmin }) => {
  const { profile } = useCMS();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080b16]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark (Single text element according to Top Bar Contract) */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px] shadow-sm shadow-violet-500/20 group-hover:shadow-violet-500/50 transition-shadow">
            <div className="w-full h-full bg-[#0b0e1a] rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              {profile.initials || 'GC'}
            </div>
          </div>
          <span className="font-semibold tracking-tight text-slate-100 group-hover:text-violet-300 transition-colors">
            {profile.shortName}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive ? 'text-violet-400 font-semibold' : 'hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Medium Screen Nav */}
        <nav
          className="hidden md:flex xl:hidden items-center gap-4 text-xs font-medium text-slate-300"
          aria-label="Main Navigation Tablet"
        >
          {navLinks.slice(0, 5).map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`py-1 transition-colors whitespace-nowrap ${
                  isActive ? 'text-violet-400 font-semibold' : 'hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-2.5">
          {/* Admin Dashboard Quick Link */}
          <button
            onClick={onNavigateAdmin}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isAuthenticated
                ? 'bg-violet-950/40 text-violet-300 border-violet-500/40 hover:bg-violet-900/50'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
            }`}
            title={isAuthenticated ? 'Admin CMS (Logged In)' : 'Admin Login'}
            aria-label="Admin Portal"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg shadow-sm shadow-violet-500/30 transition-all border border-violet-400/20 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#090d1c]/95 backdrop-blur-xl border-b border-violet-500/20 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-1 py-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`flex items-center justify-between p-2.5 text-xs rounded-lg transition-colors ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300 font-semibold border border-violet-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </a>
              );
            })}
          </div>

          <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateAdmin();
              }}
              className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin CMS</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-xs text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
