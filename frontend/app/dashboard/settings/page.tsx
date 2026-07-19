"use client";

import React, { useState } from "react";
import {
  Settings,
  Sun,
  Moon,
  Languages,
  Info,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  FileCode,
  Users,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardAnalysis } from "@/components/dashboard/DashboardAnalysisContext";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { theme, toggleTheme, language, setLanguage } = useDashboardAnalysis();
  const isHindi = language === "hi";

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: isHindi ? "क्या मेरे दस्तावेज सुरक्षित हैं?" : "How secure are my uploaded documents?",
      a: isHindi 
        ? "हाँ, सभी दस्तावेज सैंडबॉक्स मोड में स्थानीय रूप से संसाधित होते हैं। हम स्थायी रूप से फ़ाइलें संग्रहीत नहीं करते हैं।"
        : "Yes. All operations run within GDS-compliant sandbox protocols. Documents are analyzed dynamically via transient API buffers and are never stored permanently."
    },
    {
      q: isHindi ? "यह पोर्टल किन दस्तावेज़ों का समर्थन करता है?" : "What document formats are supported?",
      a: isHindi 
        ? "यह पोर्टल पीडीएफ (PDF), जेपीईजी (JPEG) और पीएनजी (PNG) प्रारूपों का समर्थन करता है, अधिकतम आकार 10 एमबी है।"
        : "The platform supports PDF, JPEG, and PNG formats. File sizes must be under 10 MB per slot."
    },
    {
      q: isHindi ? "क्या नाम मिलान सख्त है?" : "How does the Identity Match Index work?",
      a: isHindi 
        ? "यह आधार और पैन जैसे विभिन्न दस्तावेज़ों में नाम फ़ील्ड की तुलना करता है और विसंगतियों के मामले में चेतावनी देता है।"
        : "The verification algorithm parses names across files, generating name match indicators. Surnames, middle names, and spacing are checked to prevent rejection."
    }
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <DashboardSidebar currentTab="settings" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader setMobileOpen={() => {}} />
        <main className="flex-grow overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.06),_transparent_32%)] p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Page Title Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-950">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Settings className="h-5 w-5 animate-spin-slow" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {isHindi ? "पोर्टल सेटिंग्स" : "Portal Settings"}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                    {isHindi 
                      ? "थीम वरीयताएँ, भाषा विकल्प और सामान्य समर्थन प्रश्न प्रबंधित करें।"
                      : "Manage theme preferences, toggle localization settings, and view diagnostic information."}
                  </p>
                </div>
              </div>
            </div>

            {/* Core Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Preferences Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800 space-y-5 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-450 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-900 pb-2">
                  <Info className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
                  {isHindi ? "प्राथमिकताएं" : "User Preferences"}
                </h3>

                {/* Theme Selector */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-850 dark:text-slate-200">
                      {isHindi ? "इंटरफ़ेस थीम" : "Interface Theme"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      {isHindi ? "डार्क या लाइट मोड बदलें" : "Toggle color scheme preference"}
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="h-10 w-16 border border-slate-200/80 hover:border-slate-350 dark:border-slate-800/80 dark:bg-slate-900 rounded-full flex items-center p-1 cursor-pointer transition-all"
                  >
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center transition-all bg-gradient-to-r from-blue-600 to-emerald-500 text-white ${
                        theme === "dark" ? "translate-x-6" : ""
                      }`}
                    >
                      {theme === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                </div>

                {/* Language Selector */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-900/50">
                  <div>
                    <p className="text-xs font-bold text-slate-850 dark:text-slate-200">
                      {isHindi ? "भाषा (Language)" : "Portal Language"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      {isHindi ? "संवाद भाषा चुनें" : "Select default communication language"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-0.5 rounded-xl">
                    <button
                      onClick={() => setLanguage("en")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        language === "en"
                          ? "bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-white"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLanguage("hi")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        language === "hi"
                          ? "bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-white"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>
              </div>

              {/* Security & Sandbox Info */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-450 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-900 pb-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                  Security & Compliance
                </h3>

                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Local Sandbox Processing</p>
                      <p className="text-[10px] text-slate-450 leading-relaxed font-semibold mt-0.5">Files undergo immediate OCR indexing in transient processes. No files are committed to persistent database storage.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">GDS Standards Compliant</p>
                      <p className="text-[10px] text-slate-450 leading-relaxed font-semibold mt-0.5">UI flows adhere strictly to government accessibility standards (contrast ratios, clean keyboard navigability, and responsive boundaries).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portal System Diagnostics */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800 md:col-span-2 space-y-4 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-450 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-900 pb-2">
                  <FileCode className="h-4.5 w-4.5 text-blue-600" />
                  System Diagnostics & Information
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Core Version</span>
                    <span className="text-slate-800 dark:text-slate-250 mt-1 block">v1.2.0-stable</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Next.js Framework</span>
                    <span className="text-slate-800 dark:text-slate-250 mt-1 block">16.2.10 (App Router)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">API Gateway</span>
                    <span className="text-slate-850 dark:text-slate-250 mt-1 block">FastAPI Sandbox</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Target Environment</span>
                    <span className="text-emerald-500 mt-1 block">Production Sandbox</span>
                  </div>
                </div>
              </div>

              {/* Support FAQs */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800 md:col-span-2 space-y-4 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-450 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-900 pb-2">
                  <HelpCircle className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
                  Frequently Asked Questions (FAQ)
                </h3>

                <div className="space-y-3.5">
                  {faqs.map((faq, idx) => {
                    const isExpanded = expandedFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-slate-100 dark:border-slate-900 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                          className="w-full text-left p-3.5 font-bold text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors flex items-center justify-between"
                        >
                          <span>{faq.q}</span>
                          <span className="text-slate-400">{isExpanded ? "−" : "+"}</span>
                        </button>
                        {isExpanded && (
                          <div className="p-3.5 bg-slate-50/40 dark:bg-slate-900/20 text-[11px] leading-relaxed text-slate-550 border-t border-slate-100 dark:border-slate-900">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
