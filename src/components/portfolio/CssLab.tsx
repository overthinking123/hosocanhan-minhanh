import React, { useState, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';
import { 
  Sparkles, 
  ExternalLink, 
  Code2, 
  RotateCw, 
  Layers, 
  Box, 
  Play, 
  Pause, 
  RefreshCw, 
  Check, 
  Copy, 
  MousePointer2, 
  Move, 
  Eye, 
  Zap, 
  CheckCircle2, 
  Flame, 
  Heart, 
  ThumbsUp, 
  Smile, 
  Loader2,
  Maximize2
} from 'lucide-react';

interface TheoryItem {
  stt: number;
  title: string;
  enTitle: string;
  content: string;
  docTitle: string;
  docUrl: string;
  badge: string;
}

export const CssLab: React.FC = () => {
  const { settings } = useCursor();
  const activeColor = settings.color || '#00F0FF';

  // 1. DATA BẢNG TỔNG HỢP KIẾN THỨC CSS
  const theoryTopics: TheoryItem[] = [
    {
      stt: 1,
      title: 'Chuyển tiếp CSS',
      enTitle: 'CSS Transitions',
      content: 'Cách tạo hiệu ứng chuyển đổi mượt mà giữa hai trạng thái của phần tử, ví dụ thay đổi màu sắc, kích thước hoặc vị trí khi người dùng tương tác.',
      docTitle: 'Chuyển tiếp CSS - W3Schools',
      docUrl: 'https://www.w3schools.com/css/css3_transitions.asp',
      badge: 'transition: all 0.3s ease',
    },
    {
      stt: 2,
      title: 'Hoạt ảnh CSS',
      enTitle: 'CSS Animations',
      content: 'Sử dụng @keyframes để tạo các chuỗi chuyển động phức tạp, có thể lặp lại và điều khiển theo thời gian.',
      docTitle: 'Hoạt ảnh CSS - W3Schools',
      docUrl: 'https://www.w3schools.com/css/css3_animations.asp',
      badge: '@keyframes + animation',
    },
    {
      stt: 3,
      title: 'Biến đổi 2D và 3D',
      enTitle: '2D & 3D Transforms',
      content: 'Sử dụng translate, rotate, scale và skew để thay đổi hình dạng, vị trí, kích thước và hướng của phần tử trong không gian 2D và 3D.',
      docTitle: 'Biến đổi CSS - W3Schools',
      docUrl: 'https://www.w3schools.com/css/css3_2dtransforms.asp',
      badge: 'transform & perspective',
    },
    {
      stt: 4,
      title: 'Thư viện Animate.css',
      enTitle: 'Animate.css Library',
      content: 'Cách sử dụng thư viện CSS có sẵn để nhanh chóng bổ sung các hiệu ứng chuyển động vào giao diện.',
      docTitle: 'Tài liệu Animate.css',
      docUrl: 'https://animate.style/',
      badge: 'animate__animated',
    },
  ];

  // Animation tab & control states
  const [isAnimationRunning, setIsAnimationRunning] = useState(true);

  // 3D Card tilt state
  const card3DRef = useRef<HTMLDivElement>(null);
  const [tilt3D, setTilt3D] = useState({ rotateX: 0, rotateY: 0 });

  const handleCard3DMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!card3DRef.current) return;
    const rect = card3DRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 18;
    const rotateY = (x / (rect.width / 2)) * 18;
    setTilt3D({ rotateX, rotateY });
  };

  const handleCard3DMouseLeave = () => {
    setTilt3D({ rotateX: 0, rotateY: 0 });
  };

  // Animate.css trigger
  const [selectedAnimateClass, setSelectedAnimateClass] = useState('animate__bounce');
  const [animateTriggerKey, setAnimateTriggerKey] = useState(0);

  const triggerAnimateCss = (effectClass: string) => {
    setSelectedAnimateClass(effectClass);
    setAnimateTriggerKey((prev) => prev + 1);
  };

  // 4 Milestone states (Micro-interactions, Loading, AOS, Refactoring)
  const [activeReaction, setActiveReaction] = useState<'heart' | 'like' | 'smile' | null>(null);
  const triggerReaction = (type: 'heart' | 'like' | 'smile') => {
    setActiveReaction(type);
    setTimeout(() => setActiveReaction(null), 1000);
  };

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="css-lab" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* SECTION HEADER: THỂ HIỆN NĂNG LỰC FRONT-END              */}
        {/* ======================================================== */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>03 // KỸ NĂNG FRONT-END & CÁC CÔNG NGHỆ ĐÃ ÁP DỤNG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kỹ năng Front-End & Chuyển động Giao diện
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl leading-relaxed">
            Tổng hợp các kỹ thuật CSS Transitions, CSS Animations, Biến đổi 2D/3D và thư viện chuyển động tôi đã làm chủ và ứng dụng trực tiếp vào việc xây dựng trải nghiệm web mượt mà.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 1. BẢNG TỔNG HỢP KIẾN THỨC CSS ĐÃ LÀM CHỦ                */}
        {/* ======================================================== */}
        <div className="rounded-2xl backdrop-blur-xl bg-slate-900/70 border border-slate-800 shadow-2xl overflow-hidden mb-16">
          <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-sans">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>NỘI DUNG LÝ THUYẾT – TỔNG QUAN FLIPPED CLASSROOM</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các chuyên đề CSS cốt lõi tôi đã học, nghiên cứu chuẩn W3Schools và ứng dụng vào mã nguồn
              </p>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
              Đã hoàn thành & Ứng dụng thực tế
            </span>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-5 text-center w-16">STT</th>
                  <th className="py-4 px-5 w-52">Chủ đề chính</th>
                  <th className="py-4 px-6">Nội dung chi tiết</th>
                  <th className="py-4 px-6 w-64 text-right">Tài liệu tham khảo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {theoryTopics.map((topic) => (
                  <tr 
                    key={topic.stt}
                    className="hover:bg-slate-800/30 transition-colors duration-150 group"
                  >
                    <td className="py-4 px-5 text-center font-mono font-bold text-slate-400 group-hover:text-cyan-400">
                      0{topic.stt}
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-white text-sm font-sans flex items-center gap-2">
                        {topic.title}
                      </div>
                      <div className="text-[10px] font-mono text-cyan-400/80 mt-0.5">
                        {topic.enTitle}
                      </div>
                      <div className="mt-1.5 inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {topic.badge}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                      {topic.content}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <a
                        href={topic.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-700/50 hover:border-cyan-500 transition-all shadow-sm group-hover:shadow"
                      >
                        <span>{topic.docTitle}</span>
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. TRÌNH DIỄN 5 KỸ NĂNG FRONT-END (SHOWCASE TRỰC QUAN)     */}
        {/* ======================================================== */}
        <div className="mb-16">
          <div className="flex flex-col mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
              <span>TRÌNH DIỄN KỸ NĂNG FRONT-END</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Các kỹ thuật CSS tôi đã làm chủ & áp dụng vào giao diện
            </h3>
            <p className="mt-1 text-slate-400 text-xs sm:text-sm">
              Trực quan hóa năng lực lập trình CSS qua các thành phần tương tác mượt mà ngay trên portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* CARD 1: CSS TRANSITIONS */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    KỸ NĂNG FRONT-END
                  </span>
                  <MousePointer2 className="w-4 h-4 text-cyan-400" />
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  CSS Transitions
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Một trong những kỹ thuật CSS tôi đã học và áp dụng để tạo các chuyển đổi mượt mà trong giao diện khi người dùng tương tác.
                </p>

                {/* Các ví dụ trực quan nhỏ theo đúng yêu cầu */}
                <div className="mt-5 space-y-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-500">// Demo tương tác trực tiếp (Hover):</div>
                  
                  {/* Ví dụ 1: Nút đổi màu khi hover */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 font-sans">Nút đổi màu:</span>
                    <button
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 transition-colors duration-300 hover:bg-cyan-500 hover:text-slate-950"
                    >
                      Rê chuột đổi màu
                    </button>
                  </div>

                  {/* Ví dụ 2: Card nâng nhẹ khi hover */}
                  <div
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-cyan-500/50 hover:shadow-cyan-500/10 cursor-pointer"
                  >
                    Card nâng nhẹ khi rê chuột (translateY)
                  </div>

                  {/* Ví dụ 3: Icon/Hình ảnh phóng to nhẹ */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="text-[11px] text-slate-400 font-sans">Phóng to nhẹ:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 transition-transform duration-300 hover:scale-125 cursor-pointer">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">scale(1.25)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Thuộc tính:</span>
                <span className="text-cyan-400 font-semibold">transition: all 0.3s ease</span>
              </div>
            </div>

            {/* CARD 2: CSS ANIMATIONS */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    KỸ NĂNG FRONT-END
                  </span>
                  <RotateCw className="w-4 h-4 text-cyan-400" />
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  CSS Animations
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Ứng dụng @keyframes để tạo các chuyển động và hiệu ứng trực quan liên tục, tạo điểm nhấn sống động cho các thành phần giao diện.
                </p>

                {/* Animation demo nhỏ ngay trong card */}
                <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col items-center justify-center relative overflow-hidden min-h-[140px]">
                  {/* Quỹ đạo chuyển động @keyframes */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 rounded-full border border-dashed border-cyan-500/30 ${
                        isAnimationRunning ? 'animate-spin' : ''
                      }`}
                      style={{ animationDuration: '6s' }}
                    />
                    
                    {/* Hạt quay quanh tâm */}
                    <div
                      className={`absolute inset-0 flex items-start justify-center ${
                        isAnimationRunning ? 'animate-spin' : ''
                      }`}
                      style={{ animationDuration: '3s' }}
                    >
                      <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80 -mt-1.5" />
                    </div>

                    {/* Lõi tâm xung nhịp */}
                    <div
                      className={`w-10 h-10 rounded-full bg-slate-900 border border-cyan-500/50 flex items-center justify-center ${
                        isAnimationRunning ? 'animate-pulse' : ''
                      }`}
                    >
                      <Code2 className="w-4 h-4 text-cyan-300" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => setIsAnimationRunning(!isAnimationRunning)}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 border border-slate-700 transition-colors"
                    >
                      {isAnimationRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{isAnimationRunning ? 'Tạm dừng' : 'Chạy lại'}</span>
                    </button>
                    <span className="text-[10px] font-mono text-cyan-400">@keyframes orbit</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Trạng thái:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Hoạt động 60fps
                </span>
              </div>
            </div>

            {/* CARD 3: 2D TRANSFORMS */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    KỸ NĂNG FRONT-END
                  </span>
                  <Move className="w-4 h-4 text-cyan-400" />
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Biến đổi 2D (2D Transforms)
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Sử dụng translate, rotate, scale và skew trong không gian hai chiều nhằm mang lại cảm giác phản hồi cơ học chính xác khi người dùng thao tác.
                </p>

                {/* Card demo nhỏ theo yêu cầu VI: hover rotate nhẹ, scale nhẹ, translate nhẹ */}
                <div className="mt-5 p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col items-center justify-center min-h-[140px]">
                  <div
                    className="w-full max-w-[200px] p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 shadow-md text-center transition-all duration-300 hover:rotate-3 hover:scale-105 hover:-translate-y-2 hover:border-cyan-500/60 hover:shadow-cyan-500/20 cursor-pointer"
                  >
                    <div className="w-7 h-7 mx-auto rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-1.5">
                      <Move className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs font-bold text-white font-sans">Thẻ Biến đổi 2D</div>
                    <div className="text-[10px] font-mono text-cyan-300 mt-0.5">
                      Rê chuột: rotate(3deg) scale(1.05) translateY(-8px)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Hàm 2D:</span>
                <span className="text-cyan-400 font-semibold">translate, rotate, scale, skew</span>
              </div>
            </div>

            {/* CARD 4: 3D TRANSFORMS */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    KỸ NĂNG FRONT-END
                  </span>
                  <Box className="w-4 h-4 text-cyan-400" />
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Biến đổi 3D (3D Transforms)
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Ứng dụng rotateX(), rotateY(), rotateZ() cùng perspective để tạo phối cảnh không gian 3D chân thực, chứng minh năng lực đồ họa web hiện đại.
                </p>

                {/* Card demo tương tác 3D tilt theo yêu cầu VII */}
                <div
                  ref={card3DRef}
                  onMouseMove={handleCard3DMouseMove}
                  onMouseLeave={handleCard3DMouseLeave}
                  className="mt-5 p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col items-center justify-center min-h-[140px] perspective-1000 cursor-pointer"
                >
                  <div
                    className="w-full max-w-[200px] p-4 rounded-xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-cyan-500/30 text-center shadow-2xl transition-transform duration-100 ease-out"
                    style={{
                      transform: `perspective(800px) rotateX(${tilt3D.rotateX}deg) rotateY(${tilt3D.rotateY}deg)`,
                      boxShadow: `0 15px 30px rgba(0,0,0,0.7), 0 0 20px ${activeColor}20`,
                    }}
                  >
                    <Box className="w-6 h-6 mx-auto text-cyan-400 mb-1" />
                    <div className="text-xs font-bold text-white font-sans">Khối 3D Tương tác</div>
                    <div className="text-[10px] font-mono text-cyan-300 mt-0.5">
                      Rê chuột khắp khối để xoay góc nhìn 3D
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Phối cảnh:</span>
                <span className="text-cyan-400 font-semibold">perspective(800px)</span>
              </div>
            </div>

            {/* CARD 5: ANIMATE.CSS */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group md:col-span-2 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    CÔNG CỤ ĐÃ SỬ DỤNG
                  </span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Thư viện Animate.css
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Đã tìm hiểu và sử dụng thư viện Animate.css để triển khai nhanh các hiệu ứng chuyển động trong giao diện người dùng.
                </p>

                {/* Animation demo nhỏ + Các nút hiệu ứng */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="sm:col-span-7 flex flex-wrap gap-1.5">
                    {[
                      { name: 'Nảy (Bounce)', cls: 'animate__bounce' },
                      { name: 'Nhịp đập (Pulse)', cls: 'animate__pulse' },
                      { name: 'Đàn hồi (RubberBand)', cls: 'animate__rubberBand' },
                      { name: 'Rung lắc (ShakeX)', cls: 'animate__shakeX' },
                      { name: 'Xuất hiện (FadeIn)', cls: 'animate__fadeIn' },
                      { name: 'Phóng to (ZoomIn)', cls: 'animate__zoomIn' },
                    ].map((item) => (
                      <button
                        key={item.cls}
                        onClick={() => triggerAnimateCss(item.cls)}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                          selectedAnimateClass === item.cls
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>

                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                    <div
                      key={animateTriggerKey}
                      className={`animate__animated ${selectedAnimateClass} inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-mono text-xs shadow-md`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{selectedAnimateClass}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 mt-2">
                      Bấm vào các nút hiệu ứng để chạy trực tiếp
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Tích hợp:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã cài đặt trong package.json
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. QUÁ TRÌNH THỰC HÀNH FRONT-END (4 MỤC YÊU CẦU IX - XII) */}
        {/* ======================================================== */}
        <div>
          <div className="flex flex-col mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
              <span>QUÁ TRÌNH THỰC HÀNH & TỐI ƯU GIAO DIỆN</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Các mốc thực hành Front-End tiêu biểu của tôi
            </h3>
            <p className="mt-1 text-slate-400 text-xs sm:text-sm">
              Các kỹ thuật tương tác vi mô, hiệu ứng tải, cuộn trang và tối ưu hiệu năng đã được tôi hoàn thiện:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. TƯƠNG TÁC VI MÔ */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    THỰC HÀNH // 30 PHÚT
                  </span>
                  <Flame className="w-4 h-4 text-cyan-400" />
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  TƯƠNG TÁC VI MÔ
                </h4>
                <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                  Nút bấm cảm xúc – 30 phút
                </div>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Thiết kế phản hồi xúc giác nhẹ (micro-interactions) khi người dùng bấm thả tim, like hoặc thể hiện cảm xúc với hiệu ứng nảy mượt mà.
                </p>

                {/* Demo tương tác mini */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                  <div className="text-[10px] font-mono text-slate-500 mb-2">Thử nghiệm phản ứng cảm xúc:</div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => triggerReaction('heart')}
                      className={`p-2 rounded-lg border transition-all ${
                        activeReaction === 'heart'
                          ? 'bg-rose-500/20 border-rose-500 text-rose-400 scale-125'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-400 hover:scale-110'
                      }`}
                      title="Thả tim"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => triggerReaction('like')}
                      className={`p-2 rounded-lg border transition-all ${
                        activeReaction === 'like'
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-125'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-blue-400 hover:scale-110'
                      }`}
                      title="Thích"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => triggerReaction('smile')}
                      className={`p-2 rounded-lg border transition-all ${
                        activeReaction === 'smile'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400 scale-125'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400 hover:scale-110'
                      }`}
                      title="Nụ cười"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Trạng thái:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã hoàn thành
                </span>
              </div>
            </div>

            {/* 2. HIỆU ỨNG TẢI */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    THỰC HÀNH // 30 PHÚT
                  </span>
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  HIỆU ỨNG TẢI
                </h4>
                <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                  Tạo vòng xoay tải – 30 phút
                </div>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Xây dựng bộ spinner và thanh tiến trình chờ tải dữ liệu mượt mà, tối ưu hóa trải nghiệm chờ đợi của người dùng.
                </p>

                {/* Demo tương tác mini */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center gap-4">
                  <div className="w-7 h-7 rounded-full border-2 border-slate-800 border-t-cyan-400 animate-spin" />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Trạng thái:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã hoàn thành
                </span>
              </div>
            </div>

            {/* 3. HIỆU ỨNG XUẤT HIỆN KHI CUỘN */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    THỰC HÀNH // 30 PHÚT
                  </span>
                  <Eye className="w-4 h-4 text-cyan-400" />
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  HIỆU ỨNG XUẤT HIỆN KHI CUỘN
                </h4>
                <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                  Tích hợp thư viện – 30 phút
                </div>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Áp dụng AOS / Intersection Observer và các lớp CSS hoạt ảnh để từng phần tử xuất hiện tự nhiên khi lướt tới màn hình xem.
                </p>

                {/* Demo tương tác mini */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                  <div className="text-[10px] font-mono text-slate-500 mb-1">Mô phỏng AOS Scroll Reveal:</div>
                  <div className="h-6 w-full rounded bg-slate-900 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center justify-center animate-pulse">
                    ↓ Fade & Slide Reveal (AOS)
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Trạng thái:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã hoàn thành
                </span>
              </div>
            </div>

            {/* 4. TỐI ƯU MÃ NGUỒN */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    THỰC HÀNH // 15 PHÚT
                  </span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  TỐI ƯU MÃ NGUỒN
                </h4>
                <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                  Tối ưu hiệu năng – 15 phút
                </div>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Tái cấu trúc mã CSS, hạn chế kích hoạt Reflow / Repaint, tận dụng <code className="text-cyan-400">will-change</code> và tăng tốc phần cứng GPU để duy trì 60fps mượt mà.
                </p>

                {/* Demo tương tác mini */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>GPU Acceleration:</span>
                    <span className="text-emerald-400 font-bold">100% ON</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Tốc độ khung hình:</span>
                    <span className="text-cyan-400 font-bold">60 FPS</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Trạng thái:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã hoàn thành
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
