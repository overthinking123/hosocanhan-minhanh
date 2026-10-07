import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { 
  Trophy, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  GitPullRequest,
  Star,
  ExternalLink
} from 'lucide-react';

interface TimelineItem {
  year: string;
  role: string;
  organization: string;
  description: string;
  tags: string[];
  type: 'award' | 'work' | 'education' | 'community';
  highlightIcon: React.ReactNode;
}

export const Experience: React.FC = () => {
  const { settings } = useCursor();
  const activeColor = settings.color || '#00F0FF';
  const [filter, setFilter] = useState<'all' | 'award' | 'work' | 'education'>('all');

  const timeline: TimelineItem[] = [
    {
      year: '2024',
      role: 'Đội thi Xuất sắc — Hackathon Trường Đại học',
      organization: 'Thử thách Đổi mới Sáng tạo Công nghệ',
      description:
        'Dẫn dắt nhóm 4 thành viên thiết kế và phát triển hệ thống tối ưu hóa tài nguyên khuôn viên thông minh với bản đồ nhiệt thời gian thực sử dụng WebSockets và mô hình Three.js.',
      tags: ['Hackathon', 'Three.js', 'IoT', 'Trưởng nhóm'],
      type: 'award',
      highlightIcon: <Trophy className="w-5 h-5 text-amber-400" />,
    },
    {
      year: '2024 - 2026 (HIỆN TẠI)',
      role: 'Trợ giảng Lab CNTT & Lập trình viên Web',
      organization: 'Khoa Công nghệ Thông tin',
      description:
        'Hỗ trợ các buổi thực hành lab hướng dẫn sinh viên về nền tảng lập trình web, quy trình làm việc Git và giải thuật. Xây dựng bảng điều khiển quản trị nội bộ.',
      tags: ['Cố vấn', 'React', 'Node.js', 'Git'],
      type: 'work',
      highlightIcon: <Briefcase className="w-5 h-5 text-cyan-400" />,
    },
    {
      year: '2026 - HIỆN TẠI',
      role: 'Cử nhân Công nghệ Thông tin',
      organization: 'Đại học Lạc Hồng',
      description:
        'Theo học chương trình CNTT chuyên sâu về Kỹ thuật Phần mềm, Điện toán Web và Hệ thống Phân tán. Duy trì kết quả học tập tốt và tích cực tham gia các dự án thực tế.',
      tags: ['Học tập', 'Nền tảng KHMT', 'Giải thuật'],
      type: 'education',
      highlightIcon: <GraduationCap className="w-5 h-5 text-purple-400" />,
    },
    {
      year: '2023',
      role: 'Đóng góp Mã nguồn Mở UI',
      organization: 'Cộng đồng Công nghệ GitHub',
      description:
        'Đóng góp các thành phần UI đạt chuẩn trợ năng, cải tiến kiểu dữ liệu TypeScript và xây dựng các demo tương tác cho thư viện mã nguồn mở cộng đồng.',
      tags: ['Mã nguồn mở', 'TypeScript', 'Tailwind'],
      type: 'community',
      highlightIcon: <GitPullRequest className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const filteredItems = filter === 'all' ? timeline : timeline.filter((item) => item.type === filter);

  return (
    <section id="experience" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* SECTION HEADER: ƯU TIÊN PHẦN THÀNH TÍCH (YÊU CẦU XIII)   */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
              <span>05 // THÀNH TÍCH, CHỨNG CHỈ & KINH NGHIỆM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Thành tích & Hành trình Phát triển
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Hồ sơ thành tích cuộc thi, hoạt động học thuật và trải nghiệm lập trình thực tế được cập nhật đến năm 2026.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start text-xs font-mono">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'award', label: '🏆 Thành tích' },
              { id: 'work', label: '💼 Kinh nghiệm' },
              { id: 'education', label: '📚 Học vấn' },
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

        {/* ======================================================== */}
        {/* CÁC THẺ THÀNH TÍCH NỔI BẬT (HIGHLIGHT CARDS)             */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-500/30 backdrop-blur-xl shadow-lg flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">GIẢI THƯỞNG CUỘC THI</span>
              <h4 className="text-xs font-bold text-white mt-0.5">Đội thi Xuất sắc 2024</h4>
              <p className="text-[11px] text-slate-400 mt-1">Hackathon Công nghệ Đại học (Trưởng nhóm Three.js & IoT)</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/30 backdrop-blur-xl shadow-lg flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">HOẠT ĐỘNG CHUYÊN MÔN</span>
              <h4 className="text-xs font-bold text-white mt-0.5">Trợ giảng Lab CNTT</h4>
              <p className="text-[11px] text-slate-400 mt-1">Cố vấn giải thuật, Git & nền tảng lập trình web</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-purple-500/30 backdrop-blur-xl shadow-lg flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">HỌC VẤN CHÍNH QUY</span>
              <h4 className="text-xs font-bold text-white mt-0.5">Cử nhân CNTT 2026</h4>
              <p className="text-[11px] text-slate-400 mt-1">Đại học Lạc Hồng • Chuyên sâu Kỹ thuật Phần mềm</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/30 backdrop-blur-xl shadow-lg flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <GitPullRequest className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">ĐÓNG GÓP CỘNG ĐỒNG</span>
              <h4 className="text-xs font-bold text-white mt-0.5">Mã nguồn Mở GitHub</h4>
              <p className="text-[11px] text-slate-400 mt-1">Cải tiến TypeScript UI & thiết kế tương tác (2023)</p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TIMELINE CONTAINER CHI TIẾT                              */}
        {/* ======================================================== */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-8">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-slate-950 transition-colors duration-200"
                style={{
                  borderColor: activeColor,
                  boxShadow: settings.glow ? `0 0 8px ${activeColor}` : 'none',
                }}
              />

              <div className="rounded-2xl backdrop-blur-xl bg-slate-900/50 border border-slate-800/90 p-5 sm:p-6 transition-all duration-200 hover:border-slate-700 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {item.year}
                    </span>
                    <span className="text-xs font-medium text-slate-400 font-mono">
                      {item.organization}
                    </span>
                  </div>
                  <div>
                    {item.highlightIcon}
                  </div>
                </div>

                <h3 className="mt-2.5 text-base sm:text-lg font-bold text-white font-sans flex items-center gap-2">
                  <span>{item.role}</span>
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
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
