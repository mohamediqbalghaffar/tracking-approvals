"use client";

import React, { useState } from "react";
import { DataProvider, useData, AdminMode } from "../context/DataContext";
import { Dashboard } from "../components/Dashboard";
import { HTSLogoBackground } from "../components/HTSLogoBackground";
import { ParticlesCanvas } from "../components/ParticlesCanvas";
import { LandingPortals } from "../components/LandingPortals";
import { AdminHub } from "../components/AdminHub";
import { ArrowRight } from "lucide-react";
import { AuthProvider } from "../context/AuthContext";
import { GlobalProfileButton } from "../components/GlobalProfileButton";

interface MainContentProps {
  onBack: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onBack }) => {
  const { dbLoading } = useData();

  if (dbLoading) {
    return (
      <div className="relative z-10 w-full min-h-[135vh] flex flex-col items-center justify-center pt-20 pb-12">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-xl flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-300">خوێندنەوەی داتابەیس...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-full shadow-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <ArrowRight size={18} />
        <span className="font-medium text-sm">گەڕانەوە</span>
      </button>

      <div className="relative z-10 w-full min-h-[135vh] flex flex-col items-center justify-center pt-20 pb-12">
        <Dashboard />
      </div>
    </>
  );
};

export type ActiveModule = 'landing' | 'admin-hub' | { type: 'admin', mode: AdminMode };

const AppContent = () => {
  // Start directly on the live Letter Tracking Dashboard for instant showcase exploration
  const [activeModule, setActiveModule] = useState<ActiveModule>({ type: 'admin', mode: 'live' });
  
  React.useEffect(() => {
    const handleOpenSettings = (e: any) => {
      setActiveModule(prev => {
        if (prev === 'landing' || prev === 'admin-hub' || (typeof prev === 'object' && prev.type !== 'admin')) {
          setTimeout(() => window.dispatchEvent(new CustomEvent('open-admin-settings', { detail: e.detail })), 100);
          return { type: 'admin', mode: 'live' };
        }
        return prev;
      });
    };

    const handleSwitchMode = (e: any) => {
      setActiveModule({ type: 'admin', mode: e.detail.mode });
    };

    window.addEventListener('open-admin-settings', handleOpenSettings);
    window.addEventListener('switch-admin-mode', handleSwitchMode);

    return () => {
      window.removeEventListener('open-admin-settings', handleOpenSettings);
      window.removeEventListener('switch-admin-mode', handleSwitchMode);
    };
  }, []);

  return (
    <main className="min-h-[135vh] relative overflow-x-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      <HTSLogoBackground />
      <ParticlesCanvas />
      
      {activeModule === 'landing' ? (
        <LandingPortals onSelectAdmin={() => setActiveModule('admin-hub')} />
      ) : activeModule === 'admin-hub' ? (
        <AdminHub 
          onSelectLetterTracking={(mode: AdminMode) => setActiveModule({ type: 'admin', mode })} 
          onBack={() => setActiveModule('landing')} 
        />
      ) : (
        <DataProvider mode={activeModule.mode}>
          <MainContent onBack={() => setActiveModule('admin-hub')} />
        </DataProvider>
      )}

      <div className="absolute bottom-4 left-0 w-full text-center z-10 pointer-events-none">
        <p className="text-xs md:text-sm text-slate-500/80 dark:text-slate-400/80 font-medium tracking-wide">
          © ٢٠٢٦ - Tracking Approvals Showcase Demo
        </p>
      </div>
    </main>
  );
};

export default function Home() {
  return (
    <AuthProvider>
      <GlobalProfileButton />
      <AppContent />
    </AuthProvider>
  );
}
