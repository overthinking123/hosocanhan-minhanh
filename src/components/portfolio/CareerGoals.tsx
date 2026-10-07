import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { Target, Compass, Rocket, CheckCircle2, TrendingUp, Sparkles, Terminal } from 'lucide-react';

export const CareerGoals: React.FC = () => {
  const { settings } = useCursor();
  const activeColor = settings.color || '#00F0FF';

  const goals = [
    {
      title: 'Mục tiêu Ngắn hạn (2026)',
      period: 'NĂM 2026',
      icon: <Target className="w-5 h-5 text-cyan-400" />,
      items: [
        'Ứng tuyển và gia nhập vị trí Thực tập sinh / Junior Frontend Developer tại công ty công nghệ chuyên nghiệp.',
        'Đóng góp vào các dự án sản phẩm thực tế, hoàn thiện quy trình CI/CD và kiến trúc mã nguồn quy mô lớn.',
        'Đạt tốt nghiệp Cử nhân Công nghệ Thông tin tại Đại học Lạc Hồng với thành tích loại Giỏi.',
      ],
    },
    {
      title: 'Mục tiêu Trung & Dài hạn',
      period: '2027 - 2029+',
      icon: <Rocket className="w-5 h-5 text-purple-400" />,
      items: [
        'Phát triển trở thành Senior Frontend Engineer & Creative Technologist dẫn dắt giải pháp kỹ thuật.',
        'Làm chủ chuyên sâu WebGPU, xử lý đồ họa máy tính 3D thời gian thực và mô phỏng vật lý trên trình duyệt.',
        'Đóng góp tích cực cho cộng đồng mã nguồn mở và chia sẻ tri thức công nghệ cho thế hệ sinh viên tiếp nối.',
      ],
    },
  ];

  return (
    <section id="career-goals" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>06 // ĐỊNH HƯỚNG & MỤC TIÊU NGHỀ NGHIỆP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mục tiêu Nghề nghiệp & Tầm nhìn Phát triển
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl leading-relaxed">
            Định hướng rõ ràng, cam kết học tập liên tục và khát vọng tạo ra những sản phẩm phần mềm mang lại giá trị thực tế cho cộng đồng.
          </p>
        </div>

        {/* Career Goals Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {goals.map((goal, idx) => (
            <div 
              key={idx}
              className="rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-slate-700 hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {goal.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-sans">{goal.title}</h3>
                      <span className="text-[10px] font-mono text-cyan-400">{goal.period}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {goal.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: activeColor }} />
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Quote */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Trọng tâm: Kỹ năng & Đạo đức nghề nghiệp</span>
                <span className="text-cyan-400">100% SẴN SÀNG</span>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/70 to-purple-950/30 border border-cyan-500/20 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">Cam kết Năng lực & Thái độ</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Chủ động học hỏi, thích nghi nhanh với công nghệ mới và luôn hướng tới chuẩn mực mã nguồn cao nhất.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all self-start sm:self-auto shadow-md"
          >
            <span>Kết nối tuyển dụng</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
};
