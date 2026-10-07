import React, { useState } from 'react';
import { useCursor, COLOR_PRESETS } from '../../context/CursorContext';
import { CursorStyleId, CursorSize } from '../../types';
import { 
  Sparkles, 
  X, 
  RotateCcw, 
  Sliders, 
  Palette, 
  Layers, 
  Zap, 
  MousePointer2, 
  Check,
  Eye,
  Settings2
} from 'lucide-react';

const STYLES_CONFIG: { id: CursorStyleId; name: string; number: string; desc: string }[] = [
  { id: 'default', name: 'Mặc định', number: '01', desc: 'Vòng tròn & Chấm tối giản' },
  { id: 'neon-ring', name: 'Vòng Neon', number: '02', desc: 'Vòng hào quang rực rỡ' },
  { id: 'dot', name: 'Chấm sáng', number: '03', desc: 'Điểm sáng công nghệ' },
  { id: 'crosshair', name: 'Tâm ngắm', number: '04', desc: 'Tâm ngắm HUD công nghệ' },
  { id: 'orbit', name: 'Quỹ đạo', number: '05', desc: 'Vệ tinh xoay quanh' },
  { id: 'tech-3d', name: 'Công nghệ 3D', number: '06', desc: 'Khối phân đoạn xoay 3D' },
];

export const CursorCustomizerPanel: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetSettings,
    isPanelOpen,
    setIsPanelOpen,
    isTouchDevice,
  } = useCursor();

  const [activeTab, setActiveTab] = useState<'style' | 'effects'>('style');

  const currentColor = settings.color || '#00F0FF';

  // Toggle effect helper
  const toggleEffect = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 select-none">
        {/* Subtle tooltip hint for first time visitors */}
        {!isPanelOpen && (
          <div 
            onClick={() => setIsPanelOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium backdrop-blur-md bg-slate-900/80 text-slate-300 border border-slate-700/60 shadow-lg cursor-pointer hover:border-cyan-500/50 transition-all hover:text-white"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Tùy chỉnh con trỏ</span>
          </div>
        )}

        <button
          id="cursor-customizer-toggle-btn"
          onClick={() => setIsPanelOpen((prev) => !prev)}
          aria-label="Mở bảng tùy chỉnh con trỏ chuột"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl bg-slate-900/90 border border-white/15 text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          style={{
            boxShadow: `0 0 20px ${currentColor}33`,
            borderColor: isPanelOpen ? currentColor : 'rgba(255, 255, 255, 0.18)',
          }}
        >
          {/* Subtle spinning accent halo */}
          <div
            className="absolute inset-0 rounded-full border border-dashed opacity-40 group-hover:opacity-100 transition-opacity animate-[spin_12s_linear_infinite]"
            style={{ borderColor: currentColor }}
          />
          {isPanelOpen ? (
            <X className="w-5 h-5 text-slate-200 transition-transform group-hover:rotate-90" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MousePointer2 className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" style={{ color: currentColor }} />
              <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: currentColor }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: currentColor }} />
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Floating Glassmorphism Customizer Panel */}
      {isPanelOpen && (
        <aside
          id="cursor-customizer-panel"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] overflow-y-auto rounded-2xl backdrop-blur-2xl bg-slate-950/90 border border-slate-700/60 shadow-2xl p-5 text-slate-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 custom-scrollbar"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${currentColor}22`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-white/5 border border-white/10" style={{ color: currentColor }}>
                ✦
              </span>
              <div>
                <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-white flex items-center gap-1.5">
                  TÙY CHỈNH CON TRỎ
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    V2.0
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Hệ thống con trỏ chuột tương tác</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetSettings}
                title="Khôi phục mặc định"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Khôi phục cài đặt mặc định"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Đóng bảng tùy chỉnh"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Touch device notice */}
          {isTouchDevice && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2">
              <span className="text-base">📱</span>
              <span>
                Đang phát hiện thiết bị màn hình cảm ứng. Con trỏ tùy chỉnh kích hoạt tự động trên chuột máy tính để đảm bảo độ mượt mà.
              </span>
            </div>
          )}

          {/* Realtime Mini Preview Card */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg bg-slate-950/80 border flex items-center justify-center relative overflow-hidden"
                style={{ borderColor: `${currentColor}44` }}
              >
                {/* Visual miniature cursor representation */}
                {settings.style === 'default' && (
                  <div className="w-5 h-5 rounded-full border border-dashed flex items-center justify-center" style={{ borderColor: currentColor }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentColor }} />
                  </div>
                )}
                {settings.style === 'neon-ring' && (
                  <div className="w-6 h-6 rounded-full border-2 animate-pulse" style={{ borderColor: currentColor, boxShadow: `0 0 8px ${currentColor}` }} />
                )}
                {settings.style === 'dot' && (
                  <div className="w-3 h-3 rounded-full animate-ping-slow" style={{ backgroundColor: currentColor, boxShadow: `0 0 10px ${currentColor}` }} />
                )}
                {settings.style === 'crosshair' && (
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute w-full h-[1px]" style={{ backgroundColor: currentColor }} />
                    <div className="absolute h-full w-[1px]" style={{ backgroundColor: currentColor }} />
                    <div className="w-2 h-2 rounded-full border" style={{ borderColor: currentColor }} />
                  </div>
                )}
                {settings.style === 'orbit' && (
                  <div className="w-6 h-6 rounded-full border border-dashed animate-spin flex items-center justify-center" style={{ borderColor: currentColor }}>
                    <div className="w-1.5 h-1.5 rounded-full -top-1 absolute" style={{ backgroundColor: currentColor }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentColor }} />
                  </div>
                )}
                {settings.style === 'tech-3d' && (
                  <div className="w-6 h-6 rounded-full border border-dashed animate-[spin_6s_linear_infinite] flex items-center justify-center" style={{ borderColor: currentColor }}>
                    <div className="w-3 h-3 rounded-full border border-dotted" style={{ borderColor: currentColor }} />
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: currentColor }} />
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs font-mono font-semibold text-white uppercase flex items-center gap-1.5">
                  <span>{STYLES_CONFIG.find((s) => s.id === settings.style)?.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({settings.size === 'small' ? 'Nhỏ' : settings.size === 'medium' ? 'Vừa' : 'Lớn'})</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: currentColor }} />
                  <span className="font-mono">{currentColor.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase font-semibold ${
                  settings.useDefaultCursor
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {settings.useDefaultCursor ? 'Chuẩn' : 'Đang bật'}
              </span>
            </div>
          </div>

          {/* Tabs: Styles / Effects */}
          <div className="grid grid-cols-2 gap-1 mt-4 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('style')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'style'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Kiểu dáng & Màu sắc
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'effects'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Hiệu ứng & Kích thước
            </button>
          </div>

          {/* TAB 1: STYLES & COLOR */}
          {activeTab === 'style' && (
            <div className="mt-4 space-y-4">
              {/* 1. CURSOR STYLES GRID */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Kiểu dáng con trỏ</span>
                  <span className="text-[10px] text-slate-500">6 Kiểu dáng</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {STYLES_CONFIG.map((s) => {
                    const isSelected = settings.style === s.id && !settings.useDefaultCursor;
                    return (
                      <button
                        key={s.id}
                        id={`cursor-style-${s.id}`}
                        onClick={() => updateSettings({ style: s.id, useDefaultCursor: false })}
                        className={`group relative p-2 rounded-xl text-left border transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer ${
                          isSelected
                            ? 'bg-slate-800/90 border-opacity-100 shadow-md'
                            : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                        style={{
                          borderColor: isSelected ? currentColor : undefined,
                        }}
                      >
                        {/* Tiny Style Preview */}
                        <div className="w-7 h-7 mb-1.5 flex items-center justify-center">
                          {s.id === 'default' && (
                            <div className="w-4 h-4 rounded-full border border-dashed" style={{ borderColor: isSelected ? currentColor : '#94a3b8' }} />
                          )}
                          {s.id === 'neon-ring' && (
                            <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: isSelected ? currentColor : '#94a3b8' }} />
                          )}
                          {s.id === 'dot' && (
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isSelected ? currentColor : '#94a3b8' }} />
                          )}
                          {s.id === 'crosshair' && (
                            <div className="relative w-4 h-4 flex items-center justify-center">
                              <div className="w-full h-[1px] absolute bg-slate-400" />
                              <div className="h-full w-[1px] absolute bg-slate-400" />
                            </div>
                          )}
                          {s.id === 'orbit' && (
                            <div className="w-4 h-4 rounded-full border border-dotted relative flex items-center justify-center" style={{ borderColor: isSelected ? currentColor : '#94a3b8' }}>
                              <div className="w-1 h-1 rounded-full absolute -top-0.5" style={{ backgroundColor: isSelected ? currentColor : '#94a3b8' }} />
                            </div>
                          )}
                          {s.id === 'tech-3d' && (
                            <div className="w-4 h-4 rounded-full border border-dashed flex items-center justify-center" style={{ borderColor: isSelected ? currentColor : '#94a3b8' }}>
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isSelected ? currentColor : '#94a3b8' }} />
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-medium leading-tight text-slate-200 group-hover:text-white">
                          {s.name}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">{s.number}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. COLOR PALETTE */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Màu sắc chủ đạo</span>
                  <span className="text-[10px] text-slate-500">Phát quang thời gian thực</span>
                </label>

                {/* Swatches */}
                <div className="flex items-center justify-between gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  {COLOR_PRESETS.map((preset) => {
                    const isSelected = settings.color.toLowerCase() === preset.hex.toLowerCase();
                    return (
                      <button
                        key={preset.name}
                        onClick={() => updateSettings({ color: preset.hex, customColor: preset.hex })}
                        title={preset.name}
                        className="group relative flex items-center justify-center w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                      >
                        <span
                          className="w-6 h-6 rounded-full transition-shadow duration-200 border border-white/20"
                          style={{
                            backgroundColor: preset.hex,
                            boxShadow: isSelected ? `0 0 10px ${preset.hex}` : 'none',
                          }}
                        />
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center text-slate-950 font-bold text-xs">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Native Color Picker for custom color */}
                  <div className="relative ml-1">
                    <label
                      htmlFor="custom-color-picker"
                      title="Tự chọn màu tùy thích"
                      className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-slate-600 hover:border-white transition-colors bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <Palette className="w-3.5 h-3.5" />
                    </label>
                    <input
                      id="custom-color-picker"
                      type="color"
                      value={settings.color}
                      onChange={(e) => updateSettings({ color: e.target.value, customColor: e.target.value })}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EFFECTS & SIZE */}
          {activeTab === 'effects' && (
            <div className="mt-4 space-y-4">
              {/* 1. CURSOR SIZE SLIDER / BUTTONS */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Kích thước con trỏ</span>
                  <span className="text-[10px] font-mono text-cyan-400 capitalize">
                    {settings.size === 'small' ? 'Nhỏ' : settings.size === 'medium' ? 'Vừa' : 'Lớn'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['small', 'medium', 'large'] as CursorSize[]).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => updateSettings({ size: sz })}
                      className={`py-1.5 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                        settings.size === sz
                          ? 'bg-slate-800 border-cyan-500/60 text-white shadow-sm'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sz === 'small' ? 'NHỎ' : sz === 'medium' ? 'VỪA' : 'LỚN'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. TOGGLEABLE EFFECTS */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Hiệu ứng thị giác</span>
                  <span className="text-[10px] text-slate-500">Mượt mà & Tối ưu hiệu năng</span>
                </label>

                <div className="space-y-1.5">
                  {/* Glow */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">✦</span>
                      <div>
                        <div className="text-xs font-medium text-slate-200">Phát quang (Glow)</div>
                        <div className="text-[10px] text-slate-500">Vầng sáng hào quang</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleEffect('glow')}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                        settings.glow
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {settings.glow ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Trailing Effect */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">●</span>
                      <div>
                        <div className="text-xs font-medium text-slate-200">Vệt đuôi chuột (Trailing)</div>
                        <div className="text-[10px] text-slate-500">Vệt mờ chuyển động mượt mà</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleEffect('trail')}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                        settings.trail
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {settings.trail ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Click Ripple */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">◎</span>
                      <div>
                        <div className="text-xs font-medium text-slate-200">Gợn sóng khi bấm (Ripple)</div>
                        <div className="text-[10px] text-slate-500">Sóng xung kích đàn hồi khi click</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleEffect('clickRipple')}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                        settings.clickRipple
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {settings.clickRipple ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Hover Animation */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400">❖</span>
                      <div>
                        <div className="text-xs font-medium text-slate-200">Phóng to khi rê chuột (Hover)</div>
                        <div className="text-[10px] text-slate-500">Tự mở rộng khi trỏ vào nút & thẻ</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleEffect('hoverAnimation')}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                        settings.hoverAnimation
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {settings.hoverAnimation ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Particle Trail */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✧</span>
                      <div>
                        <div className="text-xs font-medium text-slate-200">Tia hạt bụi sao (Particles)</div>
                        <div className="text-[10px] text-slate-500">Bụi hạt vi mô phát sáng lơ lửng</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleEffect('particleTrail')}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                        settings.particleTrail
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {settings.particleTrail ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Accessibility & Standard Cursor Switch */}
          <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MousePointer2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-300">Dùng con trỏ mặc định trình duyệt</span>
            </div>

            <button
              onClick={() => updateSettings({ useDefaultCursor: !settings.useDefaultCursor })}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
                settings.useDefaultCursor
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {settings.useDefaultCursor ? 'Đang bật' : 'Đang tắt'}
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
