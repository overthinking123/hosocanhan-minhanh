import React, { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import { ProfileProvider } from './context/ProfileContext';
import { CustomCursor } from './components/cursor/CustomCursor';
import { CursorCustomizerPanel } from './components/cursor/CursorCustomizerPanel';
import { ProfileSettingsModal } from './components/portfolio/ProfileSettingsModal';
import { ThreeCanvas } from './components/ThreeCanvas';
import { InitialLoader } from './components/InitialLoader';
import { Navbar } from './components/portfolio/Navbar';
import { Hero } from './components/portfolio/Hero';
import { About } from './components/portfolio/About';
import { Education } from './components/portfolio/Education';
import { Skills } from './components/portfolio/Skills';
import { Projects } from './components/portfolio/Projects';
import { Experience } from './components/portfolio/Experience';
import { CareerGoals } from './components/portfolio/CareerGoals';
import { Contact } from './components/portfolio/Contact';
import { Footer } from './components/portfolio/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ProfileProvider>
      <CursorProvider>
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'}`}>
          {/* Subtle initial loading effect (Fades out quickly) */}
          <InitialLoader />

          {/* Futuristic Interactive 3D WebGL / Canvas Background */}
          <ThreeCanvas />

          {/* Global Custom Cursor Overlay (Desktop fine pointer only, disabled on touch/mobile) */}
          <CustomCursor />

          {/* Semantic Header & Navigation */}
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Semantic Main Content: Comprehensive E-Portfolio (2026) */}
          <main id="main-content" className="relative z-10">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Experience />
            <CareerGoals />
            <Contact />
          </main>

          {/* Semantic Footer */}
          <Footer />

          {/* Floating Custom Cursor Customizer Panel (Bottom Right) */}
          <CursorCustomizerPanel />

          {/* Profile Settings Modal */}
          <ProfileSettingsModal />
        </div>
      </CursorProvider>
    </ProfileProvider>
  );
}
