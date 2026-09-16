export type CursorStyleId = 'default' | 'neon-ring' | 'dot' | 'crosshair' | 'orbit' | 'tech-3d';

export type CursorSize = 'small' | 'medium' | 'large';

export interface CursorSettings {
  style: CursorStyleId;
  color: string;
  customColor: string;
  size: CursorSize;
  glow: boolean;
  trail: boolean;
  clickRipple: boolean;
  hoverAnimation: boolean;
  particleTrail: boolean;
  useDefaultCursor: boolean;
}

export interface CursorHoverState {
  isHovered: boolean;
  hoverType: 'button' | 'link' | 'project' | 'card' | 'input' | null;
  text?: string;
}

export interface RippleItem {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export interface UserProfile {
  fullName: string;
  birthYear: string;
  university: string;
  major: string;
  title: string;
  bio: string;
  avatarUrl: string;
}

