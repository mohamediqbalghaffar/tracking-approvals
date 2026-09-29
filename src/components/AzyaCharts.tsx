"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { AzyaLetterItem } from "./AzyaDetailModal";

const VIBRANT_COLORS = [
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#8b5cf6", // Purple
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#14b8a6", // Teal
  "#f97316", // Orange
  "#6366f1", // Indigo
  "#84cc16", // Lime
];

interface AzyaChartsProps {
  letters: AzyaLetterItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedYear: string;
  onSelectYear: (year: string) => void;
}

export const AzyaCharts: React.FC<AzyaChartsProps> = ({
  letters,
  selectedCategory,
  onSelectCategory,
  selectedYear,
  onSelectYear,
}) => {
  // 1. Category Data for Doughnut
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    letters.forEach((l) => {
      const cat = l.entityType || "دیارینەکراو";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [letters]);

  // 2. Yearly Distribution
  const yearData = useMemo(() => {
    const counts: Record<string, number> = {};
    letters.forEach((l) => {
      const dateStr = l.archiveDate || l.archiveDateStr || "";
      const year = dateStr.slice(0, 4);
      if (year && year.length === 4) {
        counts[year] = (counts[year] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [letters]);

  // 3. Top Folders / Departments
  const folderData = useMemo(() => {
    const counts: Record<string, number> = {};
    letters.forEach((l) => {
      const folder = l.subjectName || "گشتی";
      counts[folder] = (counts[folder] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [letters]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 w-full">
      {/* Category Doughnut Chart */}
      <div className="glass glass-card glass-interactive p-6 lg:p-7 flex flex-col min-h-[440px] rounded-3xl relative overflow-hidden group border border-white/20 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50"></span>
            پۆلێنکردنی نووسراوەکان بەپێی جۆر
          </h3>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory("")}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-200 transition-colors"
            >
              پاککردنەوە
            </button>
          )}
        </div>

        <div className="flex-1 w-full min-h-[300px] relative flex items-center justify-center" dir="ltr">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={78}
                outerRadius={118}
                paddingAngle={3}
                dataKey="value"
                onClick={(entry: any) => onSelectCategory(entry?.name === selectedCategory ? "" : (entry?.name || ""))}
                cursor="pointer"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                    opacity={selectedCategory && selectedCategory !== entry.name ? 0.35 : 1}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900/95 text-white text-xs px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700 font-sans" dir="rtl">
                        <div className="font-bold text-sm">{data.name}</div>
                        <div className="text-cyan-400 mt-1 font-mono font-bold">{data.value} نووسراو</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Stat */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-slate-800 dark:text-white">
              {categoryData.length}
            </span>
            <span className="text-xs font-bold text-slate-400">پۆلێن</span>
          </div>
        </div>

        {/* Legend scrollable */}
        <div className="mt-4 flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1 border-t border-slate-100 dark:border-slate-800/80 pt-3">
          {categoryData.slice(0, 8).map((c, i) => (
            <button
              key={c.name}
              onClick={() => onSelectCategory(c.name === selectedCategory ? "" : c.name)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c.name
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: VIBRANT_COLORS[i % VIBRANT_COLORS.length] }}
              />
              <span className="truncate max-w-[130px]">{c.name}</span>
              <span className="text-[11px] opacity-75 font-mono font-bold">({c.value})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Yearly Bar Chart */}
      <div className="glass glass-card glass-interactive p-6 lg:p-7 flex flex-col min-h-[440px] rounded-3xl relative overflow-hidden group border border-white/20 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></span>
            دابەشبوونی نووسراوەکان بەپێی ساڵ
          </h3>
          {selectedYear && (
            <button
              onClick={() => onSelectYear("")}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition-colors"
            >
              هەموو ساڵەکان
            </button>
          )}
        </div>

        <div className="flex-1 w-full min-h-[300px]" dir="ltr">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={yearData} margin={{ top: 25, right: 15, left: -10, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
              <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 12, fontWeight: "bold" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900/95 text-white text-xs px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700 font-sans" dir="rtl">
                        <div className="font-bold text-sm">ساڵی {data.year}</div>
                        <div className="text-blue-400 mt-1 font-mono font-bold">{data.count} نووسراو تۆمارکراوە</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                maxBarSize={48}
                onClick={(entry: any) => onSelectYear(entry?.year === selectedYear ? "" : (entry?.year || ""))}
                cursor="pointer"
              >
                <LabelList dataKey="count" position="top" fill="#64748b" fontSize={11} fontWeight="bold" />
                {yearData.map((entry, index) => (
                  <Cell
                    key={`year-${index}`}
                    fill={selectedYear === entry.year ? "#2563eb" : "#3b82f6"}
                    opacity={selectedYear && selectedYear !== entry.year ? 0.35 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Folders / Departments */}
      <div className="glass glass-card glass-interactive p-6 lg:p-7 flex flex-col min-h-[440px] rounded-3xl relative overflow-hidden group border border-white/20 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            چالاکترین بەش و بوخچەکان
          </h3>
        </div>

        <div className="flex-1 flex flex-col justify-around gap-3 pt-1">
          {folderData.map((f) => {
            const maxVal = folderData[0]?.count || 1;
            const pct = Math.round((f.count / maxVal) * 100);
            return (
              <div key={f.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-xs" title={f.name}>
                    {f.name}
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {f.count}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
