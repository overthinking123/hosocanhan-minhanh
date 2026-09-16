import React, { useState, useRef, useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';
import { useProfile } from '../../context/ProfileContext';
import { Camera, Sparkles, ShieldCheck } from 'lucide-react';

interface Profile3DAvatarProps {
  className?: string;
}

export const Profile3DAvatar: React.FC<Profile3DAvatarProps> = ({ className = '' }) => {
  const { settings } = useCursor();
  const { profile, setIsProfileModalOpen } = useProfile();
  const activeColor = settings.color || '#00F0FF';

  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse parallax handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center (-1 to 1)
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Subtle tilt limits (max 10 degrees)
      targetRotX = Math.max(-10, Math.min(10, -deltaY * 12));
      targetRotY = Math.max(-10, Math.min(10, deltaX * 12));
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    // Smooth lerp loop
    const animate = () => {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      setRotateX(currentRotX);
      setRotateY(currentRotY);

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Outer 3D Tilt Container */}
      <div
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* ======================================================== */}
        {/* LAYER 0 (BACKGROUND ONLY): 3D Glowing Ambient Halo       */}
        {/* ======================================================== */}
        <div
          className="absolute -inset-6 rounded-full opacity-40 filter blur-3xl pointer-events-none transition-opacity duration-500"
          style={{
            backgroundColor: activeColor,
            transform: 'translateZ(-60px)',
            opacity: isHovered ? 0.6 : 0.35,
          }}
        />

        {/* ======================================================== */}
        {/* LAYER 1 (BACKGROUND ONLY): Outer Holographic Orbit Ring   */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 rounded-full border border-dashed pointer-events-none transition-all duration-700"
          style={{
            borderColor: `${activeColor}40`,
            transform: 'translateZ(-40px) scale(1.18)',
            animation: 'spin 24s linear infinite',
          }}
        >
          {/* Subtle orbiting satellites strictly on the outer perimeter */}
          <span
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full flex items-center justify-center"
            style={{ backgroundColor: activeColor }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
          </span>
          <span
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: `${activeColor}88` }}
          />
        </div>

        {/* ======================================================== */}
        {/* LAYER 2 (BACKGROUND ONLY): Secondary Rotating Wireframe  */}
        {/* ======================================================== */}
        <div
          className="absolute inset-2 rounded-full border pointer-events-none transition-all duration-700"
          style={{
            borderColor: `${activeColor}25`,
            borderStyle: 'dotted',
            transform: 'translateZ(-20px) scale(1.08)',
            animation: 'spin 18s linear infinite reverse',
          }}
        />

        {/* ======================================================== */}
        {/* LAYER 3 (BACKGROUND ONLY): 3D Tech HUD Corner Brackets   */}
        {/* ======================================================== */}
        <div
          className="absolute -inset-3 pointer-events-none transition-transform duration-300"
          style={{
            transform: 'translateZ(-10px)',
          }}
        >
          {/* Top-Left Bracket */}
          <div
            className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg"
            style={{ borderColor: `${activeColor}88` }}
          />
          {/* Top-Right Bracket */}
          <div
            className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 rounded-tr-lg"
            style={{ borderColor: `${activeColor}88` }}
          />
          {/* Bottom-Left Bracket */}
          <div
            className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 rounded-bl-lg"
            style={{ borderColor: `${activeColor}88` }}
          />
          {/* Bottom-Right Bracket */}
          <div
            className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 rounded-br-lg"
            style={{ borderColor: `${activeColor}88` }}
          />
        </div>

        {/* ======================================================== */}
        {/* LAYER 4 (FOREGROUND): Profile Image Frame               */}
        {/* CRITICAL: Face, eyes, and hair are 100% UNTOUCHED        */}
        {/* ======================================================== */}
        <div
          className="relative z-20 w-56 h-56 sm:w-68 sm:h-68 md:w-72 md:h-72 rounded-3xl p-1.5 backdrop-blur-xl bg-slate-900/90 border shadow-2xl transition-all duration-300 overflow-hidden group"
          style={{
            borderColor: `${activeColor}55`,
            boxShadow: `0 20px 45px rgba(0,0,0,0.7), 0 0 25px ${activeColor}33`,
            transform: 'translateZ(25px)',
          }}
        >
          {/* Main Photo Container - ALWAYS UNBLOCKED FOREGROUND */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />

            {/* Quick Change Overlay on Hover */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white cursor-pointer focus:outline-none"
              aria-label="Change Profile Image"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                style={{ backgroundColor: activeColor, color: '#020617' }}
              >
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-900/80 border border-white/20">
                Change Photo
              </span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 5 (OUTSIDE FLOATING BADGES): Depth Accents         */}
        {/* Situated completely outside the face area                */}
        {/* ======================================================== */}
        {/* Top-Right Sparkle Chip */}
        <div
          className="absolute -top-3 -right-2 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-slate-950/90 border text-[11px] font-mono font-medium shadow-xl transition-transform duration-200"
          style={{
            borderColor: `${activeColor}60`,
            color: activeColor,
            transform: 'translateZ(45px)',
          }}
        >
          <Sparkles className="w-3 h-3" />
          <span>3D DEV</span>
        </div>

        {/* Bottom-Left Status Pill */}
        <div
          className="absolute -bottom-3 -left-2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md bg-slate-950/90 border border-slate-800 text-[11px] font-mono shadow-xl transition-transform duration-200"
          style={{
            transform: 'translateZ(40px)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Active • IT Student</span>
        </div>
      </div>
    </div>
  );
};
