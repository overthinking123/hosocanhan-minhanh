import React, { useState, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';
import { 
  Sparkles, 
  ExternalLink, 
  Code2, 
  RotateCw, 
  Layers, 
  Box, 
  Sliders, 
  Play, 
  Pause, 
  RefreshCw, 
  Check, 
  Copy, 
  MousePointer2, 
  Move, 
  Eye, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Compass, 
  Flame, 
  Heart, 
  ThumbsUp, 
  Smile, 
  Loader2 
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

  // Active Interactive Tab
  const [activeTab, setActiveTab] = useState<'transitions' | 'animations' | 'transform2d' | 'transform3d' | 'animatecss'>('transitions');

  // Copy code feedback state
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // ==========================================
  // 1. DATA BẢNG LÝ THUYẾT FLIPPED CLASSROOM
  // ==========================================
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

  // ==========================================
  // 2. STATE & CONTROLS CHO CSS TRANSITIONS
  // ==========================================
  const [transitionDuration, setTransitionDuration] = useState('0.4s');
  const [transitionTiming, setTransitionTiming] = useState('ease');

  // ==========================================
  // 3. STATE & CONTROLS CHO CSS ANIMATIONS
  // ==========================================
  const [animationType, setAnimationType] = useState<'orbit' | 'spin' | 'fade' | 'pulse'>('orbit');
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState('2s');

  // ==========================================
  // 4. STATE & CONTROLS CHO 2D TRANSFORMS
  // ==========================================
  const [transform2D, setTransform2D] = useState({
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scale: 1,
    skewX: 0,
  });

  const handle2DTranslate = () => {
    setTransform2D((prev) => ({
      ...prev,
      translateX: prev.translateX === 0 ? 35 : 0,
      translateY: prev.translateY === 0 ? -20 : 0,
    }));
  };

  const handle2DRotate = () => {
    setTransform2D((prev) => ({
      ...prev,
      rotate: (prev.rotate + 45) % 360,
    }));
  };

  const handle2DScale = () => {
    setTransform2D((prev) => ({
      ...prev,
      scale: prev.scale === 1 ? 1.25 : 1,
    }));
  };

  const handle2DSkew = () => {
    setTransform2D((prev) => ({
      ...prev,
      skewX: prev.skewX === 0 ? 15 : 0,
    }));
  };

  const handle2DReset = () => {
    setTransform2D({
      translateX: 0,
      translateY: 0,
      rotate: 0,
      scale: 1,
      skewX: 0,
    });
  };

  const css2DTransformString = `transform: translate(${transform2D.translateX}px, ${transform2D.translateY}px) rotate(${transform2D.rotate}deg) scale(${transform2D.scale}) skewX(${transform2D.skewX}deg);`;

  // ==========================================
  // 5. STATE & CONTROLS CHO 3D TRANSFORMS
  // ==========================================
  const [transform3D, setTransform3D] = useState({
    rotateX: 20,
    rotateY: -25,
    rotateZ: 0,
    scale: 1,
  });
  const [is3DAutoTour, setIs3DAutoTour] = useState(false);

  const handle3DAutoDemo = () => {
    setIs3DAutoTour(true);
    setTransform3D({
      rotateX: 35,
      rotateY: 45,
      rotateZ: 15,
      scale: 1.15,
    });
    setTimeout(() => {
      setTransform3D({
        rotateX: -20,
        rotateY: -45,
        rotateZ: -10,
        scale: 1.1,
      });
    }, 1500);
    setTimeout(() => {
      setTransform3D({
        rotateX: 20,
        rotateY: -25,
        rotateZ: 0,
        scale: 1,
      });
      setIs3DAutoTour(false);
    }, 3200);
  };

  const handle3DReset = () => {
    setIs3DAutoTour(false);
    setTransform3D({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
    });
  };

  const css3DTransformString = `transform: perspective(800px) rotateX(${transform3D.rotateX}deg) rotateY(${transform3D.rotateY}deg) rotateZ(${transform3D.rotateZ}deg) scale3d(${transform3D.scale}, ${transform3D.scale}, ${transform3D.scale});`;

  // ==========================================
  // 6. STATE & CONTROLS CHO ANIMATE.CSS
  // ==========================================
  const [selectedAnimateClass, setSelectedAnimateClass] = useState('animate__bounce');
  const [animateTriggerKey, setAnimateTriggerKey] = useState(0);

  const triggerAnimateCss = (effectClass: string) => {
    setSelectedAnimateClass(effectClass);
    setAnimateTriggerKey((prev) => prev + 1);
  };

  const animateCssPresets = [
    { name: 'Xuất hiện (FadeIn)', className: 'animate__fadeIn' },
    { name: 'Rơi xuống (FadeInDown)', className: 'animate__fadeInDown' },
    { name: 'Nảy (Bounce)', className: 'animate__bounce' },
    { name: 'Trượt từ trái (SlideInLeft)', className: 'animate__slideInLeft' },
    { name: 'Trượt từ phải (SlideInRight)', className: 'animate__slideInRight' },
    { name: 'Xoay vào (RotateIn)', className: 'animate__rotateIn' },
    { name: 'Phóng to (ZoomIn)', className: 'animate__zoomIn' },
    { name: 'Nhịp đập (Pulse)', className: 'animate__pulse' },
    { name: 'Cao su đàn hồi (RubberBand)', className: 'animate__rubberBand' },
    { name: 'Lắc rung (ShakeX)', className: 'animate__shakeX' },
  ];

  // ==========================================
  // 7. STATE CHO 4 BÀI TẬP FLIPPED CLASSROOM
  // ==========================================
  const [activeReaction, setActiveReaction] = useState<'heart' | 'like' | 'smile' | null>(null);
  const [reactionBurst, setReactionBurst] = useState(false);

  const triggerReaction = (type: 'heart' | 'like' | 'smile') => {
    setActiveReaction(type);
    setReactionBurst(true);
    setTimeout(() => setReactionBurst(false), 800);
  };

  return (
    <section id="css-lab" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* TIÊU ĐỀ SECTION CHÍNH                                    */}
        {/* ======================================================== */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>03 // CHUYÊN ĐỀ HỌC TẬP & THỰC HÀNH CSS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            NỘI DUNG LÝ THUYẾT – TỔNG QUAN FLIPPED CLASSROOM
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl leading-relaxed">
            Hệ thống kiến thức trọng tâm về hoạt ảnh web, chuyển tiếp CSS và biến đổi hình học trong mô hình lớp học đảo ngược. Tương tác trực quan và thử nghiệm thời gian thực.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 1. BẢNG TỔNG QUAN LÝ THUYẾT (4 CHỦ ĐỀ ĐẦY ĐỦ TIẾNG VIỆT)  */}
        {/* ======================================================== */}
        <div className="rounded-2xl backdrop-blur-xl bg-slate-900/70 border border-slate-800 shadow-2xl overflow-hidden mb-16">
          <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-sans">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>BẢNG NỘI DUNG 4 CHỦ ĐỀ CSS TRỌNG TÂM</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các chuyên đề cốt lõi giúp tạo giao diện động và trải nghiệm người dùng hiện đại
              </p>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
              Chuẩn kiến thức W3Schools & Flipped Classroom
            </span>
          </div>

          {/* Bảng responsive hỗ trợ cuộn ngang không bị vỡ giao diện */}
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
                    {/* STT */}
                    <td className="py-4 px-5 text-center font-mono font-bold text-slate-400 group-hover:text-cyan-400">
                      0{topic.stt}
                    </td>

                    {/* Chủ đề chính */}
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

                    {/* Nội dung chi tiết */}
                    <td className="py-4 px-6 text-slate-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                      {topic.content}
                    </td>

                    {/* Tài liệu tham khảo */}
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
        {/* 2. CÁC PHẦN THỰC HÀNH TƯƠNG TÁC CHUYÊN SÂU (5 TABS)       */}
        {/* ======================================================== */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>PHÒNG THÍ NGHIỆM TƯƠNG TÁC TRỰC QUAN</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tự tay điều khiển và trải nghiệm thực tế các thuộc tính CSS trên phần tử mẫu
              </p>
            </div>

            {/* Tab selection buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start text-xs font-mono">
              {[
                { id: 'transitions', label: '1. Chuyển tiếp CSS' },
                { id: 'animations', label: '2. Hoạt ảnh CSS' },
                { id: 'transform2d', label: '3. Biến đổi 2D' },
                { id: 'transform3d', label: '4. Biến đổi 3D' },
                { id: 'animatecss', label: '5. Animate.css' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-white font-semibold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={{
                    color: activeTab === tab.id ? activeColor : undefined,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: THỰC HÀNH CSS TRANSITIONS                         */}
          {/* ======================================================== */}
          {activeTab === 'transitions' && (
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Khu vực giải thích & code */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CHUYỂN TIẾP CSS (CSS TRANSITIONS)</span>
                  </div>

                  <h4 className="text-lg font-bold text-white">
                    Tương tác mượt mà giữa các trạng thái
                  </h4>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2">
                    <p className="font-medium text-cyan-300">
                      "Chuyển tiếp CSS giúp tạo sự thay đổi mượt mà giữa hai trạng thái của một phần tử."
                    </p>
                    <p className="text-slate-400 text-xs">
                      Khi rê chuột (hover) vào hoặc rê ra, phần tử không thay đổi đột ngột mà chuyển đổi nhịp nhàng qua thời gian quy định nhờ các thuộc tính <code className="text-cyan-400">transition-property</code>, <code className="text-cyan-400">transition-duration</code>, và <code className="text-cyan-400">transition-timing-function</code>.
                    </p>
                  </div>

                  {/* Thanh điều khiển thử nghiệm */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Thời gian chuyển đổi (Duration):
                      </label>
                      <div className="flex gap-1.5">
                        {['0.2s', '0.4s', '0.8s'].map((d) => (
                          <button
                            key={d}
                            onClick={() => setTransitionDuration(d)}
                            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors ${
                              transitionDuration === d
                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Đường cong gia tốc (Timing):
                      </label>
                      <div className="flex gap-1.5">
                        {['ease', 'linear', 'ease-in-out'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTransitionTiming(t)}
                            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors ${
                              transitionTiming === t
                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Code box */}
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 relative font-mono text-xs text-slate-300">
                    <button
                      onClick={() => handleCopy(`.interactive-btn {\n  background-color: #0f172a;\n  transform: translateY(0) scale(1);\n  transition: all ${transitionDuration} ${transitionTiming};\n}\n.interactive-btn:hover {\n  background-color: ${activeColor};\n  transform: translateY(-4px) scale(1.05);\n  box-shadow: 0 10px 25px ${activeColor}40;\n}`, 'transition-code')}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                      title="Sao chép đoạn mã"
                    >
                      {copiedCode === 'transition-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <div className="text-[11px] text-slate-500 mb-1">// Mã nguồn CSS minh họa:</div>
                    <pre className="overflow-x-auto text-[11px] text-cyan-300 leading-relaxed">
{`.nut-chuyen-tiep {
  background-color: #0f172a;
  transform: translateY(0) scale(1);
  transition: all ${transitionDuration} ${transitionTiming};
}
.nut-chuyen-tiep:hover {
  background-color: #06b6d4;
  transform: translateY(-5px) scale(1.06);
  box-shadow: 0 12px 30px rgba(6,182,212,0.35);
}`}
                    </pre>
                  </div>
                </div>

                {/* Khu vực đối tượng tương tác trực tiếp */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center min-h-[300px]">
                  <div className="text-xs font-mono text-slate-400 mb-6 flex items-center gap-1.5">
                    <MousePointer2 className="w-4 h-4 text-cyan-400 animate-bounce" />
                    <span>Rê chuột (Hover) vào nút & thẻ bên dưới:</span>
                  </div>

                  {/* Nút tương tác chính */}
                  <button
                    className="px-6 py-3.5 rounded-xl text-sm font-semibold font-sans tracking-wide text-white bg-slate-900 border border-slate-700 shadow-lg cursor-pointer"
                    style={{
                      transition: `all ${transitionDuration} ${transitionTiming}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = activeColor;
                      e.currentTarget.style.color = '#020617';
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.06)';
                      e.currentTarget.style.boxShadow = `0 14px 35px ${activeColor}55`;
                      e.currentTarget.style.borderColor = activeColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0f172a';
                      e.currentTarget.style.color = '#f8fafc';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
                      e.currentTarget.style.borderColor = '#334155';
                    }}
                  >
                    ✦ Nút chuyển tiếp mượt mà
                  </button>

                  {/* Thẻ minh họa phụ */}
                  <div
                    className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left max-w-xs cursor-pointer shadow-md"
                    style={{
                      transition: `all ${transitionDuration} ${transitionTiming}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                      e.currentTarget.style.borderColor = activeColor;
                      e.currentTarget.style.boxShadow = `0 15px 30px rgba(0,0,0,0.6), 0 0 20px ${activeColor}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.borderColor = '#1e293b';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Thẻ tin tức tương tác</span>
                      <span className="text-[10px] font-mono text-cyan-400">HOVER CARD</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Kích thước phóng to nhẹ, vị trí nhấc bổng 6px và viền phát sáng khi di chuột.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: THỰC HÀNH CSS ANIMATIONS                          */}
          {/* ======================================================== */}
          {activeTab === 'animations' && (
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Giải thích & điều khiển */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>HOẠT ẢNH CSS (CSS ANIMATIONS)</span>
                  </div>

                  <h4 className="text-lg font-bold text-white">
                    Tạo chuyển động tự động liên tục với @keyframes
                  </h4>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2">
                    <p className="font-medium text-cyan-300">
                      "Hoạt ảnh CSS cho phép tạo các chuỗi chuyển động tự động bằng @keyframes."
                    </p>
                    <p className="text-slate-400 text-xs">
                      Không cần phụ thuộc JavaScript, trình duyệt tự động tối ưu hóa rendering với tần số quét 60fps qua GPU. Bạn có thể kiểm soát lặp vô hạn (<code className="text-cyan-400">infinite</code>), hướng chạy, và trạng thái tạm dừng.
                    </p>
                  </div>

                  {/* Lựa chọn hiệu ứng */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-[11px] font-mono text-slate-400">
                      Chọn hoạt ảnh mẫu:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'orbit', label: '1. Quỹ đạo chuyển động (Orbit)' },
                        { id: 'spin', label: '2. Biểu tượng xoay (Radar Spin)' },
                        { id: 'fade', label: '3. Xuất hiện từ từ (Fade In)' },
                        { id: 'pulse', label: '4. Nhấp nháy nhẹ (Pulse Glow)' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setAnimationType(item.id as any)}
                          className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                            animationType === item.id
                              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nút tạm dừng & tốc độ */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setIsAnimationPaused(!isAnimationPaused)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
                    >
                      {isAnimationPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{isAnimationPaused ? 'Tiếp tục chạy' : 'Tạm dừng hoạt ảnh'}</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <span>Tốc độ:</span>
                      {['1s', '2s', '4s'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setAnimationSpeed(s)}
                          className={`px-2 py-0.5 rounded border text-[10px] ${
                            animationSpeed === s
                              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Box @keyframes */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 relative">
                    <button
                      onClick={() => handleCopy(`@keyframes quayVong {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n.phan-tu-dong {\n  animation: quayVong ${animationSpeed} linear infinite;\n}`, 'anim-code')}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                      title="Sao chép đoạn mã"
                    >
                      {copiedCode === 'anim-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <div className="text-[11px] text-slate-500 mb-1">// Mã nguồn @keyframes minh họa:</div>
                    <pre className="overflow-x-auto text-[11px] text-cyan-300 leading-relaxed">
{`@keyframes hoatAnhChuyenDong {
  0%   { transform: rotate(0deg) scale(1); opacity: 0.7; }
  50%  { transform: rotate(180deg) scale(1.08); opacity: 1; }
  100% { transform: rotate(360deg) scale(1); opacity: 0.7; }
}

.phan-tu-hoat-anh {
  animation: hoatAnhChuyenDong ${animationSpeed} ease-in-out infinite;
  animation-play-state: ${isAnimationPaused ? 'paused' : 'running'};
}`}
                    </pre>
                  </div>
                </div>

                {/* Khu vực đối tượng hoạt ảnh trực quan */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-950/80 border border-slate-800/80 min-h-[320px] relative overflow-hidden">
                  <div className="text-xs font-mono text-slate-400 mb-6">
                    Mô hình hoạt ảnh thời gian thực:
                  </div>

                  {/* Đối tượng 1: Orbiting Circle */}
                  {animationType === 'orbit' && (
                    <div className="relative w-44 h-44 rounded-full border border-dashed border-cyan-500/40 flex items-center justify-center">
                      {/* Vòng trung tâm */}
                      <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono text-white shadow-inner">
                        CORE
                      </div>
                      {/* Quả cầu xoay quanh */}
                      <div
                        className="absolute inset-0"
                        style={{
                          animation: `orbitSpin ${animationSpeed} linear infinite`,
                          animationPlayState: isAnimationPaused ? 'paused' : 'running',
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-full -top-3 left-1/2 -translate-x-1/2 absolute shadow-lg"
                          style={{
                            backgroundColor: activeColor,
                            boxShadow: `0 0 20px ${activeColor}`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Đối tượng 2: Spinning Radar */}
                  {animationType === 'spin' && (
                    <div className="relative w-36 h-36 rounded-full border-2 border-slate-800 flex items-center justify-center">
                      <div className="absolute inset-2 rounded-full border border-slate-800" />
                      <div
                        className="w-24 h-24 rounded-full border-t-2 border-r-2"
                        style={{
                          borderColor: activeColor,
                          animation: `radarSweep ${animationSpeed} linear infinite`,
                          animationPlayState: isAnimationPaused ? 'paused' : 'running',
                        }}
                      />
                      <RotateCw className="w-6 h-6 text-white absolute" />
                    </div>
                  )}

                  {/* Đối tượng 3: Fade In element */}
                  {animationType === 'fade' && (
                    <div
                      key={animationType + animationSpeed}
                      className="p-6 rounded-2xl bg-slate-900 border border-slate-700 text-center max-w-xs shadow-2xl"
                      style={{
                        animation: `pulseSubtle ${animationSpeed} ease-in-out infinite`,
                        animationPlayState: isAnimationPaused ? 'paused' : 'running',
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="text-sm font-bold text-white">Xuất hiện từ từ</div>
                      <div className="text-xs text-slate-400 mt-1">Độ trong suốt (opacity) biến đổi nhịp nhàng</div>
                    </div>
                  )}

                  {/* Đối tượng 4: Pulsing Glow */}
                  {animationType === 'pulse' && (
                    <div
                      className="w-28 h-28 rounded-2xl bg-slate-900 border flex items-center justify-center text-center p-3"
                      style={{
                        borderColor: activeColor,
                        animation: `pulseSubtle ${animationSpeed} ease-in-out infinite`,
                        animationPlayState: isAnimationPaused ? 'paused' : 'running',
                        boxShadow: `0 0 30px ${activeColor}55`,
                      }}
                    >
                      <span className="text-xs font-mono font-bold text-white">PULSE GLOW</span>
                    </div>
                  )}

                  <span className="text-[11px] font-mono text-slate-500 mt-6">
                    Trạng thái: {isAnimationPaused ? 'Đã tạm dừng' : 'Đang hoạt động (GPU-Accelerated)'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: THỰC HÀNH BIẾN ĐỔI 2D (2D TRANSFORMS)              */}
          {/* ======================================================== */}
          {activeTab === 'transform2d' && (
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Bảng điều khiển nút bấm */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                    <Move className="w-3.5 h-3.5" />
                    <span>BIẾN ĐỔI 2D (2D TRANSFORMS)</span>
                  </div>

                  <h4 className="text-lg font-bold text-white">
                    Không gian 2 chiều: translate, rotate, scale, skew
                  </h4>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Bấm các nút bên dưới để trực tiếp thay đổi tọa độ, góc quay, tỷ lệ và độ nghiêng của hình vuông mẫu. Phần tử phản hồi bằng CSS transform tức thì:
                  </p>

                  {/* Các nút tương tác theo đúng yêu cầu */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                    <button
                      onClick={handle2DTranslate}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Dịch chuyển</span>
                    </button>

                    <button
                      onClick={handle2DRotate}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Xoay (+45°)</span>
                    </button>

                    <button
                      onClick={handle2DScale}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Phóng to</span>
                    </button>

                    <button
                      onClick={handle2DSkew}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Nghiêng (Skew)</span>
                    </button>

                    <button
                      onClick={handle2DReset}
                      className="col-span-2 sm:col-span-2 px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 transition-all flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Đặt lại (Reset)</span>
                    </button>
                  </div>

                  {/* Giá trị CSS hiện thời */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div className="text-[11px] text-slate-500">// Thuộc tính CSS transform thực tế:</div>
                    <div className="text-cyan-300 font-bold break-all">
                      {css2DTransformString}
                    </div>
                  </div>
                </div>

                {/* Khu vực hiển thị hình vuông 2D */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-950/80 border border-slate-800/80 min-h-[320px] relative overflow-hidden">
                  {/* Lưới tọa độ minh họa */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />
                  <div className="absolute w-full h-[1px] bg-slate-800/60 top-1/2" />
                  <div className="absolute h-full w-[1px] bg-slate-800/60 left-1/2" />

                  {/* Thẻ hình vuông 2D */}
                  <div
                    className="w-32 h-32 rounded-2xl bg-slate-900/90 border-2 flex flex-col items-center justify-center text-center p-3 relative z-10 shadow-2xl cursor-pointer"
                    style={{
                      borderColor: activeColor,
                      transform: `translate(${transform2D.translateX}px, ${transform2D.translateY}px) rotate(${transform2D.rotate}deg) scale(${transform2D.scale}) skewX(${transform2D.skewX}deg)`,
                      transition: 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)',
                      boxShadow: `0 15px 35px rgba(0,0,0,0.7), 0 0 25px ${activeColor}30`,
                    }}
                  >
                    <Box className="w-6 h-6 mb-1" style={{ color: activeColor }} />
                    <span className="text-xs font-mono font-bold text-white">2D TARGET</span>
                    <span className="text-[9px] font-mono text-slate-400 mt-0.5">X:{transform2D.translateX} Y:{transform2D.translateY}</span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 mt-6 relative z-10">
                    Chuyển đổi hình học mượt mà với transition: transform 0.4s
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: THỰC HÀNH BIẾN ĐỔI 3D (3D TRANSFORMS)              */}
          {/* ======================================================== */}
          {activeTab === 'transform3d' && (
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Điều khiển 3D */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                    <Box className="w-3.5 h-3.5" />
                    <span>BIẾN ĐỔI 3D (3D TRANSFORMS)</span>
                  </div>

                  <h4 className="text-lg font-bold text-white">
                    Chiều sâu không gian: perspective & rotateX / rotateY / rotateZ
                  </h4>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Sử dụng điểm phối cảnh <code className="text-cyan-400">perspective(800px)</code> và <code className="text-cyan-400">transform-style: preserve-3d</code> để xoay đa hướng trong không gian ba chiều thực thụ.
                  </p>

                  {/* Nút hành động chính */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      onClick={handle3DAutoDemo}
                      disabled={is3DAutoTour}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                      style={{ backgroundColor: activeColor }}
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Xem hiệu ứng 3D</span>
                    </button>

                    <button
                      onClick={handle3DReset}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Đặt lại</span>
                    </button>
                  </div>

                  {/* Slider điều chỉnh từng trục */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Xoay trục X (rotateX):</span>
                        <span className="text-cyan-400">{transform3D.rotateX}°</span>
                      </div>
                      <input
                        type="range"
                        min="-60"
                        max="60"
                        value={transform3D.rotateX}
                        onChange={(e) => setTransform3D({ ...transform3D, rotateX: Number(e.target.value) })}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Xoay trục Y (rotateY):</span>
                        <span className="text-cyan-400">{transform3D.rotateY}°</span>
                      </div>
                      <input
                        type="range"
                        min="-60"
                        max="60"
                        value={transform3D.rotateY}
                        onChange={(e) => setTransform3D({ ...transform3D, rotateY: Number(e.target.value) })}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Xoay trục Z (rotateZ):</span>
                        <span className="text-cyan-400">{transform3D.rotateZ}°</span>
                      </div>
                      <input
                        type="range"
                        min="-60"
                        max="60"
                        value={transform3D.rotateZ}
                        onChange={(e) => setTransform3D({ ...transform3D, rotateZ: Number(e.target.value) })}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Giá trị CSS 3D */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                    <div className="text-[11px] text-slate-500 mb-1">// Mã CSS 3D Transform:</div>
                    <div className="text-cyan-300 font-bold break-all">
                      {css3DTransformString}
                    </div>
                  </div>
                </div>

                {/* Khu vực khối thẻ 3D trực quan */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-950/80 border border-slate-800/80 min-h-[340px] perspective-1000 overflow-hidden">
                  <div
                    className="w-52 h-52 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-900 to-slate-950 border-2 p-6 flex flex-col justify-between shadow-2xl preserve-3d"
                    style={{
                      borderColor: activeColor,
                      transform: `perspective(800px) rotateX(${transform3D.rotateX}deg) rotateY(${transform3D.rotateY}deg) rotateZ(${transform3D.rotateZ}deg) scale3d(${transform3D.scale}, ${transform3D.scale}, ${transform3D.scale})`,
                      transition: is3DAutoTour ? 'transform 1.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.1s ease-out',
                      boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 40px ${activeColor}30`,
                    }}
                  >
                    {/* Mặt trước thẻ 3D */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                        <Box className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        3D OBJECT
                      </span>
                    </div>

                    <div className="space-y-1 my-2">
                      <div className="text-sm font-bold text-white font-sans">Khối thẻ 3D tương tác</div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Xoay đa chiều quanh trục X, Y, Z với phối cảnh chiều sâu chân thực.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>DEPTH: 800px</span>
                      <span className="text-cyan-400">ACTIVE</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 mt-6">
                    Kéo các thanh trượt hoặc bấm "Xem hiệu ứng 3D" để kiểm tra
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: THỰC HÀNH ANIMATE.CSS                              */}
          {/* ======================================================== */}
          {activeTab === 'animatecss' && (
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Giới thiệu & danh sách hiệu ứng */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>THƯ VIỆN ANIMATE.CSS</span>
                  </div>

                  <h4 className="text-lg font-bold text-white">
                    Tích hợp thư viện hiệu ứng chuyển động có sẵn
                  </h4>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Bấm vào từng nút bên dưới để kích hoạt hiệu ứng tương ứng chạy lại tức thì trên phần tử mẫu. Thư viện đã được cài đặt và tích hợp sẵn vào dự án:
                  </p>

                  {/* Danh sách các nút hiệu ứng theo yêu cầu */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {animateCssPresets.map((preset) => (
                      <button
                        key={preset.className}
                        onClick={() => triggerAnimateCss(preset.className)}
                        className={`p-2.5 rounded-xl text-xs font-mono text-left transition-all border ${
                          selectedAnimateClass === preset.className
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="truncate">{preset.name}</div>
                        <div className="text-[9px] text-slate-500 font-normal truncate mt-0.5">
                          {preset.className}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Mã HTML cách dùng */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 relative">
                    <button
                      onClick={() => handleCopy(`<div class="animate__animated ${selectedAnimateClass}">\n  Nội dung của bạn\n</div>`, 'animate-code')}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                      title="Sao chép đoạn mã"
                    >
                      {copiedCode === 'animate-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <div className="text-[11px] text-slate-500 mb-1">// Cách sử dụng class Animate.css trong HTML/React:</div>
                    <pre className="overflow-x-auto text-[11px] text-cyan-300 leading-relaxed">
{`<div class="animate__animated ${selectedAnimateClass}">
  Nội dung giao diện cần tạo hoạt ảnh
</div>`}
                    </pre>
                  </div>
                </div>

                {/* Phần tử nhận hiệu ứng Animate.css */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-950/80 border border-slate-800/80 min-h-[320px] text-center">
                  <div className="text-xs font-mono text-slate-400 mb-6">
                    Đối tượng thử nghiệm Animate.css:
                  </div>

                  {/* Target element - triggers re-animation via key */}
                  <div
                    key={animateTriggerKey}
                    className={`animate__animated ${selectedAnimateClass} w-44 p-6 rounded-2xl bg-slate-900 border-2 text-center shadow-2xl cursor-pointer`}
                    style={{
                      borderColor: activeColor,
                      boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 30px ${activeColor}30`,
                    }}
                    onClick={() => setAnimateTriggerKey((prev) => prev + 1)}
                  >
                    <Sparkles className="w-8 h-8 mx-auto mb-2" style={{ color: activeColor }} />
                    <div className="text-sm font-bold text-white font-sans">Animate.css</div>
                    <div className="text-[11px] font-mono text-cyan-300 mt-1">
                      {selectedAnimateClass}
                    </div>
                  </div>

                  <button
                    onClick={() => setAnimateTriggerKey((prev) => prev + 1)}
                    className="mt-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Bấm để chạy lại hiệu ứng</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 3. 4 BÀI TẬP THỰC HÀNH DỰ ÁN FLIPPED CLASSROOM (YÊU CẦU 7) */}
        {/* ======================================================== */}
        <div>
          <div className="flex flex-col mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
              <span>LỘ TRÌNH THỰC HÀNH FLIPPED CLASSROOM</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Các cột mốc thực hành dự án (Project Milestones)
            </h3>
            <p className="mt-1 text-slate-400 text-xs sm:text-sm">
              Toàn bộ bài tập và thử thách lập trình giao diện đã được chuẩn hóa sang tiếng Việt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. TƯƠNG TÁC VI MÔ */}
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 shadow-xl group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    BÀI 1 // 30 PHÚT
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
                    BÀI 2 // 30 PHÚT
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
                    BÀI 3 // 30 PHÚT
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
                  Áp dụng Intersection Observer và các lớp CSS hoạt ảnh để từng phần tử xuất hiện tự nhiên khi lướt tới màn hình xem.
                </p>

                {/* Demo tương tác mini */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                  <div className="text-[10px] font-mono text-slate-500 mb-1">Mô phỏng Scroll Reveal:</div>
                  <div className="h-6 w-full rounded bg-slate-900 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center justify-center animate-pulse">
                    ↓ Fade & Slide Reveal
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
                    BÀI 4 // 15 PHÚT
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
                  Tái cấu trúc mã CSS, hạn chế kích hoạt Reflow / Repaint, tận dụng <code className="text-cyan-400">will-change</code> và phần cứng GPU để đạt 60fps mượt mà.
                </p>

                {/* Demo tương tác mini */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>GPU Acceleration:</span>
                    <span className="text-emerald-400 font-bold">100% ON</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Frame Rate:</span>
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
