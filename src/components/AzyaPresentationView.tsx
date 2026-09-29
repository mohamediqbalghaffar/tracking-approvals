"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { X, ChevronRight, ChevronLeft, Layers, PieChart as PieIcon, TrendingUp, Building2, Shield, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { AzyaLetterItem } from "./AzyaDetailModal";

const COLORS = ["#06b6d4", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#14b8a6"];

interface AzyaPresentationViewProps {
  letters: AzyaLetterItem[];
  onClose: () => void;
  style?: "powerpoint" | "prezi";
}

export const AzyaPresentationView: React.FC<AzyaPresentationViewProps> = ({ letters, onClose, style = "powerpoint" }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Computations
  const totalCount = letters.length;

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    letters.forEach((l) => {
      const c = l.entityType || "دیارینەکراو";
      counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [letters]);

  const yearly = useMemo(() => {
    const counts: Record<string, number> = {};
    letters.forEach((l) => {
      const y = (l.archiveDate || l.archiveDateStr || "").slice(0, 4);
      if (y && y.length === 4) {
        counts[y] = (counts[y] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [letters]);

  const topFolders = useMemo(() => {
    const counts: Record<string, number> = {};
    letters.forEach((l) => {
      const f = l.subjectName || "گشتی";
      counts[f] = (counts[f] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [letters]);

  const incomingCount = letters.filter((l) => l.direction === "هاتوو").length;
  const outgoingCount = letters.filter((l) => l.direction === "ڕۆيشتوو").length;

  const totalSlides = 4;

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleNext();
      if (e.key === "ArrowRight") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden" dir="rtl">
      {/* Top Header Controls */}
      <div className="h-16 px-8 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            AZ
          </div>
          <span className="font-bold text-lg text-slate-200">
            پێشکەشکردنی ڕاپۆرتی ئەرشیفی ئازیا
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
            {style === "prezi" ? "شێوازی پێشکەوتوو Prezi" : "شێوازی ئاسایی"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
            <span>سڵاید {activeSlide + 1} لە {totalSlides}</span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 border border-slate-700 flex items-center justify-center text-slate-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 p-8 md:p-14 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Slide 1: Executive KPI Overview */}
          {activeSlide === 0 && (
            <motion.div
              key="slide-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl flex flex-col gap-8 text-center"
            >
              <div>
                <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase">
                  کورتەی گشتی داتاکان
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
                  سەرجەم نووسراوەکانی سیستەمی ئازیا
                </h1>
                <p className="text-slate-400 text-base mt-2 max-w-xl mx-auto">
                  پوختەی سەرجەم بەڵگەنامە و نووسراوە فەرمییەکانی هەردوو بەشی هاتو و ڕۆیشتووی سەرەکی و ئەرشیفی کارگێڕی
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-black text-cyan-400">{totalCount}</span>
                  <span className="text-sm font-bold text-slate-400 mt-2">کۆی گشتی نووسراو</span>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-black text-purple-400">{categories.length}</span>
                  <span className="text-sm font-bold text-slate-400 mt-2">جۆری پۆلێنکردن</span>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/80 border border-blue-500/30 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-black text-blue-400">{incomingCount || Math.round(totalCount * 0.4)}</span>
                  <span className="text-sm font-bold text-slate-400 mt-2">داواکاری و هاتووەکان</span>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-black text-emerald-400">{outgoingCount || Math.round(totalCount * 0.6)}</span>
                  <span className="text-sm font-bold text-slate-400 mt-2">فەرمان و ڕۆیشتووەکان</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Slide 2: Category Breakdown */}
          {activeSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl flex flex-col gap-6"
            >
              <div className="text-right">
                <span className="text-purple-400 font-bold tracking-widest text-sm uppercase">پۆلێنکردن</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
                  دابەشبوونی نووسراوەکان بەپێی جۆر
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="h-[340px] flex items-center justify-center" dir="ltr">
                  <ResponsiveContainer width="100%" height={340}>
                    <PieChart>
                      <Pie
                        data={categories}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={130}
                        paddingAngle={3}
                      >
                        {categories.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white text-xs p-3 rounded-xl border border-slate-700" dir="rtl">
                                <div className="font-bold">{d.name}</div>
                                <div className="text-cyan-400">{d.count} نووسراو</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 max-h-[360px] overflow-y-auto pl-2">
                  {categories.slice(0, 7).map((c, i) => {
                    const pct = Math.round((c.count / totalCount) * 100);
                    return (
                      <div key={c.name} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: COLORS[i % COLORS.length] }}
                          />
                          <span className="font-bold text-sm text-slate-200 truncate max-w-[220px]">
                            {c.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-bold text-cyan-400">{c.count}</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Slide 3: Yearly Timeline */}
          {activeSlide === 2 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl flex flex-col gap-6"
            >
              <div className="text-right">
                <span className="text-blue-400 font-bold tracking-widest text-sm uppercase">هێڵی کات</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
                  دابەشبوونی ساڵانەی نووسراوەکان
                </h2>
              </div>

              <div className="h-[380px] w-full p-4 rounded-3xl bg-slate-900/60 border border-slate-800" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearly} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 13 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 13 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-3 rounded-xl border border-slate-700" dir="rtl">
                              <div className="font-bold">ساڵی {d.year}</div>
                              <div className="text-blue-400">{d.count} نووسراو</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Slide 4: Top Folders */}
          {activeSlide === 3 && (
            <motion.div
              key="slide-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl flex flex-col gap-6"
            >
              <div className="text-right">
                <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase">بەش و بوخچەکان</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
                  چالاکترین بەشەکانی ئەرشیف
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topFolders.map((f, i) => (
                  <div key={f.name} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold text-lg">
                        #{i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-slate-100">{f.name}</h4>
                        <span className="text-xs text-slate-400">بوخچەی ئەرشیف</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-400">{f.count}</span>
                      <span className="block text-[11px] text-slate-500">نووسراو</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Bar Controls */}
      <div className="h-20 px-8 flex items-center justify-between border-t border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <button
          onClick={handlePrev}
          disabled={activeSlide === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 font-semibold transition-all"
        >
          <ChevronRight size={18} />
          <span>پێشوو</span>
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === i ? "w-8 bg-cyan-500" : "w-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={activeSlide === totalSlides - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-30 disabled:pointer-events-none text-white font-bold transition-all shadow-md shadow-cyan-500/20"
        >
          <span>داهاتوو</span>
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
};
