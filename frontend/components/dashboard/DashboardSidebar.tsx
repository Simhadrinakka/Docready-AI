"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Landmark,
  UploadCloud,
  Cpu,
  FileText,
  Settings,
  X,
  FileCheck,
  Award,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardAnalysis } from "./DashboardAnalysisContext";

interface SidebarProps {
  currentTab: string;
  setCurrentTab?: (tab: string) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", labelHi: "डैशबोर्ड", href: "/dashboard", icon: LayoutDashboard },
  { id: "schemes", label: "Government Schemes", labelHi: "सरकारी योजनाएं", href: "/dashboard/schemes", icon: Landmark },
  { id: "upload", label: "Upload Documents", labelHi: "दस्तावेज़ अपलोड", href: "/dashboard/upload", icon: UploadCloud },
  { id: "analysis", label: "AI Analysis", labelHi: "एआई विश्लेषण", href: "/dashboard/analysis", icon: Cpu },
  { id: "reports", label: "Reports History", labelHi: "रिपोर्ट इतिहास", href: "/dashboard/reports", icon: FileText },
  { id: "settings", label: "Portal Settings", labelHi: "पोर्टल सेटिंग्स", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar({
  currentTab,
  mobileOpen = false,
  setMobileOpen,
}: SidebarProps) {
  const router = useRouter();
  const { language } = useDashboardAnalysis();
  const isHindi = language === "hi";

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shadow-sm backdrop-blur-md",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-900">
        <Link href="/" className="flex items-center gap-2" aria-label="Docready-AI homepage">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-md shadow-blue-500/20">
            <FileCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none">
              DOCREADY-AI
            </span>
            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase leading-none mt-0.5">
              Gov Verification Portal
            </span>
          </div>
        </Link>
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (setMobileOpen) setMobileOpen(false);
                router.push(item.href);
              }}
              className={cn(
                "flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer relative group",
                isActive
                  ? "bg-blue-50/80 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 shadow-sm shadow-blue-500/5"
                  : "text-slate-500 hover:bg-slate-50/50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/40 dark:hover:text-slate-200"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/3 bottom-1/3 w-1 rounded-r bg-blue-600 dark:bg-blue-400" />
              )}
              <Icon className={cn("h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-105", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400")} />
              <span>{isHindi ? item.labelHi : item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Trust & Verification Badges */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-900">
        <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 p-4">
          <div className="flex items-center gap-2 mb-1.5 text-blue-800 dark:text-blue-300 font-bold text-xs">
            <Award className="h-4 w-4 text-emerald-500" />
            <span>{isHindi ? "राष्ट्रीय सुरक्षा मानक" : "GDS Standards"}</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {isHindi 
              ? "दस्तावेज़ विश्लेषण एनडीएसजी सुरक्षा अनुपालन और यूआईडीएआई दिशानिर्देशों के तहत निष्पादित किया जाता है।"
              : "Pre-screen validation is executed locally in compliance with National Data Security standards."}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[9px] text-slate-400 font-bold tracking-wider uppercase">
            <Globe className="h-3 w-3 text-slate-400" />
            <span>Digital India Portal</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
