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
  Sun, 
  Moon,
  MousePointer,
  UserCog,
  FileDown
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
  const [activeSection, setActiveSection] = useState('hero');

  const shortName = getShortDisplayName(profile.fullName);

  const navLinks = [
    { name: 'Trang chủ', href: '#hero', id: 'hero' },
    { name: 'Giới thiệu', href: '#about', id: 'about' },
    { name: 'Học vấn', href: '#education', id: 'education' },
    { name: 'Kỹ năng', href: '#skills', id: 'skills' },
    { name: 'Dự án', href: '#projects', id: 'projects' },
    { name: 'Thành tích', href: '#achievements', id: 'achievements' },
    { name: 'Mục tiêu', href: '#career-goals', id: 'career-goals' },
    { name: 'Liên hệ', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll spy for active section highlight
      const scrollPos = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.querySelector(navLinks[i].href);
        if (section) {
          const top = (section as HTMLElement).offsetTop;
          if (scrollPos >= top) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const content = `HỒ SƠ CÁ NHÂN / CV - NGUYỄN ĐỖ MINH ANH (2026)\n================================================\nHọ và tên: ${profile.fullName}\nChuyên ngành: ${profile.major || 'Công nghệ Thông tin'}\nTrường đào tạo: ${profile.university || 'Đại học Lạc Hồng'}\nEmail: nanh3241@gmail.com\nKỹ năng chính: React, TypeScript, Three.js, Node.js, CSS Animations, 2D/3D Transforms, WebGL\nThành tích: Đội thi Xuất sắc Hackathon Đại học 2024, Trợ giảng Lab CNTT Khoa CNTT`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${profile.fullName.replace(/\s+/g, '_')}_2026.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
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
            ? 'py-3 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero', 'hero')}
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
              <span className="text-[10px] font-mono text-slate-400 -mt-0.5">E-PORTFOLIO 2026</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full px-4 py-1.5 bg-slate-900/60 backdrop-blur-md border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    color: isActive ? settings.color : undefined,
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons: Download CV + Edit Profile + Cursor Customizer Trigger + Theme + Github/Linkedin */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Download CV */}
            <button
              onClick={handleDownloadCV}
              title="Tải hồ sơ cá nhân (CV)"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-300 hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
              <span>Tải CV</span>
            </button>

            {/* Edit Profile Quick Trigger */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              title="Chỉnh sửa thông tin hồ sơ & Ảnh đại diện"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-sm hover:border-cyan-500/50 hover:scale-105 active:scale-95"
            >
              <UserCog className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Hồ sơ</span>
            </button>

            {/* Quick Cursor Studio Pill */}
            <button
              onClick={() => setIsPanelOpen(true)}
              title="Tùy chỉnh con trỏ chuột"
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
              aria-label="Chuyển đổi giao diện sáng/tối"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* Social Icons */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-all hover:scale-105"
              aria-label="Kho lưu trữ GitHub"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 border border-slate-800 transition-all hover:scale-105"
              aria-label="Hồ sơ LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="p-2 rounded-lg text-cyan-400 bg-slate-900 border border-slate-800"
              aria-label="Mở cài đặt hồ sơ"
            >
              <UserCog className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPanelOpen(true)}
              className="p-2 rounded-lg text-slate-300 bg-slate-900 border border-slate-800"
              aria-label="Mở tùy chỉnh con trỏ chuột"
            >
              <MousePointer className="w-4 h-4" style={{ color: settings.color }} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-xl space-y-1.5 animate-in fade-in">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`block px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDownloadCV();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-800/60 rounded-lg"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Tải CV</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsProfileModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-lg"
              >
                <UserCog className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cài đặt hồ sơ</span>
              </button>
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 rounded-lg bg-slate-800"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
                <span>{darkMode ? 'Sáng' : 'Tối'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
