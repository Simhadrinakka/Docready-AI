"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  LogOut,
  Settings,
  HelpCircle,
  Calendar,
  Languages,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardAnalysis } from "./DashboardAnalysisContext";

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export default function DashboardHeader({ setMobileOpen }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, toggleTheme, theme } = useDashboardAnalysis();
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const isHindi = language === "hi";

  // Build breadcrumbs mapping
  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    return parts.map((part, index) => {
      const href = "/" + parts.slice(0, index + 1).join("/");
      let label = part.charAt(0).toUpperCase() + part.slice(1);
      
      // Formatting specific labels
      if (part === "schemes") label = isHindi ? "योजनाएं" : "Government Schemes";
      if (part === "upload") label = isHindi ? "अपलोड" : "Upload Workspace";
      if (part === "analysis") label = isHindi ? "विश्लेषण" : "AI Verification";
      if (part === "reports") label = isHindi ? "रिपोर्ट" : "Reports History";
      if (part === "settings") label = isHindi ? "सेटिंग्स" : "Portal Settings";
      if (part === "dashboard") label = isHindi ? "मुख्य पृष्ठ" : "Dashboard";

      return { href, label };
    });
  };

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const today = new Date();
    setCurrentDateStr(today.toLocaleDateString(language === "hi" ? "hi-IN" : "en-US", options));
  }, [language]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Redirect to schemes tab with search parameter
      router.push(`/dashboard/schemes?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 dark:border-slate-800/80 dark:bg-slate-950/80 sticky top-0 z-30 backdrop-blur-md">
      {/* Mobile Toggle & Path Breadcrumbs */}
      <div className="flex items-center gap-4 flex-grow max-w-xl">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors" onClick={() => router.push("/dashboard")}>
            Docready-AI
          </span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className="text-[10px] text-slate-300 dark:text-slate-700">/</span>
              <span
                onClick={() => router.push(crumb.href)}
                className={`transition-colors cursor-pointer ${
                  idx === breadcrumbs.length - 1
                    ? "text-slate-800 dark:text-slate-100 font-bold"
                    : "hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right side: Search, Date, Notifications, Theme, Language, Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Dynamic Date display */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-3 py-1.5 rounded-full">
          <Calendar className="h-3.5 w-3.5 text-emerald-500" />
          <span>{currentDateStr}</span>
        </div>

        {/* Dynamic Schemes Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-[180px] sm:max-w-xs hidden sm:block">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={isHindi ? "योजना खोजें..." : "Search schemes..."}
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs font-semibold outline-none transition-all focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-500"
          />
        </form>

        {/* Language Toggler */}
        <button
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          className="p-2 rounded-full border border-slate-200/60 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-center"
          title="Toggle Language"
        >
          <Languages className="h-4.5 w-4.5 text-slate-500 dark:text-slate-400" />
          <span className="text-[10px] font-black uppercase ml-1.5 pr-0.5 text-slate-600 dark:text-slate-300">
            {language === "en" ? "HI" : "EN"}
          </span>
        </button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative p-2 rounded-full border border-slate-200/60 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-center outline-none cursor-pointer">
            <Bell className="h-4.5 w-4.5 text-slate-500 dark:text-slate-400" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 mt-2 border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950" align="end">
            <DropdownMenuLabel className="font-bold text-xs text-slate-400 uppercase tracking-wider px-4 py-3">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-900" />
            <div className="max-h-60 overflow-y-auto">
              <div className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer border-b border-slate-100/50 dark:border-slate-900/50">
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">AI Verification Core Ready</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">The pre-screening models and field validators are initialized.</p>
                </div>
              </div>
              <div className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer border-b border-slate-100/50 dark:border-slate-900/50">
                <HelpCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Government Schemes Loaded</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">All 8 active scholarship and benefit schemes are synced from the library.</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-[1.5px] bg-slate-200 dark:bg-slate-800" />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 text-white font-black text-sm shadow-md shadow-blue-500/10">
              G
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">
                Guest User
              </span>
              <span className="text-[9px] text-slate-400 font-bold leading-none mt-1">GDS Sandbox Mode</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950" align="end">
            <DropdownMenuLabel className="font-bold text-xs text-slate-400 uppercase tracking-wider px-3 py-2">
              My Profile
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-900" />
            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
              <User className="h-4.5 w-4.5 text-slate-500" />
              <span>{isHindi ? "प्रोफ़ाइल विवरण" : "Profile Details"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer font-semibold text-slate-700 dark:text-slate-300"
            >
              <Settings className="h-4.5 w-4.5 text-slate-500" />
              <span>{isHindi ? "प्राथमिकताएं" : "Portal Preferences"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toggleTheme()}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer font-semibold text-slate-700 dark:text-slate-300"
            >
              <span className="text-slate-500 text-xs font-bold">☼/☾</span>
              <span>{isHindi ? "थीम बदलें" : `Theme: ${theme === "light" ? "Light" : "Dark"}`}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-900" />
            <DropdownMenuItem
              onClick={() => router.push("/")}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer font-bold"
            >
              <LogOut className="h-4.5 w-4.5 text-red-500" />
              <span>{isHindi ? "लॉगआउट" : "Exit Dashboard"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
