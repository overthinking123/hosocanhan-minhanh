import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { ExternalLink, Github, Sparkles, Layers, Box, Terminal, Activity, CheckCircle2, UserCheck } from 'lucide-react';
import { ProjectItem } from '../../types';

interface FullProjectItem extends ProjectItem {
  filterCategory: '3d' | 'fullstack' | 'ai';
  icon: React.ReactNode;
  role: string;
  keyFeatures: string[];
}

export const Projects: React.FC = () => {
  const { settings } = useCursor();
  const activeColor = settings.color || '#00F0FF';
  const [filter, setFilter] = useState<'all' | '3d' | 'fullstack' | 'ai'>('all');

  const projects: FullProjectItem[] = [
    {
      id: 'nexus-3d',
      title: 'Nexus 3D — Không gian Trình diễn Cyberpunk WebGL Tương tác',
      category: 'Đồ họa 3D & Web Tương tác',
      filterCategory: '3d',
      role: 'Trưởng nhóm & Kỹ sư Đồ họa Three.js',
      description:
        'Trải nghiệm web 3D hiệu năng cao được xây dựng với Three.js và custom GLSL vertex/fragment shaders. Tích hợp quỹ đạo camera động, va chạm trường hạt và tốc độ render mượt mà 60fps.',
      keyFeatures: [
        'Hệ thống trường hạt thời gian thực (Particles System)',
        'Shader GLSL tùy biến cho hiệu ứng ánh sáng neon',
        'Điều khiển góc nhìn camera tương tác mượt mà',
      ],
      tags: ['Three.js', 'WebGL', 'React 19', 'GLSL', 'Tailwind'],
      image: '3d-nexus',
      icon: <Box className="w-4 h-4" />,
      liveUrl: 'https://example.com/nexus3d',
      githubUrl: 'https://github.com/example/nexus-3d-showcase',
      featured: true,
    },
    {
      id: 'devsphere',
      title: 'DevSphere — Không gian Lập trình Cộng tác Thời gian Thực',
      category: 'Hệ thống Full-Stack',
      filterCategory: 'fullstack',
      role: 'Lập trình viên Full-Stack chính',
      description:
        'Trình soạn thảo mã trực tuyến hỗ trợ biến đổi vận hành thời gian thực (OT), kiểm tra cú pháp trực tiếp, terminal tích hợp và hiển thị trạng thái người dùng trong phòng qua WebSockets.',
      keyFeatures: [
        'Đồng bộ văn bản thời gian thực qua WebSockets',
        'Trình soạn thảo Monaco Editor với kiểm tra cú pháp',
        'Phòng cộng tác đa người dùng và phân quyền linh hoạt',
      ],
      tags: ['TypeScript', 'Node.js', 'WebSockets', 'Monaco Editor', 'Docker'],
      image: 'devsphere',
      icon: <Terminal className="w-4 h-4" />,
      liveUrl: 'https://example.com/devsphere',
      githubUrl: 'https://github.com/example/devsphere-live',
      featured: true,
    },
    {
      id: 'aeropulse',
      title: 'AeroPulse — Hệ thống Giám sát Đo từ xa Đội bay Drone Tự hành',
      category: 'Giao diện IoT & Dữ liệu',
      filterCategory: 'fullstack',
      role: 'Kỹ sư Frontend & Xử lý Dữ liệu Realtime',
      description:
        'Bảng điều khiển trung tâm truyền phát tọa độ không gian, nhiệt độ pin, độ trễ mạng và lộ trình bay cho các thiết bị robot tự hành với tần suất cập nhật dưới một giây.',
      keyFeatures: [
        'Biểu đồ đo từ xa cập nhật liên tục với độ trễ thấp',
        'Bản đồ vị trí tọa độ thời gian thực (MQTT Protocol)',
        'Cảnh báo ngưỡng an toàn pin và điều kiện kết nối',
      ],
      tags: ['React', 'Recharts', 'Express.js', 'MQTT', 'Tailwind'],
      image: 'aeropulse',
      icon: <Activity className="w-4 h-4" />,
      liveUrl: 'https://example.com/aeropulse',
      githubUrl: 'https://github.com/example/aeropulse-telemetry',
    },
    {
      id: 'aetheria-ai',
      title: 'Aetheria — Nền tảng Nghiên cứu & Tổng hợp Tri thức Học thuật AI',
      category: 'Trí tuệ Nhân tạo & Tri thức',
      filterCategory: 'ai',
      role: 'Kỹ sư Frontend & Tích hợp AI API',
      description:
        'Môi trường tổng hợp cho sinh viên đại học tiếp nhận tài liệu PDF khoa học, trích xuất đồ thị tri thức ngữ nghĩa và đối chiếu trích dẫn học thuật với trợ lý AI.',
      keyFeatures: [
        'Trích xuất và tóm tắt tài liệu PDF thông minh',
        'Tìm kiếm ngữ nghĩa với Vector Embeddings',
        'Đối chiếu và xác thực trích dẫn nguồn học thuật',
      ],
      tags: ['React', 'Gemini API', 'Vector Embeddings', 'Node.js', 'Tailwind'],
      image: 'aetheria',
      icon: <Sparkles className="w-4 h-4" />,
      liveUrl: 'https://example.com/aetheria',
      githubUrl: 'https://github.com/example/aetheria-ai',
    },
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.filterCategory === filter);

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
              <span>04 // DỰ ÁN TIÊU BIỂU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dự án Tiêu biểu & Sản phẩm Thực tế
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Các sản phẩm hoàn thiện minh chứng cho năng lực lập trình full-stack, đồ họa 3D và giải quyết bài toán thực tiễn.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start text-xs font-mono">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: '3d', label: 'Đồ họa 3D' },
              { id: 'fullstack', label: 'Full-Stack' },
              { id: 'ai', label: 'AI & Dữ liệu' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === tab.id
                    ? 'bg-slate-800 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              data-cursor="project"
              data-cursor-text="XEM DỰ ÁN"
              className="group relative rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:-translate-y-2 hover:shadow-2xl"
              style={{
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Project Card Header / Preview simulation */}
              <div>
                <div className="h-48 sm:h-52 w-full bg-slate-950/80 border-b border-slate-800/80 relative overflow-hidden flex items-center justify-center p-6">
                  {/* Grid background texture */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Accent ambient glow */}
                  <div
                    className="absolute w-40 h-40 rounded-full opacity-10 filter blur-3xl group-hover:opacity-25 transition-opacity"
                    style={{ backgroundColor: activeColor }}
                  />

                  {/* Simulated Tech UI Diagram */}
                  <div className="relative z-10 w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900/90 p-4 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5">
                        {project.icon}
                        <span>{project.category}</span>
                      </span>
                      <span className="text-cyan-400 font-semibold">● ĐANG HOẠT ĐỘNG</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="h-2 w-3/4 rounded bg-slate-800" />
                      <div className="h-2 w-1/2 rounded bg-slate-800/70" />
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <span>TRẠNG THÁI: ĐÃ TRIỂN KHAI</span>
                      <span>ĐỘ TRỄ: 24ms</span>
                    </div>
                  </div>

                  {/* Top-Right Category Pill */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium backdrop-blur-md bg-slate-950/80 text-cyan-300 border border-cyan-500/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{project.role}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Chức năng chính:</div>
                    {project.keyFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-950/70 text-slate-400 border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Links */}
              <div className="p-6 sm:p-7 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  Bản thử nghiệm tương tác
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="Xem mã nguồn GitHub"
                    title="Mã nguồn GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-200 bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700/60 transition-all shadow-sm"
                  >
                    <span>Xem dự án</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
