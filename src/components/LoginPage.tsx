"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useAuth } from "../context/AuthContext";
import { InteractiveHTSLogo } from "./InteractiveHTSLogo";
import { 
  KeyRound, 
  ArrowRight, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  X,
  UserPlus,
  LogIn,
  ShieldCheck,
  QrCode,
  Copy,
  Clock,
  ShieldAlert,
  Send,
  ExternalLink,
  Check
} from "lucide-react";

export const LoginPage = () => {
  // Main Tab: "email" (Account) vs "viewer" (Viewer & Guest)
  const [activeTab, setActiveTab] = useState<"email" | "viewer">("email");
  
  // Auth Mode: "login" vs "signup"
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(true);

  // 2FA Setup State (Sign Up)
  const [showTwoFactorSetupModal, setShowTwoFactorSetupModal] = useState(false);
  const [twoFactorSetupData, setTwoFactorSetupData] = useState<{ secret: string; qrCode: string; otpAuthUrl: string } | null>(null);
  const [twoFactorInputCode, setTwoFactorInputCode] = useState("");
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);
  const [twoFactorCopied, setTwoFactorCopied] = useState(false);
  const [twoFactorSubmitting, setTwoFactorSubmitting] = useState(false);

  // 2FA required on login
  const [require2FA, setRequire2FA] = useState(false);
  const [loginTotpCode, setLoginTotpCode] = useState("");

  // Viewer State
  const [viewerCode, setViewerCode] = useState("");

  // Feedback States
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OAuth Provider Status (Azure / Google)
  const [oauthStatus, setOauthStatus] = useState<{ google: boolean; azure: boolean }>({ google: true, azure: false });

  // Direct Provider Modal (for Microsoft & Google when direct email entry is preferred or OAuth not configured)
  const [providerModal, setProviderModal] = useState<null | "microsoft" | "google">(null);
  const [providerEmail, setProviderEmail] = useState("");
  const [providerPassword, setProviderPassword] = useState("");
  const [providerName, setProviderName] = useState("");
  const [providerMode, setProviderMode] = useState<"login" | "signup">("login");

  // Forgot / Reset Password State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitting, setForgotSubmitting] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [recoveryUrl, setRecoveryUrl] = useState<string | null>(null);
  const [recoveryProvider, setRecoveryProvider] = useState<string | null>(null);

  // Corporate Outlook Exchange Modal State
  const [showOutlookModal, setShowOutlookModal] = useState(false);
  const [outlookEmail, setOutlookEmail] = useState("");
  const [outlookPassword, setOutlookPassword] = useState("");
  const [showOutlookPass, setShowOutlookPass] = useState(false);
  const [outlookSubmitting, setOutlookSubmitting] = useState(false);
  const [outlookError, setOutlookError] = useState<string | null>(null);

  const { updateSession } = useAuth();

  // Load remembered email and check OAuth providers on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("badwadachoon_remembered_email");
      if (savedEmail) {
        setLoginEmail(savedEmail);
      }
    } catch {
      // ignore
    }

    // Check OAuth availability
    fetch("/api/auth/oauth-status")
      .then(res => res.json())
      .then(data => {
        if (data) setOauthStatus(data);
      })
      .catch(() => {
        setOauthStatus({ google: true, azure: false });
      });
  }, []);

  const triggerError = (msg: string) => {
    setError(msg);
    setSuccessMsg(null);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Handle Login / Sign Up Submit
  const handleEmailAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const emailTrimmed = loginEmail.trim().toLowerCase();
    if (!emailTrimmed) {
      triggerError("تکایە ناونیشانی ئیمەیڵ بنووسە");
      return;
    }

    if (!loginPassword) {
      triggerError("تکایە تێپەڕوشەکەت بنووسە");
      return;
    }

    if (authMode === "signup") {
      if (!fullName.trim()) {
        triggerError("تکایە ناوی تەواوت بنووسە");
        return;
      }
      if (loginPassword.length < 6) {
        triggerError("تێپەڕوشە دەبێت لانی کەم ٦ پیت یان ژمارە بێت");
        return;
      }
      if (loginPassword !== confirmPassword) {
        triggerError("دووبارەکردنەوەی تێپەڕوشە هاوتا نییە لەگەڵ تێپەڕوشەکە");
        return;
      }

      // Step 2: Trigger Google Authenticator Setup Modal!
      setIsSubmitting(true);
      try {
        const setupRes = await fetch("/api/auth/2fa/setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailTrimmed }),
        });

        const setupData = await setupRes.json();
        if (!setupRes.ok || !setupData.success) {
          triggerError(setupData.error || "هەڵەیەک ڕوویدا لە دروستکردنی کۆدی Google Authenticator");
          setIsSubmitting(false);
          return;
        }

        setTwoFactorSetupData({
          secret: setupData.secret,
          qrCode: setupData.qrCode,
          otpAuthUrl: setupData.otpAuthUrl,
        });
        setTwoFactorInputCode("");
        setTwoFactorError(null);
        setTwoFactorCopied(false);
        setShowTwoFactorSetupModal(true);
      } catch {
        triggerError("هەڵەیەک ڕوویدا لە پەیوەستبوون بە سێرڤەر");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Login Flow
    setIsSubmitting(true);

    try {
      if (rememberEmail) {
        localStorage.setItem("badwadachoon_remembered_email", emailTrimmed);
      } else {
        localStorage.removeItem("badwadachoon_remembered_email");
      }

      const res = await signIn("email-login", {
        email: emailTrimmed,
        password: loginPassword,
        totpCode: loginTotpCode.trim(),
        redirect: false,
      });

      if (res?.error) {
        if (res.error === "2FA_REQUIRED") {
          setRequire2FA(true);
          triggerError("تکایە کۆدی ٦ ژمارەیی ئەپی Google Authenticator بنووسە بۆ تەواوکردنی چوونەژوورەوە.");
        } else {
          triggerError(res.error);
        }
      } else if (res?.ok) {
        await updateSession();
      }
    } catch (err: any) {
      triggerError("هەڵەیەک ڕوویدا لە کاتی پەیوەستبوون. تکایە دووبارە هەوڵ بدەرەوە.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Complete Registration inside 2FA Setup Modal
  const handleCompleteSignUpWith2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFactorError(null);

    const cleanCode = twoFactorInputCode.trim().replace(/\s+/g, "");
    if (cleanCode.length !== 6) {
      setTwoFactorError("تکایە کۆدی ٦ ژمارەیی بە تەواوی بنووسە");
      return;
    }

    if (!twoFactorSetupData?.secret) {
      setTwoFactorError("کلیل بەردەست نییە. تکایە پەڕەکە دابخە و دووبارە هەوڵ بدەرەوە.");
      return;
    }

    setTwoFactorSubmitting(true);

    try {
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          email: loginEmail.trim().toLowerCase(),
          password: loginPassword,
          twoFactorSecret: twoFactorSetupData.secret,
          totpCode: cleanCode,
        }),
      });

      const regData = await regRes.json();
      if (!regRes.ok || !regData.success) {
        setTwoFactorError(regData.error || "هەڵەیەک ڕوویدا لە دروستکردنی هەژمار");
        setTwoFactorSubmitting(false);
        return;
      }

      setShowTwoFactorSetupModal(false);
      setAuthMode("login");
      setLoginPassword("");
      setConfirmPassword("");
      setRequire2FA(true);
      setLoginTotpCode("");

      if (regData.pendingApproval) {
        setSuccessMsg("هەژمارەکەت و Google Authenticator بە سەرکەوتوویی تۆمارکران! 🔒 هەژمارەکەت ئێستا لە چاوەڕوانیی پەسەندکردنی بەڕێوەبەری سەرەکییە (محمد اقبال غفار). دوای پەسەندکردن دەتوانیت بچیتە ژوورەوە.");
      } else {
        setSuccessMsg("هەژمارەکەت بە سەرکەوتوویی دروستکرا! خەریکی چوونەژوورەوەین...");
        await signIn("email-login", {
          email: loginEmail.trim().toLowerCase(),
          password: loginPassword,
          totpCode: cleanCode,
          redirect: false,
        });
        await updateSession();
      }
    } catch {
      setTwoFactorError("هەڵەیەک لە سێرڤەر ڕوویدا لە کاتی خۆتۆمارکردن.");
    } finally {
      setTwoFactorSubmitting(false);
    }
  };

  const handleCopySecret = () => {
    if (twoFactorSetupData?.secret) {
      navigator.clipboard.writeText(twoFactorSetupData.secret);
      setTwoFactorCopied(true);
      setTimeout(() => setTwoFactorCopied(false), 2500);
    }
  };

  // Handle Viewer Code Submit
  const handleViewerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!viewerCode.trim()) {
      triggerError("تکایە کۆدی بینین بنووسە");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await signIn("viewer-login", {
        code: viewerCode.trim(),
        redirect: false,
      });

      if (res?.error) {
        triggerError(res.error);
      } else if (res?.ok) {
        await updateSession();
      }
    } catch (err) {
      triggerError("هەڵەیەک ڕوویدا لە کاتی پەیوەستبوون.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Instant Guest Access
  const handleGuestSubmit = async () => {
    setError(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      const res = await signIn("guest-login", {
        redirect: false,
      });

      if (res?.ok) {
        await updateSession();
      } else if (res?.error) {
        triggerError("نەتوانرا وەک میوان بچیتە ژوورەوە");
      }
    } catch {
      triggerError("هەڵەیەک ڕوویدا لە کاتی چوونەژوورەوە وەک میوان");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Click on Microsoft 365 or Google Workspace button
  const handleProviderButtonClick = async (provider: "microsoft" | "google") => {
    setError(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    if (provider === "google") {
      try {
        // 1. Fetch CSRF token
        const csrfRes = await fetch("/api/auth/csrf");
        const { csrfToken } = await csrfRes.json();

        // 2. Request official Google OAuth authorization URL from NextAuth
        const signinRes = await fetch("/api/auth/signin/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
          },
          body: new URLSearchParams({
            csrfToken,
            callbackUrl: window.location.origin,
            json: "true",
          }),
        });

        const data = await signinRes.json();
        if (data?.url) {
          window.location.href = data.url;
          return;
        }

        // Direct NextAuth client fallback
        const res = await signIn("google", { callbackUrl: "/" });
        if (res?.url) {
          window.location.href = res.url;
          return;
        }
      } catch (err) {
        console.error("Google redirect error:", err);
      }
      // Direct fallback to Google Accounts
    } else if (provider === "microsoft") {
      setIsSubmitting(false);
      setOutlookEmail(loginEmail.includes("@halabjagroup.com") ? loginEmail : (loginEmail || ""));
      setOutlookPassword("");
      setOutlookError(null);
      setShowOutlookModal(true);
    }
  };

  // Submit Corporate Outlook Exchange Login
  const handleOutlookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOutlookError(null);

    const emailTrimmed = outlookEmail.trim().toLowerCase();
    const passwordTrimmed = outlookPassword.trim();

    if (!emailTrimmed || !emailTrimmed.includes("@")) {
      setOutlookError("تکایە ناونیشانی ئیمەیڵی دروست بنووسە");
      return;
    }

    if (!passwordTrimmed) {
      setOutlookError("تکایە تێپەڕوشەی پۆستی کۆمپانیا بنووسە");
      return;
    }

    setOutlookSubmitting(true);

    try {
      const res = await signIn("exchange-login", {
        email: emailTrimmed,
        password: passwordTrimmed,
        redirect: false,
      });

      if (res?.error) {
        setOutlookError(res.error);
        setOutlookSubmitting(false);
        return;
      }

      if (res?.ok) {
        if (rememberEmail) {
          try {
            localStorage.setItem("badwadachoon_remembered_email", emailTrimmed);
          } catch {}
        }
        setShowOutlookModal(false);
        await updateSession();
      } else {
        setOutlookError("نەتوانرا بچیتە ژوورەوە. تکایە زانیارییەکانت بپشکنەوە.");
        setOutlookSubmitting(false);
      }
    } catch (err: any) {
      setOutlookError("هەڵەیەک ڕوویدا لە کاتی پەیوەستبوون بە سێرڤەری پۆست");
      setOutlookSubmitting(false);
    }
  };

  // Submit inside Provider Modal (Direct Outlook/Gmail Sign-in or Registration)
  const handleProviderModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrimmed = providerEmail.trim();
    if (!emailTrimmed || !emailTrimmed.includes("@") || emailTrimmed.startsWith("@")) {
      triggerError("تکایە ناونیشانی ئیمەیڵی دروست بنووسە");
      return;
    }

    if (!providerPassword) {
      triggerError("تکایە تێپەڕوشە بنووسە");
      return;
    }

    if (providerMode === "signup" && !providerName.trim()) {
      triggerError("تکایە ناوی تەواوت بنووسە");
      return;
    }

    setIsSubmitting(true);

    try {
      if (providerMode === "signup") {
        setLoginEmail(emailTrimmed);
        setLoginPassword(providerPassword);
        setFullName(providerName);
        setConfirmPassword(providerPassword);
        setProviderModal(null);
        setAuthMode("signup");

        // Open 2FA setup modal directly
        const setupRes = await fetch("/api/auth/2fa/setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailTrimmed }),
        });
        const setupData = await setupRes.json();
        if (setupData.success) {
          setTwoFactorSetupData(setupData);
          setShowTwoFactorSetupModal(true);
        }
        setIsSubmitting(false);
        return;
      }

      // Sign in
      const res = await signIn("email-login", {
        email: emailTrimmed,
        password: providerPassword,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === "2FA_REQUIRED") {
          setProviderModal(null);
          setLoginEmail(emailTrimmed);
          setLoginPassword(providerPassword);
          setRequire2FA(true);
          triggerError("تکایە کۆدی ٦ ژمارەیی Google Authenticator بنووسە.");
        } else {
          triggerError(res.error);
        }
      } else if (res?.ok) {
        setProviderModal(null);
        await updateSession();
      }
    } catch (err: any) {
      triggerError("هەڵەیەک ڕوویدا لە پەیوەستبوون");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Forgot Password Modal
  const handleOpenForgotPassword = (initialEmail?: string) => {
    setForgotEmail(initialEmail || loginEmail || "");
    setForgotError(null);
    setForgotSuccess(null);
    setRecoveryUrl(null);
    setRecoveryProvider(null);
    setShowForgotPassword(true);
  };

  // Submit Password Reset via Email Dispatch
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotSuccess(null);
    setRecoveryUrl(null);
    setRecoveryProvider(null);

    const emailTrimmed = forgotEmail.trim();
    if (!emailTrimmed || !emailTrimmed.includes("@")) {
      setForgotError("تکایە ناونیشانی ئیمەیڵی دروست بنووسە");
      return;
    }

    setForgotSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailTrimmed,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setForgotError(data.error || "هەڵەیەک ڕوویدا لە ناردنی ڕێنمایی گەڕاندنەوە");
        setForgotSubmitting(false);
        return;
      }

      setForgotSuccess(data.message || "ڕێنمایی و بەستەری گەڕاندنەوە بۆ ئیمەیڵەکەت ڕەوانە کرا.");
      if (data.recoveryUrl) {
        setRecoveryUrl(data.recoveryUrl);
      }
      if (data.providerName) {
        setRecoveryProvider(data.providerName);
      }
      setForgotSubmitting(false);
    } catch (err: any) {
      setForgotError("هەڵەیەک لە پەیوەستبوون بە سێرڤەر ڕوویدا");
      setForgotSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 w-full min-h-[120vh] flex flex-col items-center justify-center p-4 py-8" dir="rtl">
      {/* Top Interactive Logo */}
      <div className="mb-5 md:mb-7 animate-in fade-in slide-in-from-top-6 duration-1000 z-20">
        <InteractiveHTSLogo size="md" />
      </div>

      {/* Main Glass Card */}
      <div 
        className={`w-full max-w-md p-7 md:p-9 rounded-[2.5rem] backdrop-blur-3xl bg-white/75 dark:bg-slate-900/65 border border-white/60 dark:border-white/10 shadow-[0_16px_48px_0_rgba(0,0,0,0.1)] dark:shadow-[0_16px_48px_0_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both ${shake ? "animate-shake" : ""}`}
      >
        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 tracking-tight">
            {activeTab === "viewer" 
              ? "بینەر و میوان" 
              : authMode === "signup" 
                ? "خۆتۆمارکردن" 
                : "چوونەژوورەوە"}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
            سیستەمی بەدواداچوونی نامە و داواکارییەکان &bull; HTS
          </p>
        </div>

        {/* 2-Segmented Tab Control (Account vs Viewer) */}
        <div className="grid grid-cols-2 p-1.5 mb-6 bg-slate-200/60 dark:bg-slate-800/80 rounded-2xl backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => { setActiveTab("email"); setError(null); setSuccessMsg(null); }}
            className={`py-2.5 px-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "email"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/10 border border-slate-100 dark:border-slate-800"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Mail size={16} />
            <span>ئیمەیڵ و هەژمار</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("viewer"); setError(null); setSuccessMsg(null); }}
            className={`py-2.5 px-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "viewer"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10 border border-slate-100 dark:border-slate-800"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <User size={16} />
            <span>بینەر و میوان</span>
          </button>
        </div>

        {/* Notifications (Error / Success) */}
        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={17} className="shrink-0 text-rose-600 dark:text-rose-400" />
            <span className="leading-relaxed whitespace-pre-line">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={17} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="leading-relaxed whitespace-pre-line">{successMsg}</span>
          </div>
        )}

        {/* Tab 1: Account (Log In / Sign Up) */}
        {activeTab === "email" ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Login vs Sign Up Mode Switcher */}
            <div className="flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 mb-2">
              <button
                type="button"
                onClick={() => { setAuthMode("login"); setError(null); setSuccessMsg(null); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === "login"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <LogIn size={13} />
                <span>چوونەژوورەوە (Log In)</span>
              </button>

              <button
                type="button"
                onClick={() => { setAuthMode("signup"); setError(null); setSuccessMsg(null); setRequire2FA(false); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === "signup"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <UserPlus size={13} />
                <span>خۆتۆمارکردن (Sign Up)</span>
              </button>
            </div>

            <form onSubmit={handleEmailAuthSubmit} className="space-y-3.5">
              {/* Full Name field (Sign Up only) */}
              {authMode === "signup" && (
                <div className="space-y-1.5 text-right animate-in fade-in duration-200">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1 flex items-center gap-1.5">
                    <User size={13} className="text-blue-500" />
                    <span>ناوی تەواو (Full Name):</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ناوی بەکارهێنەر..."
                    required={authMode === "signup"}
                    className="w-full bg-white/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-2.5 px-4 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-sm font-semibold"
                  />
                </div>
              )}

              {/* Email field */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1 flex items-center gap-1.5">
                  <Mail size={13} className="text-blue-500" />
                  <span>ناونیشانی ئیمەیڵ:</span>
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@halabjagroup.com"
                  autoFocus
                  required
                  className="w-full bg-white/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-2.5 px-4 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-sm font-mono text-left"
                />
              </div>

              {/* Password field */}
              <div className="space-y-1.5 text-right">
                <div className="flex items-center justify-between mr-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lock size={13} className="text-blue-500" />
                    <span>تێپەڕوشە (Password):</span>
                  </label>
                  {authMode === "login" ? (
                    <span className="text-[11px] text-slate-400">تێپەڕوشە</span>
                  ) : (
                    <span className="text-[11px] text-slate-400">کەمترین ٦ پیت/ژمارە</span>
                  )}
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-2.5 pr-4 pl-11 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-sm font-mono text-left"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 cursor-pointer"
                    title={showPassword ? "شاردنەوەی تێپەڕوشە" : "پیشاندانی تێپەڕوشە"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up only) */}
              {authMode === "signup" && (
                <div className="space-y-1.5 text-right animate-in fade-in duration-200">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1 flex items-center gap-1.5">
                    <Lock size={13} className="text-blue-500" />
                    <span>دووبارەکردنەوەی تێپەڕوشە:</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required={authMode === "signup"}
                    className="w-full bg-white/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-2.5 px-4 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-sm font-mono text-left"
                  />
                </div>
              )}

              {/* 2FA Input (When required on Login) */}
              {authMode === "login" && require2FA && (
                <div className="space-y-1.5 text-right animate-in fade-in zoom-in-95 duration-200 bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-300 dark:border-emerald-800">
                  <div className="flex items-center justify-between mr-1">
                    <label className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      <span>کۆدی Google Authenticator (2FA):</span>
                    </label>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">٦ ژمارەیی</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    dir="ltr"
                    maxLength={6}
                    value={loginTotpCode}
                    onChange={(e) => setLoginTotpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    autoFocus
                    required
                    className="w-full bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-xl py-2.5 px-3 text-emerald-900 dark:text-emerald-100 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all text-center font-mono text-xl tracking-[0.35em] font-bold"
                  />
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mr-1 leading-relaxed">
                    ئەپی Google Authenticator لە مۆبایلەکەت بکەرەوە و کۆدە نوێیەکە بنووسە.
                  </p>
                </div>
              )}

              {/* Remember Me Checkbox & Forgot Password Link (Login only) */}
              {authMode === "login" && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                    <input
                      type="checkbox"
                      checked={rememberEmail}
                      onChange={(e) => setRememberEmail(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    />
                    <span>لەبیر نەچێت</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleOpenForgotPassword()}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <KeyRound size={13} />
                    <span>تێپەڕوشەم لەبیرچووە؟</span>
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !loginEmail || !loginPassword || (authMode === "signup" && (!fullName || !confirmPassword))}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/25 disabled:opacity-50 text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>خەریکی جێبەجێکردن...</span>
                  </div>
                ) : authMode === "signup" ? (
                  <>
                    <ShieldCheck size={18} />
                    <span>بەردەوامبوون بۆ بەستنەوەی Google Authenticator</span>
                    <ArrowRight size={17} className="rotate-180" />
                  </>
                ) : (
                  <>
                    <span>چوونەژوورەوە بۆ هەژمار</span>
                    <ArrowRight size={18} className="rotate-180" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Mode Link */}
            <div className="text-center pt-1">
              {authMode === "login" ? (
                <button
                  type="button"
                  onClick={() => { setAuthMode("signup"); setError(null); setSuccessMsg(null); setRequire2FA(false); }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
                >
                  هەژمارت نییە؟ کلیک بکە بۆ خۆتۆمارکردن (Sign Up)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => { setAuthMode("login"); setError(null); setSuccessMsg(null); }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
                >
                  پێشتر هەژمارت دروستکردووە؟ کلیک بکە بۆ چوونەژوورەوە (Log In)
                </button>
              )}
            </div>

            {/* SSO / Corporate Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700/60"></div>
              <span className="flex-shrink-0 mx-3 text-slate-400 dark:text-slate-500 text-xs font-medium">
                {authMode === "signup" ? "یان خۆتۆمارکردن لە ڕێگەی" : "یان چوونەژوورەوە لە ڕێگەی"}
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700/60"></div>
            </div>

            {/* Microsoft 365 / Outlook and Google Workspace Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleProviderButtonClick("microsoft")}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs md:text-sm transition-all shadow-xs hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-750 disabled:opacity-50 cursor-pointer group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21">
                  <path fill="#f25022" d="M0 0h10v10H0z"/>
                  <path fill="#7fba00" d="M11 0h10v10H11z"/>
                  <path fill="#00a4ef" d="M0 11h10v10H0z"/>
                  <path fill="#ffb900" d="M11 11h10v10H11z"/>
                </svg>
                <span>Microsoft Outlook (mail.halabjagroup.com)</span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderButtonClick("google")}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs md:text-sm transition-all shadow-xs hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-750 disabled:opacity-50 cursor-pointer group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.654-3.343-11.303-8l-6.571 4.819C9.656 39.663 16.318 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                </svg>
                <span>Google Workspace / Gmail</span>
              </button>
            </div>
          </div>
        ) : (
          /* Tab 2: Viewer & Guest */
          <div className="space-y-4 animate-in fade-in duration-300">
            <form onSubmit={handleViewerSubmit} className="space-y-4">
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1 flex items-center gap-1.5">
                  <KeyRound size={13} className="text-emerald-500" />
                  <span>کۆدی بینەر (Viewer Code):</span>
                </label>
                <input
                  type="password"
                  dir="ltr"
                  value={viewerCode}
                  onChange={(e) => setViewerCode(e.target.value)}
                  placeholder="view2026"
                  required
                  className="w-full bg-white/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-4 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-sm font-mono text-left"
                />
                <p className="text-[11px] text-slate-400 mt-1 mr-1">
                  کۆدی پێشوەختە بۆ بینەرانی ئاسایی: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">view2026</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !viewerCode}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25 disabled:opacity-50 text-sm cursor-pointer"
              >
                <KeyRound size={16} />
                <span>چوونەژوورەوە وەک بینەر</span>
              </button>
            </form>

            {/* Guest Option */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handleGuestSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                <Sparkles size={14} className="text-amber-500" />
                <span>چوونەژوورەوەی خێرا وەک میوان (Guest Access)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Google Authenticator 2FA Setup Modal (Sign Up Step 2) */}
      {showTwoFactorSetupModal && twoFactorSetupData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md animate-in fade-in duration-200" dir="rtl">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => { setShowTwoFactorSetupModal(false); setTwoFactorError(null); }}
              className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
                  بەستنەوەی Google Authenticator (2FA)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  هەنگاوی دووەمی پاراستن بۆ تەواوکردنی خۆتۆمارکردن
                </p>
              </div>
            </div>

            {/* Error Notification */}
            {twoFactorError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-600" />
                <span>{twoFactorError}</span>
              </div>
            )}

            {/* Instructions */}
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/70 dark:border-slate-700/60 leading-relaxed">
              <p className="font-bold text-slate-800 dark:text-slate-100">ڕێنمایی بەستنەوە بە Google Authenticator:</p>
              <p>١. ئەپی <strong>Google Authenticator</strong> لە مۆبایلەکەت بکەرەوە.</p>
              <p>٢. ئەم کۆدە (QR Code) بە کامێرای ئەپەکە سکان بکە یان کلیلەکە بنووسە.</p>
              <p>٣. کۆدە ٦ ژمارەییەکەی ئەپەکە لە خوارەوە بنووسە بۆ چالاککردن.</p>
            </div>

            {/* QR Code */}
            <div className="my-4 flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200">
                <img 
                  src={twoFactorSetupData.qrCode} 
                  alt="Google Authenticator QR Code" 
                  className="w-44 h-44 object-contain"
                />
              </div>

              {/* Secret Key with Copy button */}
              <div className="mt-3 w-full flex items-center justify-between gap-2 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-mono text-xs text-slate-700 dark:text-slate-200 truncate select-all" dir="ltr">
                  {twoFactorSetupData.secret}
                </div>
                <button
                  type="button"
                  onClick={handleCopySecret}
                  className="shrink-0 px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-600 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  {twoFactorCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>{twoFactorCopied ? "کۆپیکرا" : "کۆپی"}</span>
                </button>
              </div>
            </div>

            {/* 6-digit Code Input Form */}
            <form onSubmit={handleCompleteSignUpWith2FA} className="space-y-3.5">
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>کۆدی ٦ ژمارەیی لە ئەپی Google Authenticator:</span>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">000000</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  maxLength={6}
                  value={twoFactorInputCode}
                  onChange={(e) => setTwoFactorInputCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  autoFocus
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border-2 border-blue-500 rounded-xl py-2.5 px-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-center font-mono text-xl tracking-[0.35em] font-bold"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={twoFactorSubmitting || twoFactorInputCode.trim().length !== 6}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {twoFactorSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>خەریکی تۆمارکردن...</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck size={17} />
                      <span>پشکنین و ناردنی داواکاری بۆ بەڕێوەبەر</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowTwoFactorSetupModal(false)}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer text-center"
                >
                  پاشگەزبوونەوە و دەستکاریکردنی زانیارییەکان
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Direct Microsoft / Google Modal */}
      {providerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200" dir="rtl">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setProviderModal(null)}
              className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
              {providerModal === "microsoft" ? (
                <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21">
                    <path fill="#f25022" d="M0 0h10v10H0z"/>
                    <path fill="#7fba00" d="M11 0h10v10H11z"/>
                    <path fill="#00a4ef" d="M0 11h10v10H0z"/>
                    <path fill="#ffb900" d="M11 11h10v10H11z"/>
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.654-3.343-11.303-8l-6.571 4.819C9.656 39.663 16.318 44 24 44z"/>
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                  </svg>
                </div>
              )}
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  {providerModal === "microsoft" 
                    ? "Microsoft 365 & Outlook" 
                    : "Google Workspace & Gmail"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {providerMode === "signup" ? "دروستکردنی هەژماری نوێ" : "چوونەژوورەوەی ڕاستەوخۆ"}
                </p>
              </div>
            </div>

            {/* Provider Login vs Signup Switcher */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setProviderMode("login")}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  providerMode === "login" 
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs" 
                    : "text-slate-500"
                }`}
              >
                چوونەژوورەوە
              </button>
              <button
                type="button"
                onClick={() => setProviderMode("signup")}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  providerMode === "signup" 
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs" 
                    : "text-slate-500"
                }`}
              >
                خۆتۆمارکردن (Sign Up)
              </button>
            </div>

            {/* Provider Form */}
            <form onSubmit={handleProviderModalSubmit} className="space-y-3.5">
              {providerMode === "signup" && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">ناوی تەواو:</label>
                  <input
                    type="text"
                    value={providerName}
                    onChange={(e) => setProviderName(e.target.value)}
                    placeholder="ناوی بەکارهێنەر..."
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {providerModal === "microsoft" ? "ئیمەیڵی مایکرۆسۆفت / ئاوتلوک:" : "ئیمەیڵی گووگڵ / جیمەیڵ:"}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={providerEmail}
                  onChange={(e) => setProviderEmail(e.target.value)}
                  placeholder={providerModal === "microsoft" ? "user@halabjagroup.com" : "user@gmail.com"}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3.5 text-sm font-mono text-left text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">تێپەڕوشە (Password):</label>
                <input
                  type="password"
                  dir="ltr"
                  value={providerPassword}
                  onChange={(e) => setProviderPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3.5 text-sm font-mono text-left text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !providerEmail || !providerPassword}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : providerMode === "signup" ? (
                  <>
                    <ShieldCheck size={16} />
                    <span>بەردەوامبوون بۆ 2FA</span>
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>چوونەژوورەوە</span>
                  </>
                )}
              </button>
            </form>

            {providerMode === "login" && (
              <div className="mt-2.5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    const currentP = providerEmail && !providerEmail.startsWith("@") ? providerEmail : undefined;
                    setProviderModal(null);
                    handleOpenForgotPassword(currentP);
                  }}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-bold flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <KeyRound size={13} />
                  <span>تێپەڕوشەکەت لەبیرچووە؟ کلیک بکە بۆ گەڕاندنەوە</span>
                </button>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[11px] text-slate-400">
                سیستەمی بەدواداچوونی نامەکان &bull; Halabja Group ERP
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Corporate Outlook Exchange Modal */}
      {showOutlookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200" dir="rtl">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => { setShowOutlookModal(false); setOutlookError(null); }}
              className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 21 21">
                  <path fill="#f25022" d="M0 0h10v10H0z"/>
                  <path fill="#7fba00" d="M11 0h10v10H11z"/>
                  <path fill="#00a4ef" d="M0 11h10v10H0z"/>
                  <path fill="#ffb900" d="M11 11h10v10H11z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
                  چوونەژوورەوە بە پۆستی کۆمپانیا
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5 font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>mail.halabjagroup.com (Exchange OWA)</span>
                </p>
              </div>
            </div>

            {/* Error Message */}
            {outlookError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0 text-rose-600" />
                <span>{outlookError}</span>
              </div>
            )}

            {/* Security Guarantee Badge */}
            <div className="mb-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-blue-800 dark:text-blue-300 text-xs flex items-start gap-2">
              <ShieldCheck size={16} className="shrink-0 text-blue-600 mt-0.5" />
              <span className="leading-relaxed">
                بۆ دڵنیایی تەواوی پاراستن، هیچ تێپەڕوشەیەک لەم پڕۆژەیەدا تۆمار ناکرێت. زانیارییەکانت ڕاستەوخۆ لە ڕێگەی سێرڤەری فەرمیی پۆستی هەڵەبجە گرووپ پشتڕاست دەکرێنەوە 🔒
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleOutlookSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1 flex items-center gap-1.5">
                  <Mail size={13} className="text-blue-500" />
                  <span>ناونیشانی پۆستی کۆمپانیا (Work Email):</span>
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={outlookEmail}
                  onChange={(e) => setOutlookEmail(e.target.value)}
                  placeholder="name@halabjagroup.com"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3.5 text-sm font-mono text-left text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between mr-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lock size={13} className="text-blue-500" />
                    <span>تێپەڕوشەی پۆستی کار (Outlook Password):</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showOutlookPass ? "text" : "password"}
                    dir="ltr"
                    value={outlookPassword}
                    onChange={(e) => setOutlookPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pr-3.5 pl-10 text-sm font-mono text-left text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOutlookPass(!showOutlookPass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                  >
                    {showOutlookPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={outlookSubmitting || !outlookEmail || !outlookPassword}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {outlookSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>خەریکی پشتڕاستکردنەوە لە سێرڤەری پۆست...</span>
                    </div>
                  ) : (
                    <>
                      <LogIn size={16} />
                      <span>چوونەژوورەوەی ڕاستەوخۆ بە پۆستی کۆمپانیا</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowOutlookModal(false)}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer text-center"
                >
                  پاشگەزبوونەوە و گەڕانەوە
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Forgot / Reset Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200" dir="rtl">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => { setShowForgotPassword(false); setForgotError(null); setForgotSuccess(null); setRecoveryUrl(null); setRecoveryProvider(null); }}
              className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 shadow-sm">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
                  گەڕاندنەوەی تێپەڕوشە لە ڕێگەی ئیمەیڵ
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  بەستەری گەڕاندنەوە بۆ ئیمەیڵی فەرمیت دەنێردرێت
                </p>
              </div>
            </div>

            {/* Notifications */}
            {forgotError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0 text-rose-600" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess && (
              <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-medium space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                  <span>نامەی گەڕاندنەوە ڕەوانە کرا</span>
                </div>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                  {forgotSuccess}
                </p>
                {recoveryUrl && (
                  <div className="pt-2">
                    <a
                      href={recoveryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <ExternalLink size={14} />
                      <span>کردنەوەی پەڕەی فەرمیی گەڕاندنەوە ({recoveryProvider || "سێرڤەری ئیمەیڵ"})</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Security Guarantee Banner */}
            {!forgotSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-blue-800 dark:text-blue-300 text-xs flex items-start gap-2">
                <ShieldCheck size={16} className="shrink-0 text-blue-600 mt-0.5" />
                <span className="leading-relaxed">
                  بۆ پاراستنی تەواوی زانیارییەکانتان، هیچ تێپەڕوشەیەک لە ناو ئەم پڕۆژەیەدا پاشەکەوت ناکرێت. ڕێنمایی گەڕاندنەوە ڕاستەوخۆ دەنێردرێتە سەر ئیمەیڵەکەتان.
                </span>
              </div>
            )}

            {/* Form */}
            {!forgotSuccess ? (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-amber-500" />
                    <span>ناونیشانی ئیمەیڵ (Email):</span>
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@halabjagroup.com یان @gmail.com"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3.5 text-sm font-mono text-left text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={forgotSubmitting || !forgotEmail}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {forgotSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>خەریکی ناردن...</span>
                      </div>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>ناردنی ڕێنمایی گەڕاندنەوە بۆ ئیمەیڵ</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer text-center"
                  >
                    پاشگەزبوونەوە و گەڕانەوە بۆ چوونەژوورەوە
                  </button>
                </div>
              </form>
            ) : (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForgotPassword(false); setForgotSuccess(null); }}
                  className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  داخستن و گەڕانەوە بۆ لاپەڕەی سەرەکی
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
