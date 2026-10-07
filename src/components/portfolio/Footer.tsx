import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { useProfile } from '../../context/ProfileContext';
import { ArrowUp, Terminal, Sparkles, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setIsPanelOpen } = useCursor();
  const { profile } = useProfile();
  const activeColor = settings.color || '#00F0FF';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950 relative z-10 text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" style={{ color: activeColor }} />
            <span className="text-slate-300 font-semibold font-sans uppercase">
              {profile.fullName}
            </span>
            <span className="text-slate-600">•</span>
            <span>{profile.title || 'SINH VIÊN CNTT & LẬP TRÌNH WEB'}</span>
          </div>

          {/* Social Profiles & Email */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:nanh3241@gmail.com"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPanelOpen(true)}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: activeColor }} />
              <span>Con trỏ: {settings.style}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Cuộn lên đầu trang"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-2">
          <div>
            © 2026 {profile.fullName}. E-Portfolio Cá nhân Sinh viên IT. Bảo lưu mọi quyền.
          </div>
          <div>
            Hiệu năng cao • Hoạt ảnh mượt mà • Tương thích mọi thiết bị
          </div>
        </div>
      </div>
    </footer>
  );
};
