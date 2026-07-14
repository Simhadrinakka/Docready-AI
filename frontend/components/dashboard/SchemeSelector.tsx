"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap } from "lucide-react";

interface SchemeSelectorProps {
  selectedScheme: string;
  setSelectedScheme: (scheme: string) => void;
}

const schemes = [
  { id: "nsp", name: "NSP Scholarship" },
  { id: "yasasvi", name: "PM YASASVI" },
  { id: "state", name: "State Scholarship" },
  { id: "minority", name: "Minority Scholarship" },
  { id: "loan", name: "Education Loan" },
  { id: "other", name: "Other" },
];

export default function SchemeSelector({
  selectedScheme,
  setSelectedScheme,
}: SchemeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Choose Scholarship / Scheme
      </label>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-blue-400">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="flex-grow">
          <Select value={selectedScheme} onValueChange={(val) => val && setSelectedScheme(val)}>
            <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm outline-none text-sm dark:border-slate-800 dark:bg-slate-950">
              <SelectValue placeholder="Select a scheme" />
            </SelectTrigger>
            <SelectContent className="border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
              {schemes.map((scheme) => (
                <SelectItem
                  key={scheme.id}
                  value={scheme.id}
                  className="rounded-lg py-2.5 text-slate-700 hover:bg-slate-50 focus:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900 cursor-pointer"
                >
                  {scheme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
