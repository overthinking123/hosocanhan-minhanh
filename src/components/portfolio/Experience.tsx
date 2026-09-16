import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { Award, Briefcase, Calendar, CheckCircle, GraduationCap } from 'lucide-react';

export const Experience: React.FC = () => {
  const { settings } = useCursor();
  const activeColor = settings.color || '#00F0FF';

  const timeline = [
    {
      year: '2024 - PRESENT',
      role: 'IT Lab Assistant & Web Developer',
      organization: 'Faculty of Information Technology',
      description:
        'Assisted faculty lab sessions guiding first and second-year students in web development fundamentals, Git workflows, and algorithms. Built internal administrative dashboards.',
      tags: ['Mentorship', 'React', 'Node.js', 'Git'],
      type: 'work',
    },
    {
      year: '2024',
      role: 'Top Finalist — University Hackathon',
      organization: 'Tech Innovators Challenge',
      description:
        'Led a team of 4 to design and engineer a smart campus resource optimizer with real-time room occupancy heatmaps using WebSockets and Three.js visualization.',
      tags: ['Hackathon', 'Three.js', 'IoT', 'Team Lead'],
      type: 'award',
    },
    {
      year: '2023 - PRESENT',
      role: 'B.S. in Information Technology',
      organization: 'University of Science (VNU-HCM)',
      description:
        'Pursuing an IT degree with focus on Software Engineering, Web Computing, and Distributed Systems. Maintaining strong academic standing with emphasis on practical project builds.',
      tags: ['Academics', 'CS Fundamentals', 'Algorithms'],
      type: 'education',
    },
    {
      year: '2023',
      role: 'Open Source UI Contributor',
      organization: 'GitHub Tech Community',
      description:
        'Contributed accessible UI components, TypeScript type enhancements, and interactive demo sandboxes to community open-source libraries.',
      tags: ['Open Source', 'TypeScript', 'Tailwind'],
      type: 'community',
    },
  ];

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>04 // TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic & Coding Journey
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl">
            Key academic milestones, competition achievements, and student engineering experiences.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-slate-950 transition-colors duration-200"
                style={{
                  borderColor: activeColor,
                  boxShadow: settings.glow ? `0 0 8px ${activeColor}` : 'none',
                }}
              />

              <div className="rounded-2xl backdrop-blur-xl bg-slate-900/50 border border-slate-800/90 p-5 sm:p-6 transition-all duration-200 hover:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {item.year}
                  </span>
                  <span className="text-xs font-medium text-slate-400 font-mono">
                    {item.organization}
                  </span>
                </div>

                <h3 className="mt-2 text-base sm:text-lg font-bold text-white font-sans">
                  {item.role}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
