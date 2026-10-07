import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { useProfile } from '../../context/ProfileContext';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Code2, 
  Layers 
} from 'lucide-react';

export const Education: React.FC = () => {
  const { settings } = useCursor();
  const { profile } = useProfile();
  const activeColor = settings.color || '#00F0FF';

  const courses = [
    'Cấu trúc dữ liệu & Giải thuật',
    'Lập trình Web hiện đại (React/TypeScript)',
    'Cơ sở dữ liệu quan hệ & SQL',
    'Mạng máy tính & Truyền thông',
    'Kỹ thuật phần mềm & Quy trình Git',
    'Đồ họa máy tính & Tương tác Web',
  ];

  return (
    <section id="education" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>02 // HỌC VẤN & ĐÀO TẠO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Nền tảng Học vấn & Đào tạo Chính quy
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl leading-relaxed">
            Quá trình đào tạo chính quy ngành Công nghệ Thông tin, tích lũy kiến thức nền tảng khoa học máy tính và kỹ thuật công nghệ web hiện đại.
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Institution Card */}
          <div className="lg:col-span-8 rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-slate-700">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 filter blur-3xl pointer-events-none"
              style={{ backgroundColor: activeColor }}
            />

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg"
                  style={{
                    backgroundColor: `${activeColor}15`,
                    borderColor: `${activeColor}40`,
                    color: activeColor,
                  }}
                >
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-sans">
                    {profile.university || 'Đại học Lạc Hồng'}
                  </h3>
                  <p className="text-sm font-medium text-cyan-400 mt-0.5">
                    {profile.major || 'Cử nhân Công nghệ Thông tin'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2024 - 2026 (Hiện tại)</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>Đồng Nai, Việt Nam</span>
                </span>
              </div>
            </div>

            {/* Description & Focus */}
            <div className="py-6 space-y-4 text-slate-300 text-sm leading-relaxed border-b border-slate-800">
              <p>
                Chương trình đào tạo đại học chính quy tập trung vào Khoa học Máy tính, Kỹ thuật Phần mềm và Phát triển Ứng dụng Web.
                Tại đây, tôi đã xây dựng tư duy giải quyết vấn đề hệ thống, kiến trúc mã nguồn sạch và khả năng tự nghiên cứu các công nghệ tiên tiến.
              </p>
              <p>
                Kết hợp song song giữa lý thuyết học thuật trên giảng đường và thực hành chuyên sâu tại các phòng Lab máy tính, tôi duy trì kết quả học tập tốt và tích cực tham gia các phong trào học thuật, cuộc thi sáng tạo công nghệ.
              </p>
            </div>

            {/* Key Specialized Subjects */}
            <div className="pt-6">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2 mb-3">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Môn học Chuyên ngành Tiêu biểu:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {courses.map((course, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 transition-colors hover:border-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeColor }} />
                    <span className="font-sans font-medium">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Highlights & Status Box */}
          <div className="lg:col-span-4 space-y-5">
            {/* Status Card */}
            <div className="rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Trạng thái Học tập 2026</span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Sẵn sàng Thực tập 2026</span>
                  </div>
                  <p className="text-[11px] text-emerald-400/90 font-sans mt-1">
                    Đã hoàn thành các môn cơ sở ngành và chuyên ngành, sẵn sàng tham gia dự án thực tế tại doanh nghiệp.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Hoạt động tại trường</div>
                  <div className="text-slate-200 font-sans font-medium text-xs mt-1">
                    Cố vấn Lab CNTT & Hỗ trợ sinh viên thực hành lập trình Web.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Định hướng nghiên cứu</div>
                  <div className="text-slate-200 font-sans font-medium text-xs mt-1">
                    Frontend Engineering, Đồ họa 3D WebGL và Tối ưu hiệu năng giao diện.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stat Pill */}
            <div className="rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-purple-950/40 border border-cyan-500/30 p-5 shadow-lg flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold text-white font-mono">100%</div>
                <div className="text-xs text-slate-400 font-sans mt-0.5">Cam kết tiến độ & học tập</div>
              </div>
              <Code2 className="w-8 h-8 text-cyan-400 opacity-80" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
