import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

export const ThreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings, isReducedMotion } = useCursor();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.001;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.001;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 3D Wireframe Icosahedron vertices definition
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];
    // Normalize vertices
    const vertices = rawVertices.map(([x, y, z]) => {
      const d = Math.hypot(x, y, z);
      return [x / d, y / d, z / d];
    });

    // Edges connecting vertices if distance is ~ 1.05
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.hypot(dx, dy, dz);
        if (dist < 1.1) {
          edges.push([i, j]);
        }
      }
    }

    // Floating background particles
    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.4 + 0.1,
    }));

    let rotX = 0;
    let rotY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse interaction
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!isReducedMotion) {
        rotX += 0.003 + mouseRef.current.y * 0.5;
        rotY += 0.005 + mouseRef.current.x * 0.5;
      }

      // Draw subtle tech particles & constellations
      const themeColor = settings.color || '#00F0FF';
      ctx.fillStyle = themeColor;
      ctx.strokeStyle = `${themeColor}22`;

      particles.forEach((p, idx) => {
        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.globalAlpha = p.baseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.globalAlpha = (1 - dist / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // 3D Geometric Matrix Rotation in Hero background (scaled nicely)
      const centerX = width > 768 ? width * 0.75 : width * 0.5;
      const centerY = height * 0.38;
      const scale = Math.min(width, height) * 0.22;

      // Project vertices
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 3.5;
        const pz = z2 + fov;
        const px = (x1 / pz) * scale + centerX;
        const py = (y2 / pz) * scale + centerY;

        return { px, py, z: z2 };
      });

      // Draw Edges with glowing tech style
      ctx.lineWidth = 1.2;
      edges.forEach(([i, j]) => {
        const v1 = projected[i];
        const v2 = projected[j];
        const avgZ = (v1.z + v2.z) / 2;
        const alpha = Math.max(0.08, (avgZ + 1) * 0.35);

        ctx.strokeStyle = themeColor;
        ctx.globalAlpha = alpha * 0.6;
        ctx.beginPath();
        ctx.moveTo(v1.px, v1.py);
        ctx.lineTo(v2.px, v2.py);
        ctx.stroke();
      });

      // Draw vertex nodes
      projected.forEach((v) => {
        const alpha = Math.max(0.15, (v.z + 1) * 0.45);
        ctx.fillStyle = themeColor;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(v.px, v.py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [settings.color, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};
