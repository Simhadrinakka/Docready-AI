"use client";

import React from "react";
import { FileText, History } from "lucide-react";

interface RecentAnalysesProps {
  analysisResult: {
    files: Array<{
      filename: string;
      document_type: string;
      readiness: {
        status: string;
        score: number;
      };
    }>;
  } | null;
}

export default function RecentAnalyses({ analysisResult }: RecentAnalysesProps) {
  const latestAnalysis = analysisResult?.files[analysisResult.files.length - 1];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex items-center gap-3 border-b border-slate-100 p-5 sm:p-6 dark:border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><History className="h-4.5 w-4.5" /></div>
        <div><h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Analysis</h3><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Your latest document readiness check.</p></div>
      </div>
      {latestAnalysis ? (
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
            <FileText className="h-6 w-6" />
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="text-xs text-slate-400">Document Type</p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {latestAnalysis.document_type}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Status</p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {latestAnalysis.readiness.status}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Readiness Score</p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {latestAnalysis.readiness.score}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Uploaded Filename</p>
              <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                {latestAnalysis.filename}
              </p>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
