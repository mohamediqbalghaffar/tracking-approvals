"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Sparkles } from "lucide-react";

export type SystemTab = "odoo_email" | "azya";

interface SystemSlidingToggleProps {
  activeSystem: SystemTab;
  onSystemChange: (system: SystemTab) => void;
}

const TABS: { id: SystemTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "odoo_email",
    label: "ئۆدوو + ئیمەیڵ",
    icon: <Layers size={17} className="transition-transform duration-300" />,
  },
  {
    id: "azya",
    label: "ئازیا",
    icon: <Sparkles size={17} className="transition-transform duration-300" />,
  },
];

export const SystemSlidingToggle: React.FC<SystemSlidingToggleProps> = ({
  activeSystem,
  onSystemChange,
}) => {
  return (
    <div
      className="relative inline-flex items-center p-1.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-black/25 gap-1 select-none"
      dir="rtl"
    >
      {TABS.map((tab) => {
        const isActive = activeSystem === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSystemChange(tab.id)}
            className={`relative z-10 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 cursor-pointer whitespace-nowrap outline-none ${
              isActive
                ? "text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeSystemSlidingIndicator"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-xl shadow-md shadow-blue-500/30"
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 35,
                }}
              />
            )}
            <span className="relative z-20 flex items-center gap-2">
              <span className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
