"use client";

import React, { useState, useMemo } from 'react';
import { 
  Cloud, Check, Download, AlertCircle, X, Calendar, Search, 
  ExternalLink, RefreshCw, CheckSquare, Sparkles, Zap, Inbox
} from 'lucide-react';
import { DataGrid } from 'react-data-grid';

export interface OdooRow {
  id: string;
  rawId?: number;
  odooDate: string;
  approvalSubject: string;
  subject: string;
  requestOwner: string;
  category?: string;
  webUrl?: string;
  
  // Editable fields
  department: string;
  dept1: string;
  dept2: string;
  dept3: string;
  letterType: string;
  responseDate: string; // YYYY-MM-DD string
  sender: string; // for Incoming
  
  // Destinations
  isReceived: boolean;
  isSent: boolean;
  isIncoming: boolean;
}

interface Props {
  onApply: (receivedRows: any[], sentRows: any[], incomingRows: any[]) => void;
  existingOptions?: Record<string, Record<string, string[]>>;
  existingRefCodes?: string[];
}

const DEFAULT_HTS_DEPT = 'گەنجینەی ئۆفیسی سلێمانی - HTS';

const isMRForPRF = (ref: string): boolean => {
  if (!ref) return false;
  const clean = ref.trim().toUpperCase();
  return clean.startsWith('MRF') || clean.startsWith('PRF');
};

const normalizeKurdishText = (str: string): string => {
  if (!str) return '';
  return str
    .trim()
    .replace(/ي/g, 'ی')
    .replace(/ى/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ە')
    .replace(/\s+/g, ' ');
};

const isMohammedOrKamaran = (name: string): boolean => {
  if (!name) return false;
  const n = normalizeKurdishText(name);
  return (
    n.includes('محمد اقبال') ||
    n.includes('کامەران احمد') ||
    n.includes('كامەران احمد') ||
    n.includes('mohammed iqbal') ||
    n.includes('kamaran')
  );
};

const OWNER_DEPARTMENT_MAP: Record<string, string> = {
  // Group 2: سەرجەم کارگە و کۆمپانیا و پڕۆژەکان
  'پشتیوان جلال حمەصالح': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'سەرخێڵ سامان غريب': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'سەرخێڵ سامان غریب': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'اریان عبدالکریم سعید': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'ئاریان عبدالکریم سعید': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'ئاری عبدول علی': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'ئایرین غلام رەزا حسن': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'ئاکام کمال غفور': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'امجد محمود حمەرشيد': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',
  'ئەمجەد مەحمود حەمەڕەشید': 'سەرجەم کارگە و کۆمپانیا و پڕۆژەکان',

  // Group 3: Specific locations
  'محمد قادر صالح': 'HTS - ئۆفیسی کەرکوک',
  'سامان وەهاب شیخ محمد': 'بەشی کارگێری گروپی هەڵەبجە ئۆفیسی سەرەکی',

  // Group 1 & 4: HTS - ئۆفیسی سەرەکی
  'هاوڕێ شریف رشید': 'HTS - ئۆفیسی سەرەکی',
  'شیرکو نوزاد احمد': 'HTS - ئۆفیسی سەرەکی',
  'بنار بختيار قادر': 'HTS - ئۆفیسی سەرەکی',
  'بنار بەختیار قادر': 'HTS - ئۆفیسی سەرەکی',
  'ئاکار عبداللە محمد': 'HTS - ئۆفیسی سەرەکی',
  'ئاکار عبدالله محمد': 'HTS - ئۆفیسی سەرەکی',
  'مصطفى مردان محمد': 'HTS - ئۆفیسی سەرەکی',
  'مصطفی مردان محمد': 'HTS - ئۆفیسی سەرەکی',
  'مصطفی عثمان محمد': 'HTS - ئۆفیسی سەرەکی',
  'مصطفى عثمان محمد': 'HTS - ئۆفیسی سەرەکی',
  'عمار طالب جاسم': 'HTS - ئۆفیسی سەرەکی',
  'نما نەبەز مصطفی': 'HTS - ئۆفیسی سەرەکی',
  'نما نەبەز مصطفى': 'HTS - ئۆفیسی سەرەکی',
  'چێنەر غفور مجید': 'HTS - ئۆفیسی سەرەکی',
  'ئاسان ماجد عارف': 'HTS - ئۆفیسی سەرەکی',
  'بهمن عثمان حمە صالح': 'HTS - ئۆفیسی سەرەکی',
  'هەرێم علی محمد': 'HTS - ئۆفیسی سەرەکی',
  'هاوکار جوامێر رشید': 'HTS - ئۆفیسی سەرەکی',
  'کۆژین عبدالسلام سعید': 'HTS - ئۆفیسی سەرەکی',
  'ایوب شریف حمەامین': 'HTS - ئۆفیسی سەرەکی',
  'ئەیوب شەریف حەمەئەمین': 'HTS - ئۆفیسی سەرەکی',
  'سالار حسین قادر': 'HTS - ئۆفیسی سەرەکی',
  'سرود سامان عبدالمجید': 'HTS - ئۆفیسی سەرەکی',
  'ڕێبوار صلاح الدین فاتح': 'HTS - ئۆفیسی سەرەکی',
  'هەرێز هوشیار عمر': 'HTS - ئۆفیسی سەرەکی',
};

const resolveIncomingDepartment = (ownerName: string): string => {
  if (!ownerName) return 'HTS - ئۆفیسی سەرەکی';
  const norm = normalizeKurdishText(ownerName);
  
  for (const [key, dept] of Object.entries(OWNER_DEPARTMENT_MAP)) {
    if (normalizeKurdishText(key) === norm) {
      return dept;
    }
  }

  for (const [key, dept] of Object.entries(OWNER_DEPARTMENT_MAP)) {
    const normKey = normalizeKurdishText(key);
    if (norm.includes(normKey) || normKey.includes(norm)) {
      return dept;
    }
  }

  return 'HTS - ئۆفیسی سەرەکی';
};

export const autoDetectLetterType = (item: { approvalSubject?: string; subject?: string; category?: string }): string => {
  const refCode = (item.approvalSubject || '').trim();
  const subject = (item.subject || '').trim();
  const category = (item.category || '').trim();

  // 1. Check RefCode patterns
  if (/^MRF(\/|-|$)/i.test(refCode)) return 'MRF - HQ';
  if (/^PRF\/IT\//i.test(refCode)) return 'IT PRF';
  if (/^PRF\/Machine\//i.test(refCode)) return 'Machines PRF';
  if (/^PRF\/Tech\//i.test(refCode)) return 'Technical PRF';
  if (/^PRF(\/|-|$)/i.test(refCode)) return 'PRF - HQ';
  if (/^Candidate\//i.test(refCode)) return 'داواکاری کاندیدکردن';
  if (/^HR\/HTS-HQ\/Reward-Penalty\//i.test(refCode)) return 'داواکاری پاداشت و سزا';
  if (/^HR\/HTS-HQ\/Resignation\//i.test(refCode)) return 'دەستلەکارکێشانەوە';
  if (/^HR\/HTS-HQ\/Leave\//i.test(refCode)) return 'داواکاری مۆڵەت';

  // 2. Check Odoo Category
  if (category.includes('پاداشت و سزا') || /reward-penalty/i.test(category)) return 'داواکاری پاداشت و سزا';
  if (category.includes('سلفە') || category.includes('سلفة')) return 'داواکاری سلفە';
  if (category.includes('مۆڵەت') || category.includes('اجاز') || category.includes('إجاز')) return 'داواکاری مۆڵەت';
  if (category.includes('کاندید') || category.includes('دامەزراندن')) return 'داواکاری کاندیدکردن';
  if (category.includes('دەست بەکاربوون') || category.includes('دەستبەکاربوون')) return 'داواکاری دەست بەکاربوونی کارمەند';
  if (category.includes('جێگیرکردن')) return 'داواکاری جێگیرکردنی کارمەند';
  if (category.includes('لەکارترازان')) return 'داواکاری لەکارترازانی کارمەند';
  if (category.includes('دەست لەکارکێشانەوە') || category.includes('دەستلەکارکێشانەوە') || category.includes('استقال')) return 'دەستلەکارکێشانەوە';

  // 3. Check Subject keywords
  if (/سلفە|سلفة/i.test(subject)) return 'داواکاری سلفە';
  if (/پاداشت|سزا|سزادان|ئاگادارکردنەوە و سزا|عقوبة|مكافأ|مكافا/i.test(subject)) return 'داواکاری پاداشت و سزا';
  if (/مۆڵەت|مۆڵەتی|اجازة|إجازة|اجازه|إجازه/i.test(subject)) return 'داواکاری مۆڵەت';
  if (/دەست لەکارکێشانەوە|دەستلەکارکێشانەوە|استقالة|استقاله|ئەستۆپاکی/i.test(subject)) return 'دەستلەکارکێشانەوە';
  if (/کاندید|دامەزراندن|دامەزراندنی|تعيين|ترشيح/i.test(subject)) return 'داواکاری کاندیدکردن';
  if (/جێگیرکردن|جێگیرکردنی|تثبيت/i.test(subject)) return 'داواکاری جێگیرکردنی کارمەند';
  if (/دەست بەکاربوون|دەستبەکاربوون|مباشرة|مباشره/i.test(subject)) return 'داواکاری دەست بەکاربوونی کارمەند';
  if (/لەکارترازان|لەکارترازانی|انفكاك/i.test(subject)) return 'داواکاری لەکارترازانی کارمەند';
  if (/پۆست/i.test(subject) && /مووچە|موچە|راتب/i.test(subject)) return 'گۆرانکاری پۆست و موچە';
  if (/گۆڕانکاری پۆست|گۆڕینی پۆست|ڕێکخستنی پۆست|تعديل منصب/i.test(subject)) return 'داواکاری ڕێکخستنی پۆست';
  if (/مووچە|موچە|راتب/i.test(subject)) return 'گۆرانکاری موچە';
  if (/ڕاژە|خدم/i.test(subject)) {
    if (/گواستنەوە/i.test(subject)) return 'گواستنەوەی ڕاژە';
    return 'داواکاری زیاد کردنی ڕاژە';
  }
  if (/نوێکردنەوەی گرێبەست|تجديد عقد/i.test(subject)) return 'داواکاریی نوێکردنەوەی گرێبەست';
  if (/جەرد|گەنجینە/i.test(subject)) return 'ڕاپۆرتی سەردانیی و جەردی گەنجینە';
  if (/سەردان/i.test(subject)) return 'ڕاپۆرتی سەردانیکردن';
  if (/وەڵامدانەوە|وەڵامی نووسراو|وەڵامی نوسراو|اجابة|رد كتاب/i.test(subject)) return 'وەڵامدانەوەی نووسراو';
  if (/هاوکاری|هاوسەرگیری|مساعد|زواج/i.test(subject)) return 'داواکاریی هاوکاری';
  if (/فرۆشتنەوە|لەکارکەوتوو|لەکار کەوتوو/i.test(subject)) return 'HQ فۆرمی فرۆشتنەوە کەرەستەی لەکارکەوتوو';
  if (/ناپێویست|ناپێوست/i.test(subject)) return 'HQ فۆرمی فرۆشتنەوە کەرەستەی ناپێوست';
  if (/scrap|سکراب/i.test(subject)) return 'Scrap';

  // 4. Default: Standard General Letter (not bare 'نوسراو')
  return 'نامەی گشتی';
};

const DateFormatter = (props: any) => {
  const val = props.row[props.column.key];
  if (!val) return null;
  const str = String(val).split('T')[0];
  return (
    <div className="flex items-center h-full px-2">
      <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
        {str}
      </span>
    </div>
  );
};

const RefCodeFormatter = (props: any) => {
  const { row } = props;
  const code = row.approvalSubject || '-';
  const url = row.webUrl || (row.rawId ? `https://erp.halabjagroup.com/web#id=${row.rawId}&model=approval.request&view_type=form` : null);
  const isMRF_PRF = isMRForPRF(code);

  return (
    <div className="flex items-center justify-between h-full px-2 gap-1 group">
      <div className="flex items-center gap-1.5 truncate">
        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 truncate" title={code}>
          {code}
        </span>
        {isMRF_PRF && (
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-300 dark:border-emerald-800 shrink-0">
            MRF/PRF
          </span>
        )}
      </div>
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="opacity-0 group-hover:opacity-100 p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-opacity"
          title="کردنەوە لە ناو Odoo"
        >
          <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
};

const BooleanFormatter = (props: any) => {
  const isChecked = Boolean(props.row[props.column.key]);
  let accentClass = "accent-blue-600 focus:ring-blue-500";
  if (props.column.key === 'isSent') accentClass = "accent-emerald-600 focus:ring-emerald-500";
  if (props.column.key === 'isIncoming') accentClass = "accent-violet-600 focus:ring-violet-500";

  return (
    <div className="flex items-center justify-center h-full">
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={(e) => {
          const nextChecked = e.target.checked;
          const updated = { ...props.row, [props.column.key]: nextChecked };
          if (props.column.key === 'isReceived') {
            if (nextChecked) {
              // Always auto-check "ڕەوانەکراوەکان" when "پێویست بە وەڵام" is checked
              // Keep responseDate empty so it can remain an ongoing uncompleted letter
              updated.isSent = true;
            }
          }
          if (props.column.key === 'isSent' && !nextChecked && updated.isReceived) {
            // If user unchecks "ڕەوانەکراوەکان", also uncheck "پێویست بە وەڵام"
            updated.isReceived = false;
          }
          props.onRowChange(updated);
        }}
        className={`w-4 h-4 rounded cursor-pointer transition-transform hover:scale-110 ${accentClass}`}
      />
    </div>
  );
};

const ResponseDateCell = (props: any) => {
  const { row, onRowChange } = props;
  const isEnabled = Boolean(row.isReceived);

  if (!isEnabled) {
    return (
      <div className="w-full h-full bg-slate-100/60 dark:bg-slate-800/40 flex items-center justify-center text-slate-300 dark:text-slate-600 select-none">
        <span className="text-sm font-mono">-</span>
      </div>
    );
  }

  const val = row.responseDate ? (typeof row.responseDate === 'string' ? row.responseDate.split('T')[0] : new Date(row.responseDate).toISOString().split('T')[0]) : '';

  return (
    <div 
      className="w-full h-full flex items-center justify-center px-1.5"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <input 
        type="date"
        value={val}
        onChange={(e) => {
          onRowChange({ ...row, responseDate: e.target.value });
        }}
        className={`w-full py-1 px-2 text-xs font-mono font-medium rounded-lg border transition-all outline-none cursor-pointer text-center ${
          val 
            ? 'bg-blue-50/90 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 border-blue-300 dark:border-blue-700 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
            : 'bg-slate-50 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 hover:border-blue-400 focus:border-blue-500'
        }`}
        title={val ? `ڕۆژی وەڵام: ${val}` : "وەڵام نەدراوەتەوە (ئارەزوومەندانە)"}
      />
    </div>
  );
};

const ResponseDateEditor = (props: any) => {
  const { row, onRowChange, onClose } = props;
  if (!row.isReceived) {
    return (
      <input 
        autoFocus
        disabled
        className="w-full h-full bg-slate-100 dark:bg-slate-800 px-2 cursor-not-allowed text-center text-slate-400"
        value="-"
        readOnly
        onBlur={() => onClose(true)}
      />
    );
  }

  const val = row.responseDate ? (typeof row.responseDate === 'string' ? row.responseDate.split('T')[0] : new Date(row.responseDate).toISOString().split('T')[0]) : '';

  return (
    <div className="w-full h-full p-0.5 flex items-center justify-center bg-white dark:bg-slate-800" dir="ltr">
      <input 
        type="date"
        autoFocus
        value={val}
        onChange={(e) => {
          onRowChange({ ...row, responseDate: e.target.value });
        }}
        onBlur={() => onClose(true)}
        className="w-full h-full px-2 text-xs font-mono rounded border-2 border-blue-500 outline-none text-center bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 cursor-pointer"
      />
    </div>
  );
};

const EditableCellFormatter = (props: any) => {
  const { column, row } = props;
  const isAnySelected = row.isReceived || row.isSent || row.isIncoming;
  
  let isDisabled = !isAnySelected;
  if (column.key === 'sender') isDisabled = !row.isIncoming;

  if (isDisabled) {
    return (
      <div className="w-full h-full bg-slate-100/60 dark:bg-slate-800/40 flex items-center justify-center text-slate-300 dark:text-slate-600 select-none">
        <span className="text-sm font-mono">-</span>
      </div>
    );
  }
  
  const val = row[column.key] || '';
  const isDepartmentMissing = isAnySelected && column.key === 'department' && !val;

  return (
    <div className={`px-2 h-full flex items-center truncate ${isDepartmentMissing ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 font-medium' : ''}`}>
      {val ? (
        <span className="truncate" title={val}>{val}</span>
      ) : isDepartmentMissing ? (
        <span className="text-xs opacity-75 italic flex items-center gap-1">
          <AlertCircle size={12} className="shrink-0" />
          لایەن دیاری بکە
        </span>
      ) : (
        <span className="text-slate-300 dark:text-slate-600 text-xs">کلیک بکە بۆ نووسین...</span>
      )}
    </div>
  );
};

const EditableTextEditor = (props: any) => {
  const { column, row } = props;
  const isAnySelected = row.isReceived || row.isSent || row.isIncoming;
  
  let isDisabled = !isAnySelected;
  if (column.key === 'sender') isDisabled = !row.isIncoming;

  if (isDisabled) {
    return (
      <input 
        autoFocus
        disabled
        className="w-full h-full bg-slate-100 dark:bg-slate-800 px-2 cursor-not-allowed text-center text-slate-400"
        value="-"
        readOnly
        onBlur={() => props.onClose(true)}
      />
    );
  }
  const listId = `datalist-staging-${column.key}`;
  const optionsData = column.optionsData || {};
  let options: string[] = [];
  
  if (optionsData) {
    const optsSet = new Set<string>();
    if (row.isReceived && optionsData.received) {
      optionsData.received[column.key]?.forEach((opt: string) => optsSet.add(opt));
    }
    if (row.isSent && optionsData.sent) {
      optionsData.sent[column.key]?.forEach((opt: string) => optsSet.add(opt));
    }
    if (row.isIncoming && optionsData.incoming) {
      optionsData.incoming[column.key]?.forEach((opt: string) => optsSet.add(opt));
    }
    options = Array.from(optsSet);
  }

  // Ensure default departments are in datalist options
  if (column.key === 'department') {
    if (!options.includes(DEFAULT_HTS_DEPT)) options.unshift(DEFAULT_HTS_DEPT);
    if (!options.includes('HTS - ئۆفیسی سەرەکی')) options.unshift('HTS - ئۆفیسی سەرەکی');
    if (!options.includes('سەرجەم کارگە و کۆمپانیا و پڕۆژەکان')) options.push('سەرجەم کارگە و کۆمپانیا و پڕۆژەکان');
  }

  return (
    <div className="w-full h-full relative">
      <input 
        autoFocus
        className="rdg-text-editor w-full h-full px-2 outline-none border-2 border-blue-500 focus:border-blue-600 bg-white dark:bg-slate-800 dark:text-slate-100 text-sm shadow-inner"
        value={row[column.key] as string || ''}
        list={listId}
        onChange={(e) => props.onRowChange({ ...row, [column.key]: e.target.value })}
        onBlur={() => props.onClose(true)}
      />
      {options.length > 0 && (
        <datalist id={listId}>
          {options.map((opt: string) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
      )}
    </div>
  );
};

export const OdooStagingArea = ({ onApply, existingOptions, existingRefCodes }: Props) => {
  // Date period helper defaults
  const getInitialStartDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 10);
    return d.toISOString().split('T')[0];
  };
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(getInitialStartDate());
  const [endDate, setEndDate] = useState<string>(getTodayDate());
  const [activePreset, setActivePreset] = useState<string>('10d');

  const [rows, setRows] = useState<OdooRow[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'received' | 'sent' | 'incoming' | 'unassigned' | 'incomplete'>('all');

  // Quick bulk fill states
  const [bulkDept, setBulkDept] = useState('');
  const [bulkLetterType, setBulkLetterType] = useState('');
  const [bulkResponseDate, setBulkResponseDate] = useState(getTodayDate());

  // Date Presets Handler
  const handlePreset = (preset: string) => {
    setActivePreset(preset);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setEndDate(todayStr);

    if (preset === 'today') {
      setStartDate(todayStr);
    } else if (preset === '7d') {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      setStartDate(d.toISOString().split('T')[0]);
    } else if (preset === '10d') {
      const d = new Date();
      d.setDate(d.getDate() - 10);
      setStartDate(d.toISOString().split('T')[0]);
    } else if (preset === '30d') {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      setStartDate(d.toISOString().split('T')[0]);
    } else if (preset === 'thisMonth') {
      const d = new Date(today.getFullYear(), today.getMonth(), 1);
      setStartDate(d.toISOString().split('T')[0]);
    } else if (preset === 'lastMonth') {
      const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const last = new Date(today.getFullYear(), today.getMonth(), 0);
      setStartDate(first.toISOString().split('T')[0]);
      setEndDate(last.toISOString().split('T')[0]);
    }
  };

  const columns = [
    // Read-only Odoo data
    { key: 'odooDate', name: 'بەرواری Odoo', width: 110, renderCell: DateFormatter },
    { key: 'approvalSubject', name: 'کۆدی داواکاری (Ref Code)', width: 180, renderCell: RefCodeFormatter },
    { key: 'subject', name: 'بابەتی داواکاری (Subject)', width: 260 },
    { key: 'requestOwner', name: 'داواکار (Owner)', width: 160 },
    
    // Checkboxes for destinations
    { key: 'isReceived', name: '+ پێویست بە وەڵام', width: 125, renderCell: BooleanFormatter },
    { key: 'isSent', name: '+ ڕەوانەکراوەکان', width: 115, renderCell: BooleanFormatter },
    { key: 'isIncoming', name: '+ هاتووەکان', width: 105, renderCell: BooleanFormatter },

    // Editable missing fields
    { key: 'sender', name: 'هاتووە لە (Incoming)', width: 160, renderCell: EditableCellFormatter, renderEditCell: EditableTextEditor, optionsData: existingOptions },
    { key: 'department', name: 'لایەنی پەیوەندیدار', width: 220, renderCell: EditableCellFormatter, renderEditCell: EditableTextEditor, optionsData: existingOptions },
    { key: 'dept1', name: 'بەشی ١', width: 110, renderCell: EditableCellFormatter, renderEditCell: EditableTextEditor, optionsData: existingOptions },
    { key: 'dept2', name: 'بەشی ٢', width: 110, renderCell: EditableCellFormatter, renderEditCell: EditableTextEditor, optionsData: existingOptions },
    { key: 'dept3', name: 'بەشی ٣', width: 110, renderCell: EditableCellFormatter, renderEditCell: EditableTextEditor, optionsData: existingOptions },
    { key: 'letterType', name: 'جۆری نامە', width: 120, renderCell: EditableCellFormatter, renderEditCell: EditableTextEditor, optionsData: existingOptions },
    { key: 'responseDate', name: 'ڕۆژی وەڵام', width: 145, renderCell: ResponseDateCell, renderEditCell: ResponseDateEditor },
  ];

  const fetchOdooData = async () => {
    setIsFetching(true);
    try {
      const url = `/api/odoo/fetch?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        // Filter out records that already exist in the database (by id or refCode)
        const filteredData = (json.data || []).filter((item: any) => {
          return !existingRefCodes?.includes(item.approvalSubject) && !existingRefCodes?.includes(item.id);
        });

        // Dynamic smart mapping:
        // Rule 1: MRF and PRF -> isSent = true, department = 'گەنجینەی ئۆفیسی سلێمانی - HTS'
        // Rule 2: Owner not Mohammed Iqbal or Kamaran Ahmad -> isIncoming = true, sender = owner, department = auto-mapped from previous data
        const initialRows: OdooRow[] = filteredData.map((item: any) => {
          const isMRF_PRF = isMRForPRF(item.approvalSubject);
          const owner = (item.requestOwner || '').trim();
          const isIncomingOwner = !isMRF_PRF && owner && !isMohammedOrKamaran(owner);

          let isSent = false;
          let isIncoming = false;
          let department = '';
          let sender = item.requestOwner || '';

          if (isMRF_PRF) {
            isSent = true;
            department = DEFAULT_HTS_DEPT;
          } else if (isIncomingOwner) {
            isIncoming = true;
            sender = owner;
            department = resolveIncomingDepartment(owner);
          }

          return {
            ...item,
            department,
            dept1: '',
            dept2: '',
            dept3: '',
            letterType: autoDetectLetterType(item),
            responseDate: '',
            sender,
            isReceived: false,
            isSent,
            isIncoming
          };
        });
        
        if (filteredData.length < (json.data?.length || 0) && filteredData.length === 0) {
          alert(`هەموو ئەو ${json.data.length} داواکارییەی لەم مەودای بەروارەدا هەبوون پێشتر لە داتابەیسدا تۆمارکراون.`);
        }
        
        setRows(initialRows);
        setHasFetched(true);
      } else {
        alert(json.error || "هەڵە ڕوویدا لە کاتی پەیوەندیکردن بە سێرڤەری Odoo");
      }
    } catch (e: any) {
      alert("هەڵە: " + (e.message || "نەتوانرا پەیوەندی بە سێرڤەرەوە ببەسترێت"));
    } finally {
      setIsFetching(false);
    }
  };

  // Filtered rows for real-time search & destination filter
  const displayedRows = useMemo(() => {
    return rows.filter(row => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSubject = (row.subject || '').toLowerCase().includes(q);
        const matchRef = (row.approvalSubject || '').toLowerCase().includes(q);
        const matchOwner = (row.requestOwner || '').toLowerCase().includes(q);
        const matchDept = (row.department || '').toLowerCase().includes(q);
        if (!matchSubject && !matchRef && !matchOwner && !matchDept) return false;
      }

      // Tab filter
      if (filterType === 'received') return row.isReceived;
      if (filterType === 'sent') return row.isSent || row.isReceived;
      if (filterType === 'incoming') return row.isIncoming;
      if (filterType === 'unassigned') return !row.isReceived && !row.isSent && !row.isIncoming;
      if (filterType === 'incomplete') {
        const isSelected = row.isReceived || row.isSent || row.isIncoming;
        return isSelected && !row.department;
      }

      return true;
    });
  }, [rows, searchQuery, filterType]);

  // Statistics counters
  const countTotal = rows.length;
  const countReceived = rows.filter(r => r.isReceived).length;
  const countSent = rows.filter(r => r.isSent || r.isReceived).length;
  const countIncoming = rows.filter(r => r.isIncoming).length;
  const countUnassigned = rows.filter(r => !r.isReceived && !r.isSent && !r.isIncoming).length;
  const countIncomplete = rows.filter(r => (r.isReceived || r.isSent || r.isIncoming) && !r.department).length;
  const totalSelectedRows = rows.filter(r => r.isReceived || r.isSent || r.isIncoming).length;

  // Batch Selection Helpers
  const toggleAllAs = (field: 'isReceived' | 'isSent' | 'isIncoming') => {
    const displayedIds = new Set(displayedRows.map(r => r.id));
    const allCurrentlyChecked = displayedRows.every(r => r[field]);
    setRows(prev => prev.map(r => {
      if (displayedIds.has(r.id)) {
        const nextVal = !allCurrentlyChecked;
        const updated = { ...r, [field]: nextVal };
        if (field === 'isReceived' && nextVal) {
          // Keep responseDate empty so it can remain an ongoing uncompleted letter
          updated.isSent = true;
        }
        return updated;
      }
      return r;
    }));
  };

  const clearAllSelections = () => {
    const displayedIds = new Set(displayedRows.map(r => r.id));
    setRows(prev => prev.map(r => {
      if (displayedIds.has(r.id)) {
        return { ...r, isReceived: false, isSent: false, isIncoming: false };
      }
      return r;
    }));
  };

  // Re-apply automatic MRF / PRF rule
  const applyMRF_PRF_Rule = () => {
    setRows(prev => prev.map(r => {
      if (isMRForPRF(r.approvalSubject)) {
        return {
          ...r,
          isSent: true,
          department: DEFAULT_HTS_DEPT,
          letterType: (r.letterType && r.letterType !== 'نوسراو') ? r.letterType : autoDetectLetterType(r),
        };
      }
      return r;
    }));
  };

  // Re-apply automatic Incoming rule for non-Mohammed/Kamaran owners
  const applyAutoIncomingRule = () => {
    setRows(prev => prev.map(r => {
      const owner = (r.requestOwner || '').trim();
      if (owner && !isMohammedOrKamaran(owner) && !isMRForPRF(r.approvalSubject)) {
        return {
          ...r,
          isIncoming: true,
          sender: owner,
          department: resolveIncomingDepartment(owner),
          letterType: (r.letterType && r.letterType !== 'نوسراو') ? r.letterType : autoDetectLetterType(r),
        };
      }
      return r;
    }));
  };

  // Bulk Field Fillers
  const handleBulkDepartmentApply = () => {
    if (!bulkDept.trim()) return;
    const displayedIds = new Set(displayedRows.map(r => r.id));
    setRows(prev => prev.map(r => {
      if (displayedIds.has(r.id) && (r.isReceived || r.isSent || r.isIncoming)) {
        return { ...r, department: bulkDept.trim() };
      }
      return r;
    }));
  };

  const handleBulkLetterTypeApply = () => {
    if (!bulkLetterType.trim()) return;
    const displayedIds = new Set(displayedRows.map(r => r.id));
    setRows(prev => prev.map(r => {
      if (displayedIds.has(r.id) && (r.isReceived || r.isSent || r.isIncoming)) {
        return { ...r, letterType: bulkLetterType.trim() };
      }
      return r;
    }));
  };

  const handleBulkResponseDateApply = () => {
    if (!bulkResponseDate) return;
    const displayedIds = new Set(displayedRows.map(r => r.id));
    setRows(prev => prev.map(r => {
      if (displayedIds.has(r.id) && r.isReceived) {
        return { ...r, responseDate: bulkResponseDate };
      }
      return r;
    }));
  };

  // Department options from existing data
  const departmentOptions = useMemo(() => {
    const s = new Set<string>();
    s.add(DEFAULT_HTS_DEPT);
    s.add('HTS - ئۆفیسی سەرەکی');
    s.add('سەرجەم کارگە و کۆمپانیا و پڕۆژەکان');
    s.add('HTS - ئۆفیسی کەرکوک');
    s.add('بەشی کارگێری گروپی هەڵەبجە ئۆفیسی سەرەکی');

    if (existingOptions) {
      Object.values(existingOptions).forEach(optGroup => {
        optGroup.department?.forEach(d => s.add(d));
      });
    }
    return Array.from(s).sort();
  }, [existingOptions]);

  const letterTypeOptions = useMemo(() => {
    const s = new Set<string>();
    if (existingOptions) {
      Object.values(existingOptions).forEach(optGroup => {
        optGroup.letterType?.forEach(t => s.add(t));
      });
    }
    return Array.from(s).sort();
  }, [existingOptions]);

  const handleApply = () => {
    const receivedToApply: any[] = [];
    const sentToApply: any[] = [];
    const incomingToApply: any[] = [];

    const generateId = () => -Math.floor(Math.random() * 1000000);

    for (const row of rows) {
      const resolvedLetterType = (row.letterType && row.letterType !== 'نوسراو') ? row.letterType : autoDetectLetterType(row);
      
      if (row.isReceived) {
        const finalResponseDate = row.responseDate && !isNaN(new Date(row.responseDate).getTime())
          ? new Date(row.responseDate)
          : null;
        receivedToApply.push({
          id: generateId(),
          subject: row.subject,
          department: row.department || 'گشتی',
          dept1: row.dept1 || null,
          dept2: row.dept2 || null,
          dept3: row.dept3 || null,
          refCode: row.approvalSubject,
          letterType: resolvedLetterType,
          sentDate: new Date(row.odooDate),
          responseDate: finalResponseDate,
          processingTime: null,
          slaTime: '-'
        });
      }
      
      // Both isSent OR isReceived are recorded to sentToApply (ڕەوانەکراوەکان)
      if (row.isSent || row.isReceived) {
        sentToApply.push({
          id: generateId(),
          subject: row.subject,
          department: row.department || 'گشتی',
          dept1: row.dept1 || null,
          dept2: row.dept2 || null,
          dept3: row.dept3 || null,
          refCode: row.approvalSubject,
          letterType: resolvedLetterType,
          sentDate: new Date(row.odooDate),
        });
      }

      if (row.isIncoming) {
        incomingToApply.push({
          id: generateId(),
          subject: row.subject,
          sender: row.sender || row.requestOwner || 'نەزانراو',
          department: row.department || 'گشتی',
          dept1: row.dept1 || null,
          dept2: row.dept2 || null,
          dept3: row.dept3 || null,
          refCode: row.approvalSubject,
          letterType: resolvedLetterType,
          sentDate: new Date(row.odooDate),
        });
      }
    }

    if (receivedToApply.length === 0 && sentToApply.length === 0 && incomingToApply.length === 0) {
      alert("هیچ دێڕێک هەڵنەبژێردراوە! تکایە لانی کەم یەک خشتەی مەبەست دیاری بکە (+ پێویست بە وەڵام، + ڕەوانەکراو، یان + هاتووەکان).");
      return;
    }

    if (countIncomplete > 0) {
      const confirmContinue = window.confirm(
        `ئاگاداری: ${countIncomplete} لە دێڕە هەڵبژێردراوەکان خانەی 'لایەنی پەیوەندیدار'ـیان بەتاڵە و بە 'گشتی' پڕدەکرێتەوە.\nئایا دەتەوێت بەردەوام بیت؟`
      );
      if (!confirmContinue) return;
    }

    onApply(receivedToApply, sentToApply, incomingToApply);
    
    // Clear applied rows from current staging table
    setRows(prev => prev.filter(r => !r.isReceived && !r.isSent && !r.isIncoming));
  };

  // 1. Initial State: Date Picker & Launch Screen
  if (!hasFetched) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-linear-to-b from-slate-50 to-slate-100/70 dark:from-slate-900/60 dark:to-slate-950/80 overflow-y-auto" dir="rtl">
        <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-8 transition-all">
          
          {/* Header & Status */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
                <Cloud size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  بەستنەوە و دەرهێنانی داتا لە Odoo
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    پەیوەستە (Connected)
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ERP Halabja Group &bull; مۆدیۆلی داواکارییەکان (Approval Requests)
                </p>
              </div>
            </div>
          </div>

          {/* Date Period Section */}
          <div className="space-y-4 mb-7">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />
                دیاریکردنی ماوەی بەروار (Date Period):
              </label>
              <span className="text-xs text-slate-400">دەتوانیت هەر مەودایەک دەتەوێت دەستنیشانی بکەیت</span>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { id: 'today', label: 'ئەمڕۆ' },
                { id: '7d', label: '٧ ڕۆژ' },
                { id: '10d', label: '١٠ ڕۆژ' },
                { id: '30d', label: '٣٠ ڕۆژ' },
                { id: 'thisMonth', label: 'ئەم مانگە' },
                { id: 'lastMonth', label: 'مانگی پێشوو' },
              ].map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePreset(preset.id)}
                  className={`py-2 px-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    activePreset === preset.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Date Inputs: From & To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  لە بەرواری (From Date):
                </label>
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full bg-transparent font-mono font-medium text-slate-800 dark:text-slate-100 outline-none text-sm cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  تا بەرواری (To Date):
                </label>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full bg-transparent font-mono font-medium text-slate-800 dark:text-slate-100 outline-none text-sm cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Smart Auto Rules Tip Box */}
          <div className="bg-linear-to-r from-emerald-50 to-indigo-50/60 dark:from-emerald-950/20 dark:to-indigo-950/20 border border-emerald-200/80 dark:border-emerald-900/50 rounded-2xl p-4 mb-7 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
              <Zap size={16} className="text-emerald-600" />
              <span>یاسا خودکارە پێشکەوتووەکانی ڕاکێشانی داتا:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pr-1">
              <li>داواکارییەکانی <strong>MRF و PRF</strong> خۆکارانە بۆ <strong>ڕەوانەکراوەکان</strong> و لایەنی <strong>{DEFAULT_HTS_DEPT}</strong> دادەنرێن.</li>
              <li>داواکاری کارمەندانی تر خۆکارانە بۆ <strong>هاتووەکان</strong> دیاری دەکرێن و لایەنی پەیوەندیداریان بەپێی پێشینەی کارەکانیان پڕدەکرێتەوە.</li>
            </ul>
          </div>

          {/* Action Button */}
          <button 
            type="button"
            onClick={fetchOdooData}
            disabled={isFetching || !startDate || !endDate}
            className="w-full py-4 px-6 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 text-base cursor-pointer transform active:scale-[0.99]"
          >
            {isFetching ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>خەریکی پەیوەستبوون و ڕاکێشانی داتا لە Odoo...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>ڕاکێشانی داتاکانی ئەم ماوەیە (Fetch Records)</span>
              </>
            )}
          </button>

        </div>
      </div>
    );
  }

  // 2. Active Staging Grid View
  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950" dir="rtl">
      
      {/* Top Controls & Navigation Bar */}
      <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-3 shrink-0 shadow-2xs">
        
        {/* Row 1: Search, Filter Tabs & Date Range Display */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Active Period & Re-fetch button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200/80 dark:border-slate-700">
              <Calendar size={14} className="text-blue-500" />
              <span className="font-mono">{startDate}</span>
              <span className="text-slate-400">تا</span>
              <span className="font-mono">{endDate}</span>
            </div>

            <button
              onClick={() => setHasFetched(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-colors border border-blue-200 dark:border-blue-900/60 cursor-pointer"
              title="گۆڕینی بەروار و گەڕانەوە"
            >
              <RefreshCw size={13} />
              گۆڕینی بەروار
            </button>
          </div>

          {/* Real-time search bar */}
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="گەڕان بەپێی کۆد، بابەت، یان داواکار..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-1.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-850 focus:border-blue-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Quick Destination Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {[
              { id: 'all', label: 'هەموو', count: countTotal, color: 'text-slate-700 dark:text-slate-300' },
              { id: 'received', label: 'پێویست بە وەڵام', count: countReceived, color: 'text-blue-600 dark:text-blue-400' },
              { id: 'sent', label: 'ڕەوانەکراو', count: countSent, color: 'text-emerald-600 dark:text-emerald-400' },
              { id: 'incoming', label: 'هاتووەکان', count: countIncoming, color: 'text-violet-600 dark:text-violet-400' },
              { id: 'unassigned', label: 'دەستنیشاننەکراو', count: countUnassigned, color: 'text-slate-500' },
              { id: 'incomplete', label: 'کەموکوڕ', count: countIncomplete, color: 'text-amber-600 dark:text-amber-400' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  filterType === tab.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-750 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterType === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Row 2: Batch Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          
          {/* Checkbox Group Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-500 dark:text-slate-400 text-[11px]">کرداری بەکۆمەڵ:</span>
            
            <button
              onClick={() => toggleAllAs('isReceived')}
              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900/60 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckSquare size={13} />
              هەموو بۆ پێویست بە وەڵام
            </button>

            <button
              onClick={() => toggleAllAs('isSent')}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckSquare size={13} />
              هەموو بۆ ڕەوانەکراو
            </button>

            <button
              onClick={() => toggleAllAs('isIncoming')}
              className="px-2.5 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/40 dark:hover:bg-violet-900/50 text-violet-700 dark:text-violet-300 font-bold border border-violet-200 dark:border-violet-900/60 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckSquare size={13} />
              هەموو بۆ هاتووەکان
            </button>

            {/* Smart Auto MRF/PRF Button */}
            <button
              onClick={applyMRF_PRF_Rule}
              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800/80 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="جێبەجێکردنی ناسینەوەی MRF/PRF بۆ ڕەوانەکراوەکان"
            >
              <Zap size={13} className="text-amber-600 dark:text-amber-400" />
              MRF / PRF
            </button>

            {/* Smart Auto Incoming Rule Button */}
            <button
              onClick={applyAutoIncomingRule}
              className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold border border-purple-300 dark:border-purple-800/80 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="ناسینەوەی خۆکاری نامە هاتووەکان و پڕکردنەوەی لایەنی پەیوەندیدار بەپێی ناوی داواکار"
            >
              <Inbox size={13} className="text-purple-600 dark:text-purple-400" />
              ناسینەوەی هاتووەکان
            </button>

            <button
              onClick={clearAllSelections}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold transition-colors cursor-pointer"
            >
              لابردنی هەڵبژاردنەکان
            </button>
          </div>

          {/* Quick Bulk Field Filling */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 dark:text-slate-400 text-[11px]">پڕکردنەوەی خێرا:</span>
            
            {/* Bulk Department Selector */}
            <div className="flex items-center gap-1">
              <input 
                type="text"
                placeholder="لایەنی پەیوەندیدار..."
                value={bulkDept}
                onChange={(e) => setBulkDept(e.target.value)}
                list="bulk-dept-list"
                className="px-2 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none w-44"
              />
              <datalist id="bulk-dept-list">
                {departmentOptions.map(d => (
                  <option key={d} value={d} />
                ))}
              </datalist>
              <button
                onClick={handleBulkDepartmentApply}
                disabled={!bulkDept.trim() || totalSelectedRows === 0}
                className="px-2 py-1 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 disabled:opacity-40 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                title="دانانی ئەم لایەنە بۆ هەموو دێڕە هەڵبژێردراوەکان"
              >
                دانان
              </button>
            </div>

            {/* Bulk Letter Type Selector */}
            <div className="flex items-center gap-1">
              <input 
                type="text"
                placeholder="جۆری نامە..."
                value={bulkLetterType}
                onChange={(e) => setBulkLetterType(e.target.value)}
                list="bulk-type-list"
                className="px-2 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none w-28"
              />
              <datalist id="bulk-type-list">
                {letterTypeOptions.map(t => (
                  <option key={t} value={t} />
                ))}
              </datalist>
              <button
                onClick={handleBulkLetterTypeApply}
                disabled={!bulkLetterType.trim() || totalSelectedRows === 0}
                className="px-2 py-1 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 disabled:opacity-40 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                title="دانانی ئەم جۆرە بۆ هەموو دێڕە هەڵبژێردراوەکان"
              >
                دانان
              </button>
            </div>

            {/* Bulk Response Date Selector */}
            <div className="flex items-center gap-1 bg-blue-50/70 dark:bg-blue-950/40 px-2 py-0.5 rounded-lg border border-blue-200/80 dark:border-blue-900/50">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 whitespace-nowrap">ڕۆژی وەڵام:</span>
              <input 
                type="date"
                value={bulkResponseDate}
                onChange={(e) => setBulkResponseDate(e.target.value)}
                className="px-1.5 py-0.5 text-xs rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100 font-mono cursor-pointer"
              />
              <button
                onClick={handleBulkResponseDateApply}
                disabled={!bulkResponseDate || countReceived === 0}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-md text-[11px] font-bold cursor-pointer transition-colors"
                title="دانانی ئەم بەرواری وەڵامە بۆ هەموو دێڕە هەڵبژێردراوەکانی پێویست بە وەڵام"
              >
                دانان
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Main DataGrid Section */}
      <div className="flex-1 overflow-hidden p-2.5" dir="ltr">
        <DataGrid 
          columns={columns} 
          rows={displayedRows} 
          onRowsChange={(newDisplayedRows) => {
            // Merge changes back into the complete master rows list
            const map = new Map(newDisplayedRows.map(r => {
              if (r.isReceived && !r.isSent) {
                return [r.id, { ...r, isSent: true }];
              }
              return [r.id, r];
            }));
            setRows(prev => prev.map(r => {
              const updated = map.get(r.id);
              if (!updated) return r;
              if (updated.isReceived && !updated.isSent) {
                return { ...updated, isSent: true };
              }
              return updated;
            }));
          }}
          className="rdg-light h-full w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm text-sm"
        />
      </div>

      {/* Bottom Sticky Footer with Breakdown & Apply */}
      <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 shadow-lg shrink-0">
        
        {/* Statistics Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
          <span className="text-slate-500 dark:text-slate-400">کۆی هەڵبژێردراو:</span>
          <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
            {countReceived} پێویست بە وەڵام
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
            {countSent} ڕەوانەکراو
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300 border border-violet-200 dark:border-violet-900/60">
            {countIncoming} هاتووەکان
          </span>
          {countIncomplete > 0 && (
            <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60 flex items-center gap-1 animate-pulse">
              <AlertCircle size={13} />
              {countIncomplete} دێڕ بێ لایەنە
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => { setRows([]); setHasFetched(false); }}
            className="flex items-center gap-1.5 px-5 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-bold transition-colors text-xs cursor-pointer"
          >
            <X size={16} />
            پاشگەزبوونەوە (Cancel)
          </button>
          
          <button 
            type="button"
            onClick={handleApply}
            disabled={totalSelectedRows === 0}
            className="flex items-center gap-2 px-7 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm cursor-pointer transform active:scale-[0.98]"
          >
            <Check size={18} />
            جێبەجێکردنی هەڵبژێردراوەکان ({totalSelectedRows})
          </button>
        </div>

      </div>

    </div>
  );
};
