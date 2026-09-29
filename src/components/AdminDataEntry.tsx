"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { DataGrid, renderTextEditor } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  Save, Plus, Database, Cloud, Trash2, Copy, Search, X, 
  RotateCcw, Check, AlertCircle, Sparkles, Filter, FileSpreadsheet,
  Calendar, Layers, ArrowUpDown
} from 'lucide-react';
import { DashboardData, IncomingLetterData, SentLetterData } from '../utils/parser';
import { calculateSLA } from '../utils/sla';
import { OdooStagingArea } from './OdooStagingArea';

type TableType = 'incoming' | 'received' | 'sent';
type EntryMode = 'manual' | 'auto';

// Web Audio sound effects
const playSound = (type: 'success' | 'delete' | 'clone' = 'success') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'delete') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    // Ignore audio errors
  }
};

// Custom Formatters & Editors
const TextFormatter = (props: any) => {
  const val = props.row[props.column.key];
  if (!val && val !== 0) return <span className="text-slate-300 dark:text-slate-600 select-none">-</span>;
  return (
    <div className="truncate px-1 text-slate-800 dark:text-slate-200 text-xs font-medium" title={String(val)}>
      {String(val)}
    </div>
  );
};

const RefCodeFormatter = (props: any) => {
  const val = props.row.refCode;
  if (!val) return <span className="text-slate-300 dark:text-slate-600 select-none">-</span>;
  return (
    <div className="flex items-center h-full px-1">
      <span 
        className="font-mono text-xs px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 truncate max-w-full font-bold shadow-2xs" 
        title={val}
      >
        {val}
      </span>
    </div>
  );
};

const DateFormatter = (props: any) => {
  const val = props.row[props.column.key];
  if (!val) {
    if (props.column.key === 'responseDate') {
      return (
        <div className="flex items-center h-full px-1">
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/60 whitespace-nowrap">
            وەڵام نەدراوەتەوە
          </span>
        </div>
      );
    }
    return <span className="text-slate-300 dark:text-slate-600 select-none font-mono text-xs">-</span>;
  }
  const str = typeof val === 'string' ? val.split('T')[0] : (val instanceof Date ? val.toISOString().split('T')[0] : String(val));
  return (
    <div className="flex items-center h-full px-1">
      <span className="font-mono text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700/60">
        {str}
      </span>
    </div>
  );
};

const SLAFormatter = (props: any) => {
  const val = props.row.slaTime;
  if (!val || val === '-') return <span className="text-slate-300 dark:text-slate-600 select-none font-mono text-xs">-</span>;

  let badgeColor = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
  if (val.includes('کەمتر')) {
    badgeColor = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
  } else if (val.includes('زیاتر')) {
    badgeColor = "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
  } else if (val.includes('ئاسایی') || val.includes('ڕێنمایی')) {
    badgeColor = "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
  }

  return (
    <div className="flex items-center h-full px-1">
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border truncate max-w-full shadow-2xs ${badgeColor}`} title={val}>
        {val}
      </span>
    </div>
  );
};

const AutocompleteCellEditor = (props: any) => {
  const { column, row } = props;
  const listId = `datalist-admin-${column.key}`;
  const options: string[] = column.options || [];

  return (
    <div className="w-full h-full relative" dir="rtl">
      <input 
        autoFocus
        className="rdg-text-editor w-full h-full px-2 outline-none border-2 border-blue-500 focus:border-blue-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold"
        value={row[column.key] || ''}
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

const DateEditor = (props: any) => {
  const { column, row } = props;
  const val = row[column.key];
  const dateStr = val ? (typeof val === 'string' ? val.split('T')[0] : new Date(val).toISOString().split('T')[0]) : '';

  return (
    <input 
      type="date"
      autoFocus
      className="rdg-text-editor w-full h-full px-2 outline-none border-2 border-blue-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-mono text-xs"
      value={dateStr}
      onChange={(e) => {
        const newVal = e.target.value || null;
        props.onRowChange({ ...row, [column.key]: newVal });
      }}
      onBlur={() => props.onClose(true)}
    />
  );
};

const gridStyles = `
  .rdg {
    --rdg-color: #334155;
    --rdg-border-color: #e2e8f0;
    --rdg-summary-border-color: #cbd5e1;
    --rdg-background-color: #ffffff;
    --rdg-header-background-color: #f8fafc;
    --rdg-row-hover-background-color: #f8fafc;
    --rdg-row-selected-background-color: #eff6ff;
    --rdg-row-selected-hover-background-color: #dbeafe;
    --rdg-selection-color: #3b82f6;
    border: none;
    font-size: 13px;
    font-family: inherit;
  }
  .dark .rdg {
    --rdg-color: #cbd5e1;
    --rdg-border-color: #334155;
    --rdg-summary-border-color: #475569;
    --rdg-background-color: #0f172a;
    --rdg-header-background-color: #1e293b;
    --rdg-row-hover-background-color: #1e293b;
    --rdg-row-selected-background-color: #1e3a8a;
    --rdg-row-selected-hover-background-color: #1e40af;
    --rdg-selection-color: #60a5fa;
  }
  .rdg-cell {
    border-right: 1px solid var(--rdg-border-color);
    border-bottom: 1px solid var(--rdg-border-color);
    padding: 0 8px;
    display: flex;
    align-items: center;
  }
  .rdg-header-row .rdg-cell {
    font-weight: 800;
    color: #475569;
    font-size: 12px;
    background-color: #f1f5f9;
  }
  .dark .rdg-header-row .rdg-cell {
    color: #94a3b8;
    background-color: #1e293b;
  }
`;

export const AdminDataEntry = () => {
  const { user } = useAuth();
  const { 
    data: receivedData, setData: setReceivedData,
    sentData, setSentData,
    incomingData, setIncomingData
  } = useData();

  const [activeTab, setActiveTab] = useState<TableType>('received');
  const [entryMode, setEntryMode] = useState<EntryMode>('manual');
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info'; undoAction?: () => void } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success', undoAction?: () => void) => {
    setToastMessage({ text, type, undoAction });
    playSound(type === 'error' ? 'delete' : 'success');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const sortDesc = (arr: any[]) => [...arr].sort((a, b) => {
    const parseSortId = (id: any) => {
      if (typeof id === 'number') return id;
      if (typeof id === 'string') {
        return parseInt(id.replace('new-', '').replace('odoo-', '')) || 0;
      }
      return 0;
    };
    return parseSortId(b.id) - parseSortId(a.id);
  });

  const calculateSLA = (row: any) => {
    let pTime = row.processingTime;
    let sTime = row.slaTime;

    // Auto-calculate processingTime if sentDate exists
    if (row.sentDate) {
      const start = new Date(row.sentDate);
      const end = row.responseDate ? new Date(row.responseDate) : new Date();
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diff = end.getTime() - start.getTime();
        pTime = Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
      }
    }

    // Auto-calculate SLA status based on Excel Column M formula
    if (pTime !== null && pTime !== undefined && pTime !== "") {
      const pTimeNum = typeof pTime === 'string' ? parseInt(pTime) : pTime;
      if (!isNaN(pTimeNum)) {
        const lType = row.letterType || "";
        const rCode = String(row.refCode || "").trim().toLowerCase();

        if (rCode === "2" || lType === "داواکاری کاندیدکردن") {
          if (pTimeNum > 12) sTime = "زیاتر لە 12 ڕۆژ";
          else if (pTimeNum >= 8) sTime = "بەپێی کاتی ڕێنمایی";
          else sTime = "کەمتر لە 8 ڕۆژ";
        } 
        else if (rCode === "4" || lType === "داواکاری زیاد کردنی ڕاژە") {
          if (pTimeNum > 15) sTime = "زیاتر لە 15 ڕۆژ";
          else if (pTimeNum >= 12) sTime = "بەپێی کاتی ڕێنمایی";
          else sTime = "کەمتر لە 12 ڕۆژ";
        } 
        else if (rCode === "7" || lType === "داواکاریی گۆڕانکاریی پۆست") {
          if (pTimeNum > 12) sTime = "زیاتر لە 12 ڕۆژ";
          else if (pTimeNum >= 8) sTime = "بەپێی کاتی ڕێنمایی";
          else sTime = "کەمتر لە 8 ڕۆژ";
        } 
        else if (rCode === "1a") {
          if (pTimeNum > 10) sTime = "زیاتر لە 10 ڕۆژ";
          else if (pTimeNum >= 5) sTime = "کەمتر لە 10 ڕۆژ";
          else sTime = "کەمتر لە5 ڕۆژ";
        } 
        else {
          if (pTimeNum > 15) sTime = "زیاتر لە 15 ڕۆژ";
          else if (pTimeNum >= 5) sTime = "بەپێی کاتی ئاسایی بۆ نووسراوی گشتیی";
          else sTime = "کەمتر لە 5 ڕۆژ";
        }
      }
    } else {
      sTime = "-";
    }

    return { ...row, processingTime: pTime, slaTime: sTime };
  };

  // Local state for grid edits
  const [localReceived, setLocalReceived] = useState<any[]>(() => sortDesc(receivedData));
  const [localSent, setLocalSent] = useState<any[]>(() => sortDesc(sentData));
  const [localIncoming, setLocalIncoming] = useState<any[]>(() => sortDesc(incomingData));
  
  const [isSaving, setIsSaving] = useState(false);

  // Update local states when context data changes
  useEffect(() => {
    setLocalReceived(sortDesc(receivedData));
  }, [receivedData]);
  
  useEffect(() => {
    setLocalSent(sortDesc(sentData));
  }, [sentData]);

  useEffect(() => {
    setLocalIncoming(sortDesc(incomingData));
  }, [incomingData]);

  // Existing options extraction for autocomplete
  const existingOptions = useMemo(() => {
    const extractOptions = (data: any[]) => {
      const sets = {
        sender: new Set<string>(), department: new Set<string>(),
        dept1: new Set<string>(), dept2: new Set<string>(), dept3: new Set<string>(),
        letterType: new Set<string>()
      };
      data.forEach(row => {
        if (row.sender) sets.sender.add(row.sender);
        if (row.department) sets.department.add(row.department);
        if (row.dept1) sets.dept1.add(row.dept1);
        if (row.dept2) sets.dept2.add(row.dept2);
        if (row.dept3) sets.dept3.add(row.dept3);
        if (row.letterType) sets.letterType.add(row.letterType);
      });
      return {
        sender: Array.from(sets.sender).filter(Boolean), 
        department: Array.from(sets.department).filter(Boolean),
        dept1: Array.from(sets.dept1).filter(Boolean), 
        dept2: Array.from(sets.dept2).filter(Boolean), 
        dept3: Array.from(sets.dept3).filter(Boolean), 
        letterType: Array.from(sets.letterType).filter(Boolean)
      };
    };

    return {
      received: extractOptions(localReceived),
      sent: extractOptions(localSent),
      incoming: extractOptions(localIncoming)
    };
  }, [localReceived, localSent, localIncoming]);

  const existingRefCodes = useMemo(() => {
    const codes = new Set<string>();
    [...localReceived, ...localSent, ...localIncoming].forEach(row => {
      if (row.refCode) codes.add(row.refCode);
      if (row.id && typeof row.id === 'string' && row.id.startsWith('odoo-')) codes.add(row.id);
    });
    return Array.from(codes);
  }, [localReceived, localSent, localIncoming]);

  // All unique departments for filter dropdown
  const allDepartments = useMemo(() => {
    const set = new Set<string>();
    [...localReceived, ...localSent, ...localIncoming].forEach(r => {
      if (r.department) set.add(r.department);
    });
    return Array.from(set).sort();
  }, [localReceived, localSent, localIncoming]);

  // Track Unsaved Changes
  const unsavedCount = useMemo(() => {
    const isDiff = (a: any[], b: any[]) => {
      if (a.length !== b.length) return true;
      return JSON.stringify(a) !== JSON.stringify(b);
    };
    let count = 0;
    if (isDiff(localReceived, receivedData)) count += 1;
    if (isDiff(localSent, sentData)) count += 1;
    if (isDiff(localIncoming, incomingData)) count += 1;
    return count;
  }, [localReceived, localSent, localIncoming, receivedData, sentData, incomingData]);

  const handleDiscardChanges = () => {
    if (!confirm('ئایا دڵنیایت دەتەوێت سەرجەم گۆڕانکارییە پاشەکەوتنەکراوەکان ڕەتبکەیتەوە؟')) return;
    setLocalReceived(sortDesc(receivedData));
    setLocalSent(sortDesc(sentData));
    setLocalIncoming(sortDesc(incomingData));
    showToast('گۆڕانکارییەکان ڕەتکرانەوە و داتاکان گەڕێنرانەوە', 'info');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/db/batch-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receivedData: localReceived,
          sentData: localSent,
          incomingData: localIncoming
        })
      });
      
      if (!res.ok) throw new Error("شکستی هێنا لە پاشەکەوتکردن");
      
      // Update global context state
      setReceivedData(localReceived);
      setSentData(localSent);
      setIncomingData(localIncoming);
      
      showToast("سەرجەم گۆڕانکارییەکان بە سەرکەوتوویی لە داتابەیس و ئێکسڵ پاشەکەوتکران ✓", 'success');
    } catch (err: any) {
      showToast("هەڵە لە پاشەکەوتکردن: " + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const getNextId = (currentData: any[], count: number = 1) => {
    let maxId = 0;
    currentData.forEach((row: any) => {
      let idNum = 0;
      if (typeof row.id === 'number') idNum = row.id;
      else if (typeof row.id === 'string') idNum = parseInt(row.id.replace('new-', '').replace('odoo-', '')) || 0;
      
      if (idNum > maxId) maxId = idNum;
    });
    return Array.from({ length: count }, (_, i) => maxId + 1 + i);
  };

  const addRow = () => {
    const today = new Date().toISOString().split('T')[0];
    let currentData = activeTab === 'received' ? localReceived : activeTab === 'sent' ? localSent : localIncoming;
    const [newId] = getNextId(currentData, 1);
    
    if (activeTab === 'received') {
      const newRow = calculateSLA({ 
        id: newId, 
        subject: '', 
        department: existingOptions.received.department[0] || 'بەڕێوەبەرایەتی', 
        departments: [], 
        refCode: '', 
        letterType: 'نامەی گشتی', 
        sentDate: today, 
        responseDate: null, 
        processingTime: 0, 
        slaTime: 'کەمتر لە 5 ڕۆژ' 
      });
      setLocalReceived([newRow, ...localReceived]);
    } else if (activeTab === 'sent') {
      setLocalSent([{ 
        id: newId, 
        subject: '', 
        department: existingOptions.sent.department[0] || 'بەڕێوەبەرایەتی', 
        departments: [], 
        refCode: '', 
        letterType: 'نامەی گشتی', 
        sentDate: today 
      }, ...localSent]);
    } else {
      setLocalIncoming([{ 
        id: newId, 
        subject: '', 
        sender: '',
        department: existingOptions.incoming.department[0] || 'بەڕێوەبەرایەتی', 
        departments: [], 
        refCode: '', 
        letterType: 'نامەی گشتی', 
        sentDate: today 
      }, ...localIncoming]);
    }

    playSound('clone');
    showToast(`دێڕی نوێ (#${newId}) لەسەرەوەی خشتەکە زیادکرا`, 'info');
  };

  const handleCloneRow = (row: any) => {
    let currentData = activeTab === 'received' ? localReceived : activeTab === 'sent' ? localSent : localIncoming;
    const [newId] = getNextId(currentData, 1);
    const cloned = { ...row, id: newId };
    
    if (activeTab === 'received') {
      setLocalReceived([calculateSLA(cloned), ...localReceived]);
    } else if (activeTab === 'sent') {
      setLocalSent([cloned, ...localSent]);
    } else {
      setLocalIncoming([cloned, ...localIncoming]);
    }

    playSound('clone');
    showToast(`کۆپییەکی هاوشێوە (#${newId}) دروستکرا`, 'success');
  };

  const handleDeleteRow = (id: string | number) => {
    let deletedRow: any = null;
    let deletedIdx = -1;

    if (activeTab === 'received') {
      deletedIdx = localReceived.findIndex(r => r.id === id);
      deletedRow = localReceived[deletedIdx];
      setLocalReceived(localReceived.filter(r => r.id !== id));
    } else if (activeTab === 'sent') {
      deletedIdx = localSent.findIndex(r => r.id === id);
      deletedRow = localSent[deletedIdx];
      setLocalSent(localSent.filter(r => r.id !== id));
    } else {
      deletedIdx = localIncoming.findIndex(r => r.id === id);
      deletedRow = localIncoming[deletedIdx];
      setLocalIncoming(localIncoming.filter(r => r.id !== id));
    }

    playSound('delete');

    // Offer 5-second Undo
    showToast(`دێڕی #${id} سڕایەوە`, 'info', () => {
      if (!deletedRow) return;
      if (activeTab === 'received') {
        const next = [...localReceived];
        next.splice(deletedIdx, 0, deletedRow);
        setLocalReceived(next);
      } else if (activeTab === 'sent') {
        const next = [...localSent];
        next.splice(deletedIdx, 0, deletedRow);
        setLocalSent(next);
      } else {
        const next = [...localIncoming];
        next.splice(deletedIdx, 0, deletedRow);
        setLocalIncoming(next);
      }
      showToast(`دێڕی #${id} گەڕێنرایەوە ✓`, 'success');
    });
  };

  // Build columns with autocomplete and formatters
  const currentOptions = existingOptions[activeTab] || existingOptions.received;

  const getActionColumns = () => [
    {
      key: 'actions',
      name: 'کردارەکان',
      width: 90,
      minWidth: 85,
      renderCell: (props: any) => (
        <div className="flex items-center justify-center gap-1 w-full h-full">
          <button 
            onClick={() => handleCloneRow(props.row)}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 p-1 rounded-lg transition-colors"
            title="کۆپیکردنی ئەم دێڕە (Clone)"
          >
            <Copy size={14} />
          </button>
          <button 
            onClick={() => handleDeleteRow(props.row.id)}
            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/40 p-1 rounded-lg transition-colors"
            title="سڕینەوەی ئەم دێڕە (Delete)"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  const incomingColumns = useMemo(() => [
    { key: 'id', name: '# (ID)', width: 75, minWidth: 65, renderCell: TextFormatter, renderEditCell: renderTextEditor },
    { key: 'subject', name: 'بابەت (Subject)', width: 260, minWidth: 200, renderCell: TextFormatter, renderEditCell: renderTextEditor },
    { key: 'sender', name: 'هاتووە لە (Sender)', width: 160, minWidth: 130, options: currentOptions.sender, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'department', name: 'لایەنی پەیوەندیدار', width: 180, minWidth: 140, options: currentOptions.department, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept1', name: 'بەشی 1', width: 110, minWidth: 90, options: currentOptions.dept1, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept2', name: 'بەشی 2', width: 110, minWidth: 90, options: currentOptions.dept2, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept3', name: 'بەشی 3', width: 110, minWidth: 90, options: currentOptions.dept3, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'refCode', name: 'کۆد (Ref Code)', width: 140, minWidth: 120, renderCell: RefCodeFormatter, renderEditCell: renderTextEditor },
    { key: 'letterType', name: 'جۆری نامە', width: 130, minWidth: 110, options: currentOptions.letterType, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'sentDate', name: 'ڕۆژی ناردن', width: 120, minWidth: 110, renderCell: DateFormatter, renderEditCell: DateEditor },
    ...getActionColumns()
  ], [currentOptions]);

  const receivedColumns = useMemo(() => [
    { key: 'id', name: '# (ID)', width: 75, minWidth: 65, renderCell: TextFormatter, renderEditCell: renderTextEditor },
    { key: 'subject', name: 'بابەت', width: 250, minWidth: 200, renderCell: TextFormatter, renderEditCell: renderTextEditor },
    { key: 'department', name: 'لایەنی پەیوەندیدار', width: 180, minWidth: 140, options: currentOptions.department, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept1', name: 'بەشی 1', width: 105, minWidth: 90, options: currentOptions.dept1, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept2', name: 'بەشی 2', width: 105, minWidth: 90, options: currentOptions.dept2, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept3', name: 'بەشی 3', width: 105, minWidth: 90, options: currentOptions.dept3, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'refCode', name: 'کۆد (Ref Code)', width: 140, minWidth: 120, renderCell: RefCodeFormatter, renderEditCell: renderTextEditor },
    { key: 'letterType', name: 'جۆری نامە', width: 130, minWidth: 110, options: currentOptions.letterType, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'sentDate', name: 'ڕۆژی ناردن', width: 120, minWidth: 110, renderCell: DateFormatter, renderEditCell: DateEditor },
    { key: 'responseDate', name: 'ڕۆژی وەڵام', width: 120, minWidth: 110, renderCell: DateFormatter, renderEditCell: DateEditor },
    { key: 'processingTime', name: 'ماوە (ڕۆژ)', width: 85, minWidth: 75, renderCell: TextFormatter, renderEditCell: renderTextEditor },
    { key: 'slaTime', name: 'ڕێنمایی SLA', width: 150, minWidth: 130, renderCell: SLAFormatter, renderEditCell: renderTextEditor },
    ...getActionColumns()
  ], [currentOptions]);

  const sentColumns = useMemo(() => [
    { key: 'id', name: '# (ID)', width: 75, minWidth: 65, renderCell: TextFormatter, renderEditCell: renderTextEditor },
    { key: 'subject', name: 'بابەت', width: 280, minWidth: 220, renderCell: TextFormatter, renderEditCell: renderTextEditor },
    { key: 'department', name: 'لایەنی پەیوەندیدار', width: 190, minWidth: 150, options: currentOptions.department, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept1', name: 'بەشی 1', width: 115, minWidth: 95, options: currentOptions.dept1, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept2', name: 'بەشی 2', width: 115, minWidth: 95, options: currentOptions.dept2, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'dept3', name: 'بەشی 3', width: 115, minWidth: 95, options: currentOptions.dept3, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'refCode', name: 'کۆد (Ref Code)', width: 150, minWidth: 120, renderCell: RefCodeFormatter, renderEditCell: renderTextEditor },
    { key: 'letterType', name: 'جۆری نامە', width: 140, minWidth: 110, options: currentOptions.letterType, renderCell: TextFormatter, renderEditCell: AutocompleteCellEditor },
    { key: 'sentDate', name: 'ڕۆژی ناردن', width: 125, minWidth: 110, renderCell: DateFormatter, renderEditCell: DateEditor },
    ...getActionColumns()
  ], [currentOptions]);

  // Current active data list
  const activeFullList = activeTab === 'received' ? localReceived : activeTab === 'sent' ? localSent : localIncoming;

  // Filtered rows based on search and department
  const filteredRows = useMemo(() => {
    let list = activeFullList;

    if (departmentFilter !== 'ALL') {
      list = list.filter(r => r.department === departmentFilter || r.dept1 === departmentFilter || r.dept2 === departmentFilter || r.dept3 === departmentFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(r => {
        const idStr = String(r.id || '');
        const subjStr = String(r.subject || '').toLowerCase();
        const refStr = String(r.refCode || '').toLowerCase();
        const deptStr = String(r.department || '').toLowerCase();
        const senderStr = String(r.sender || '').toLowerCase();
        return idStr.includes(q) || subjStr.includes(q) || refStr.includes(q) || deptStr.includes(q) || senderStr.includes(q);
      });
    }

    return list;
  }, [activeFullList, searchQuery, departmentFilter]);

  // Handle cell changes safely even when filtering is active
  const handleRowsChange = (newFilteredRows: any[]) => {
    const updatedMap = new Map(newFilteredRows.map(r => [r.id, r]));

    if (activeTab === 'received') {
      setLocalReceived(prev => prev.map(r => {
        const updated = updatedMap.get(r.id);
        return updated ? calculateSLA(updated) : r;
      }));
    } else if (activeTab === 'sent') {
      setLocalSent(prev => prev.map(r => updatedMap.get(r.id) || r));
    } else {
      setLocalIncoming(prev => prev.map(r => updatedMap.get(r.id) || r));
    }
  };

  if (user?.role !== 'admin') {
    return <div className="p-8 text-center text-red-500 font-bold">دەستپێگەیشتن ڕێگەپێنەدراوە (Access Denied)</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      <style>{gridStyles}</style>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[160] animate-in slide-in-from-top-4 fade-in duration-200">
          <div className={`px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 text-xs sm:text-sm font-bold ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-600/95 text-white border-emerald-400/40 shadow-emerald-500/20' 
              : toastMessage.type === 'error'
              ? 'bg-rose-600/95 text-white border-rose-400/40 shadow-rose-500/20'
              : 'bg-slate-800/95 text-white border-slate-700 shadow-slate-900/40'
          }`}>
            {toastMessage.type === 'success' ? <Check size={17} /> : <AlertCircle size={17} />}
            <span>{toastMessage.text}</span>
            {toastMessage.undoAction && (
              <button
                type="button"
                onClick={toastMessage.undoAction}
                className="mr-3 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-black transition-colors flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>گەڕاندنەوە (Undo)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Header & Sub-Navigation Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          
          {/* Tabs: Received, Sent, Incoming */}
          {entryMode === 'manual' && (
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 xl:pb-0" dir="rtl">
              <button 
                onClick={() => { setActiveTab('received'); setSearchQuery(''); }}
                className={`px-3.5 py-2 font-bold text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'received' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>پێویست بە وەڵام (Received)</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${activeTab === 'received' ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  {localReceived.length}
                </span>
              </button>

              <button 
                onClick={() => { setActiveTab('sent'); setSearchQuery(''); }}
                className={`px-3.5 py-2 font-bold text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'sent' 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>سەرجەم ڕەوانەکراوەکان (Sent)</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${activeTab === 'sent' ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  {localSent.length}
                </span>
              </button>

              <button 
                onClick={() => { setActiveTab('incoming'); setSearchQuery(''); }}
                className={`px-3.5 py-2 font-bold text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'incoming' 
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>سەرجەم هاتووەکان (Incoming)</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${activeTab === 'incoming' ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  {localIncoming.length}
                </span>
              </button>
            </div>
          )}

          {entryMode === 'auto' && <div className="flex-1" />}

          {/* Middle Actions: Add Row + Search Bar */}
          {entryMode === 'manual' && (
            <div className="flex flex-wrap items-center gap-2.5 flex-1 justify-center xl:justify-center">
              
              {/* Add Row Button */}
              <button 
                onClick={addRow}
                className="flex items-center gap-2 px-5 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-bold text-xs sm:text-sm rounded-xl transition-all border border-blue-200 dark:border-blue-800 shadow-xs active:scale-95"
              >
                <Plus size={16} />
                <span>زیادکردنی دێڕ (Add Row)</span>
              </button>

              {/* Search Box */}
              <div className="relative min-w-[200px] sm:min-w-[240px]">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="گەڕان لە بابەت، کۆد، لایەن..."
                  className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-1.5 pr-9 pl-8 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dir="rtl"
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

              {/* Department Dropdown Filter */}
              <div className="relative">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-1.5 px-3 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dir="rtl"
                >
                  <option value="ALL">هەموو بەشەکان</option>
                  {allDepartments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Count Indicator */}
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap">
                {filteredRows.length} لە {activeFullList.length}
              </span>

            </div>
          )}

          {/* Mode Switcher: Manual Entry vs Auto API */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-end xl:self-auto border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
            <button 
              onClick={() => setEntryMode('manual')}
              className={`px-3.5 py-1.5 font-bold text-xs rounded-xl flex items-center gap-2 transition-all ${
                entryMode === 'manual' 
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Database size={15} />
              <span>دەستی (Manual Entry)</span>
            </button>
            <button 
              onClick={() => setEntryMode('auto')}
              className={`px-3.5 py-1.5 font-bold text-xs rounded-xl flex items-center gap-2 transition-all ${
                entryMode === 'auto' 
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Cloud size={15} />
              <span>سەرهێڵ (Auto API)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Grid Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {entryMode === 'auto' ? (
          <OdooStagingArea 
            existingOptions={existingOptions}
            existingRefCodes={existingRefCodes}
            onApply={(newReceived, newSent, newIncoming) => {
              if (newReceived.length > 0) {
                const nextIds = getNextId(localReceived, newReceived.length);
                const computedReceived = newReceived.map((r, i) => calculateSLA({ ...r, id: nextIds[i] }));
                setLocalReceived([...computedReceived, ...localReceived]);
              }
              if (newSent.length > 0) {
                const nextIds = getNextId(localSent, newSent.length);
                const computedSent = newSent.map((r, i) => ({ ...r, id: nextIds[i] }));
                setLocalSent([...computedSent, ...localSent]);
              }
              if (newIncoming.length > 0) {
                const nextIds = getNextId(localIncoming, newIncoming.length);
                const computedIncoming = newIncoming.map((r, i) => ({ ...r, id: nextIds[i] }));
                setLocalIncoming([...computedIncoming, ...localIncoming]);
              }
              
              setEntryMode('manual');
              if (newReceived.length >= newSent.length && newReceived.length >= newIncoming.length) {
                setActiveTab('received');
              } else if (newSent.length >= newIncoming.length) {
                setActiveTab('sent');
              } else {
                setActiveTab('incoming');
              }

              showToast(`داتاکانی Odoo هاوردەکران (${newReceived.length + newSent.length + newIncoming.length} دێڕ)`, 'success');
            }}
          />
        ) : (
          <div className="h-full flex flex-col" dir="rtl">
            <div className="flex-1 overflow-hidden p-2">
              <DataGrid 
                columns={activeTab === 'received' ? receivedColumns : activeTab === 'sent' ? sentColumns : incomingColumns} 
                rows={filteredRows} 
                onRowsChange={handleRowsChange}
                className="rdg-light h-full w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm"
                direction="rtl"
                rowKeyGetter={(row) => row.id}
                headerRowHeight={40}
                rowHeight={38}
              />
            </div>
            
            {/* Bottom Action Bar */}
            <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 flex items-center justify-between" dir="rtl">
              
              {/* Unsaved Changes Indicator / Helper Text */}
              <div className="flex items-center gap-3">
                {unsavedCount > 0 ? (
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold animate-pulse">
                    <AlertCircle size={15} />
                    <span>گۆڕانکاری پاشەکەوت نەکراو هەیە ({unsavedCount} خشتە)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Check size={15} className="text-emerald-500" />
                    <span>سەرجەم داتاکان هاوکات و پاشەکەوتکراون</span>
                  </div>
                )}

                {unsavedCount > 0 && (
                  <button
                    type="button"
                    onClick={handleDiscardChanges}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline transition-all"
                  >
                    پاشگەزبوونەوە (Discard)
                  </button>
                )}
              </div>

              {/* Save Changes Button */}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-95 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={17} />
                )}
                <span>پاشەکەوتکردن (Save Changes)</span>
              </button>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};
