import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { 
  Code, 
  Layers, 
  Server, 
  Wrench, 
  Sparkles,
  Check,
  Zap,
  RotateCw,
  Box,
  Compass
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
      title: 'Lập trình Frontend',
      icon: <Code className="w-4 h-4" />,
      description: 'Xây dựng giao diện người dùng phản ứng nhanh, kiến trúc module sạch sẽ và tối ưu trợ năng.',
      items: [
        { name: 'React 18 / 19', level: 'Thành thạo', highlight: true },
        { name: 'TypeScript', level: 'Thành thạo', highlight: true },
        { name: 'Tailwind CSS', level: 'Thành thạo', highlight: true },
        { name: 'Next.js', level: 'Khá' },
        { name: 'Semantic HTML5 & CSS', level: 'Chuyên sâu', highlight: true },
        { name: 'Quản lý trạng thái (Zustand/Redux)', level: 'Khá' },
      ],
    },
    {
      title: 'Đồ họa 3D & Web Sáng tạo',
      icon: <Layers className="w-4 h-4" />,
      description: 'Đồ họa thời gian thực, hệ thống hạt (particles) và hiệu ứng chuyển động tương tác trực quan.',
      items: [
        { name: 'Three.js & WebGL', level: 'Khá', highlight: true },
        { name: 'HTML5 Canvas 2D', level: 'Thành thạo', highlight: true },
        { name: 'Motion / Framer Motion', level: 'Thành thạo' },
        { name: 'Custom Shader Math', level: 'Trung cấp' },
        { name: 'Xử lý mô hình 3D Blender', level: 'Trung cấp' },
        { name: 'Tối ưu hiệu năng (60fps)', level: 'Khá' },
      ],
    },
    {
      title: 'Backend & Cơ sở Dữ liệu',
      icon: <Server className="w-4 h-4" />,
      description: 'Thiết kế RESTful API an toàn, lược đồ cơ sở dữ liệu và quy trình xử lý dữ liệu bất đồng bộ.',
      items: [
        { name: 'Node.js & Express', level: 'Thành thạo', highlight: true },
        { name: 'Thiết kế RESTful API', level: 'Thành thạo' },
        { name: 'PostgreSQL / SQL', level: 'Khá', highlight: true },
        { name: 'MongoDB', level: 'Khá' },
        { name: 'Firebase / Firestore', level: 'Khá' },
        { name: 'Xác thực & JWT Token', level: 'Khá' },
      ],
    },
    {
      title: 'DevOps & Quy trình Làm việc',
      icon: <Wrench className="w-4 h-4" />,
      description: 'Quy trình kiểm soát phiên bản tiêu chuẩn, tự động hóa CI/CD, đóng gói container và công cụ thiết kế.',
      items: [
        { name: 'Quy trình Git & GitHub', level: 'Thành thạo', highlight: true },
        { name: 'Docker Containers', level: 'Trung cấp' },
        { name: 'Vite & Bundlers Hiện đại', level: 'Thành thạo' },
        { name: 'Linux / Bash Scripting', level: 'Khá' },
        { name: 'Thiết kế Figma UI/UX', level: 'Khá', highlight: true },
        { name: 'Kiểm thử Postman API', level: 'Khá' },
      ],
    },
  ];

  // 4 Core Flipped Classroom Foundation items (Requirement 15)
  const flippedClassroomSkills = [
    {
      name: 'CSS Transitions',
      description: 'Áp dụng hiệu ứng chuyển đổi mượt mà cho các tương tác trên giao diện.',
      badge: 'transition: all 0.3s ease',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    },
    {
      name: 'CSS Animations',
      description: 'Sử dụng @keyframes để tạo chuyển động và hoạt ảnh sinh động cho các thành phần.',
      badge: '@keyframes + animation',
      icon: <RotateCw className="w-4 h-4 text-purple-400" />,
    },
    {
      name: '2D & 3D Transforms',
      description: 'Ứng dụng translate, rotate, scale, skew và perspective để tạo tương tác và chiều sâu không gian.',
      badge: '2D/3D & perspective',
      icon: <Box className="w-4 h-4 text-emerald-400" />,
    },
    {
      name: 'Thư viện Animate.css',
      description: 'Sử dụng thư viện Animate.css để triển khai nhanh các hiệu ứng chuyển động tối ưu.',
      badge: 'animate__animated',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
  ];

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>03 // KỸ NĂNG & NĂNG LỰC CÔNG NGHỆ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kỹ năng Chuyên môn & Công nghệ
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl">
            Bộ kỹ năng thực tế kết hợp giữa nền tảng lập trình web hiện đại, kiến trúc hệ thống và đồ họa 3D tương tác.
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
                  {categories[activeCategory].items.length} Công nghệ
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
                    Cốt lõi
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* NỀN TẢNG KỸ THUẬT FRONT-END & CHUYỂN ĐỘNG (YÊU CẦU 15)     */}
        {/* ======================================================== */}
        <div className="mt-12 rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-slate-800/90 p-6 sm:p-7 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>NỀN TẢNG KỸ THUẬT FRONT-END & CHUYỂN ĐỘNG</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các kỹ thuật chuyển tiếp, hoạt ảnh và biến đổi không gian đã làm chủ và áp dụng vào dự án
              </p>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
              Chuẩn kiến thức Flipped Classroom
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flippedClassroomSkills.map((item) => (
              <div 
                key={item.name}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-white/5">{item.icon}</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-sans">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
