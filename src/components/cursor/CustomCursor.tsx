import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useCursor } from '../../context/CursorContext';
import { RippleItem } from '../../types';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

export const CustomCursor: React.FC = () => {
  const { settings, hoverState, setHoverState, isTouchDevice, isReducedMotion } = useCursor();

  // Mouse positions
  const mousePos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Trail history buffer (for Trailing Effect)
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const [trailRender, setTrailRender] = useState<{ x: number; y: number; opacity: number; scale: number }[]>([]);

  // DOM Refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Rotation angle for TECH 3D and ORBIT styles
  const rotationAngleRef = useRef(0);
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const lastMousePos = useRef({ x: -100, y: -100 });

  // Determine active color
  const activeColor = settings.color || '#00F0FF';

  // Determine size in pixels
  const sizeMap = {
    small: { base: 26, dot: 4, expand: 42 },
    medium: { base: 38, dot: 6, expand: 58 },
    large: { base: 52, dot: 8, expand: 76 },
  };
  const currentSize = sizeMap[settings.size] || sizeMap.medium;

  // Handle global mouse movement
  useEffect(() => {
    if (isTouchDevice || settings.useDefaultCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      velocityRef.current = { vx: dx, vy: dy };
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Optional Particle Trail creation
      if (settings.particleTrail && !isReducedMotion && Math.hypot(dx, dy) > 4) {
        setParticles((prev) => {
          const newParticle: Particle = {
            id: Date.now() + Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            alpha: 0.8,
            size: Math.random() * 3 + 2,
          };
          // Keep array capped at max 12 particles
          return [...prev.slice(-11), newParticle];
        });
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      if (settings.clickRipple && !isReducedMotion) {
        const rippleId = Date.now() + Math.random();
        setRipples((prev) => [
          ...prev.slice(-4), // Maximum 5 ripples active
          {
            id: rippleId,
            x: e.clientX,
            y: e.clientY,
            color: activeColor,
            size: currentSize.base,
          },
        ]);

        // Auto remove ripple after 450ms
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== rippleId));
        }, 450);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Auto inspect hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for custom cursor attributes or interactive tags
      const projectEl = target.closest('[data-cursor="project"]');
      if (projectEl) {
        const customText = projectEl.getAttribute('data-cursor-text') || 'VIEW PROJECT';
        setHoverState({ isHovered: true, hoverType: 'project', text: customText });
        return;
      }

      const buttonEl = target.closest('button, [role="button"]');
      if (buttonEl) {
        setHoverState({ isHovered: true, hoverType: 'button' });
        return;
      }

      const linkEl = target.closest('a');
      if (linkEl) {
        setHoverState({ isHovered: true, hoverType: 'link' });
        return;
      }

      const inputEl = target.closest('input, textarea, select');
      if (inputEl) {
        setHoverState({ isHovered: true, hoverType: 'input' });
        return;
      }

      const cardEl = target.closest('[data-cursor="card"]');
      if (cardEl) {
        setHoverState({ isHovered: true, hoverType: 'card' });
        return;
      }

      setHoverState({ isHovered: false, hoverType: null });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [
    isTouchDevice,
    settings.useDefaultCursor,
    settings.particleTrail,
    settings.clickRipple,
    activeColor,
    currentSize.base,
    isReducedMotion,
    isVisible,
    setHoverState,
  ]);

  // RequestAnimationFrame Animation Loop
  useEffect(() => {
    if (isTouchDevice || settings.useDefaultCursor) return;

    let animFrameId: number;
    const maxTrailPoints = 6;

    const animate = () => {
      if (isReducedMotion) {
        smoothPos.current = { ...mousePos.current };
      } else {
        // Lerp for smooth trailing response
        const lerpFactor = 0.22;
        smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * lerpFactor;
        smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * lerpFactor;

        // Subtle rotation speed update based on mouse velocity
        const speed = Math.hypot(velocityRef.current.vx, velocityRef.current.vy);
        rotationAngleRef.current = (rotationAngleRef.current + 1.2 + speed * 0.15) % 360;
        velocityRef.current.vx *= 0.9;
        velocityRef.current.vy *= 0.9;
      }

      // Update direct DOM transforms for center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Update smooth outer ring / cursor body
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${smoothPos.current.x}px, ${smoothPos.current.y}px, 0)`;
      }

      // Update Trail buffer
      if (settings.trail && !isReducedMotion) {
        const history = trailRef.current;
        history.unshift({ x: smoothPos.current.x, y: smoothPos.current.y });
        if (history.length > maxTrailPoints) {
          history.pop();
        }

        const renderPoints = history.map((p, idx) => ({
          x: p.x,
          y: p.y,
          opacity: (1 - (idx + 1) / (maxTrailPoints + 1)) * 0.5,
          scale: 1 - (idx / maxTrailPoints) * 0.5,
        }));
        setTrailRender(renderPoints);
      } else if (trailRender.length > 0) {
        setTrailRender([]);
        trailRef.current = [];
      }

      // Update Particles
      if (settings.particleTrail && !isReducedMotion) {
        setParticles((prev) =>
          prev
            .map((p) => ({
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              alpha: p.alpha - 0.035,
            }))
            .filter((p) => p.alpha > 0)
        );
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isTouchDevice, settings.useDefaultCursor, settings.trail, settings.particleTrail, isReducedMotion, trailRender.length]);

  if (isTouchDevice || settings.useDefaultCursor || !isVisible) {
    return null;
  }

  // Calculate dynamic diameter based on hover & click
  const isHovered = hoverState.isHovered && settings.hoverAnimation;
  const isProject = hoverState.hoverType === 'project';
  const diameter = isProject
    ? currentSize.expand + 24
    : isHovered
    ? currentSize.expand
    : isClicking
    ? currentSize.base * 0.8
    : currentSize.base;

  const glowStyle = settings.glow
    ? {
        filter: `drop-shadow(0 0 8px ${activeColor}) drop-shadow(0 0 16px ${activeColor}44)`,
      }
    : {};

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
      style={{ willChange: 'transform' }}
    >
      {/* 1. Click Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: ripple.color,
            boxShadow: `0 0 14px ${ripple.color}`,
          }}
        >
          {/* Subtle spark icons on ripple */}
          <span
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px]"
            style={{ color: ripple.color }}
          >
            ✦
          </span>
          <span
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px]"
            style={{ color: ripple.color }}
          >
            ✧
          </span>
        </div>
      ))}

      {/* 2. Trailing Points */}
      {settings.trail &&
        trailRender.map((point, index) => (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-75"
            style={{
              left: point.x,
              top: point.y,
              width: currentSize.dot * point.scale,
              height: currentSize.dot * point.scale,
              backgroundColor: activeColor,
              opacity: point.opacity,
              boxShadow: settings.glow ? `0 0 6px ${activeColor}` : 'none',
            }}
          />
        ))}

      {/* 3. Particle Dust Trail */}
      {settings.particleTrail &&
        particles.map((p) => (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: activeColor,
              opacity: p.alpha,
              boxShadow: `0 0 5px ${activeColor}`,
            }}
          />
        ))}

      {/* 4. Center Precise Dot (Follows exact mouse instant coordinates) */}
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-0 ease-linear"
        style={{
          width: currentSize.dot,
          height: currentSize.dot,
        }}
      >
        <div
          className="w-full h-full rounded-full transition-all duration-150"
          style={{
            backgroundColor: activeColor,
            transform: isClicking ? 'scale(0.7)' : isHovered ? 'scale(1.2)' : 'scale(1)',
            boxShadow: settings.glow ? `0 0 8px ${activeColor}, 0 0 12px ${activeColor}88` : 'none',
          }}
        />
      </div>

      {/* 5. Outer Ring / Interactive Body (Lerped smooth following) */}
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: diameter,
          height: diameter,
          transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Render specific styles */}
        <div className="w-full h-full relative flex items-center justify-center" style={glowStyle}>
          
          {/* STYLE 01: DEFAULT (Minimalist circle with border) */}
          {settings.style === 'default' && (
            <div
              className="w-full h-full rounded-full border transition-all duration-200"
              style={{
                borderColor: `${activeColor}99`,
                backgroundColor: isHovered ? `${activeColor}18` : 'transparent',
                borderWidth: isHovered ? '2px' : '1.5px',
              }}
            />
          )}

          {/* STYLE 02: NEON RING (Vibrant Neon Glow) */}
          {settings.style === 'neon-ring' && (
            <div
              className="w-full h-full rounded-full border-2 transition-all duration-200 animate-pulse-subtle"
              style={{
                borderColor: activeColor,
                boxShadow: `0 0 12px ${activeColor}, inset 0 0 8px ${activeColor}44`,
                backgroundColor: isHovered ? `${activeColor}22` : `${activeColor}08`,
              }}
            />
          )}

          {/* STYLE 03: DOT (Clean minimalist glow dot) */}
          {settings.style === 'dot' && (
            <div
              className="w-full h-full rounded-full transition-all duration-200 flex items-center justify-center"
              style={{
                backgroundColor: isHovered ? `${activeColor}25` : `${activeColor}10`,
                border: `1px solid ${activeColor}55`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: currentSize.dot * 2,
                  height: currentSize.dot * 2,
                  backgroundColor: activeColor,
                  boxShadow: `0 0 14px ${activeColor}`,
                }}
              />
            </div>
          )}

          {/* STYLE 04: CROSSHAIR (Tech targeting reticle) */}
          {settings.style === 'crosshair' && (
            <div className="w-full h-full relative flex items-center justify-center">
              {/* Corner brackets */}
              <div
                className="absolute inset-0 border transition-all duration-200"
                style={{
                  borderColor: `${activeColor}77`,
                  clipPath:
                    'polygon(0 0, 30% 0, 30% 2px, 2px 2px, 2px 30%, 0 30%, 0 70%, 2px 70%, 2px calc(100% - 2px), 30% calc(100% - 2px), 30% 100%, 0 100%, 100% 100%, 100% 70%, calc(100% - 2px) 70%, calc(100% - 2px) calc(100% - 2px), 70% calc(100% - 2px), 70% 100%, 100% 100%, 100% 0, 70% 0, 70% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 30%, 100% 30%)',
                }}
              />
              {/* Center reticle lines */}
              <div
                className="absolute w-full h-[1px] opacity-60"
                style={{ backgroundColor: activeColor }}
              />
              <div
                className="absolute h-full w-[1px] opacity-60"
                style={{ backgroundColor: activeColor }}
              />
              <div
                className="w-2 h-2 rounded-full border border-dashed"
                style={{ borderColor: activeColor }}
              />
            </div>
          )}

          {/* STYLE 05: ORBIT (Orbiting planetary mini-satellite) */}
          {settings.style === 'orbit' && (
            <div className="w-full h-full relative flex items-center justify-center">
              <div
                className="w-full h-full rounded-full border border-dashed transition-all duration-200"
                style={{
                  borderColor: `${activeColor}66`,
                  transform: `rotate(${rotationAngleRef.current}deg)`,
                }}
              >
                {/* Orbiting satellite dot */}
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow"
                  style={{
                    backgroundColor: activeColor,
                    boxShadow: `0 0 6px ${activeColor}`,
                  }}
                />
              </div>
            </div>
          )}

          {/* STYLE 06: TECH 3D (Futuristic multi-layer 3D reticle) */}
          {settings.style === 'tech-3d' && (
            <div className="w-full h-full relative flex items-center justify-center">
              {/* Outer rotating segmented ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed transition-transform duration-75"
                style={{
                  borderColor: `${activeColor}88`,
                  transform: `rotate(${rotationAngleRef.current}deg)`,
                  borderWidth: '1.5px',
                }}
              />
              
              {/* Inner counter-rotating thin ring */}
              <div
                className="absolute inset-1 rounded-full border border-dotted transition-transform duration-100"
                style={{
                  borderColor: `${activeColor}55`,
                  transform: `rotate(-${rotationAngleRef.current * 0.7}deg)`,
                }}
              />

              {/* 4 subtle tech tick marks at 0, 90, 180, 270 degrees */}
              <div
                className="absolute -top-1 w-1.5 h-0.5"
                style={{ backgroundColor: activeColor }}
              />
              <div
                className="absolute -bottom-1 w-1.5 h-0.5"
                style={{ backgroundColor: activeColor }}
              />
              <div
                className="absolute -left-1 h-1.5 w-0.5"
                style={{ backgroundColor: activeColor }}
              />
              <div
                className="absolute -right-1 h-1.5 w-0.5"
                style={{ backgroundColor: activeColor }}
              />

              {/* Center subtle glow disk */}
              <div
                className="w-3 h-3 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: isHovered ? `${activeColor}33` : 'transparent',
                }}
              />
            </div>
          )}

          {/* 6. Floating Project Hover Badge ("VIEW PROJECT") */}
          {isProject && (
            <div
              className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg border transition-all duration-200 animate-in fade-in zoom-in-95"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.88)',
                color: activeColor,
                borderColor: `${activeColor}55`,
                boxShadow: `0 4px 16px ${activeColor}33`,
              }}
            >
              ✦ {hoverState.text || 'VIEW PROJECT'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
