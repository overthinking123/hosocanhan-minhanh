import React, { useState, useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';
import { useProfile, getShortDisplayName } from '../../context/ProfileContext';
import { 
  Terminal, 
  Sparkles, 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Sun, 
  Moon,
  MousePointer,
  UserCog
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const { settings, setIsPanelOpen } = useCursor();
  const { profile, setIsProfileModalOpen } = useProfile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shortName = getShortDisplayName(profile.fullName);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2.5 text-slate-100 focus:outline-none"
          >
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-slate-900 shadow-md group-hover:scale-105 transition-transform"
              style={{ borderColor: `${settings.color}55` }}
            >
              <Terminal className="w-4 h-4" style={{ color: settings.color }} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-tight text-white flex items-center gap-1.5 uppercase">
                {shortName}
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: settings.color }} />
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-0.5">IT • DEV</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 bg-slate-900/60 backdrop-blur-md border border-slate-800/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white rounded-full transition-colors hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Edit Profile + Cursor Customizer Trigger + Theme + Github */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Edit Profile Quick Trigger */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              title="Edit Profile Information & Avatar"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-sm hover:border-cyan-500/50"
            >
              <UserCog className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Profile</span>
            </button>

            {/* Quick Cursor Studio Pill */}
            <button
              onClick={() => setIsPanelOpen(true)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-slate-800 bg-slate-900/70 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-sm"
              style={{
                boxShadow: `0 0 12px ${settings.color}15`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: settings.color }}
              />
              <span className="text-[11px] capitalize">{settings.style}</span>
              <Sparkles className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* GitHub Profile */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="p-2 rounded-lg text-cyan-400 bg-slate-900 border border-slate-800"
              aria-label="Open Profile Settings"
            >
              <UserCog className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPanelOpen(true)}
              className="p-2 rounded-lg text-slate-300 bg-slate-900 border border-slate-800"
              aria-label="Open Cursor Customizer"
            >
              <MousePointer className="w-4 h-4" style={{ color: settings.color }} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-xl space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsProfileModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 rounded-lg"
              >
                <UserCog className="w-3.5 h-3.5" />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 rounded-lg bg-slate-800"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

