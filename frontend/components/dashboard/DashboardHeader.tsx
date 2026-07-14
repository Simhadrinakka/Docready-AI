"use client";

import React from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export default function DashboardHeader({ setMobileOpen }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950/80 sticky top-0 z-30 backdrop-blur-md">
      {/* Mobile Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative max-w-md hidden sm:block w-full">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents, schemes..."
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-500"
          />
        </div>
      </div>

      {/* Notifications & Profile Dropdown */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950" />
        </button>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 text-white font-bold text-sm shadow-md shadow-blue-500/10">
              G
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Guest User
              </span>
              <span className="text-[10px] text-slate-400">No Login Required</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950" align="end">
            <DropdownMenuLabel className="font-bold text-xs text-slate-400 uppercase tracking-wider px-3 py-2">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-900" />
            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
              <User className="h-4.5 w-4.5 text-slate-500" />
              <span>Profile Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
              <Settings className="h-4.5 w-4.5 text-slate-500" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
              <HelpCircle className="h-4.5 w-4.5 text-slate-500" />
              <span>Get Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-900" />
            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer">
              <LogOut className="h-4.5 w-4.5 text-red-500" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
