"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  name: string;
  requirement: string;
  status: "ready" | "pending" | "error";
  errorText?: string;
}

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  progress: number;
  rawFile?: File;
}

interface DocumentChecklistProps {
  files: UploadedFile[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function DocumentChecklist({ files }: DocumentChecklistProps) {
  const defaultItems: ChecklistItem[] = [
    {
      id: "aadhaar",
      name: "Aadhaar Card",
      requirement: "Clear scan showing full 12-digit number, name matches spelling exactly.",
      status: "pending",
    },
    {
      id: "income",
      name: "Income Certificate",
      requirement: "Issued by competent authority, must be valid for the current fiscal year.",
      status: "pending",
    },
    {
      id: "bonafide",
      name: "Bonafide Certificate",
      requirement: "Original copy printed on college letterhead, signed by Principal/Director.",
      status: "pending",
    },
    {
      id: "passbook",
      name: "Bank Passbook",
      requirement: "Scan of first page showing account number, IFSC code, and holder name.",
      status: "pending",
    },
    {
      id: "photo",
      name: "Passport-size Photo",
      requirement: "Recent color photo against a light/white background. Format must be JPG.",
      status: "pending",
    },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
        Required Documents Checklist
      </h3>
      <div className="space-y-4">
        {defaultItems.map((item) => {
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-start justify-between gap-4 p-4 rounded-xl border transition-all duration-200",
                item.status === "ready" && "border-slate-100 bg-slate-50/50 dark:border-slate-800/40 dark:bg-slate-950/20",
                item.status === "pending" && "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
                item.status === "error" && "border-red-100 bg-red-50/40 dark:border-red-950/20 dark:bg-red-950/10"
              )}
            >
              <div className="flex gap-3">
                {/* Icon Indicators */}
                <div className="mt-0.5 shrink-0">
                  {item.status === "ready" && (
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
                  item.status === "ready" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400",
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
