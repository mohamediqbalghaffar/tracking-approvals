"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  X, UploadCloud, Download, Database, AlertCircle, CheckCircle2, Trash2, 
  FileSpreadsheet, ShieldCheck, User, Users, Save, Laptop, Sparkles, 
  Eye, EyeOff, Activity, RefreshCw, Palette, Sun, Moon, Monitor, 
  Volume2, VolumeX, KeyRound, Smartphone, Check, Lock, ExternalLink, Unlink
} from "lucide-react";
import * as XLSX from "xlsx";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import { parseFile } from "../utils/parser";
import { UserManagement } from "./UserManagement";
import { usePermissions } from "@/context/PermissionsContext";

export type SettingsTab = 'profile' | 'appearance' | 'security' | 'database' | 'approvals';

interface AdminSettingsModalProps {
  onClose: () => void;
  initialTab?: string;
}

const AVATAR_PRESETS = [
  { id: 'purple', label: 'بنەوشەیی', gradient: 'from-violet-600 via-purple-600 to-indigo-700', ring: 'ring-violet-500' },
  { id: 'blue', label: 'شین', gradient: 'from-blue-600 via-sky-600 to-indigo-600', ring: 'ring-blue-500' },
  { id: 'emerald', label: 'سەوز', gradient: 'from-emerald-600 via-teal-600 to-cyan-700', ring: 'ring-emerald-500' },
  { id: 'amber', label: 'پڕتەقاڵی', gradient: 'from-amber-500 via-orange-600 to-rose-600', ring: 'ring-amber-500' },
  { id: 'rose', label: 'سور', gradient: 'from-rose-600 via-pink-600 to-purple-700', ring: 'ring-rose-500' },
  { id: 'slate', label: 'ڕەش', gradient: 'from-slate-700 via-slate-800 to-zinc-900', ring: 'ring-slate-500' },
];

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({ onClose, initialTab = 'profile' }) => {
  // Normalize initialTab: if 'odoo' is passed, map to 'profile' and we scroll to odoo section
  const mappedInitialTab: SettingsTab = (initialTab === 'odoo' || initialTab === 'profile') 
    ? 'profile' 
    : (['appearance', 'security', 'database', 'approvals'].includes(initialTab) ? initialTab as SettingsTab : 'profile');

  const [activeTab, setActiveTab] = useState<SettingsTab>(mappedInitialTab);
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
  
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    playNotificationSound(type === 'error' ? 'error' : 'success');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const odooSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTab === 'odoo' && odooSectionRef.current) {
      setTimeout(() => {
        odooSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [initialTab]);

  // Contexts & Auth
  const { setData, setSentData, setIncomingData, mode } = useData();
  const { hasPermission } = usePermissions();
  const { user } = useAuth();
  const update = async (_data?: any) => {};
  const { theme, setTheme } = useTheme();

  // 1. Profile State
  const [profileName, setProfileName] = useState(user?.username || '');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>((user as any)?.image || null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  // 2. Appearance State
  const [presentationDefault, setPresentationDefault] = useState<'classic' | 'prezi'>('classic');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPres = localStorage.getItem('badwadachoon_presentation_mode');
    if (savedPres === 'prezi' || savedPres === 'classic') setPresentationDefault(savedPres);

    const savedRefresh = localStorage.getItem('badwadachoon_refresh_interval');
    if (savedRefresh) setAutoRefreshInterval(Number(savedRefresh));

    const savedSound = localStorage.getItem('badwadachoon_sound_enabled');
    if (savedSound !== null) setSoundEnabled(savedSound === 'true');
  }, []);

  // Web Audio UI Sound Synthesizer
  const playNotificationSound = (type: 'success' | 'chime' | 'error' = 'chime') => {
    if (!soundEnabled && type !== 'chime') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success' || type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      // Ignore audio context errors
    }
  };

  // 3. Odoo Settings State
  const [odooUrl, setOdooUrl] = useState('https://erp.halabjagroup.com');
  const [odooDb, setOdooDb] = useState('');
  const [odooUsername, setOdooUsername] = useState('');
  const [odooApiKey, setOdooApiKey] = useState('');
  const [showOdooKey, setShowOdooKey] = useState(false);
  const [hasOdooApiKey, setHasOdooApiKey] = useState(false);
  const [isSavingOdoo, setIsSavingOdoo] = useState(false);
  const [isTestingOdoo, setIsTestingOdoo] = useState(false);
  const [odooTestResult, setOdooTestResult] = useState<{
    success: boolean;
    latencyMs?: number;
    message?: string;
    error?: string;
    uid?: number;
  } | null>(null);

  // Fetch Odoo settings on mount or when profile tab is active
  useEffect(() => {
    fetch('/api/user/odoo-settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          if (data.odooUrl) setOdooUrl(data.odooUrl);
          if (data.odooDb) setOdooDb(data.odooDb);
          if (data.odooUsername) setOdooUsername(data.odooUsername);
          setHasOdooApiKey(data.hasApiKey);
        }
      })
      .catch(console.error);
  }, []);

  const handleAutofillHalabja = () => {
    setOdooUrl('https://erp.halabjagroup.com');
    setOdooDb('HalabjaGroup');
    if (!odooUsername && user?.email) {
      setOdooUsername(user.email);
    }
    showToast('زانیارییەکانی Halabja ERP بە سەرکەوتوویی پڕکرانەوە', 'info');
  };

  const handleTestOdooConnection = async () => {
    setIsTestingOdoo(true);
    setOdooTestResult(null);
    try {
      const res = await fetch('/api/user/odoo-settings/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ odooUrl, odooDb, odooUsername, odooApiKey })
      });
      const data = await res.json();
      setOdooTestResult(data);
      if (data.success) {
        showToast(data.message || `پەیوەندی سەرکەوتوو بوو (${data.latencyMs}ms)`, 'success');
      } else {
        showToast(data.error || 'پەیوەندی بە Odoo سەرکەوتوو نەبوو', 'error');
      }
    } catch (err: any) {
      setOdooTestResult({ success: false, error: err.message || 'هەڵەی تۆڕ' });
      showToast('هەڵەیەک ڕوویدا لە کاتی پەیوەندیکردن', 'error');
    } finally {
      setIsTestingOdoo(false);
    }
  };

  const handleSaveOdoo = async () => {
    setIsSavingOdoo(true);
    try {
      const res = await fetch('/api/user/odoo-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ odooUrl, odooDb, odooUsername, odooApiKey })
      });
      const data = await res.json();
      if (data.success) {
        if (odooApiKey) {
          setHasOdooApiKey(true);
          setOdooApiKey('');
        }
        showToast('ڕێکخستنەکانی Odoo بە سەرکەوتوویی پاشەکەوت کران', 'success');
      } else {
        showToast(data.error || 'هەڵەیەک ڕوویدا', 'error');
      }
    } catch (err) {
      showToast('هەڵەی تۆڕ لە پەیوەندیکردن بە سێرڤەر', 'error');
    } finally {
      setIsSavingOdoo(false);
    }
  };

  const handleDisconnectOdoo = async () => {
    if (!confirm('ئایا دڵنیایت لە پچڕاندنی بەستنەوەی Odoo ERP؟')) return;
    setIsSavingOdoo(true);
    try {
      const res = await fetch('/api/user/odoo-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disconnect: true })
      });
      const data = await res.json();
      if (data.success) {
        setHasOdooApiKey(false);
        setOdooApiKey('');
        setOdooTestResult(null);
        showToast('پەیوەندی بە Odoo بە سەرکەوتوویی پچڕێنرا', 'info');
      }
    } catch (e) {
      showToast('هەڵەیەک ڕوویدا', 'error');
    } finally {
      setIsSavingOdoo(false);
    }
  };

  // 4. Security State (Change Password)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: 'لاواز', color: 'bg-rose-500' };
    if (score <= 3) return { score, label: 'مامناوەند', color: 'bg-amber-500' };
    return { score, label: 'بەهێز', color: 'bg-emerald-500' };
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('وشەی نهێنی دەبێت لانیکەم ٦ پیت یان ژمارە بێت', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('دووبارەکردنەوەی وشەی نهێنی نوێ هاوتا نییە', 'error');
      return;
    }

    setIsChangingPass(true);
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        showToast('وشەی نهێنی بە سەرکەوتوویی نوێکرایەوە', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast(data.error || 'وشەی نهێنی ئێستات هەڵەیە', 'error');
      }
    } catch (err) {
      showToast('هەڵەی پەیوەندی بە سێرڤەر', 'error');
    } finally {
      setIsChangingPass(false);
    }
  };

  // 5. Excel Desktop Server State
  const [excelStatus, setExcelStatus] = useState<any>(null);
  const [isExcelSyncing, setIsExcelSyncing] = useState(false);
  const [excelMessage, setExcelMessage] = useState<string | null>(null);

  const fetchExcelStatus = () => {
    fetch('/api/db/excel-sync')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setExcelStatus(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (activeTab === 'database') {
      fetchExcelStatus();
    }
  }, [activeTab]);

  const handleSyncToExcel = async () => {
    setIsExcelSyncing(true);
    setExcelMessage(null);
    try {
      const res = await fetch('/api/db/excel-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: 'to-excel' })
      });
      const data = await res.json();
      if (data.success) {
        setExcelMessage('سەرجەم داتاکان بە سەرکەوتوویی هەناردەی فایلەکانی ئێکسڵ کران لەسەر دیسکتۆپ');
        fetchExcelStatus();
        showToast('نوێکردنەوەی فایلەکانی ئێکسڵ سەرکەوتوو بوو', 'success');
      } else {
        setExcelMessage('هەڵەیەک ڕوویدا لە کاتی هەناردەکردن');
        showToast('هەڵەیەک ڕوویدا لە هەناردەکردن', 'error');
      }
    } catch (err) {
      setExcelMessage('هەڵەیەک ڕوویدا لە پەیوەندی بە سێرڤەر');
      showToast('هەڵەی تۆڕ', 'error');
    } finally {
      setIsExcelSyncing(false);
    }
  };

  const handleSyncFromExcel = async () => {
    if (!confirm('ئایا دڵنیایت دەتەوێت داتابەیسەکە لە فایلەکانی ئێکسڵی سەر دیسکتۆپەوە دووبارە باربکەیتەوە؟')) return;
    setIsExcelSyncing(true);
    setExcelMessage(null);
    try {
      const res = await fetch('/api/db/excel-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: 'from-excel' })
      });
      const data = await res.json();
      if (data.success) {
        setExcelMessage('سەرجەم داتاکان لە فایلەکانی ئێکسڵەوە هاوردەکران و داتابەیس نوێکرایەوە');
        const [rRes, sRes, iRes] = await Promise.all([
          fetch('/api/db/received'),
          fetch('/api/db/sent'),
          fetch('/api/db/incoming')
        ]);
        if (rRes.ok) setData(await rRes.json());
        if (sRes.ok) setSentData(await sRes.json());
        if (iRes.ok) setIncomingData(await iRes.json());
        fetchExcelStatus();
        showToast('هاوردەکردن لە ئێکسڵ سەرکەوتوو بوو', 'success');
      } else {
        setExcelMessage('هەڵەیەک ڕوویدا لە کاتی هاوردەکردن');
        showToast('هەڵەیەک ڕوویدا لە هاوردەکردن', 'error');
      }
    } catch (err) {
      setExcelMessage('هەڵەیەک ڕوویدا لە پەیوەندی بە سێرڤەر');
      showToast('هەڵەی تۆڕ', 'error');
    } finally {
      setIsExcelSyncing(false);
    }
  };

  // 6. Profile Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setSelectedPreset(null);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setProfileImagePreview(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      const formData = new FormData();
      if (profileName) formData.append('name', profileName);
      if (profileImage) {
        formData.append('image', profileImage);
      } else if (selectedPreset) {
        formData.append('avatarPreset', selectedPreset);
      }

      const res = await fetch('/api/user/profile', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        if (update) {
          await update({
            ...user,
            name: data.user.name,
            image: data.user.image,
          });
        }
        showToast('زانیارییەکانی پڕۆفایل بە سەرکەوتوویی نوێکرانەوە', 'success');
      } else {
        showToast(data.error || 'هەڵەیەک ڕوویدا لە نوێکردنەوەی پڕۆفایل', 'error');
      }
    } catch (err) {
      showToast('هەڵەیەک ڕوویدا لە کاتی پاشەکەوتکردن', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // 7. Database Import/Export Handlers
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSyncing(true);
    setSyncStatus({ type: 'idle', message: 'دەرهێنانی داتاکان لە فایلەکەوە...' });

    try {
      const parsedData = await parseFile(file);
      setSyncStatus({ type: 'idle', message: 'پاشەکەوتکردن لە داتابەیسدا...' });

      if (mode === 'live') {
        const CHUNK_SIZE = 500;
        for (let i = 0; i < parsedData.receivedData.length; i += CHUNK_SIZE) {
          await fetch('/api/db/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ receivedData: parsedData.receivedData.slice(i, i + CHUNK_SIZE) })
          });
        }
        for (let i = 0; i < parsedData.sentData.length; i += CHUNK_SIZE) {
          await fetch('/api/db/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sentData: parsedData.sentData.slice(i, i + CHUNK_SIZE) })
          });
        }
        for (let i = 0; i < parsedData.incomingData.length; i += CHUNK_SIZE) {
          await fetch('/api/db/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ incomingData: parsedData.incomingData.slice(i, i + CHUNK_SIZE) })
          });
        }
      }

      setData(parsedData.receivedData);
      setSentData(parsedData.sentData);
      setIncomingData(parsedData.incomingData);

      setSyncStatus({ 
        type: 'success', 
        message: `سەرکەوتوو بوو! ${parsedData.receivedData.length} وەڵامدراوە، ${parsedData.sentData.length} دەرچوو، ${parsedData.incomingData.length} هاتووەکان نوێکرانەوە.` 
      });
      showToast('داتاکان بە سەرکەوتوویی هاوردەکران', 'success');
    } catch (err: any) {
      setSyncStatus({ 
        type: 'error', 
        message: err.message || 'هەڵەیەک ڕوویدا لە خوێندنەوەی فایلەکە. تکایە دڵنیابەرەوە فۆرماتەکەی تەواوە.' 
      });
      showToast('شکستی هاوردەکردنی داتا', 'error');
    } finally {
      setIsSyncing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleExport = async (type: 'all' | 'received' | 'sent' | 'incoming') => {
    try {
      const res = await fetch(`/api/db/export?type=${type}`);
      if (!res.ok) throw new Error('شکستی هەناردەکردن');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `badwadachoon-export-${type}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('فایلی داتا بە سەرکەوتوویی دابەزێنرا', 'success');
    } catch (err) {
      showToast('هەڵەیەک ڕوویدا لە کاتی هەناردەکردندا', 'error');
    }
  };

  const handleClearDatabase = async () => {
    if (!confirm('ئایا دڵنیایت لە سڕینەوەی تەواوی داتاکان؟ ئەم کردارە ناگەڕێتەوە.')) return;
    try {
      const res = await fetch('/api/db/init', { method: 'POST' });
      if (res.ok) {
        setData([]);
        setSentData([]);
        setIncomingData([]);
        showToast('داتابەیس بە سەرکەوتوویی پاککرایەوە', 'success');
      }
    } catch (err) {
      showToast('هەڵەیەک ڕوویدا لە پاککردنەوەی داتابەیس', 'error');
    }
  };

  // Header content helper
  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'profile':
        return {
          title: 'ڕێکخستنەکانی هەژمار',
          subtitle: 'زانیارییە کەسییەکانت',
          icon: User,
          iconColor: 'bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400'
        };
      case 'appearance':
        return {
          title: 'ڕووکار و دڵخوازەکان',
          subtitle: 'دۆخی تاریک/ڕووناک، شێوازی پێشکەشکردن و دەنگ',
          icon: Palette,
          iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
        };
      case 'security':
        return {
          title: 'ئاسایش و دانیشتنەکان',
          subtitle: 'گۆڕینی تێپەڕەوشە، دانیشتنە چالاکەکان و پاراستن',
          icon: KeyRound,
          iconColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
        };
      case 'database':
        return {
          title: 'ڕێکخستنەکانی داتابەیس',
          subtitle: 'بەڕێوەبردنی زانیارییەکان و هاوکاتکردنی ئێکسڵ',
          icon: Database,
          iconColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
        };
      case 'approvals':
        return {
          title: 'بەڕێوەبردنی بەکارهێنەران',
          subtitle: 'کۆنترۆڵکردنی هەژمارەکان و دەسەڵاتەکان',
          icon: Users,
          iconColor: 'bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400'
        };
    }
  };

  const headerInfo = getHeaderInfo();
  const HeaderIcon = headerInfo.icon;

  const currentPresetObj = AVATAR_PRESETS.find(p => p.id === selectedPreset);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200" dir="rtl">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-none">
          <div className={`px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 text-sm font-bold ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-500/90 text-white border-emerald-400/40 shadow-emerald-500/20' 
              : toastMessage.type === 'error'
              ? 'bg-rose-500/90 text-white border-rose-400/40 shadow-rose-500/20'
              : 'bg-blue-600/90 text-white border-blue-400/40 shadow-blue-500/20'
          }`}>
            {toastMessage.type === 'success' ? <Check size={18} /> : toastMessage.type === 'error' ? <AlertCircle size={18} /> : <Sparkles size={18} />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Modal Card */}
      <div 
        className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh] backdrop-blur-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/40">
          <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-2xl shadow-sm ${headerInfo.iconColor}`}>
              <HeaderIcon size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-white">
                {headerInfo.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {headerInfo.subtitle}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="داخستن"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 sm:px-8 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar bg-slate-50/30 dark:bg-slate-900/20 pt-2">
          
          {/* Tab 1: هەژماری من (My Account - matches user screenshot) */}
          <button 
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'profile' 
                ? 'border-violet-600 text-violet-600 dark:text-violet-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <User size={16} />
            <span>هەژماری من</span>
            {hasOdooApiKey && (
              <span className="w-2 h-2 rounded-full bg-blue-500" title="Odoo بەستراوەتەوە"></span>
            )}
          </button>

          {/* Tab 2: ڕووکار و دڵخوازەکان (Appearance & Preferences) */}
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'appearance' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Palette size={16} />
            <span>ڕووکار و تایبەتمەندییەکان</span>
          </button>

          {/* Tab 3: ئاسایش (Security & Sessions) */}
          <button 
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'security' 
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Lock size={16} />
            <span>ئاسایش و دانیشتنەکان</span>
          </button>

          {/* Admin Tab 4: داتابەیس */}
          {hasPermission('data:upload') && (
            <button 
              onClick={() => setActiveTab('database')}
              className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'database' 
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Database size={16} />
              <span>داتابەیس</span>
            </button>
          )}

          {/* Admin Tab 5: بەڕێوەبردنی ستاف */}
          {hasPermission('users:manage') && (
            <button 
              onClick={() => setActiveTab('approvals')}
              className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'approvals' 
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Users size={16} />
              <span>بەڕێوەبردنی بەکارهێنەران</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8">

          {/* ========================================================= */}
          {/* TAB 1: هەژماری من (CONTAINING BOTH SECTION 1 AND SECTION 2) */}
          {/* ========================================================= */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in duration-300 space-y-8">
              
              {/* ---------------------------------------------------- */}
              {/* SECTION 1: ستۆدیۆی پڕۆفایل و زانیارییە کەسییەکان */}
              {/* ---------------------------------------------------- */}
              <div>
                <div className="bg-gradient-to-br from-violet-50/70 via-purple-50/40 to-fuchsia-50/20 dark:from-violet-950/25 dark:via-purple-950/15 dark:to-fuchsia-950/10 border border-violet-200/70 dark:border-violet-800/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                  
                  {/* Top Badge & Tier */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-100/90 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-bold border border-violet-200 dark:border-violet-700/60 shadow-xs">
                      <ShieldCheck size={14} className="text-violet-600 dark:text-violet-400" />
                      <span>{user?.role === 'admin' ? 'بەڕێوەبەر (Admin)' : user?.role === 'user' ? 'بەکارهێنەر (User)' : 'بینەر (Viewer)'}</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                      دۆخی هەژمار: چالاک ✓
                    </span>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                    
                    {/* Form Inputs (Right in RTL) */}
                    <div className="flex-1 space-y-4 w-full">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                          ناوی بەکارهێنەر
                        </label>
                        <input 
                          type="text" 
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-xs"
                          placeholder="ناوەکەت بنووسە"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            ئیمەیڵ (گۆڕین ڕێگەپێنەدراوە)
                          </label>
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <Lock size={11} />
                            <span>پارێزراوە</span>
                          </span>
                        </div>
                        <input 
                          type="email" 
                          value={user?.email || ''}
                          disabled
                          className="w-full bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-left text-sm cursor-not-allowed select-all"
                          dir="ltr"
                        />
                      </div>

                      {/* Quick Avatar Color Presets */}
                      <div className="pt-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                          یان ڕەنگێکی ئامادەکراو هەڵبژێرە بۆ پڕۆفایل:
                        </label>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          {AVATAR_PRESETS.map(preset => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => handleSelectPreset(preset.id)}
                              className={`w-7 h-7 rounded-full bg-gradient-to-br ${preset.gradient} transition-all duration-200 shadow-sm flex items-center justify-center text-white ${
                                selectedPreset === preset.id ? `ring-2 ring-offset-2 dark:ring-offset-slate-900 ${preset.ring} scale-110` : 'hover:scale-110 opacity-90 hover:opacity-100'
                              }`}
                              title={preset.label}
                            >
                              {selectedPreset === preset.id && <Check size={13} strokeWidth={3} />}
                            </button>
                          ))}
                          {(profileImagePreview || selectedPreset) && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedPreset(null);
                                setProfileImage(null);
                                setProfileImagePreview(null);
                              }}
                              className="text-[11px] text-slate-400 hover:text-rose-500 mr-2 transition-colors font-medium"
                            >
                              گەڕانەوە بۆ بنەڕەتی
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Avatar Display & Upload (Left in RTL, matching screenshot) */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <div 
                        onClick={() => profileImageInputRef.current?.click()}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden relative group cursor-pointer shadow-xl border-4 border-white dark:border-slate-800 transition-transform duration-300 hover:scale-105"
                      >
                        {profileImagePreview ? (
                          <Image src={profileImagePreview} alt="Profile Preview" width={128} height={128} className="object-cover w-full h-full" />
                        ) : currentPresetObj ? (
                          <div className={`w-full h-full bg-gradient-to-br ${currentPresetObj.gradient} flex items-center justify-center text-white shadow-inner`}>
                            <User size={56} className="opacity-95" />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-inner">
                            <User size={56} className="opacity-95" />
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-bold gap-1">
                          <UploadCloud size={20} />
                          <span>گۆڕینی وێنە</span>
                        </div>

                        {/* Active Online Status Indicator Dot (matches screenshot) */}
                        <span 
                          className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-md ring-2 ring-emerald-500/20"
                          title="دۆخی هەژمار: سەرهێڵ و چالاک"
                        />
                      </div>

                      <input 
                        ref={profileImageInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="hidden" 
                      />

                      <button
                        type="button"
                        onClick={() => profileImageInputRef.current?.click()}
                        className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                      >
                        بارکردنی فایلی وێنە
                      </button>
                    </div>

                  </div>
                </div>

                {/* Section 1 Save Button */}
                <div className="flex justify-end pt-3">
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                    className="px-8 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    <span>{isSavingProfile ? 'پاشەکەوت دەکرێت...' : 'پاشەکەوتکردنی گۆڕانکارییەکان'}</span>
                  </button>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* SECTION 2: بەستنەوە بە Odoo API (IN THE SAME VIEW) */}
              {/* ---------------------------------------------------- */}
              <div ref={odooSectionRef} className="pt-2">
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                  
                  {/* Card Header Area */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl shadow-xs">
                        <Database size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                          بەستنەوە بە Odoo API
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          بۆ ئەوەی بتوانیت ڕاستەوخۆ بە کرتەکردن لەسەر کۆدی نامە بگەیتە ناو پەڕەی نامەکە لە Odoo.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={handleAutofillHalabja}
                        className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <Sparkles size={13} />
                        <span>پڕکردنەوەی خۆکاری Halabja ERP</span>
                      </button>

                      {hasOdooApiKey && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 size={13} />
                          <span>بەستراوەتەوە ✓</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 2x2 Form Grid (Matches screenshot layout) */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    
                    {/* Row 1 Right: Odoo URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        بەستەری (URL) Odoo
                      </label>
                      <input 
                        type="url" 
                        value={odooUrl}
                        onChange={(e) => setOdooUrl(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-left text-xs sm:text-sm"
                        dir="ltr"
                        placeholder="https://erp.halabjagroup.com"
                      />
                    </div>

                    {/* Row 1 Left: Database */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        ناوی داتابەیس (Database)
                      </label>
                      <input 
                        type="text" 
                        value={odooDb}
                        onChange={(e) => setOdooDb(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-left text-xs sm:text-sm"
                        dir="ltr"
                        placeholder="halabja_db"
                      />
                    </div>

                    {/* Row 2 Right: Odoo Username/Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        ئیمەیڵ / ناوی بەکارهێنەر (Odoo)
                      </label>
                      <input 
                        type="text" 
                        value={odooUsername}
                        onChange={(e) => setOdooUsername(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-left text-xs sm:text-sm"
                        dir="ltr"
                        placeholder="admin@example.com"
                      />
                    </div>

                    {/* Row 2 Left: API Key / Password */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          وشەی تێپەڕ / API Key
                        </label>
                        {hasOdooApiKey && (
                          <span className="text-emerald-500 text-[11px] font-semibold">
                            (پێشتر داخڵ کراوە ✓)
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          type={showOdooKey ? "text" : "password"}
                          value={odooApiKey}
                          onChange={(e) => setOdooApiKey(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-left text-xs sm:text-sm tracking-wide"
                          dir="ltr"
                          placeholder={hasOdooApiKey ? "••••••••••••••••" : "وشەی نهێنی بنووسە"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowOdooKey(!showOdooKey)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                          title={showOdooKey ? "شاردنەوە" : "پیشاندان"}
                        >
                          {showOdooKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Diagnostic Test Result Banner */}
                  {odooTestResult && (
                    <div className={`mt-5 p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-200 ${
                      odooTestResult.success 
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300'
                    }`}>
                      {odooTestResult.success ? <CheckCircle2 size={20} className="shrink-0 text-emerald-600" /> : <AlertCircle size={20} className="shrink-0 text-rose-600" />}
                      <div className="flex-1">
                        <div className="font-bold flex items-center gap-2">
                          <span>{odooTestResult.success ? 'پەیوەندی بە Odoo سەرکەوتوو بوو!' : 'پەیوەندی سەرکەوتوو نەبوو'}</span>
                          {odooTestResult.latencyMs && (
                            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-emerald-200/60 dark:bg-emerald-800/60 text-emerald-900 dark:text-emerald-100 font-bold">
                              {odooTestResult.latencyMs}ms
                            </span>
                          )}
                          {odooTestResult.uid && (
                            <span className="font-mono text-xs text-slate-500">
                              (UID: {odooTestResult.uid})
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs opacity-90">
                          {odooTestResult.message || odooTestResult.error}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Section 2 Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
                    {hasOdooApiKey ? (
                      <button
                        type="button"
                        onClick={handleDisconnectOdoo}
                        disabled={isSavingOdoo}
                        className="py-2.5 px-4 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Unlink size={14} />
                        <span>پچڕاندنی بەستنەوە</span>
                      </button>
                    ) : <div></div>}

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleTestOdooConnection}
                        disabled={isTestingOdoo || !odooUrl}
                        className="py-2.5 px-5 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-700 dark:text-blue-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        <Activity size={16} className={isTestingOdoo ? 'animate-spin' : ''} />
                        <span>{isTestingOdoo ? 'پشکنین...' : 'تاقیکردنەوەی بەستنەوە'}</span>
                      </button>

                      <button 
                        type="button"
                        onClick={handleSaveOdoo}
                        disabled={isSavingOdoo}
                        className="py-2.5 px-6 bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Database size={16} />
                        <span>{isSavingOdoo ? 'پاشەکەوت دەکرێت...' : 'پاشەکەوتکردنی بەستنەوە'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: ڕووکار و دڵخوازەکان (APPEARANCE & PREFERENCES) */}
          {/* ========================================================= */}
          {activeTab === 'appearance' && (
            <div className="animate-in fade-in duration-300 space-y-6">
              
              {/* Theme Mode Selector */}
              <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <Palette size={18} className="text-blue-500" />
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    دۆخی ڕەنگ (Theme Mode)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 ${
                      theme === 'light' 
                        ? 'border-blue-500 bg-white dark:bg-slate-800 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20' 
                        : 'border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                      <Sun size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-white">ڕووناک (Light)</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">دیزاینی ڕووناک و گونجاو بۆ ڕۆژ</div>
                    </div>
                    {theme === 'light' && <CheckCircle2 size={16} className="text-blue-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 ${
                      theme === 'dark' 
                        ? 'border-blue-500 bg-white dark:bg-slate-800 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20' 
                        : 'border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                      <Moon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-white">تاریک (Dark)</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">تایبەت بە شەو و کەمکردنەوەی ماندووبوونی چاو</div>
                    </div>
                    {theme === 'dark' && <CheckCircle2 size={16} className="text-blue-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('system')}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 ${
                      theme === 'system' 
                        ? 'border-blue-500 bg-white dark:bg-slate-800 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20' 
                        : 'border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300">
                      <Monitor size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-white">سیستەم (System)</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">هاوشێوەی کاتی کۆمپیوتەرەکەت دەگۆڕێت</div>
                    </div>
                    {theme === 'system' && <CheckCircle2 size={16} className="text-blue-500" />}
                  </button>
                </div>
              </div>

              {/* Presentation & Refresh Preferences */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Presentation Style */}
                <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    شێوازی بنەڕەتیی پێشکەشکردن
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                    کاتێک دوگمەی پێشکەشکردن دەکرێتەوە، کام شێواز لە پێشینە بێت:
                  </p>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPresentationDefault('classic');
                        localStorage.setItem('badwadachoon_presentation_mode', 'classic');
                        showToast('شێوازی پێشکەشکردن گۆڕدرا بۆ کلاسیک', 'info');
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        presentationDefault === 'classic'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      ئاسایی (Classic 📊)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPresentationDefault('prezi');
                        localStorage.setItem('badwadachoon_presentation_mode', 'prezi');
                        showToast('شێوازی پێشکەشکردن گۆڕدرا بۆ مۆدێرن (Prezi)', 'info');
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        presentationDefault === 'prezi'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      مۆدێرن (Prezi 🌌)
                    </button>
                  </div>
                </div>

                {/* Auto Refresh Interval */}
                <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                    <RefreshCw size={13} className="text-blue-500" />
                    <span>خۆنوێکردنەوەی خۆکاری داتابەیس</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                    کاتی پشکنینی گۆڕانکارییە نوێیەکانی نامەکان:
                  </p>

                  <select
                    value={autoRefreshInterval}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAutoRefreshInterval(val);
                      localStorage.setItem('badwadachoon_refresh_interval', String(val));
                      showToast(val > 0 ? `خۆنوێکردنەوە دیاریکرا: هەموو ${val} چرکە` : 'خۆنوێکردنەوە ناچالاک کرا', 'info');
                    }}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>ناچالاککراو (تەنها بە دەست نوێبکرێتەوە)</option>
                    <option value={30}>هەموو ٣٠ چرکە جارێک</option>
                    <option value={60}>هەموو ١ خولەک جارێک</option>
                    <option value={300}>هەموو ٥ خولەک جارێک</option>
                    <option value={600}>هەموو ١٠ خولەک جارێک</option>
                  </select>
                </div>

              </div>

              {/* Sound Feedback Toggle & Test Chime */}
              <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400">
                    {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      دەنگی کارلێکەکانی سیستم (UI Sounds)
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      لێدانی دەنگ لە کاتی کۆپیکردن، پاشەکەوتکردن و تەواوکردنی کارەکان
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => playNotificationSound('chime')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
                  >
                    تاقیکردنەوەی دەنگ 🔔
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const next = !soundEnabled;
                      setSoundEnabled(next);
                      localStorage.setItem('badwadachoon_sound_enabled', String(next));
                      if (next) playNotificationSound('success');
                      showToast(next ? 'دەنگی سیستم چالاک کرا' : 'دەنگی سیستم بێدەنگ کرا', 'info');
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      soundEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-sm ${
                      soundEnabled ? 'right-1' : 'right-6'
                    }`} />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: ئاسایش و دانیشتنەکان (SECURITY & SESSIONS) */}
          {/* ========================================================= */}
          {activeTab === 'security' && (
            <div className="animate-in fade-in duration-300 space-y-6">
              
              {/* Change Password Card */}
              <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                    <KeyRound size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">
                      گۆڕینی تێپەڕەوشەی هەژمار
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      بۆ پاراستنی هەژمارەکەت، دەتوانیت تێپەڕەوشەیەکی نوێ و بەهێز دیاری بکەیت:
                    </p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      تێپەڕەوشەی ئێستا (Current Password)
                    </label>
                    <div className="relative">
                      <input 
                        type={showCurrentPass ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-800 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="تێپەڕەوشەی ئێستات بنووسە"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      تێپەڕەوشەی نوێ (New Password)
                    </label>
                    <div className="relative">
                      <input 
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-800 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="کەمترین ٦ پیت یان ژمارە"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {newPassword && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
                          <span>ئاستی بەهێزی:</span>
                          <span className="font-bold">{calculatePasswordStrength(newPassword).label}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${calculatePasswordStrength(newPassword).color}`} 
                            style={{ width: `${(calculatePasswordStrength(newPassword).score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      دووپاتکردنەوەی تێپەڕەوشەی نوێ
                    </label>
                    <input 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-slate-800 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="دووبارە تێپەڕەوشە نوێیەکە بنووسەوە"
                      dir="ltr"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isChangingPass || !currentPassword || !newPassword}
                      className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-50"
                    >
                      <KeyRound size={16} />
                      <span>{isChangingPass ? 'نوێدەکرێتەوە...' : 'نوێکردنەوەی تێپەڕەوشە'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Sessions Overview */}
              <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <Laptop size={18} className="text-emerald-500" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        ئامێر و دانیشتنە چالاکەکان (Active Sessions)
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        ئەو ئامێرەی ئێستا ئەم هەژمارەی پێ کراوەتەوە:
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-lg">
                    چوونەدەرەوە
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                      <Laptop size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        ئەم ئامێرە (Windows Desktop)
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Google Chrome / Next.js Client
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>ئێستا چالاکە</span>
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: داتابەیس (DATABASE & EXCEL SERVER SYNC) */}
          {/* ========================================================= */}
          {activeTab === 'database' && hasPermission('data:upload') && (
            <div className="animate-in fade-in duration-300 space-y-6">
              
              {/* Desktop Excel Database Server Status Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-sm">
                      <FileSpreadsheet size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-800 dark:text-white text-base">سێرڤەری فایلەکانی ئێکسڵ</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                          سەرهێڵ (Online Server)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5 dir-ltr text-left select-all">
                        C:\Users\PC\Desktop\badwadachoon db files\db excel files
                      </p>
                    </div>
                  </div>
                </div>

                {excelStatus && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    {excelStatus.files?.map((f: any) => (
                      <div key={f.name} className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-100 dark:border-emerald-900/30 flex justify-between items-center shadow-2xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{f.name.replace('.xlsx', '')}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{f.rowCount} دێڕ</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleSyncToExcel}
                    disabled={isExcelSyncing}
                    className="flex-1 min-w-[160px] py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Download size={15} />
                    <span>نوێکردنەوەی فایلەکانی ئێکسڵ (Sync to Excel)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSyncFromExcel}
                    disabled={isExcelSyncing}
                    className="flex-1 min-w-[160px] py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-200 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <UploadCloud size={15} />
                    <span>بارکردنەوە لە فایلەکانی ئێکسڵ (Reload from Excel)</span>
                  </button>
                </div>

                {excelMessage && (
                  <div className="text-xs text-center font-bold py-2 px-3 rounded-xl bg-white/90 dark:bg-slate-800/90 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                    {excelMessage}
                  </div>
                )}
              </div>

              {/* Import & Export Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                    <UploadCloud size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">هاوردەکردنی داتا لە فایل</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">پشتگیری فۆرماتەکانی Excel (.xlsx) و CSV</p>
                  </div>
                  <input ref={fileInputRef} type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" />
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={isSyncing}
                    className="mt-2 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs disabled:opacity-50"
                  >
                    {isSyncing ? 'هاوردە دەکرێت...' : 'هەڵبژاردنی فایل'}
                  </button>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">هەناردەکردنی فایلی یەدەگ (Backup)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">داگرتنی کۆپییەکی تەواو لە زانیارییەکانی ئێستا بە فۆرماتی JSON</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button onClick={() => handleExport('received')} className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors">وەڵامدراوەکان</button>
                    <button onClick={() => handleExport('sent')} className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors">ڕەوانەکراوەکان</button>
                    <button onClick={() => handleExport('incoming')} className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors">هاتووەکان</button>
                    <button onClick={() => handleExport('all')} className="py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 text-xs hover:bg-blue-100 transition-colors">سەرجەم داتاکان</button>
                  </div>
                </div>
              </div>

              {/* Wipe / Reset Database Section */}
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400">سڕینەوەی تەواوی داتابەیس</h4>
                  <p className="text-[11px] text-rose-600/80 dark:text-rose-400/80">هەموو نامە هاتووەکان، ڕۆیشتووەکان و وەڵامدراوەکان دەسڕدرێنەوە</p>
                </div>
                <button
                  onClick={handleClearDatabase}
                  className="py-1.5 px-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={13} />
                  <span>سڕینەوەی هەموو</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: بەڕێوەبردنی ستاف (STAFF USER MANAGEMENT) */}
          {/* ========================================================= */}
          {activeTab === 'approvals' && hasPermission('users:manage') && (
            <div className="animate-in fade-in duration-300">
              <UserManagement />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
