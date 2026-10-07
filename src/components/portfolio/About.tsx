import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { useProfile } from '../../context/ProfileContext';
import { GraduationCap, Code2, Compass, Layers, CheckCircle2, FileText } from 'lucide-react';

export const About: React.FC = () => {
  const { settings } = useCursor();
  const { profile } = useProfile();
  const activeColor = settings.color || '#00F0FF';

  const highlights = [
    `${profile.major || 'Công nghệ Thông tin'} (Sinh viên tại ${profile.university || 'Đại học Lạc Hồng'})`,
    'Chuyên sâu về hệ sinh thái React, TypeScript & Node.js hiện đại',
    'Lập trình đồ họa 3D tương tác với Three.js / WebGL & Canvas',
    'Kiến trúc đáp ứng, tối ưu hóa Core Web Vitals & Trợ năng web (a11y)',
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>01 // GIỚI THIỆU BẢN THÂN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Xây dựng Trải nghiệm Số với Tư duy Lập trình & Sự Tỉ mỉ
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base">
            <p>
              Xin chào! Tôi là <strong className="text-white font-semibold">{profile.fullName}</strong>, sinh viên ngành Công nghệ Thông tin và lập trình viên web định hướng phát triển tại Việt Nam.
              Hành trình công nghệ của tôi khởi đầu từ niềm đam mê kết nối con người thông qua những giao diện web sống động, trực quan và giàu tính tương tác.
            </p>
            <p>
              Trong suốt quá trình học tập và xây dựng các dự án kỹ thuật, tôi tập trung chuyên sâu vào kỹ thuật frontend hiện đại,
              hệ thống backend REST API mở rộng và đồ họa tương tác. Tôi luôn nỗ lực dung hòa giữa thiết kế UI/UX tinh tế và kiến trúc mã nguồn vững chắc.
            </p>
            <p>
              Tôi đặc biệt yêu thích việc viết mã TypeScript an toàn kiểu dữ liệu, tối ưu hóa hiệu năng render 60fps và sáng tạo các thành phần giao diện đặc trưng
              như hệ thống con trỏ chuột tùy biến và các thành phần đồ họa tương tác trong portfolio này.
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
                <span>Xem các dự án tiêu biểu</span>
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
                  <h3 className="text-sm font-semibold text-white">Thông tin Học vấn</h3>
                  <p className="text-xs text-slate-400">{profile.university || 'Đại học Lạc Hồng'}</p>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-xs font-mono">
                <div>
                  <div className="text-slate-500 uppercase tracking-wider text-[10px]">Chuyên ngành & Trường</div>
                  <div className="text-slate-200 font-sans font-medium text-sm mt-0.5">{profile.major || 'Cử nhân Công nghệ Thông tin'} • {profile.university || 'Đại học Lạc Hồng'}</div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase tracking-wider text-[10px]">Năm sinh</div>
                  <div className="text-slate-300 font-sans text-xs mt-1 leading-normal">
                    {profile.birthYear || '2007'}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase tracking-wider text-[10px]">Môn học Chuyên ngành</div>
                  <div className="text-slate-300 font-sans text-xs mt-1 leading-normal">
                    Cấu trúc dữ liệu & Giải thuật, Phân tích hướng đối tượng, Lập trình Web, Cơ sở dữ liệu quan hệ, Mạng máy tính, Kỹ thuật phần mềm.
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase tracking-wider text-[10px]">Ngôn ngữ</div>
                  <div className="text-slate-300 font-sans text-xs mt-1">
                    Tiếng Việt (Bản ngữ), Tiếng Anh (Đọc hiểu & Giao tiếp chuyên ngành)
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-400">
                  <span>Trạng thái:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Sẵn sàng thực tập
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
