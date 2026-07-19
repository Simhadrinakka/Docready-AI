"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useDashboardAnalysis } from "@/components/dashboard/DashboardAnalysisContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DashboardPlaceholderPageProps {
  currentTab: "upload" | "analysis" | "reports";
  title: string;
  description: string;
}

export default function DashboardPlaceholderPage({
  currentTab,
  title,
  description,
}: DashboardPlaceholderPageProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { analysisResult } = useDashboardAnalysis();
  const isUploadedDocumentsPage = currentTab === "upload";
  const isAiAnalysisPage = currentTab === "analysis";
  const isReportsPage = currentTab === "reports";
  const latestAnalysis = analysisResult?.files[analysisResult.files.length - 1];

  const downloadReport = () => {
    const report = latestAnalysis ?? {
      document_type: "No document analyzed",
      readiness: { status: "Pending", score: 0 },
      recommendations: ["Upload documents and run an AI analysis to generate a report."],
    };
    const sanitizePdfText = (text: string) =>
      text.replace(/[^\x20-\x7E]/g, "").replace(/([\\()])/g, "\\$1");
    const reportLines = [
      "Docready-AI Analysis Report",
      `Document Type: ${report.document_type}`,
      `Status: ${report.readiness.status}`,
      `Readiness Score: ${report.readiness.score}%`,
      "Recommendations:",
      ...report.recommendations.map((recommendation) => `- ${recommendation}`),
    ];
    const content = [
      "BT",
      "/F1 18 Tf",
      "50 750 Td",
      `(${sanitizePdfText(reportLines[0])}) Tj`,
      "/F1 12 Tf",
      ...reportLines.slice(1).flatMap((line) => ["0 -24 Td", `(${sanitizePdfText(line)}) Tj`]),
      "ET",
    ].join("\n");
    const objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      `<< /Length ${new TextEncoder().encode(content).length} >>\nstream\n${content}\nendstream`,
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
    pdf += offsets.slice(1).map((offset) => `${offset.toString().padStart(10, "0")} 00000 n \n`).join("");
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "docready-ai-analysis-report.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <DashboardSidebar
        currentTab={currentTab}
        setCurrentTab={() => {}}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader setMobileOpen={setMobileOpen} />
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
            {isUploadedDocumentsPage && (
              <div className="mt-6 space-y-3">
                {analysisResult ? (
                  analysisResult.files.map((file) => (
                    <div
                      key={file.filename}
                      className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {file.filename}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {file.document_type}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        Uploaded
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No documents have been uploaded yet.
                  </p>
                )}
              </div>
            )}
            {isAiAnalysisPage && (
              <div className="mt-6 space-y-3">
                {analysisResult ? (
                  analysisResult.files.map((file) => (
                    <div
                      key={file.filename}
                      className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {file.document_type}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {file.filename}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {file.readiness.score}% readiness
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {file.readiness.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Upload documents and start an analysis to view AI results.
                  </p>
                )}
              </div>
            )}
            {isReportsPage && (
              <div className="mt-6 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400">Document Type</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {latestAnalysis?.document_type ?? "No document analyzed"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Status</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {latestAnalysis?.readiness.status ?? "Pending"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Readiness Score</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {latestAnalysis?.readiness.score ?? 0}%
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={downloadReport}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
                <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="text-xs text-slate-400">Recommendations</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                    {(latestAnalysis?.recommendations ?? [
                      "Upload documents and run an AI analysis to generate recommendations.",
                    ]).map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
