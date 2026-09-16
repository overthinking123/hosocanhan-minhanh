import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { useProfile, splitFullName } from '../../context/ProfileContext';
import { Profile3DAvatar } from './Profile3DAvatar';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Cpu, 
  Boxes, 
  Layers, 
  ExternalLink,
  ChevronDown,
  UserCog
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, setIsPanelOpen } = useCursor();
  const { profile, setIsProfileModalOpen } = useProfile();
  const activeColor = settings.color || '#00F0FF';

  // Smart dynamic line-splitting for typography (Zero hardcoding)
  const { line1, line2 } = splitFullName(profile.fullName);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Bio & Actions */}
          <div className="lg:col-span-7 max-w-3xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-slate-900/80 border border-slate-800 shadow-inner mb-6 text-xs font-mono text-slate-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeColor }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeColor }} />
              </span>
              <span>{profile.title || 'IT STUDENT • WEB DEVELOPER & 3D ENTHUSIAST'}</span>
            </div>

            {/* Main Name Heading - DYNAMICALLY COMPUTED & SPLIT */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
              {line1 && (
                <>
                  <span className="block">{line1}</span>
                </>
              )}
              <span
                className="transition-colors duration-300 relative inline-block"
                style={{
                  color: activeColor,
                  textShadow: settings.glow ? `0 0 35px ${activeColor}55` : 'none',
                }}
              >
                {line2}
              </span>
            </h1>

            {/* Subtitle / Bio summary */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
              {profile.bio || 'Passionate Information Technology student engineering modern web experiences, high-performance frontends, and interactive 3D digital interfaces.'}
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-slate-950 font-sans shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: activeColor,
                  boxShadow: `0 8px 25px ${activeColor}44`,
                }}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="group flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 backdrop-blur-md shadow-md transition-all duration-200 hover:border-cyan-500/50"
              >
                <UserCog className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setIsPanelOpen(true)}
                className="group flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-slate-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 backdrop-blur-md shadow-md transition-all duration-200 hover:border-slate-700"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Cursor</span>
              </button>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="px-4 py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-white transition-colors"
              >
                Contact →
              </a>
            </div>

            {/* Interactive Cursor Playground Card inside Hero */}
            <div className="mt-10 p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-slate-900/70 border border-slate-800/90 shadow-xl max-w-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" style={{ color: activeColor }} />
                  <span>INTERACTIVE CURSOR DEMO</span>
                </span>
                <span className="text-[11px] text-slate-500 uppercase">
                  Style: <span className="font-semibold text-slate-300">{settings.style}</span>
                </span>
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-normal">
                Hover over the interactive pills below to test cursor magnetic scaling, glow aura, and project triggers in real-time:
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800/80 border border-slate-700 hover:border-cyan-500/60 text-slate-300 hover:text-white transition-colors"
                >
                  Hover Button (Expands)
                </button>

                <div
                  data-cursor="project"
                  data-cursor-text="PREVIEW 3D"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-950/60 border border-slate-800 hover:border-purple-500/60 text-purple-300 transition-colors cursor-pointer"
                >
                  3D Sandbox (Triggers Tag)
                </div>

                <div
                  data-cursor="project"
                  data-cursor-text="EXPLORE CODE"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-950/60 border border-slate-800 hover:border-emerald-500/60 text-emerald-300 transition-colors cursor-pointer"
                >
                  Code Matrix
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6 max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">Year {new Date().getFullYear() - parseInt(profile.birthYear || '2007') >= 18 ? '3' : '1'}</div>
                <div className="text-xs text-slate-400 mt-0.5">{profile.major || 'IT Major'}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">15+</div>
                <div className="text-xs text-slate-400 mt-0.5">Projects Built</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Modern Web Stack</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Developer Profile Avatar Frame */}
          <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
            <Profile3DAvatar />
          </div>

        </div>
      </div>

      {/* Down arrow scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }} aria-label="Scroll to About section">
          <ChevronDown className="w-5 h-5 text-slate-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

