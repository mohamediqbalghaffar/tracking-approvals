"use client";

import React, { useState } from "react";
import { HTSLogo } from "./HTSLogoBackground";
import { ArrowRight, Inbox, Users, CalendarCheck, Sparkles, Clock, ShieldAlert } from "lucide-react";
import { AdminMode } from "../context/DataContext";
import { LiquidGlassCard } from "./ui/liquid-glass";

interface AdminHubProps {
  onSelectLetterTracking: (mode: AdminMode) => void;
  onBack: () => void;
}

export const AdminHub: React.FC<AdminHubProps> = ({ onSelectLetterTracking, onBack }) => {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative z-10 w-full min-h-[135vh] flex flex-col items-center justify-center p-4 pt-16 pb-20" dir="rtl">
      {/* Floating Back Button to Main Portals */}
      <button 
        onClick={onBack}
        className="absolute top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-full shadow-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
        title="گەڕانەوە بۆ بەشە سەرەکییەکان"
      >
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
        <span className="font-semibold text-sm">گەڕانەوە بۆ بەشە سەرەکییەکان</span>
      </button>

      {/* Header & Logo */}
      <div className="mb-6 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <HTSLogo className="w-48 md:w-60 h-auto drop-shadow-xl mb-4" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs md:text-sm font-bold shadow-xs">
          <Sparkles size={14} className="text-blue-500 animate-pulse" />
          <span>بەشی کارگێڕی • Administration Section</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-3 tracking-tight">
          تایبەتمەندی و بەشەکانی کارگێڕی
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-md">
          تکایە سیستەم یان تایبەتمەندیی مەبەست هەڵبژێرە بۆ بەڕێوەبردن و بەدواداچوون:
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
        
        {/* 1. بەدواداچوونی نووسراوەکان (ACTIVE - Full Project Entry) */}
        <LiquidGlassCard
          glowIntensity="lg"
          shadowIntensity="lg"
          blurIntensity="md"
          borderRadius="2rem"
          onClick={() => onSelectLetterTracking('live')}
          className="group relative flex flex-col justify-between p-7 h-64 w-full overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl cursor-pointer border-2 border-blue-500/40 hover:border-blue-500 bg-gradient-to-br from-blue-500/10 via-slate-50/40 to-blue-600/5 dark:from-blue-600/20 dark:via-slate-900/40 dark:to-blue-900/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Top Row: Icon + Active Badge */}
          <div className="flex items-center justify-between z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 dark:bg-blue-500/25 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Inbox size={30} />
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              چالاکە (Active)
            </span>
          </div>

          {/* Bottom Content */}
          <div className="z-10 mt-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              بەدواداچوونی نووسراوەکان
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed font-medium">
              سیستەمی گشتگیری بەدواداچوونی نووسراوە هاتووەکان، پێویست بە وەڵام و سەرجەم ڕەوانەکراوەکانی HTS.
            </p>
          </div>

          {/* Action indicator */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 z-10 pt-2 border-t border-blue-200/50 dark:border-blue-900/40">
            <span>چوونە ناو سیستەم</span>
            <span className="text-sm transform group-hover:-translate-x-1 transition-transform">←</span>
          </div>
        </LiquidGlassCard>

        {/* 2. کاروباری کارمەندان (Future Characteristic Placeholder) */}
        <LiquidGlassCard
          glowIntensity="sm"
          shadowIntensity="sm"
          blurIntensity="sm"
          borderRadius="2rem"
          onClick={() => showToast("بەشی کاروباری کارمەندان لە قۆناغی پەرەپێداندایە")}
          className="group relative flex flex-col justify-between p-7 h-64 w-full overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer border border-slate-200/60 dark:border-slate-800/80 bg-white/20 dark:bg-slate-900/30"
        >
          <div className="flex items-center justify-between z-10">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
              <Users size={28} />
            </div>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold border border-slate-200 dark:border-slate-700">
              🚧 بەم زووانە
            </span>
          </div>

          <div className="z-10 mt-4">
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">
              کاروباری کارمەندان (HR)
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              تۆماری دۆسیە، گرێبەستەکان، کاندیدکردن و زانیاریی دەستبەکاربوونی کارمەندان.
            </p>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500 z-10 pt-2 border-t border-slate-200/40 dark:border-slate-800/50">
            لە قۆناغی پەرەپێداندایە
          </div>
        </LiquidGlassCard>

        {/* 3. دەوام و مۆڵەتەکان (Future Characteristic Placeholder) */}
        <LiquidGlassCard
          glowIntensity="sm"
          shadowIntensity="sm"
          blurIntensity="sm"
          borderRadius="2rem"
          onClick={() => showToast("بەشی دەوام و مۆڵەتەکان لە قۆناغی پەرەپێداندایە")}
          className="group relative flex flex-col justify-between p-7 h-64 w-full overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer border border-slate-200/60 dark:border-slate-800/80 bg-white/20 dark:bg-slate-900/30"
        >
          <div className="flex items-center justify-between z-10">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-inner">
              <CalendarCheck size={28} />
            </div>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold border border-slate-200 dark:border-slate-700">
              🚧 بەم زووانە
            </span>
          </div>

          <div className="z-10 mt-4">
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">
              دەوام و مۆڵەتەکان
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              بەڕێوەبردنی کاتژمێرەکانی کارکردن، ڕاپۆرتی ڕۆژانە و مۆڵەتی کارمەندان.
            </p>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500 z-10 pt-2 border-t border-slate-200/40 dark:border-slate-800/50">
            لە قۆناغی پەرەپێداندایە
          </div>
        </LiquidGlassCard>

      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-slate-800/90 dark:bg-slate-200/90 border border-white/20 text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl font-medium text-sm animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
          {toast}
        </div>
      )}
    </div>
  );
};
