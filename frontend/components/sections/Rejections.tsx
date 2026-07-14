"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FileMinus,
  EyeOff,
  UserX,
  CalendarOff,
  FileWarning,
  PenTool,
  AlertCircle,
} from "lucide-react";

const rejections = [
  {
    icon: FileMinus,
    title: "Missing Documents",
    description: "Leaving out key transcripts, recommendation letters, or ID scans completely disqualifies your file.",
    color: "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 border-red-100 dark:border-red-900/40",
  },
  {
    icon: EyeOff,
    title: "Blurry Document Scan",
    description: "Unreadable text or low-contrast scans prevent optical verification, leading to instant admin rejection.",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900/40",
  },
  {
    icon: UserX,
    title: "Name Mismatch",
    description: "Inconsistent spelling of your name across passport, degrees, and references flags verification failure.",
    color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 border-rose-100 dark:border-rose-900/40",
  },
  {
    icon: CalendarOff,
    title: "Expired Certificate",
    description: "Submitting language test scores (like IELTS/TOEFL) or reference letters past their validity duration.",
    color: "text-orange-600 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400 border-orange-100 dark:border-orange-900/40",
  },
  {
    icon: FileWarning,
    title: "Wrong File Format",
    description: "Uploading .docx or raw image formats when the scheme explicitly requests single consolidated PDF files.",
    color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/40 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/40",
  },
  {
    icon: PenTool,
    title: "Missing Signature",
    description: "Forgetting to sign application declarations, CVs, or statement forms before uploading.",
    color: "text-destructive bg-destructive/10 dark:bg-destructive/20 dark:text-red-400 border-red-100/50 dark:border-red-900/20",
  },
];

export default function Rejections() {
  return (
    <section
      id="rejections"
      className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-900 relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            Common Reasons Applications Get Rejected
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 dark:text-slate-400"
          >
            Don&apos;t let months of hard work go to waste due to simple admin errors.
          </motion.p>
        </div>

        {/* Rejections Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rejections.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full border border-red-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 dark:border-red-950/40 dark:bg-slate-900/60">
                  <CardHeader className="p-6 pb-3 flex flex-row items-center gap-4 space-y-0">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer highlight tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
            Docready-AI detects these issues before you submit.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
