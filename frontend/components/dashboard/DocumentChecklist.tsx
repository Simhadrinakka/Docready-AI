"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Clock, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { getScheme } from "@/lib/schemes";

interface ChecklistItem {
  id: string;
  name: string;
  requirement: string;
  status: "completed" | "pending" | "error";
  errorText?: string;
}

interface AnalysisResult {
  files: Array<{
    document_type: string;
  }>;
  comparison: {
    missing_documents: string[];
  };
}

interface DocumentChecklistProps {
  analysisResult: AnalysisResult | null;
  selectedScheme: string;
  checkedSelfDocs?: Record<string, boolean>;
}

export default function DocumentChecklist({ analysisResult, selectedScheme, checkedSelfDocs }: DocumentChecklistProps) {
  const selectedSchemeDetails = getScheme(selectedScheme);
  const defaultItems: ChecklistItem[] = selectedSchemeDetails.documents.map((document) => ({
    id: document.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name: document.name,
    requirement: document.requirement,
    status: checkedSelfDocs?.[document.name] ? "completed" : "pending",
  }));

  const defaultItemsByName = new Map(
    defaultItems.map((item) => [item.name, item])
  );
  const uploadedDocuments = new Set(
    analysisResult?.files.map((file) => file.document_type.trim()).filter(Boolean) ?? []
  );
  const missingDocuments = new Set(
    analysisResult?.comparison.missing_documents.map((document) => document.trim()).filter(Boolean) ?? []
  );
  const checklistItems = analysisResult
    ? Array.from(
        new Set([
          ...defaultItems.map((item) => item.name),
          ...uploadedDocuments,
          ...missingDocuments,
        ])
      ).map(
        (documentName): ChecklistItem => {
          const defaultItem = defaultItemsByName.get(documentName);

          const isCompleted = uploadedDocuments.has(documentName) || !!checkedSelfDocs?.[documentName];

          return {
            id: documentName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            name: documentName,
            requirement:
              defaultItem?.requirement ??
              "Upload a clear, valid copy of this document for verification.",
            status: isCompleted ? "completed" : "pending",
          };
        }
      )
    : defaultItems;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><ListChecks className="h-4.5 w-4.5" /></div>
        <div><h3 className="text-base font-bold text-slate-900 dark:text-white">Required Documents</h3><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{selectedSchemeDetails.name}</p></div>
      </div>
      <div className="space-y-3">
        {checklistItems.map((item) => {
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-start justify-between gap-4 rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm",
                item.status === "completed" && "border-emerald-100 bg-emerald-50/40 dark:border-emerald-900/30 dark:bg-emerald-950/15",
                item.status === "pending" && "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
                item.status === "error" && "border-red-100 bg-red-50/40 dark:border-red-950/20 dark:bg-red-950/10"
              )}
            >
              <div className="flex gap-3">
                {/* Icon Indicators */}
                <div className="mt-0.5 shrink-0">
                  {item.status === "completed" && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )}
                  {item.status === "pending" && (
                    <Clock className="h-5 w-5 text-slate-400" />
                  )}
                  {item.status === "error" && (
                    <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-md">
                    {item.requirement}
                  </p>
                  {item.status === "error" && item.errorText && (
                    <p className="text-xs font-semibold text-red-600 dark:text-red-400 mt-2 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded border border-red-100/50 dark:border-red-900/30 inline-block">
                      ⚠️ {item.errorText}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={cn(
                  "text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0",
                  item.status === "completed" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400",
                  item.status === "pending" && "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
                  item.status === "error" && "bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-400"
                )}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
