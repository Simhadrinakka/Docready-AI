"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Download,
  Calendar,
  User,
  History,
  TrendingUp,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Trash2,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardAnalysis, HistoryItem } from "@/components/dashboard/DashboardAnalysisContext";
import { getScheme } from "@/lib/schemes";
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

    // Blue Header Banner Background
    "q",
    "0.14 0.38 0.92 rg",
    "50 720 495 50 re",
    "f",
    "Q",

    // Header Banner Text
    "BT",
    "/F1 14 Tf",
    "65 742 Td",
    "1 1 1 rg",
    `(${sanitize("OFFICIAL PRE-SCREEN VERIFICATION AUDIT")}) Tj`,
    "ET",

    // Metadata details
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

    // Readiness score circular indicator visual box (Solid box matching score)
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

    // Grid Divider Line
    "q",
    "0.5 w",
    "0.8 0.8 0.8 RG",
    "50 620 m 545 620 l S",
    "Q",

    // Section 1: Analyzed Documents
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

  // Missing Documents listing
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

  // Section 3: Identity Matches
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

  // Section 4: Detailed Recommendations
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

  // Footer Banner
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
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
};

export default function ReportsPage() {
  const router = useRouter();
  const { analysisHistory, clearHistory, setAnalysisResult, language } = useDashboardAnalysis();
  const isHindi = language === "hi";

  const handleDownloadAgain = (item: HistoryItem) => {
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

  const handleViewReport = (item: HistoryItem) => {
    setAnalysisResult(item.result);
    router.push("/dashboard/analysis");
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <DashboardSidebar currentTab="reports" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader setMobileOpen={() => {}} />
        <main className="flex-grow overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.06),_transparent_32%)] p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-950">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
                    <History className="h-3.5 w-3.5 text-emerald-500" />
                    {isHindi ? "सत्यापन संग्रह" : "Verification Registry"}
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                    {isHindi ? "सत्यापन रिपोर्ट इतिहास" : "Reports & History"}
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
                    {isHindi 
                      ? "आपके पिछले दस्तावेज़ सत्यापन रनों की सूची। आप सीधे पूर्व रिपोर्ट डाउनलोड या देख सकते हैं।"
                      : "Access previous pre-screening reports, view validation criteria, and download official PDF audits."}
                  </p>
                </div>
                {analysisHistory.length > 0 && (
                  <Button
                    onClick={clearHistory}
                    variant="outline"
                    className="rounded-xl font-bold border-red-200 text-red-600 hover:bg-red-50 dark:border-red-950 dark:hover:bg-red-950/20 shadow-sm text-xs self-start sm:self-center shrink-0"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Clear History
                  </Button>
                )}
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {analysisHistory.length > 0 ? (
                analysisHistory.map((item) => {
                  const score = item.result.files[0]?.readiness.score ?? 0;
                  const dateStr = new Date(item.date).toLocaleString(language === "hi" ? "hi-IN" : "en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950/40 hover:-translate-y-0.5 transition-transform shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0">
                          <FileText className="h-5.5 w-5.5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            {item.schemeName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-semibold">
                            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-300">
                              <User className="h-3.5 w-3.5" />
                              {item.applicantName}
                            </span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {dateStr}
                            </span>
                            <span>&bull;</span>
                            <span>{item.filesCount} files uploaded</span>
                          </div>
                        </div>
                      </div>

                      {/* Right badge & buttons */}
                      <div className="flex items-center justify-between md:justify-end gap-5 border-t border-slate-50 md:border-t-0 pt-3.5 md:pt-0 shrink-0">
                        {/* Score Circle */}
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`text-[10px] font-black uppercase py-1 px-3 rounded-full border ${
                              score >= 80
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-450"
                                : "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-450"
                            }`}
                          >
                            Score: {score}%
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleViewReport(item)}
                            variant="outline"
                            className="rounded-xl border-slate-200 bg-white text-xs font-bold hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-900 dark:hover:bg-slate-800 h-9.5 px-4"
                          >
                            View Audit
                          </Button>
                          <Button
                            onClick={() => handleDownloadAgain(item)}
                            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-9.5 px-4"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-16 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-950/20">
                  <div className="h-12 w-12 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-center text-slate-400 dark:bg-slate-900 dark:border-slate-800 mx-auto mb-4">
                    <History className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    No historical reports found
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto leading-normal">
                    Reports will appear here once document packages have completed AI validation audits.
                  </p>
                  <Button
                    onClick={() => router.push("/dashboard/schemes")}
                    className="rounded-xl bg-blue-600 text-white text-xs font-bold mt-5 h-9.5 px-6"
                  >
                    Select Scheme to Begin
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
