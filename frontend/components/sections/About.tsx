"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-white dark:bg-slate-900 relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual details */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[400px] aspect-square rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 p-8 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center dark:bg-blue-500/20 dark:text-blue-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Built on Trust and Security
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  We believe no student should miss out on life-changing
                  scholarships because of a minor clerical error, typo, or poor scan quality.
                </p>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Designed for students applying for scholarships, government schemes, educational grants, and financial aid.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Copy details */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Making Scholarship & Government Applications Error-Free
              </h2>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Applying for scholarships and government schemes is stressful.
                Rules are rigid, and even a minor mistake like a date format conflict
                or a name mismatch can result in automatic rejection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                    Fine-tuned AI Validation Engine
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Our platform is built specifically for document validation, pre-trained on rules from global scholarships, educational grants, and government schemes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                    Privacy First Architecture
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    We never sell or store your files. All documents are encrypted in transit and purged immediately after analysis.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
