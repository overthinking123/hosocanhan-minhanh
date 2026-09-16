import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { useProfile } from '../../context/ProfileContext';
import { GraduationCap, Code2, Compass, Layers, CheckCircle2, FileText } from 'lucide-react';

export const About: React.FC = () => {
  const { settings } = useCursor();
  const { profile } = useProfile();
  const activeColor = settings.color || '#00F0FF';

  const highlights = [
    `${profile.major || 'Information Technology'} (Student at ${profile.university || 'Đại học Lạc Hồng'})`,
    'Specialized in Modern React, TypeScript & Full-Stack Node.js Ecosystem',
    'Creative 3D Graphics & Canvas Programming with Three.js / WebGL',
    'Responsive Architecture, Core Web Vitals & Web Accessibility (a11y)',
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Crafting Digital Experiences with Code & Precision
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base">
            <p>
              Hello! I am <strong className="text-white font-semibold">{profile.fullName}</strong>, an IT student and aspiring Web Developer based in Vietnam.
              My journey in software development began with a curiosity about how the web connects people through rich, interactive interfaces.
            </p>
            <p>
              Throughout my academic studies and personal engineering projects, I have immersed myself in modern frontend engineering,
              scalable REST backends, and creative computing. I bridge the gap between elegant UI/UX design and rock-solid code architecture.
            </p>
            <p>
              I take pride in writing clean, type-safe TypeScript code, optimizing rendering pipelines, and building bespoke interactive components
              like the custom cursor system you are using right now.
            </p>

            {/* Bullet Highlights */}
            <div className="pt-2 space-y-2.5">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: activeColor }} />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Action */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase hover:underline"
                style={{ color: activeColor }}
              >
                <span>View Selected Works</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Education & Bio Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 filter blur-2xl pointer-events-none"
                style={{ backgroundColor: activeColor }}
              />

              <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Academic Background</h3>
                  <p className="text-xs text-slate-400">{profile.university || 'Đại học Lạc Hồng'}</p>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-xs font-mono">
                <div>
                  <div className="text-slate-500 uppercase tracking-wider text-[10px]">Degree & University</div>
                  <div className="text-slate-200 font-sans font-medium text-sm mt-0.5">{profile.major || 'B.S. in Information Technology'} • {profile.university || 'Đại học Lạc Hồng'}</div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase tracking-wider text-[10px]">Birth Year</div>
                  <div className="text-slate-300 font-sans text-xs mt-1 leading-normal">
                    {profile.birthYear || '2007'}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase tracking-wider text-[10px]">Core Coursework</div>
                  <div className="text-slate-300 font-sans text-xs mt-1 leading-normal">
                    Data Structures & Algorithms, Object-Oriented Analysis, Web Programming, Relational Databases, Computer Networks, Software Engineering.
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase tracking-wider text-[10px]">Languages</div>
                  <div className="text-slate-300 font-sans text-xs mt-1">
                    Vietnamese (Native), English (Professional Working Proficiency)
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-400">
                  <span>Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Open to Internships
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
