"use client";

import React from "react";
import { X, ExternalLink, Copy, Check, FileText, Calendar, Building, Folder, Tag, Hash, Shield, LogIn } from "lucide-react";
import { LiquidGlassCard } from "./ui/liquid-glass";
import { AZYA_HOME_URL, AZYA_LOGIN_URL, getAzyaDocumentUrl, getAzyaArchiveFolderUrl, getAzyaLoginAndReturnUrl, openAzyaWindow } from "../lib/azya-links";

export interface AzyaLetterItem {
  id?: number | string;
  recNo?: number;
  entityNumber: string;
  title: string;
  entityType: string;
  subjectName?: string | null;
  archiveDate?: string | null;
  archiveDateStr?: string | null;
  token?: string | null;
  etc?: string | null;
  ec?: string | null;
  subjectId?: string | null;
  code?: string | null;
  fromOrgan?: string | null;
  toOrgan?: string | null;
  importEntityNumber?: string | null;
  exportEntityNumber?: string | null;
  description?: string | null;
  folderRole?: string | null;
  direction?: string | null;
}

interface AzyaDetailModalProps {
  letter: AzyaLetterItem | null;
  onClose: () => void;
}

export const AzyaDetailModal: React.FC<AzyaDetailModalProps> = ({ letter, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!letter) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(letter.entityNumber || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenDirectLetter = () => {
    const directUrl = getAzyaDocumentUrl(letter);
    openAzyaWindow(directUrl, "_blank");
  };

  const handleOpenLoginAndResume = () => {
    const loginUrl = getAzyaLoginAndReturnUrl(letter);
    openAzyaWindow(loginUrl, "_blank");
  };

  const handleOpenArchiveBox = () => {
    const folderUrl = getAzyaArchiveFolderUrl(letter);
    openAzyaWindow(folderUrl, "_blank");
  };

  const handleOpenAzyaPortal = () => {
    window.open(AZYA_HOME_URL, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <FileText size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300">
                  {letter.entityType}
                </span>
                {letter.direction && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    letter.direction === 'هاتوو' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' 
                      : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
                  }`}>
                    {letter.direction}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {letter.title || 'بێ ناونیشان'}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Key Reference Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Number Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  ژمارەی نووسراو (Entity Number)
                </span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                  {letter.entityNumber || '—'}
                </div>
              </div>
              <button
                onClick={handleCopyRef}
                className="p-2 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-slate-500 hover:text-blue-600 transition-colors shadow-sm"
                title="کۆپیکردنی ژمارەی نووسراو"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Archive Date */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                بەرواری ئەرشیفکردن
              </span>
              <div className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
                {letter.archiveDate || letter.archiveDateStr || '—'}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject / Folder */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Folder size={14} className="text-cyan-500" />
                بوخچە / هاوپۆل (Subject)
              </span>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60 text-sm font-medium text-slate-800 dark:text-slate-200">
                {letter.subjectName || 'دیارینەکراو'}
              </div>
            </div>

            {/* Entity Type */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Tag size={14} className="text-blue-500" />
                جۆری بەڵگەنامە (Entity Type)
              </span>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60 text-sm font-medium text-slate-800 dark:text-slate-200">
                {letter.entityType}
              </div>
            </div>

            {/* From Organization */}
            {letter.fromOrgan && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Building size={14} className="text-indigo-500" />
                  لە لایەن (From Organ)
                </span>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {letter.fromOrgan}
                </div>
              </div>
            )}

            {/* To Organization */}
            {letter.toOrgan && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Building size={14} className="text-indigo-500" />
                  بۆ لایەنی (To Organ)
                </span>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {letter.toOrgan}
                </div>
              </div>
            )}

            {/* Import / Export numbers */}
            {letter.importEntityNumber && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Hash size={14} className="text-emerald-500" />
                  ژمارەی هاتوو (Import Number)
                </span>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60 text-sm font-mono font-medium text-slate-800 dark:text-slate-200">
                  {letter.importEntityNumber}
                </div>
              </div>
            )}

            {letter.exportEntityNumber && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Hash size={14} className="text-amber-500" />
                  ژمارەی دەرچوو (Export Number)
                </span>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60 text-sm font-mono font-medium text-slate-800 dark:text-slate-200">
                  {letter.exportEntityNumber}
                </div>
              </div>
            )}
          </div>

          {/* Description if present */}
          {letter.description && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                تێبینی / ڕوونکردنەوە:
              </div>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {letter.description}
              </p>
            </div>
          )}

          {/* Azya Portal Direct Integration Card */}
          <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/60 flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
              <Building size={20} />
            </div>
            <div className="space-y-1.5 text-xs flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  بەستەری ڕاستەوخۆ بۆ ناو سیستەمی ئازیا
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 font-bold text-[11px]">
                  دەستبەجێ و خۆکارانە
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                بە کلیک لەسەر دوگمەی شینی خوارەوە، دەستبەجێ دەچیتە ناو پەڕەی تایبەتی ئەم نووسراوە لە ئازیا. ئەگەر لە سیستەم دەرچوویت (Session Timeout)، دەتوانیت دوگمەی زەردی «چوونەژوورەوە و کردنەوەی نووسراو» بەکاربهێنیت تا دوای لۆگین یەکسەر بچێتە ناو ئەم نووسراوە.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 font-semibold text-slate-700 dark:text-slate-200">
                <span className="text-slate-500 dark:text-slate-400">بوخچەی ئەرشیف:</span>
                <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-800/80 font-bold text-cyan-700 dark:text-cyan-300 shadow-sm">
                  {letter.subjectName || "ئەرشیفی کارگێڕی HTS"}
                </span>
                <button
                  onClick={handleOpenArchiveBox}
                  className="px-2.5 py-1 rounded-xl bg-cyan-100/80 dark:bg-cyan-900/60 hover:bg-cyan-200 dark:hover:bg-cyan-800 text-cyan-800 dark:text-cyan-200 font-bold transition-colors inline-flex items-center gap-1 text-[11px]"
                  title="کردنەوەی تەواوی بۆکس فایلی ئەم ئەرشیفە لە ئازیا"
                >
                  <Folder size={12} />
                  <span>بینینی بۆکس فایل لە ئازیا</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/20 border border-slate-200/40 dark:border-slate-800/40 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>کۆدی ئەرشیف: {letter.code || letter.subjectId || '—'}</span>
            <span>ETC: {letter.etc || '—'} • EC: {letter.ec || '—'}</span>
            {letter.token && <span className="font-mono truncate max-w-[200px]">Token: {letter.token}</span>}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium transition-colors text-sm"
          >
            داخستن
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAzyaPortal}
              title="کردنەوەی ڕوومێزی گشتیی ئازیا"
              className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              ڕوومێزی ئازیا
            </button>

            {/* Login & Resume button for Session Timeout recovery */}
            <button
              onClick={handleOpenLoginAndResume}
              title="ئەگەر لە ئازیا لە سیستەم دەرچووبوویت، ئەمە بکەرەوە تا دوای چوونەژوورەوە یەکسەر بچێتە ناو ئەم نووسراوە"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-700 dark:text-amber-300 dark:bg-amber-500/20 border border-amber-500/40 font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
            >
              <LogIn size={15} />
              <span>چوونەژوورەوە و کردنەوەی نووسراو</span>
            </button>

            {/* Direct Letter button */}
            <button
              onClick={handleOpenDirectLetter}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>چوونە ناو نووسراو لە ئازیا</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
