"use client";

import React from "react";
import {
  LayoutDashboard,
  UploadCloud,
  Cpu,
  FileText,
  Settings,
  X,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "upload", label: "Upload Documents", icon: UploadCloud },
  { id: "analysis", label: "AI Analysis", icon: Cpu },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar({
  currentTab,
  setCurrentTab,
  mobileOpen = false,
  setMobileOpen,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-900">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <FileCheck className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
            Docready-AI
          </span>
        </div>
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
      <nav className="flex-1 space-y-1.5 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                if (setMobileOpen) setMobileOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/50 dark:hover:text-slate-200"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-900">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 p-4 dark:from-slate-900/60 dark:to-emerald-950/20">
          <h4 className="text-xs font-semibold text-blue-950 dark:text-blue-200">
            AI Ready
          </h4>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            Your educational financial aid checker status is healthy.
          </p>
        </div>
      </div>
    </aside>
  );
}
