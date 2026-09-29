"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  X,
  Download,
  Calendar,
  Layers,
  FileText,
  Building2,
  Folder,
  Tag,
  Hash,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
  Sparkles,
  MonitorPlay,
  Copy,
  Check,
  ArrowDownToLine,
  Send,
  PieChart as PieIcon,
  Eye,
  SlidersHorizontal,
  LogIn,
} from "lucide-react";
import { LiquidGlassCard } from "./ui/liquid-glass";
import { AzyaCharts } from "./AzyaCharts";
import { AzyaDetailModal, AzyaLetterItem } from "./AzyaDetailModal";
import { AzyaPresentationView } from "./AzyaPresentationView";
import { AZYA_HOME_URL, AZYA_LOGIN_URL, getAzyaDocumentUrl, getAzyaArchiveFolderUrl, getAzyaLoginAndReturnUrl, openAzyaWindow } from "../lib/azya-links";
import * as XLSX from "xlsx";

type AzyaSegment = "all" | "incoming" | "outgoing" | "categories";

export const AzyaWorkspace: React.FC = () => {
  // State
  const [letters, setLetters] = useState<AzyaLetterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [azyaRedirectToast, setAzyaRedirectToast] = useState<{ number: string; folder: string; loginUrl: string } | null>(null);

  // Active view segment
  const [activeSegment, setActiveSegment] = useState<AzyaSegment>("all");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Sorting
  const [sortField, setSortField] = useState<keyof AzyaLetterItem>("archiveDate");
  const [sortAsc, setSortAsc] = useState(false);

  const handleRedirectToAzya = useCallback((letter: AzyaLetterItem) => {
    const directUrl = getAzyaDocumentUrl(letter);
    const loginUrl = getAzyaLoginAndReturnUrl(letter);
    const refNum = letter.entityNumber || letter.importEntityNumber || '';
    
    // Open in a full browser tab across 100% of the display
    openAzyaWindow(directUrl, "_blank");

    setAzyaRedirectToast({
      number: refNum,
      folder: letter.subjectName || "ئەرشیفی کارگێڕی HTS",
      loginUrl,
    });
    setTimeout(() => setAzyaRedirectToast(null), 10000);
  }, []);

  // Modals & Extras
  const [selectedLetter, setSelectedLetter] = useState<AzyaLetterItem | null>(null);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [presentationStyle, setPresentationStyle] = useState<"powerpoint" | "prezi">("powerpoint");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Fetch letters from /api/azya/letters
  const fetchLetters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/azya/letters?all=true`);
      if (!res.ok) throw new Error("نەتوانرا داتاکانی ئازیا باربکرێن");
      const json = await res.json();
      if (json.success && Array.isArray(json.letters)) {
        setLetters(json.letters);
      } else {
        setLetters([]);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "هەڵەیەک ڕوویدا لە بارکردنی داتاکان");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  // Handle Copy
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Distinct lists for dropdowns
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    letters.forEach((l) => {
      const y = (l.archiveDate || l.archiveDateStr || "").slice(0, 4);
      if (y && y.length === 4) years.add(y);
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [letters]);

  const availableCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    letters.forEach((l) => {
      const c = l.entityType || "دیارینەکراو";
      counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [letters]);

  const availableFolders = useMemo(() => {
    const counts: Record<string, number> = {};
    letters.forEach((l) => {
      if (l.subjectName) counts[l.subjectName] = (counts[l.subjectName] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [letters]);

  // Filtering Logic
  const filteredLetters = useMemo(() => {
    return letters.filter((l) => {
      // 1. Segment filter
      if (activeSegment === "incoming" && l.direction !== "هاتوو") return false;
      if (activeSegment === "outgoing" && l.direction !== "ڕۆيشتوو") return false;

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = (l.title || "").toLowerCase().includes(q);
        const matchNum = (l.entityNumber || "").toLowerCase().includes(q);
        const matchCat = (l.entityType || "").toLowerCase().includes(q);
        const matchFolder = (l.subjectName || "").toLowerCase().includes(q);
        const matchFrom = (l.fromOrgan || "").toLowerCase().includes(q);
        if (!matchTitle && !matchNum && !matchCat && !matchFolder && !matchFrom) {
          return false;
        }
      }

      // 3. Year
      if (selectedYear) {
        const dateStr = l.archiveDate || l.archiveDateStr || "";
        if (!dateStr.startsWith(selectedYear)) return false;
      }

      // 4. Category
      if (selectedCategory && l.entityType !== selectedCategory) {
        return false;
      }

      // 5. Folder
      if (selectedFolder && l.subjectName !== selectedFolder) {
        return false;
      }

      // 6. Date Range
      if (startDate) {
        const dateStr = l.archiveDate || l.archiveDateStr || "";
        if (dateStr < startDate) return false;
      }
      if (endDate) {
        const dateStr = l.archiveDate || l.archiveDateStr || "";
        if (dateStr > `${endDate} 23:59:59`) return false;
      }

      return true;
    });
  }, [letters, activeSegment, searchQuery, selectedYear, selectedCategory, selectedFolder, startDate, endDate]);

  // Sorting
  const sortedLetters = useMemo(() => {
    const list = [...filteredLetters];
    list.sort((a, b) => {
      let valA: any = a[sortField] || "";
      let valB: any = b[sortField] || "";
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredLetters, sortField, sortAsc]);

  // Paginated records
  const totalPages = Math.max(1, Math.ceil(sortedLetters.length / pageSize));
  const paginatedLetters = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedLetters.slice(start, start + pageSize);
  }, [sortedLetters, page, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedYear, selectedCategory, selectedFolder, startDate, endDate, activeSegment]);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedYear("");
    setSelectedCategory("");
    setSelectedFolder("");
    setStartDate("");
    setEndDate("");
    setActiveSegment("all");
  };

  const hasActiveFilters = Boolean(
    searchQuery || selectedYear || selectedCategory || selectedFolder || startDate || endDate || activeSegment !== "all"
  );

  // Toggle sorting
  const handleSort = (field: keyof AzyaLetterItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Export to Excel
  const handleExportExcel = () => {
    const exportData = sortedLetters.map((l, index) => ({
      "#": index + 1,
      "ژمارەی نووسراو": l.entityNumber || "",
      "ناونیشان / بابەت": l.title || "",
      "پۆلێن / جۆر": l.entityType || "",
      "بەش / بوخچە": l.subjectName || "",
      "بەرواری ئەرشیف": l.archiveDate || l.archiveDateStr || "",
      "سەرچاوە / نێرەر": l.fromOrgan || "",
      "ئاڕاستە": l.direction || "ئەرشیف",
      "کۆدی بەڵگە (Token)": l.token || "",
      "کۆدی فۆڵدەر": l.code || "",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ئەرشیفی ئازیا");
    XLSX.writeFile(wb, `Azya_Archive_Letters_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // KPI Computations
  const totalLettersCount = letters.length;
  const filteredCount = sortedLetters.length;
  const categoriesCount = availableCategories.length;
  const topCategoryName = availableCategories[0]?.name || "—";
  const topCategoryCount = availableCategories[0]?.count || 0;
  const foldersCount = availableFolders.length;

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-up">
      {/* 1. Header & Quick Presentation Toolbar */}
      <LiquidGlassCard
        glowIntensity="sm"
        shadowIntensity="md"
        blurIntensity="md"
        borderRadius="1.5rem"
        className="p-6 md:p-8 border border-white/40 dark:border-white/10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
              <Sparkles size={28} className="animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 text-xs font-bold mb-1">
                <span>بەشی ئازیا • Azya Archive Center</span>
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                بەدواداچوون و بەڕێوەبردنی نووسراوەکانی ئازیا
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                تۆماری سەرجەم بەڵگەنامە، فۆڕم و نووسراوە پەسەندکراوەکانی ئەرشیفی سەرەکی و کارگێڕی
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Azya Portal Login Quick Link */}
            <a
              href={AZYA_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500 hover:text-white dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold shadow-sm transition-all group"
              title="چوونەژوورەوە لە سیستەمی ئازیا (بۆ ئەو ئامێرانەی لە سیستەم دەرچوون)"
            >
              <LogIn size={15} className="text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors" />
              <span>چوونەژوورەوەی ئازیا</span>
            </a>

            {/* Presentation Toggle */}
            <button
              onClick={() => {
                setPresentationStyle("powerpoint");
                setIsPresentationOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold shadow-sm transition-all group"
            >
              <MonitorPlay size={16} className="text-cyan-500 group-hover:text-white transition-colors" />
              <span>پێشکەشکردن (Presentation)</span>
            </button>

            {/* Refresh */}
            <button
              onClick={fetchLetters}
              disabled={loading}
              title="نوێکردنەوەی داتاکان"
              className="p-2.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <RotateCcw size={16} className={loading ? "animate-spin text-cyan-500" : ""} />
            </button>
          </div>
        </div>
      </LiquidGlassCard>

      {/* 2. 4-Segment View Switcher (Same layout as Odoo+Email) */}
      <div className="flex justify-center animate-fade-up">
        <div className="inline-flex items-center p-1.5 rounded-2xl glass glass-card shadow-lg border border-white/20 dark:border-slate-700/50 gap-1">
          <button
            onClick={() => setActiveSegment("all")}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
              activeSegment === "all"
                ? "bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/25 scale-[1.02]"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
            }`}
          >
            <Layers size={16} />
            <span>سەرجەم ئەرشیف</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">
              {totalLettersCount}
            </span>
          </button>

          <button
            onClick={() => setActiveSegment("incoming")}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
              activeSegment === "incoming"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
            }`}
          >
            <ArrowDownToLine size={16} />
            <span>داواکاری و هاتووەکان</span>
          </button>

          <button
            onClick={() => setActiveSegment("outgoing")}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
              activeSegment === "outgoing"
                ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
            }`}
          >
            <Send size={16} />
            <span>فەرمان و ڕۆیشتووەکان</span>
          </button>

          <button
            onClick={() => setActiveSegment("categories")}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
              activeSegment === "categories"
                ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/25 scale-[1.02]"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
            }`}
          >
            <PieIcon size={16} />
            <span>پۆلێنکردن ({categoriesCount})</span>
          </button>
        </div>
      </div>

      {/* 3. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-2">
        {/* Card 1: Total Letters */}
        <div className="glass glass-card glass-interactive p-6 lg:p-7 flex items-center justify-between relative overflow-hidden rounded-3xl border border-white/20 dark:border-slate-800 hover:scale-[1.02] transition-transform">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">کۆی گشتی نووسراوەکان</p>
            <h3 className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-500">
              {loading ? "..." : totalLettersCount}
            </h3>
            <span className="text-xs text-slate-400 mt-1.5 block">
              {filteredCount !== totalLettersCount ? `فلتەرکراو: ${filteredCount}` : "هەموو تۆمارەکان"}
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-inner">
            <Layers size={26} />
          </div>
        </div>

        {/* Card 2: Categories */}
        <div className="glass glass-card glass-interactive p-6 lg:p-7 flex items-center justify-between relative overflow-hidden rounded-3xl border border-white/20 dark:border-slate-800 hover:scale-[1.02] transition-transform">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">جۆری پۆلێنەکان</p>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-700 dark:text-slate-200">
              {categoriesCount}
            </h3>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1.5 block truncate max-w-xs">
              {topCategoryName}
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
            <Tag size={26} />
          </div>
        </div>

        {/* Card 3: Top Category Letters */}
        <div className="glass glass-card glass-interactive p-6 lg:p-7 flex items-center justify-between relative overflow-hidden rounded-3xl border border-white/20 dark:border-slate-800 hover:scale-[1.02] transition-transform">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">زۆرترین جۆری تۆمارکراو</p>
            <h3 className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
              {topCategoryCount}
            </h3>
            <span className="text-xs text-slate-400 mt-1.5 block">
              {totalLettersCount ? `${Math.round((topCategoryCount / totalLettersCount) * 100)}% ی گشتی` : "—"}
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <FileText size={26} />
          </div>
        </div>

        {/* Card 4: Archive Folders */}
        <div className="glass glass-card glass-interactive p-6 lg:p-7 flex items-center justify-between relative overflow-hidden rounded-3xl border border-white/20 dark:border-slate-800 hover:scale-[1.02] transition-transform">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">بوخچە و بەشەکان</p>
            <h3 className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">
              {foldersCount}
            </h3>
            <span className="text-xs text-slate-400 mt-1.5 block">
              {availableYears.length} ساڵی جیاواز
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
            <Folder size={26} />
          </div>
        </div>
      </div>

      {/* 4. Filter Toolbar */}
      <div className="p-6 rounded-3xl glass glass-card border border-white/20 dark:border-slate-800 flex flex-col gap-5 w-full">
        {/* Search & Main Selects */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
          {/* Live Search */}
          <div className="relative w-full lg:flex-1 lg:max-w-xl group">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="گەڕان بەپێی ژمارەی نووسراو، بابەت، پۆلێن، نێرەر..."
              className="w-full bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 rounded-2xl py-3 pr-11 pl-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-cyan-500/40 text-slate-700 dark:text-slate-300 shadow-xs cursor-pointer"
            >
              <option value="">هەموو پۆلێنەکان ({availableCategories.length})</option>
              {availableCategories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>

            {/* Folder Dropdown */}
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-cyan-500/40 text-slate-700 dark:text-slate-300 shadow-xs cursor-pointer"
            >
              <option value="">هەموو بەش و بوخچەکان</option>
              {availableFolders.map((f) => (
                <option key={f.name} value={f.name}>
                  {f.name} ({f.count})
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-bold transition-colors border border-rose-200 dark:border-rose-900/50 shadow-xs cursor-pointer"
              >
                <X size={14} />
                <span>پاککردنەوەی فلتەر</span>
              </button>
            )}
          </div>
        </div>

        {/* Year Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 w-full">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap pl-2">ساڵەکان:</span>
          <button
            onClick={() => setSelectedYear("")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              !selectedYear
                ? "bg-cyan-500 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            هەموو
          </button>
          {availableYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr === selectedYear ? "" : yr)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedYear === yr
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Interactive Charts */}
      <AzyaCharts
        letters={filteredLetters}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />

      {/* 6. Complex Bottom Data Table */}
      <div className="flex flex-col w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in duration-300">
        {/* Table Top Toolbar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-base shadow-xs">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">
                خشتەی وردەکاریی نووسراوەکان
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                پیشاندانی {paginatedLetters.length} لە کۆی {filteredCount} نووسراو
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Page size select */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
              <span>پیشاندان:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold outline-none text-slate-700 dark:text-slate-300"
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            {/* Export to Excel */}
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 font-bold rounded-xl text-xs sm:text-sm transition-colors border border-emerald-200 dark:border-emerald-800 shadow-xs cursor-pointer"
            >
              <Download size={15} />
              <span>دابەزاندنی ئێکسڵ (Excel)</span>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto min-h-[460px]">
          <table className="w-full text-sm text-right text-slate-600 dark:text-slate-400 border-collapse">
            <thead className="text-xs sm:text-sm uppercase bg-slate-100/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm backdrop-blur-md">
              <tr>
                <th className="py-4 px-5 font-bold text-center w-14">#</th>
                <th
                  onClick={() => handleSort("entityNumber")}
                  className="py-4 px-5 font-bold cursor-pointer hover:text-cyan-500 transition-colors"
                >
                  ژمارەی نووسراو
                </th>
                <th
                  onClick={() => handleSort("title")}
                  className="py-4 px-5 font-bold cursor-pointer hover:text-cyan-500 transition-colors"
                >
                  ناونیشان / بابەت
                </th>
                <th
                  onClick={() => handleSort("entityType")}
                  className="py-4 px-5 font-bold cursor-pointer hover:text-cyan-500 transition-colors"
                >
                  جۆری نووسراو / پۆلێن
                </th>
                <th className="py-4 px-5 font-bold">بەش / بوخچە</th>
                <th
                  onClick={() => handleSort("archiveDate")}
                  className="py-4 px-5 font-bold cursor-pointer hover:text-cyan-500 transition-colors"
                >
                  بەروار
                </th>
                <th className="py-4 px-5 font-bold">سەرچاوە / نێرەر</th>
                <th className="py-4 px-5 font-bold text-center">کردارەکان</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-24 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-9 h-9 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                      <span className="text-sm font-semibold">تکایە چاوەڕوان بە، داتاکانی ئازیا باردەکرێن...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedLetters.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-24 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2.5">
                      <Search size={36} className="text-slate-300 dark:text-slate-600 mb-2" />
                      <span className="font-bold text-lg text-slate-600 dark:text-slate-400">هیچ نووسراوێک نەدۆزرایەوە</span>
                      <p className="text-sm text-slate-400 max-w-md">
                        بەپێی ئەو فلتەر و گەڕانەی دیاریت کردووە هیچ نووسراوێک بوونی نییە. تکایە فلتەرەکان پاکبکەرەوە.
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={handleClearFilters}
                          className="mt-3.5 px-5 py-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 text-xs sm:text-sm font-bold transition-colors"
                        >
                          پاککردنەوەی فلتەرەکان
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedLetters.map((letter, idx) => {
                  const globalIdx = (page - 1) * pageSize + idx + 1;
                  const isCopied = copiedCode === letter.entityNumber;

                  return (
                    <tr
                      key={letter.token || `${letter.entityNumber}_${idx}`}
                      className="hover:bg-cyan-500/5 dark:hover:bg-cyan-500/10 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLetter(letter)}
                    >
                      {/* # Index */}
                      <td className="py-3.5 px-5 text-center font-bold text-xs sm:text-sm text-slate-400">
                        {globalIdx}
                      </td>

                      {/* Reference Number */}
                      <td className="py-3.5 px-5 font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        <div className="flex items-center gap-2">
                          <span>{letter.entityNumber || "—"}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyCode(letter.entityNumber);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-cyan-600 transition-all"
                            title="کۆپیکردنی ژمارەی نووسراو"
                          >
                            {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </td>

                      {/* Subject / Title */}
                      <td className="py-3.5 px-5 max-w-sm xl:max-w-md 2xl:max-w-xl">
                        <div className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm truncate" title={letter.title}>
                          {letter.title || "بێ بابەت"}
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3.5 px-5">
                        <span className="inline-block px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-100/70 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-300 truncate max-w-xs">
                          {letter.entityType || "نووسراوی ئەرشیف"}
                        </span>
                      </td>

                      {/* Subject Name / Folder */}
                      <td className="py-3.5 px-5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 truncate max-w-xs" title={letter.subjectName || ""}>
                        {letter.subjectName || "—"}
                      </td>

                      {/* Archive Date */}
                      <td className="py-3.5 px-5 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap" dir="ltr">
                        {letter.archiveDate || letter.archiveDateStr || "—"}
                      </td>

                      {/* From Organ */}
                      <td className="py-3.5 px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate max-w-xs" title={letter.fromOrgan || ""}>
                        {letter.fromOrgan || "—"}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedLetter(letter)}
                            title="وردەکاری"
                            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-cyan-600 transition-colors"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => handleRedirectToAzya(letter)}
                            title={`چوونە ناو ئەم نووسراوە (${letter.entityNumber}) لە ئازیا`}
                            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-cyan-600 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
          <div>
            پیشاندانی پەڕەی <span className="font-bold text-slate-800 dark:text-slate-200">{page}</span> لە کۆی{" "}
            <span className="font-bold text-slate-800 dark:text-slate-200">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(1)}
              disabled={page <= 1}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="پەڕەی یەکەم"
            >
              <ChevronsRight size={16} />
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="پێشوو"
            >
              <ChevronRight size={16} />
            </button>

            <span className="px-3.5 font-bold text-slate-700 dark:text-slate-300">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="داهاتوو"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="پەڕەی کۆتایی"
            >
              <ChevronsLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Drill-down Modal */}
      <AzyaDetailModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
      />

      {/* Fullscreen Presentation View */}
      {isPresentationOpen && (
        <AzyaPresentationView
          letters={filteredLetters}
          onClose={() => setIsPresentationOpen(false)}
          style={presentationStyle}
        />
      )}

      {/* Azya Redirect Toast Notification */}
      {azyaRedirectToast && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-2xl bg-slate-900/95 text-white shadow-2xl border border-cyan-500/40 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300 max-w-md"
          dir="rtl"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20 mt-0.5">
            <ExternalLink size={20} />
          </div>
          <div className="text-xs space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                <span>دەچێتە ناو نووسراوی ئازیا</span>
                <span className="font-mono bg-cyan-900/60 px-1.5 py-0.5 rounded text-cyan-200">{azyaRedirectToast.number}</span>
              </div>
              <button 
                onClick={() => setAzyaRedirectToast(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                title="داخستن"
              >
                <X size={15} />
              </button>
            </div>
            <div className="text-slate-300 leading-relaxed text-[11px]">
              نووسراوەکە لە ناو سیستەمی ئازیادا کرایەوە لە بوخچەی {azyaRedirectToast.folder}
            </div>
            
            {/* Session Timeout Fallback helper */}
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between gap-2">
              <span className="text-[11px] text-amber-300">
                لە ئازیا دەرچوویت (Session Timeout)؟
              </span>
              <button
                onClick={() => {
                  openAzyaWindow(azyaRedirectToast.loginUrl, "_blank");
                  setAzyaRedirectToast(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                <LogIn size={13} />
                <span>چوونەژوورەوە و کردنەوە</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
