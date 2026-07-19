"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  GraduationCap,
  Briefcase,
  Heart,
  Landmark,
  Building2,
  Calendar,
  Award,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  X,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardAnalysis } from "@/components/dashboard/DashboardAnalysisContext";
import { schemes, Scheme } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categoryTags = ["All", "Central", "State", "Education", "Health", "Employment"];

function SchemesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedScheme, setSelectedScheme, language } = useDashboardAnalysis();

  const isHindi = language === "hi";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeDetailScheme, setActiveDetailScheme] = useState<Scheme | null>(null);

  // Sync search input from URL parameters (e.g. from header search bar)
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Filter schemes based on search and selected tag
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTag === "All") return matchesSearch;
    if (selectedTag === "Central" || selectedTag === "State") {
      return scheme.category === selectedTag && matchesSearch;
    }
    return scheme.tags.includes(selectedTag as any) && matchesSearch;
  });

  const getSchemeIcon = (scheme: Scheme) => {
    if (scheme.tags.includes("Education")) return <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    if (scheme.tags.includes("Employment")) return <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
    if (scheme.tags.includes("Health")) return <Heart className="h-5 w-5 text-rose-500 dark:text-rose-400" />;
    return <Landmark className="h-5 w-5 text-slate-500 dark:text-slate-400" />;
  };

  const handleSelectScheme = (scheme: Scheme) => {
    setSelectedScheme(scheme.id);
    setActiveDetailScheme(null);
    router.push("/dashboard/upload");
  };

  return (
    <div className="space-y-6">
      {/* Page Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
              <Building2 className="h-3.5 w-3.5 text-emerald-500" />
              {isHindi ? "राष्ट्रीय योजना डेटाबेस" : "National Schemes Catalog"}
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {isHindi ? "सरकारी योजनाओं की खोज करें" : "Discover Government Schemes"}
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {isHindi
                ? "अपनी पात्रता के अनुसार केंद्र और राज्य छात्रवृत्ति या कल्याणकारी योजनाओं की जांच करें।"
                : "Select a scheme to view specific document requirements and upload files directly for AI analysis."}
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categoryTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-950 shadow-md shadow-blue-500/10"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/80"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Local Search input */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? "योजनाओं को फ़िल्टर करें..." : "Search scheme title, body..."}
            className="h-10 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-xs font-semibold outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-500 text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Grid of Scheme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSchemes.map((scheme, idx) => {
            const isSelected = selectedScheme === scheme.id;
            const aiDocsCount = scheme.documents.filter((d) => d.isAiVerified).length;
            const selfDocsCount = scheme.documents.filter((d) => !d.isAiVerified).length;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                key={scheme.id}
                onClick={() => setActiveDetailScheme(scheme)}
                className={`group cursor-pointer flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-slate-900/40 ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-500/10 dark:border-blue-400"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800/80 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-4">
                  {/* Category, Icon & Selected indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 shadow-sm">
                      {getSchemeIcon(scheme)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="secondary" className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {scheme.category}
                      </Badge>
                      {isSelected && (
                        <Badge className="text-[9px] font-black uppercase px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 border border-blue-500/20">
                          {isHindi ? "सक्रिय" : "Active"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Title & Authority */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {scheme.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold line-clamp-1">
                      {scheme.authority}
                    </p>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {scheme.description}
                  </p>

                  {/* Required Documents count list */}
                  <div className="flex items-center gap-4 pt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{aiDocsCount} AI Verified</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileCheck2 className="h-3.5 w-3.5 text-slate-400" />
                      <span>{selfDocsCount} Self Certified</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-50 dark:border-slate-800/50">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Deadline: {scheme.deadline}
                  </span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    {isHindi ? "विवरण देखें" : "View Details"}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredSchemes.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
            <Landmark className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              No matching schemes found
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your tags or changing your keywords.
            </p>
          </div>
        )}
      </div>

      {/* Scheme Detail Modal/Drawer */}
      <AnimatePresence>
        {activeDetailScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 flex flex-col max-h-[85vh]"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-950 dark:text-white">
                      {activeDetailScheme.name}
                    </h2>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      {activeDetailScheme.authority}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveDetailScheme(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {isHindi ? "विवरण" : "About Scheme"}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {activeDetailScheme.description}
                  </p>
                </div>

                {/* Eligibility & Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      <Award className="h-4 w-4 text-emerald-500" />
                      <span>{isHindi ? "पात्रता मापदंड" : "Eligibility Criteria"}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {activeDetailScheme.eligibility}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      <Award className="h-4 w-4 text-blue-500" />
                      <span>{isHindi ? "लाभ और वित्तीय सहायता" : "Benefits & Support"}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {activeDetailScheme.benefits}
                    </p>
                  </div>
                </div>

                {/* Required Documents checklist mapping */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {isHindi ? "दस्तावेज़ की आवश्यकता" : "Document Requirements mapping"}
                  </h4>
                  <div className="space-y-2">
                    {activeDetailScheme.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-900/80 bg-slate-50/20 dark:bg-slate-900/20"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            {doc.name}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {doc.requirement}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[9px] font-black uppercase shrink-0 py-0.5 px-2 rounded-full border ${
                            doc.isAiVerified
                              ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                              : "bg-slate-500/5 text-slate-400 border-slate-500/20"
                          }`}
                        >
                          {doc.isAiVerified ? (isHindi ? "एआई सत्यापित" : "AI Verified") : (isHindi ? "स्व-प्रमाणित" : "Self Certified")}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal footer action */}
              <div className="border-t border-slate-100 dark:border-slate-900 px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  Application Deadline: {activeDetailScheme.deadline}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-850" onClick={() => setActiveDetailScheme(null)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => handleSelectScheme(activeDetailScheme)}
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 font-bold text-white shadow-md shadow-blue-500/10 hover:opacity-95"
                  >
                    Select Scheme & Upload
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SchemesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <DashboardSidebar currentTab="schemes" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader setMobileOpen={setMobileOpen} />
        <main className="flex-grow overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),_transparent_32%)] p-4 sm:p-6 lg:p-8">
          <Suspense fallback={<div className="h-full flex items-center justify-center p-12 text-slate-400">Loading Schemes...</div>}>
            <SchemesContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
