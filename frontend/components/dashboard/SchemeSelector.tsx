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
import { schemes } from "@/lib/schemes";

interface SchemeSelectorProps {
  selectedScheme: string;
  setSelectedScheme: (scheme: string) => void;
}

export default function SchemeSelector({ selectedScheme, setSelectedScheme }: SchemeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Select government scheme
      </label>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-blue-400">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="flex-grow">
          <Select value={selectedScheme} onValueChange={(value) => value && setSelectedScheme(value)}>
            <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white text-sm shadow-sm outline-none transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <SelectValue placeholder="Select a scheme" />
            </SelectTrigger>
            <SelectContent className="border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
              {(["Central", "State"] as const).map((category) => (
                <React.Fragment key={category}>
                  <p className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {category} Government
                  </p>
                  {schemes.filter((scheme) => scheme.category === category).map((scheme) => (
                    <SelectItem key={scheme.id} value={scheme.id} className="cursor-pointer rounded-lg py-2.5 text-slate-700 hover:bg-slate-50 focus:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900">
                      <div className="flex flex-col">
                        <span>{scheme.name}</span>
                        <span className="mt-0.5 text-[10px] text-slate-400">{scheme.authority}</span>
                      </div>
                    </SelectItem>
                  ))}
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
