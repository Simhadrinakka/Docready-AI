"use client";

import React from "react";
import { motion } from "framer-motion";
import { ListFilter, UploadCloud, Cpu, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ListFilter,
    title: "Choose Scheme",
    description:
      "Select the specific scholarship, government scheme, or financial aid you are applying for.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    number: "02",
    icon: UploadCloud,
    title: "Upload Documents",
    description:
      "Securely upload your PDFs and image files using our fast, drag-and-drop system.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: Cpu,
    title: "AI Analysis",
    description:
      "Our fine-tuned LLM and OCR engine scans for errors, names, and clarity in seconds.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    number: "04",
    icon: Download,
    title: "Download Report",
    description:
      "Download a comprehensive report detailing issues to correct before submission.",
    color: "from-orange-500 to-rose-500",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-950/40 relative overflow-hidden"
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
            How Docready-AI Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 dark:text-slate-400"
          >
            A simple, four-step check to ensure your application gets approved
            with zero formatting hassles.
          </motion.p>
        </div>

        {/* Steps Timeline Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-slate-200/80 -translate-y-12 hidden lg:block dark:bg-slate-800" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step bubble and number */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute -top-3 -right-3 text-sm font-extrabold text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
                      {step.number}
                    </span>
                    <div className={`h-24 w-24 rounded-3xl bg-gradient-to-br ${step.color} p-[1px] shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className="h-full w-full rounded-3xl bg-white dark:bg-slate-950 flex items-center justify-center text-slate-800 dark:text-slate-200">
                        <Icon className="h-8 w-8 text-blue-600 dark:text-emerald-400" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-[240px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
