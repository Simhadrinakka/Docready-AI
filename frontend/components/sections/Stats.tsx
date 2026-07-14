"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Database, Layers } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: "95%",
    label: "Faster Verification",
    description: "Get real-time feedback on your documents in under 60 seconds.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    value: "Multi-Doc",
    label: "Cross-Analysis",
    description: "Verify inconsistencies in names, dates, and details across all files.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Database,
    value: "AI-Powered",
    label: "Context Engine",
    description: "Deep learning models tailored for scholarship and government scheme standards.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Secure & Private",
    description: "Bank-grade encryption. Your documents are deleted after scanning.",
    color: "from-rose-500 to-orange-500",
  },
];

export default function Stats() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-slate-800/60 dark:bg-slate-900/60"
              >
                {/* Background soft glow on hover */}
                <div className={`absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-0 blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />

                <div>
                  <div className={`inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-3 text-white shadow-sm`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                      {stat.value}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                      {stat.label}
                    </h3>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
