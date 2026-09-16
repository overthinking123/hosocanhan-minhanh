import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { 
  Code, 
  Layers, 
  Server, 
  Wrench, 
  Sparkles,
  Check
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  items: { name: string; level: string; highlight?: boolean }[];
}

export const Skills: React.FC = () => {
  const { settings } = useCursor();
  const activeColor = settings.color || '#00F0FF';
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: 'Frontend Engineering',
      icon: <Code className="w-4 h-4" />,
      description: 'Building reactive, component-driven, and accessible user interfaces with clean architecture.',
      items: [
        { name: 'React 18 / 19', level: 'Advanced', highlight: true },
        { name: 'TypeScript', level: 'Advanced', highlight: true },
        { name: 'Tailwind CSS', level: 'Advanced', highlight: true },
        { name: 'Next.js', level: 'Proficient' },
        { name: 'Semantic HTML5 & CSS', level: 'Mastery' },
        { name: 'State Management (Zustand/Redux)', level: 'Proficient' },
      ],
    },
    {
      title: '3D & Creative Web',
      icon: <Layers className="w-4 h-4" />,
      description: 'Real-time rendering, interactive graphics, particle systems, and kinetic UI animations.',
      items: [
        { name: 'Three.js & WebGL', level: 'Proficient', highlight: true },
        { name: 'HTML5 Canvas 2D', level: 'Advanced', highlight: true },
        { name: 'Motion / Framer Motion', level: 'Advanced' },
        { name: 'Custom Shader Math', level: 'Intermediate' },
        { name: 'Blender 3D Asset Prep', level: 'Intermediate' },
        { name: 'Performance Profiling (60fps)', level: 'Proficient' },
      ],
    },
    {
      title: 'Backend & Data',
      icon: <Server className="w-4 h-4" />,
      description: 'Engineering robust server APIs, database schema design, and asynchronous workflows.',
      items: [
        { name: 'Node.js & Express', level: 'Advanced', highlight: true },
        { name: 'RESTful API Design', level: 'Advanced' },
        { name: 'PostgreSQL / SQL', level: 'Proficient', highlight: true },
        { name: 'MongoDB', level: 'Proficient' },
        { name: 'Firebase / Firestore', level: 'Proficient' },
        { name: 'Authentication & JWT', level: 'Proficient' },
      ],
    },
    {
      title: 'DevOps & Workflow',
      icon: <Wrench className="w-4 h-4" />,
      description: 'Industry-standard version control, CI/CD automation, containers, and product design tools.',
      items: [
        { name: 'Git & GitHub Workflows', level: 'Advanced', highlight: true },
        { name: 'Docker Containers', level: 'Intermediate' },
        { name: 'Vite & Modern Bundlers', level: 'Advanced' },
        { name: 'Linux / Bash Scripting', level: 'Proficient' },
        { name: 'Figma UI/UX Prototyping', level: 'Proficient', highlight: true },
        { name: 'Postman API Testing', level: 'Proficient' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>02 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Technologies
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl">
            A balanced stack spanning core computer science fundamentals, reactive web development, and 3D visual computing.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {categories.map((cat, idx) => {
            const isSelected = activeCategory === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-slate-900 border-opacity-100 shadow-lg'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
                style={{
                  borderColor: isSelected ? activeColor : undefined,
                }}
              >
                <span className="p-1.5 rounded-lg bg-white/5" style={{ color: isSelected ? activeColor : '#94a3b8' }}>
                  {cat.icon}
                </span>
                <span className="text-xs font-semibold text-white truncate font-sans">
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className="rounded-2xl backdrop-blur-xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="flex items-start justify-between pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                <span>{categories[activeCategory].title}</span>
                <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {categories[activeCategory].items.length} Technologies
                </span>
              </h3>
              <p className="mt-1 text-xs text-slate-400 max-w-2xl">
                {categories[activeCategory].description}
              </p>
            </div>
          </div>

          {/* Skill Items Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categories[activeCategory].items.map((skill) => (
              <div
                key={skill.name}
                data-cursor="card"
                className="group relative p-4 rounded-xl backdrop-blur-sm bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: skill.highlight ? activeColor : '#64748b',
                      boxShadow: skill.highlight && settings.glow ? `0 0 8px ${activeColor}` : 'none',
                    }}
                  />
                  <div>
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      {skill.level}
                    </div>
                  </div>
                </div>

                {skill.highlight && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                    Core
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
