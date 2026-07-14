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
  Scan,
  ShieldAlert,
  UserRoundCheck,
  Gauge,
  Lightbulb,
  FileDown,
} from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "OCR Document Reader",
    description:
      "Instantly digitize transcripts, certificates, and passports. Identifies unreadable text, blurry scans, and clipping issues before submission.",
    badge: "Advanced OCR",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100 dark:border-blue-900/40",
  },
  {
    icon: ShieldAlert,
    title: "AI Validation",
    description:
      "Checks documents against complex scholarship rules, government guidelines, and formatting criteria (e.g., date formats, seals, signatures).",
    badge: "Smart Validation",
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40",
  },
  {
    icon: UserRoundCheck,
    title: "Name Matching",
    description:
      "Cross-references applicant names across passports, recommendation letters, and transcripts to detect typos or missing middle names.",
    badge: "Identity Check",
    color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400 border-purple-100 dark:border-purple-900/40",
  },
  {
    icon: Gauge,
    title: "Readiness Score",
    description:
      "Calculates a comprehensive readiness score showing your probability of passing initial document checks successfully.",
    badge: "Probability Gauge",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900/40",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description:
      "Provides granular, actionable instructions on how to resolve document issues, from translation updates to re-scanning recommendations.",
    badge: "AI Consulting",
    color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/40",
  },
  {
    icon: FileDown,
    title: "Download Report",
    description:
      "Export a shareable, detailed PDF audit report outlining your document statuses, detected errors, and correction guidelines.",
    badge: "Shareable PDF",
    color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 border-rose-100 dark:border-rose-900/40",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 lg:py-32 bg-white dark:bg-slate-900 relative"
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
            Powerful Features Built for Absolute Accuracy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 dark:text-slate-400"
          >
            Docready-AI leaves no room for human error. Rest easy knowing our AI
            checks every detail against global standards.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full border border-slate-200/80 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-slate-700">
                  <CardHeader className="p-6 pb-4">
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-xl border ${feature.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-full">
                        {feature.badge}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
