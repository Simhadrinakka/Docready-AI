"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileText,
  Clock,
  ShieldCheck,
  AlertCircle,
  Download,
  Info,
  ChevronRight,
  History,
  Building2,
  RotateCcw,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardAnalysis, AnalysisResult } from "@/components/dashboard/DashboardAnalysisContext";
import { getScheme } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const timelineSteps = [
  "Uploading Documents",
  "Running OCR Scans",
  "Extracting Layout Text",
  "Classifying Document Types",
  "Validating Field Rules",
  "Comparing Document Identity",
  "Generating Action Recommendations",
  "Preparing Verification Report",
];

// Helper to escape PDF strings properly
const sanitizePdfText = (text: string) => {
  if (!text) return "";
  return text
    .replace(/[^\x20-\x7E]/g, "") // remove non-printable characters
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
  comparisonSummary: string[]
) => {
  const sanitize = sanitizePdfText;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate stream content
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
    "0.14 0.38 0.92 rg", // Primary blue (37, 99, 235)
    "50 720 495 50 re",
    "f",
    "Q",

    // Header Banner Text
    "BT",
    "/F1 14 Tf",
    "65 742 Td",
    "1 1 1 rg", // White color
    `(${sanitize("OFFICIAL PRE-SCREEN VERIFICATION AUDIT")}) Tj`,
    "ET",

    // Metadata details
    "BT",
    "/F1 10 Tf",
    "0.3 0.3 0.3 rg", // Dark grey
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
    `(${sanitize(today)}) Tj`,
    "ET",

    // Readiness score circular indicator visual box (Solid box matching score)
    "q",
    readinessScore >= 80 ? "0.06 0.73 0.51 rg" : "0.93 0.27 0.27 rg", // Green or Red box
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
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>", // Bold font
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

function AnalysisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    selectedScheme,
    files,
    checkedSelfDocs,
    isAnalyzing,
    setIsAnalyzing,
    analysisResult,
    setAnalysisResult,
    activeStep,
    setActiveStep,
    addToHistory,
    language,
  } = useDashboardAnalysis();

  const scheme = getScheme(selectedScheme);
  const isHindi = language === "hi";

  const analysisTriggered = useRef(false);
  const responseDataRef = useRef<AnalysisResult | null>(null);
  const timelineIntervalRef = useRef<any>(null);

  const startAnalysisApiCall = async () => {
    if (files.length === 0 || analysisTriggered.current) return;
    analysisTriggered.current = true;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setActiveStep(0);
    responseDataRef.current = null;

    // Start loading step simulation
    let currentStep = 0;
    timelineIntervalRef.current = setInterval(() => {
      if (currentStep < 7) {
        currentStep += 1;
        setActiveStep(currentStep);
      }
    }, 1500); // 1.5s per step simulation

    try {
      const formData = new FormData();
      files.forEach((file) => {
        if (file.rawFile) {
          formData.append("files", file.rawFile);
        }
      });

      const aiRequiredDocs = scheme.documents.filter((doc) => doc.isAiVerified).map((d) => d.name);
      const selfCertifiedDocs = scheme.documents.filter((doc) => !doc.isAiVerified).map((d) => d.name);

      formData.append("aiRequiredDocs", JSON.stringify(aiRequiredDocs));
      formData.append("selfCertifiedDocs", JSON.stringify(selfCertifiedDocs));
      formData.append("checkedSelfDocs", JSON.stringify(checkedSelfDocs));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const startMs = Date.now();
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      console.log("Backend response loaded:", data);

      if (data.success) {
        responseDataRef.current = data;
        const processingTimeSec = parseFloat(((Date.now() - startMs) / 1000).toFixed(1));

        // Fast-forward timeline animation to complete instantly
        clearInterval(timelineIntervalRef.current);
        let fastStep = currentStep;

        const fastInterval = setInterval(() => {
          if (fastStep < 7) {
            fastStep += 1;
            setActiveStep(fastStep);
          } else {
            clearInterval(fastInterval);
            setAnalysisResult(data);
            setIsAnalyzing(false);

            // Find applicant name in fields (prioritize first valid name found)
            let extractedName = "Not Available";
            for (const f of data.files) {
              const nameInFields = f.fields?.name || f.fields?.Name;
              if (nameInFields && nameInFields.trim() && nameInFields.trim() !== "Not Available") {
                extractedName = nameInFields.trim();
                break;
              }
            }

            // Save to context history
            addToHistory({
              schemeId: selectedScheme,
              schemeName: scheme.name,
              applicantName: extractedName,
              result: data,
              processingTimeSec,
              filesCount: files.length,
            });
          }
        }, 150); // fast loop transition
      } else {
        throw new Error("API response indicated failure.");
      }
    } catch (error) {
      console.error("API error:", error);
      clearInterval(timelineIntervalRef.current);
      setIsAnalyzing(false);
      alert(error instanceof Error ? error.message : "AI verification failed. Please check network connection.");
    }
  };

  // Run on mount if run query is passed
  useEffect(() => {
    if (searchParams.get("run") === "true" && files.length > 0) {
      startAnalysisApiCall();
    }
  }, [searchParams, files]);

  // Clean intervals on unmount
  useEffect(() => {
    return () => {
      if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
    };
  }, []);

  const downloadReport = () => {
    if (!analysisResult) return;

    let applicantName = "Not Available";
    for (const f of analysisResult.files) {
      const nameVal = f.fields?.name || f.fields?.Name;
      if (nameVal && nameVal.trim() && nameVal.trim() !== "Not Available") {
        applicantName = nameVal.trim();
        break;
      }
    }

    const primaryAnalysis = analysisResult.files[0];
    const readinessScore = primaryAnalysis?.readiness.score ?? 0;
    const status = primaryAnalysis?.readiness.status ?? "Pending";

    const pdfBlob = generateVerificationPdf(
      scheme.name,
      applicantName,
      readinessScore,
      status,
      analysisResult.files,
      analysisResult.comparison.missing_documents,
      analysisResult.comparison.summary
    );

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `docready_verification_report_${selectedScheme}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const primaryAnalysis = analysisResult?.files[0];
  const overallScore = primaryAnalysis?.readiness.score ?? 0;

  // Extract applicant name (prioritize first valid name found)
  let name = "Not Available";
  for (const f of analysisResult?.files || []) {
    const val = f.fields?.name || f.fields?.Name;
    if (val && val.trim() && val.trim() !== "Not Available") {
      name = val.trim();
      break;
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. NO FILES STATE */}
      {files.length === 0 && !isAnalyzing && !analysisResult && (
        <div className="rounded-3xl border border-dashed border-slate-350 dark:border-slate-800 bg-white dark:bg-slate-950/20 p-12 text-center shadow-sm space-y-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-900 mx-auto border border-slate-100 dark:border-slate-800">
            <Cpu className="h-6 w-6" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              No files in verification queue
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Before triggering the AI validation engine, you must choose a scheme and upload the necessary identification assets.
            </p>
          </div>
          <Button
            onClick={() => router.push("/dashboard/schemes")}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            Select a Scheme to Begin
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* 2. LOADING ANIMATION STATE */}
      {isAnalyzing && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-950/40 shadow-sm space-y-8">
          <div className="flex flex-col items-center text-center space-y-2.5">
            <div className="relative">
              <div className="h-16 w-16 border-4 border-blue-500/10 border-t-blue-600 rounded-full animate-spin shrink-0" />
              <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              AI Verification Pipeline Running
            </h2>
            <p className="text-xs text-slate-400 max-w-md leading-normal font-medium">
              We are screening document fields against scheme eligibility requirements. Please hold tight.
            </p>
          </div>

          {/* Timeline steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-900">
            {timelineSteps.map((step, idx) => {
              const isPast = activeStep > idx;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center gap-3.5 p-3 rounded-xl border transition-all duration-300",
                    isPast
                      ? "border-emerald-100 bg-emerald-50/10 text-emerald-800 dark:border-emerald-950/10 dark:text-emerald-400"
                      : isActive
                      ? "border-blue-200 bg-blue-50/10 text-blue-800 dark:border-blue-900/10 dark:text-blue-400"
                      : "border-slate-100 text-slate-400 dark:border-slate-900 dark:text-slate-600"
                  )}
                >
                  <div className="shrink-0 flex items-center justify-center">
                    {isPast ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    ) : isActive ? (
                      <div className="h-4.5 w-4.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <Clock className="h-4.5 w-4.5 text-slate-300 dark:text-slate-800 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs font-bold">{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. PREMIUM RESULTS DASHBOARD */}
      {analysisResult && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Top Ring & Readiness Summary header */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Circular SVG Ring */}
              <div className="relative h-28 w-28 shrink-0 flex items-center justify-center bg-slate-50 dark:bg-slate-900/60 rounded-full border border-slate-250/20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className={cn(
                      overallScore >= 80 ? "text-emerald-500" : "text-rose-500"
                    )}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={2 * Math.PI * 38 * (1 - overallScore / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-black text-slate-850 dark:text-white leading-none">
                    {overallScore}%
                  </span>
                  <span className="text-[9px] text-slate-400 font-extrabold tracking-wider uppercase leading-none mt-1">
                    Ready
                  </span>
                </div>
              </div>

              {/* Identity labels & Badges */}
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-lg font-black text-slate-900 dark:text-white">
                    {name}
                  </h1>
                  <Badge
                    className={cn(
                      "text-[9px] font-black uppercase py-0.5 px-2.5 rounded-full border",
                      overallScore >= 80
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400"
                    )}
                  >
                    {overallScore >= 80 ? "Pre-Screen Passed" : "Action Required"}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                  <Building2 className="h-3.5 w-3.5 text-blue-500" />
                  {scheme.name}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Audit Timestamp: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Quick Actions download */}
            <div className="shrink-0 flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl text-xs font-bold border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-900 dark:hover:bg-slate-800"
                onClick={() => router.push("/dashboard/upload")}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Upload New
              </Button>
              <Button
                onClick={downloadReport}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 font-bold text-white shadow-md shadow-blue-500/10 hover:opacity-95"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Download PDF Audit
              </Button>
            </div>
          </div>

          {/* Overall summaries layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Uploaded Slots</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1 block">
                {files.length} / {scheme.documents.filter(d => d.isAiVerified).length}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Missing Files</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1 block">
                {analysisResult.comparison.missing_documents.length}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Validation Issues</span>
              <span className="text-lg font-bold text-slate-850 dark:text-slate-200 mt-1 block">
                {analysisResult.files.reduce((acc, curr) => acc + curr.issues.length, 0)}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">OCR Confidence</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1 block">
                {(analysisResult as any).ocr_confidence ?? "Not Available"}
              </span>
            </div>
          </div>

          {/* Name match status banner */}
          <div
            className={cn(
              "rounded-2xl border p-4.5 flex items-start gap-3.5 backdrop-blur-sm",
              analysisResult.comparison.name_match
                ? "border-emerald-100 bg-emerald-50/10 text-emerald-850 dark:border-emerald-950/20 dark:text-emerald-400"
                : "border-rose-100 bg-rose-50/10 text-rose-850 dark:border-rose-950/20 dark:text-rose-400"
            )}
          >
            {analysisResult.comparison.name_match ? (
              <ShieldCheck className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
            )}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">
                {analysisResult.comparison.name_match ? "Identity match successful" : "Identity Inconsistency Warn"}
              </h3>
              <p className="text-[11px] leading-relaxed mt-1 font-semibold">
                {analysisResult.comparison.name_match 
                  ? "Applicant Name matches exactly across all processed identification documents."
                  : "We detected multiple name formats on documents. Government portals require identity details to match. Review recommended corrections."}
              </p>
            </div>
          </div>

          {/* Validation Checks breakdown list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Passed checks */}
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                Passed Audits & Authenticity
              </h2>

              <div className="space-y-3.5">
                {analysisResult.files.map((file) => {
                  const passChecks = file.issues.length === 0;
                  return (
                    <div key={file.filename} className="p-4.5 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {file.document_type}
                        </span>
                        <Badge variant="outline" className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-500/5 border-emerald-500/10 dark:text-emerald-400">
                          {file.readiness?.status || "Not Available"}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-semibold">Checks Executed:</p>
                        <ul className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 list-disc pl-4 font-semibold">
                          <li>Readiness score: {file.readiness?.score !== undefined ? `${file.readiness.score}%` : "Not Available"}</li>
                          {file.issues.length === 0 ? (
                            <li>No issues identified during document validation.</li>
                          ) : (
                            <li>{file.issues.length} issue(s) flagged by backend.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Failed checks / corrections needed */}
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertCircle className="h-4.5 w-4.5 text-rose-500" />
                Discrepancies & Issues Found
              </h2>

              <div className="space-y-3.5">
                {analysisResult.files.some(f => f.issues.length > 0) ? (
                  analysisResult.files.map((file) => {
                    if (file.issues.length === 0) return null;
                    return (
                      <div key={file.filename} className="p-4.5 rounded-2xl bg-white border border-rose-200/40 dark:bg-slate-950 dark:border-rose-950/20 space-y-3">
                        <div className="flex items-center justify-between border-b border-rose-100/30 dark:border-rose-950/30 pb-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {file.document_type}
                          </span>
                          <Badge variant="outline" className="text-[9px] font-black uppercase text-rose-600 bg-rose-500/5 border-rose-500/10 dark:text-rose-400">
                            {file.issues.length} Fixes
                          </Badge>
                        </div>
                        <ul className="text-[11px] text-rose-800 dark:text-rose-450 space-y-1.5 list-disc pl-4 font-semibold">
                          {file.issues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">No discrepancies detected</p>
                    <p className="text-[10px] text-slate-400 mt-1">OCR scanned values conform with standard layout criteria.</p>
                  </div>
                )}

                {/* Missing documents warnings */}
                {analysisResult.comparison.missing_documents.length > 0 && (
                  <div className="p-4.5 rounded-2xl bg-white border border-rose-200/40 dark:bg-slate-950 dark:border-rose-950/20 space-y-3">
                    <div className="flex items-center justify-between border-b border-rose-100/30 dark:border-rose-950/30 pb-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                        <Info className="h-4 w-4 text-rose-500 animate-pulse" />
                        Missing Documents Checklist
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.comparison.missing_documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-rose-500/5 border border-rose-500/10 dark:border-rose-950/40 dark:text-rose-400 px-3 py-1 rounded-full text-[10px] font-bold">
                          <span>{doc}</span>
                          <button onClick={() => router.push("/dashboard/upload")} className="text-rose-600 dark:text-rose-400 hover:underline">
                            Upload
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Priority recommendations list */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
              Pre-Screen Corrective Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysisResult.files.map((file) => {
                return file.recommendations.map((rec, i) => (
                  <div key={`${file.filename}-rec-${i}`} className="p-4 rounded-xl border border-slate-200/80 bg-white dark:bg-slate-950 dark:border-slate-800/80 flex items-start gap-3 hover:-translate-y-0.5 transition-transform">
                    <div className="mt-0.5 p-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-850 dark:text-slate-200">{rec}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-semibold uppercase">Priority: High &bull; {file.document_type}</p>
                    </div>
                  </div>
                ));
              })}
            </div>
          </div>

        </motion.div>
      )}
    </div>
  );
}

export default function AnalysisPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <DashboardSidebar currentTab="analysis" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader setMobileOpen={setMobileOpen} />
        <main className="flex-grow overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),_transparent_32%)] p-4 sm:p-6 lg:p-8">
          <Suspense fallback={<div className="h-full flex items-center justify-center p-12 text-slate-400">Loading pipeline...</div>}>
            <AnalysisContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
