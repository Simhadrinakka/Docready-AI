"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Clock,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  FileText,
  Download,
  Info,
  ChevronRight,
  Landmark,
  ShieldAlert,
  CheckCircle2,
  History as HistoryIcon,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardAnalysis } from "@/components/dashboard/DashboardAnalysisContext";
import { getScheme, schemes } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Helper to escape PDF strings properly
const sanitizePdfText = (text: string) => {
  if (!text) return "";
  return text
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
};

// Generates a vector PDF styled like an official Government Verification Audit Report
const generateVerificationPdf = (
  schemeName: string,
  applicantName: string,
  readinessScore: number,
  status: string,
  filesList: any[],
  missingDocs: string[],
  comparisonSummary: string[],
  dateStr: string
) => {
  const sanitize = sanitizePdfText;
  const contentParts = [
    "BT",
    "/F1 10 Tf",
    "50 800 Td",
    `(${sanitize("DOCREADY-AI DIGITAL PRE-SCREEN PORTAL")}) Tj`,
    "0 -15 Td",
    `/F1 8 Tf`,
    `(${sanitize("Department of Digital GDS Services Verification Authority")}) Tj`,
    "ET",

    "q",
    "0.14 0.38 0.92 rg",
    "50 720 495 50 re",
    "f",
    "Q",

    "BT",
    "/F1 14 Tf",
    "65 742 Td",
    "1 1 1 rg",
    `(${sanitize("OFFICIAL PRE-SCREEN VERIFICATION AUDIT")}) Tj`,
    "ET",

    "BT",
    "/F1 10 Tf",
    "0.3 0.3 0.3 rg",
    "50 690 Td",
    `(${sanitize("SCHEME:")}) Tj`,
    "120 0 Td",
    "0 0 0 rg",
    `(${sanitize(schemeName)}) Tj`,
    "-120 -18 Td",
    "0.3 0.3 0.3 rg",
    `(${sanitize("APPLICANT:")}) Tj`,
    "120 0 Td",
    "0 0 0 rg",
    `(${sanitize(applicantName)}) Tj`,
    "-120 -18 Td",
    "0.3 0.3 0.3 rg",
    `(${sanitize("GENERATED ON:")}) Tj`,
    "120 0 Td",
    "0 0 0 rg",
    `(${sanitize(dateStr)}) Tj`,
    "ET",

    "q",
    readinessScore >= 80 ? "0.06 0.73 0.51 rg" : "0.93 0.27 0.27 rg",
    "390 645 155 85 re",
    "f",
    "Q",

    "BT",
    "405 700 Td",
    "1 1 1 rg",
    "/F1 10 Tf",
    `(${sanitize("READINESS SCORE")}) Tj`,
    "0 -28 Td",
    "/F1 24 Tf",
    `(${sanitize(readinessScore + "%")}) Tj`,
    "0 -18 Td",
    "/F1 10 Tf",
    `(${sanitize(status.toUpperCase())}) Tj`,
    "ET",

    "q",
    "0.5 w",
    "0.8 0.8 0.8 RG",
    "50 620 m 545 620 l S",
    "Q",

    "BT",
    "50 595 Td",
    "0.14 0.38 0.92 rg",
    "/F1 11 Tf",
    `(${sanitize("1. DOCUMENT AUDIT STATUS")}) Tj`,
    "ET",
  ];

  let currentY = 570;

  filesList.forEach((file) => {
    const docScore = file.readiness.score;
    const docStatus = file.readiness.status;

    contentParts.push(
      "BT",
      `50 ${currentY} Td`,
      "0 0 0 rg",
      "/F1 9 Tf",
      `(${sanitize(file.document_type)} [${sanitize(file.filename)}]) Tj`,
      `250 0 Td`,
      docScore >= 80 ? "0.06 0.55 0.38 rg" : "0.8 0.2 0.2 rg",
      `(${sanitize("Score: " + docScore + "%")}) Tj`,
      `110 0 Td`,
      `(${sanitize(docStatus)}) Tj`,
      "ET"
    );
    currentY -= 16;
  });

  currentY -= 10;

  if (missingDocs.length > 0) {
    contentParts.push(
      "BT",
      `50 ${currentY} Td`,
      "0.93 0.27 0.27 rg",
      "/F1 11 Tf",
      `(${sanitize("2. MISSING AI-REQUIRED DOCUMENTS")}) Tj`,
      "ET"
    );
    currentY -= 16;

    missingDocs.forEach((doc) => {
      contentParts.push(
        "BT",
        `60 ${currentY} Td`,
        "0.3 0.3 0.3 rg",
        "/F1 9 Tf",
        `(${sanitize("- " + doc + " (Pending Verification)")}) Tj`,
        "ET"
      );
      currentY -= 14;
    });
  } else {
    contentParts.push(
      "BT",
      `50 ${currentY} Td`,
      "0.06 0.73 0.51 rg",
      "/F1 11 Tf",
      `(${sanitize("2. DOCUMENTATION COMPLETION")}) Tj`,
      "0 -16 Td",
      "0.3 0.3 0.3 rg",
      "/F1 9 Tf",
      `(${sanitize("All AI-required documents for this scheme are present.")}) Tj`,
      "ET"
    );
    currentY -= 30;
  }

  currentY -= 10;

  contentParts.push(
    "BT",
    `50 ${currentY} Td`,
    "0.14 0.38 0.92 rg",
    "/F1 11 Tf",
    `(${sanitize("3. CROSS-DOCUMENT COMPARISON")}) Tj`,
    "ET"
  );
  currentY -= 16;

  comparisonSummary.forEach((sumLine) => {
    contentParts.push(
      "BT",
      `60 ${currentY} Td`,
      "0 0 0 rg",
      "/F1 9 Tf",
      `(${sanitize(sumLine)}) Tj`,
      "ET"
    );
    currentY -= 14;
  });

  currentY -= 15;

  contentParts.push(
    "BT",
    `50 ${currentY} Td`,
    "0.14 0.38 0.92 rg",
    "/F1 11 Tf",
    `(${sanitize("4. PORTAL RECOMMENDATIONS & INSTRUCTIONS")}) Tj`,
    "ET"
  );
  currentY -= 16;

  let recommendationsCount = 0;
  filesList.forEach((file) => {
    file.recommendations.forEach((rec: string) => {
      if (recommendationsCount < 6) {
        contentParts.push(
          "BT",
          `60 ${currentY} Td`,
          "0.3 0.3 0.3 rg",
          "/F1 9 Tf",
          `(${sanitize("* " + rec)}) Tj`,
          "ET"
        );
        currentY -= 14;
        recommendationsCount++;
      }
    });
  });

  if (recommendationsCount === 0) {
    contentParts.push(
      "BT",
      `60 ${currentY} Td`,
      "0.06 0.55 0.38 rg",
      "/F1 9 Tf",
      `(${sanitize("No correction audits suggested. Documents are ready for formal submission.")}) Tj`,
      "ET"
    );
  }

  contentParts.push(
    "q",
    "0.96 0.96 0.96 rg",
    "50 40 495 24 re",
    "f",
    "Q",
    "BT",
    "/F1 8 Tf",
    "0.5 0.5 0.5 rg",
    "170 48 Td",
    `(${sanitize("Generated electronically via Docready-AI Digital India Sandbox Interface. Verify online.")}) Tj`,
    "ET"
  );

  const contentStream = contentParts.join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${new TextEncoder().encode(contentStream).length} >>\nstream\n${contentStream}\nendstream`,
  ];

  const encoder = new TextEncoder();
  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(encoder.encode(pdf).length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets
    .slice(1)
    .map((offset) => `${offset.toString().padStart(10, "0")} 00000 n \n`)
    .join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
};

export default function Dashboard() {
  const router = useRouter();
  const { selectedScheme, files, analysisResult, analysisHistory, language } = useDashboardAnalysis();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const scheme = getScheme(selectedScheme);
  const isHindi = language === "hi";

  const aiRequiredDocs = scheme.documents.filter((doc) => doc.isAiVerified);
  const uploadedFilesBySlot = React.useMemo(() => {
    return files.filter((f) => {
      return aiRequiredDocs.some((doc) => f.name.toLowerCase().includes(doc.name.toLowerCase()) || (f as any).slotName === doc.name);
    });
  }, [files, aiRequiredDocs]);

  const progressCount = uploadedFilesBySlot.length;
  const totalCount = aiRequiredDocs.length;
  const percentageUploaded = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/schemes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleViewReport = (item: any) => {
    router.push("/dashboard/reports");
  };

  const handleDownloadReport = (item: any) => {
    const primaryAnalysis = item.result.files[0];
    const score = primaryAnalysis?.readiness.score ?? 0;
    const status = primaryAnalysis?.readiness.status ?? "Pending";
    const dateFormatted = new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const pdfBlob = generateVerificationPdf(
      item.schemeName,
      item.applicantName,
      score,
      status,
      item.result.files,
      item.result.comparison.missing_documents,
      item.result.comparison.summary,
      dateFormatted
    );

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `docready_report_download_${item.id}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* Sidebar navigation */}
      <DashboardSidebar
        currentTab="dashboard"
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main panel container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <DashboardHeader setMobileOpen={setMobileOpen} />

        {/* Content body */}
        <main className="flex-grow overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),_transparent_32%)] p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    {isHindi ? "दस्तावेज़ तत्परता कार्यस्थान" : "Document Readiness Workspace"}
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                    {isHindi ? "डॉकरेडी-एआई में आपका स्वागत है" : "Welcome to Docready-AI"}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {isHindi
                      ? "छात्रवृत्ति और सरकारी योजनाओं के लिए अपने प्रमाणपत्रों और दस्तावेजों का सत्यापन करें।"
                      : "Pre-screen your certificates and documents for scholarship applications and government schemes before formal submission."}
                  </p>
                </div>
                <div className="flex w-fit items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  AI Validation Shield Active
                </div>
              </div>
            </motion.div>

            {/* Quick Statistics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-450 font-bold block uppercase tracking-wider">Selected Scheme</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block truncate">
                  {scheme.name}
                </span>
              </div>
              <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-450 font-bold block uppercase tracking-wider">Uploaded Status</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 block">
                  {progressCount} / {totalCount} Files ({percentageUploaded}%)
                </span>
              </div>
              <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-450 font-bold block uppercase tracking-wider">Readiness Status</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">
                  {analysisResult?.files[0]?.readiness.score !== undefined ? `${analysisResult.files[0].readiness.score}% Readiness` : "Not Available"}
                </span>
              </div>
              <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-450 font-bold block uppercase tracking-wider">Active Warnings</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 block">
                  {analysisResult ? analysisResult.files.reduce((acc, c) => acc + c.issues.length, 0) : "Not Available"}
                </span>
              </div>
            </div>

            {/* Scheme Action Center */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Selected Scheme Detail Panel */}
              <div className="md:col-span-2 space-y-4">
                <div className="p-6 rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          <Landmark className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Active Workspace Target</p>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{scheme.name}</h3>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-black uppercase text-blue-600 border-blue-500/20 px-2.5 py-0.5">
                        {scheme.category}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                      {scheme.description}
                    </p>

                    {/* Requirements mini checks list */}
                    <div className="space-y-1.5 pt-1.5">
                      <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Verification Checklist</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {aiRequiredDocs.map((doc) => {
                          const hasFile = files.some(
                            (f) => f.name.toLowerCase().includes(doc.name.toLowerCase()) || (f as any).slotName === doc.name
                          );
                          return (
                            <div key={doc.name} className="flex items-center gap-2 text-xs">
                              {hasFile ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              ) : (
                                <Clock className="h-4 w-4 text-slate-350 dark:text-slate-800 shrink-0" />
                              )}
                              <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{doc.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-3 border-t border-slate-50 dark:border-slate-900">
                    <Button
                      onClick={() => router.push("/dashboard/upload")}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 font-bold text-white text-xs h-10 px-6"
                    >
                      {isHindi ? "दस्तावेज़ अपलोड करें" : "Upload Documents"}
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                    <Button
                      onClick={() => router.push("/dashboard/schemes")}
                      variant="outline"
                      className="rounded-xl border-slate-200 text-xs font-bold hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-900 dark:hover:bg-slate-800 h-10"
                    >
                      Change Scheme
                    </Button>
                  </div>
                </div>
              </div>

              {/* Onboarding / Search Schemes Card */}
              <div className="p-6 rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
                    <Search className="h-4.5 w-4.5 text-blue-600" />
                    {isHindi ? "योजनाएँ खोजें" : "Quick Search"}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-slate-450 font-semibold">
                    {isHindi 
                      ? "संबंधित दस्तावेज आवश्यकताओं को देखने के लिए केंद्र या राज्य सरकार की योजनाओं को त्वरित फ़िल्टर करें।"
                      : "Quickly filter Central or State schemes to preview their document specifications."}
                  </p>

                  <form onSubmit={handleSearchSubmit} className="relative pt-2">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 mt-1" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isHindi ? "खोजें..." : "Filter catalog..."}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-semibold outline-none focus:border-blue-500 focus:bg-white dark:border-slate-850 dark:bg-slate-900 dark:focus:border-blue-500 text-slate-800 dark:text-slate-200"
                    />
                  </form>
                </div>

                <Button
                  onClick={() => router.push("/dashboard/schemes")}
                  variant="outline"
                  className="rounded-xl border-slate-200 text-xs font-bold hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-900 dark:hover:bg-slate-800 h-10 w-full"
                >
                  Browse Catalog
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Popular Schemes Carousel List */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="h-4.5 w-4.5 text-emerald-500" />
                Popular Schemes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {schemes.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      router.push(`/dashboard/schemes?search=${encodeURIComponent(item.name)}`);
                    }}
                    className="p-4 rounded-2xl border border-slate-200 bg-white dark:bg-slate-950 dark:border-slate-800 hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[125px]"
                  >
                    <div>
                      <Badge variant="secondary" className="text-[8px] font-black uppercase px-2 py-0.5 mb-1.5 bg-slate-50 dark:bg-slate-900">
                        {item.category}
                      </Badge>
                      <h4 className="text-xs font-bold text-slate-850 dark:text-slate-250 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-2 block hover:underline">
                      View Documents &rarr;
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reports Registry Activity Feed */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HistoryIcon className="h-4.5 w-4.5 text-blue-600" />
                Recent Verification Activity
              </h2>

              <div className="space-y-3.5">
                {analysisHistory.length > 0 ? (
                  analysisHistory.slice(0, 3).map((item) => {
                    const score = item.result.files[0]?.readiness.score ?? 0;
                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-slate-200/80 bg-white dark:bg-slate-950 dark:border-slate-800/80 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 shrink-0">
                            <FileText className="h-4.5 w-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250 truncate">
                              {item.schemeName}
                            </h4>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">
                              Applicant: {item.applicantName} &bull; Verified: {new Date(item.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <Badge
                            className={`text-[9px] font-black uppercase py-0.5 px-2 rounded-full border ${
                              score >= 80
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                            }`}
                          >
                            Score: {score}%
                          </Badge>
                          <button
                            onClick={() => handleDownloadReport(item)}
                            className="p-1.5 rounded-lg text-slate-450 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 transition-colors"
                            title="Download PDF again"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-10 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-950/20">
                    <Info className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      No recent checks logged
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Completed document verification reports will be shown here.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
