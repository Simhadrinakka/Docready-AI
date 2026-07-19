"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-slate-900 overflow-hidden relative">
      {/* Background soft glow elements */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/5" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-16 text-center shadow-2xl dark:border-blue-900/40 sm:px-16"
        >
          {/* Decorative shapes inside the CTA banner */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-emerald-400/20 blur-2xl" />

          {/* Banner content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100 backdrop-blur-sm mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Try Docready-AI Today
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to submit your application with confidence?
            </h2>

            <p className="mt-6 text-lg text-blue-100 leading-relaxed">
              Join thousands of students who have secured their scholarships and
              government schemes by catching document errors before they submit.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-6 rounded-full shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
              >
                Start Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.dispatchEvent(new Event("open-docready-demo"))}
                className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-6 rounded-full flex items-center justify-center gap-2 cursor-pointer"
              >
                View Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
