"use client";

import React from "react";
import { FileText } from "lucide-react";

export default function RecentAnalyses() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/40 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Analyses
        </h3>
      </div>
      <div className="p-16 flex flex-col items-center justify-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-900 dark:text-slate-500 mb-4 border border-slate-100 dark:border-slate-800">
          <FileText className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          No analyses yet
        </p>
        <p className="text-xs text-slate-400 mt-1 max-w-[240px] leading-normal">
          Upload documents to get started.
        </p>
      </div>
    </div>
  );
}
