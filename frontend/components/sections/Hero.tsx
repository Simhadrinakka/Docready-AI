"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Play,
  ArrowRight,
  FileCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white py-20 lg:py-32 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
    >
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] dark:opacity-20" />

      {/* Decorative Glows */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />
      <div className="absolute top-1/3 left-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/5" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-6 inline-flex items-center gap-1.5 border-blue-200 bg-blue-50/50 px-3 py-1 text-sm font-medium text-blue-700 dark:border-blue-800/30 dark:bg-blue-950/30 dark:text-blue-400"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Next-Gen Application Pre-screening
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
            >
              Never Get Rejected for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Missing Documents
              </span>{" "}
              Again.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0"
            >
              Docready-AI analyzes scholarship and government application
              documents using AI before submission, helping students identify
              missing files, unreadable scans, and inconsistencies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8 py-6 text-base rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group cursor-pointer w-full"
                >
                  Analyze Documents
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 hover:bg-slate-50 font-semibold px-8 py-6 text-base rounded-full text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current text-slate-700 dark:text-slate-300" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trusted trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-slate-200/60 dark:border-slate-800/40 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-slate-500 dark:text-slate-400"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Supercharging applications for:
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-bold tracking-wide justify-center lg:justify-start text-xs sm:text-sm">
                <span>Scholarships</span>
                <span>•</span>
                <span>Government Schemes</span>
                <span>•</span>
                <span>Educational Grants</span>
                <span>•</span>
                <span>Financial Aid</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Illustration with subtle CSS animations */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[450px] aspect-square"
            >
              {/* Main Container Glassmorphism Dashboard Mock */}
              <div className="w-full h-full rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md p-6 shadow-2xl dark:border-slate-800/80 dark:bg-slate-900/70 flex flex-col justify-between overflow-hidden">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    docready-ai-v1.0.4
                  </span>
                </div>

                {/* Analysis Area */}
                <div className="flex-1 py-4 flex flex-col gap-4">
                  {/* Item 1: Document OCR Analysis */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-slate-800 relative overflow-hidden group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Transcript_Official.pdf
                        </p>
                        <p className="text-[10px] text-slate-400">
                          OCR Scanning & Formatting
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Item 2: Warning Alert (Missing Document / Scan Issue) */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-800/40 relative overflow-hidden">
                    {/* Hover scanner line */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-amber-400/50 animate-bounce" />
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                          Passport_Copy.jpg
                        </p>
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                          Incomplete stamp or sign scan
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none text-[10px]">
                      Fix Required
                    </Badge>
                  </div>

                  {/* Item 3: Name match checked */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Cross-Document Name Verification
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Verification Match Index: 100%
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  </div>
                </div>

                {/* Score section (Bottom part of dashboard mockup) */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Overall Readiness Score
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                      94% - Very High
                    </span>
                  </div>
                  {/* Gauge indicator */}
                  <div className="relative h-12 w-12 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        className="stroke-slate-100 dark:stroke-slate-800 fill-transparent"
                        strokeWidth="4"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        className="stroke-emerald-500 fill-transparent"
                        strokeWidth="4"
                        strokeDasharray="125"
                        strokeDashoffset="7"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      94%
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Speed */}
              <div className="absolute -top-4 -left-4 rounded-xl border border-slate-200/50 bg-white p-3 shadow-lg flex items-center gap-2 dark:border-slate-800 dark:bg-slate-950 animate-bounce [animation-duration:4s]">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  ⚡ 95% Faster Check
                </span>
              </div>

              {/* Floating Badge 2: AI Check */}
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-slate-200/50 bg-white p-3 shadow-lg flex items-center gap-2 dark:border-slate-800 dark:bg-slate-950 animate-bounce [animation-duration:5s]">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  🤖 Guarded by AI
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
