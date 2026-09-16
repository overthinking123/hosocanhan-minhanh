import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CursorSettings, CursorHoverState } from '../types';

const STORAGE_KEY = 'portfolio_custom_cursor_config';

export const COLOR_PRESETS = [
  { name: 'Cyan', hex: '#00F0FF' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Purple', hex: '#A855F7' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'White', hex: '#F8FAFC' },
];

export const DEFAULT_SETTINGS: CursorSettings = {
  style: 'tech-3d',
  color: '#00F0FF',
  customColor: '#00F0FF',
  size: 'medium',
  glow: true,
  trail: true,
  clickRipple: true,
  hoverAnimation: true,
  particleTrail: false,
  useDefaultCursor: false,
};

interface CursorContextType {
  settings: CursorSettings;
  updateSettings: (partial: Partial<CursorSettings>) => void;
  resetSettings: () => void;
  hoverState: CursorHoverState;
  setHoverState: React.Dispatch<React.SetStateAction<CursorHoverState>>;
  isTouchDevice: boolean;
  isReducedMotion: boolean;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettingsState] = useState<CursorSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback if localStorage unavailable
    }
    return DEFAULT_SETTINGS;
  });

  const [hoverState, setHoverState] = useState<CursorHoverState>({
    isHovered: false,
    hoverType: null,
  });

  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  // Detect pointer capability and reduced motion
  useEffect(() => {
    const checkCapabilities = () => {
      const finePointer = window.matchMedia('(pointer: fine)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const touchAvailable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // If purely coarse pointer and no fine pointer, consider it a touch/mobile device
      setIsTouchDevice(!finePointer && (coarsePointer || touchAvailable));

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(motionQuery.matches);
    };

    checkCapabilities();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Save settings to localStorage on update
  const updateSettings = useCallback((partial: Partial<CursorSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage write error
      }
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettingsState(DEFAULT_SETTINGS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    } catch {
      // Ignore
    }
  }, []);

  // Toggle custom-cursor-active class on body when active on desktop
  useEffect(() => {
    if (!isTouchDevice && !settings.useDefaultCursor) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }

    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouchDevice, settings.useDefaultCursor]);

  return (
    <CursorContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        hoverState,
        setHoverState,
        isTouchDevice,
        isReducedMotion,
        isPanelOpen,
        setIsPanelOpen,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
