import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

export const DEFAULT_PROFILE: UserProfile = {
  fullName: 'NGUYỄN ĐỖ MINH ANH',
  birthYear: '2007',
  university: 'Đại học Lạc Hồng',
  major: 'Công nghệ Thông tin',
  title: 'IT STUDENT • WEB DEVELOPER & 3D ENTHUSIAST',
  bio: 'Passionate Information Technology student engineering modern web experiences, high-performance frontends, and interactive 3D digital interfaces.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
};

const STORAGE_KEY = 'portfolio_user_profile_v2';

export function splitFullName(fullName: string): { line1: string; line2: string } {
  const clean = (fullName || '').trim().replace(/\s+/g, ' ');
  if (!clean) return { line1: 'PORTFOLIO', line2: 'DEVELOPER' };
  const words = clean.split(' ');
  
  if (words.length === 1) {
    return { line1: '', line2: words[0] };
  }
  if (words.length === 2) {
    return { line1: words[0], line2: words[1] };
  }
  if (words.length === 3) {
    return { line1: `${words[0]} ${words[1]}`, line2: words[2] };
  }
  if (words.length === 4) {
    return { line1: `${words[0]} ${words[1]}`, line2: `${words[2]} ${words[3]}` };
  }
  // 5 or more words: keep last 1-2 words on second line
  const splitIdx = Math.max(1, words.length - 2);
  return {
    line1: words.slice(0, splitIdx).join(' '),
    line2: words.slice(splitIdx).join(' ')
  };
}

export function getShortDisplayName(fullName: string): string {
  const clean = (fullName || '').trim().replace(/\s+/g, ' ');
  if (!clean) return 'DEV';
  const words = clean.split(' ');
  if (words.length >= 4) {
    return `${words[2]} ${words[3]}`;
  }
  if (words.length >= 2) {
    return words[words.length - 1];
  }
  return words[0];
}

export async function compressAndResizeImage(file: File, maxDim = 600, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to parse selected image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch (err) {
      console.warn('Could not read user profile from storage', err);
    }
    return DEFAULT_PROFILE;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error('Failed to save user profile to storage', err);
    }
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to clear stored profile', err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        isProfileModalOpen,
        setIsProfileModalOpen,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
