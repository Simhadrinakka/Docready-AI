"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SchemeSelector from "@/components/dashboard/SchemeSelector";
import DocumentChecklist from "@/components/dashboard/DocumentChecklist";
import UploadArea from "@/components/dashboard/UploadArea";
import RecentAnalyses from "@/components/dashboard/RecentAnalyses";
import { Button } from "@/components/ui/button";
import { Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  progress: number;
}

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState("nsp");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* Sidebar navigation */}
      <DashboardSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main panel container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <DashboardHeader setMobileOpen={setMobileOpen} />

        {/* Content body */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8">
          {/* Welcome Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                Welcome to Docready-AI
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Verify your certificates and documents for scholarship and government schemes.
              </p>
            </div>
            <div className="flex h-11 items-center gap-2 bg-blue-50 px-4 rounded-xl text-blue-700 font-semibold text-sm dark:bg-blue-950/40 dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
              AI Pre-screen Active
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Hand: Upload & Selection */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 space-y-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Document Checker Setup
                </h3>

                {/* Dropdown Selector */}
                <SchemeSelector
                  selectedScheme={selectedScheme}
                  setSelectedScheme={setSelectedScheme}
                />

                {/* Drag-and-Drop Uploader */}
                <UploadArea files={files} setFiles={setFiles} />

                {/* Primary Trigger Button */}
                <div className="pt-2">
                  <Button
                    onClick={startAnalysis}
                    disabled={isAnalyzing || files.length === 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
                  >
                    <Cpu className="h-5 w-5 animate-pulse" />
                    {isAnalyzing ? "Analyzing Documents..." : "Start AI Analysis"}
                  </Button>
                </div>

                {/* Analysis mock trigger result */}
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 dark:bg-blue-950/30 dark:border-blue-900/40 dark:text-blue-400 flex items-center gap-3"
                  >
                    <div className="h-4.5 w-4.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
                    <span className="text-xs font-semibold">
                      Running OCR scanning, name matching indices, and stamp validation audits...
                    </span>
                  </motion.div>
                )}

                {analysisResult && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-xs font-semibold">
                        Verification Complete. 4/5 documents passed. Income Certificate requires re-scan.
                      </span>
                    </div>
                    <button
                      onClick={() => setAnalysisResult(false)}
                      className="text-[10px] uppercase font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Hand: Required Documents Checklist */}
            <div className="lg:col-span-5">
              <DocumentChecklist files={files} />
            </div>
          </div>

          {/* Historical / Recent Analyses Table */}
          <RecentAnalyses />
        </main>
      </div>
    </div>
  );
}
