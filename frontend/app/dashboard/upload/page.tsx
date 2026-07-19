"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  AlertCircle,
  HelpCircle,
  FileCheck,
  CheckSquare,
  Square,
  RefreshCw,
  Eye,
  Info,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardAnalysis, UploadedFile } from "@/components/dashboard/DashboardAnalysisContext";
import { getScheme } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export default function UploadPage() {
  const router = useRouter();
  const { selectedScheme, files, setFiles, checkedSelfDocs, setCheckedSelfDocs, language } = useDashboardAnalysis();
  const scheme = getScheme(selectedScheme);
  const isHindi = language === "hi";

  const aiRequiredDocs = scheme.documents.filter((doc) => doc.isAiVerified);
  const selfCertifiedDocs = scheme.documents.filter((doc) => !doc.isAiVerified);

  const [dragActiveSlot, setDragActiveSlot] = useState<string | null>(null);

  // Hidden inputs ref mapping
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const uploadedFilesBySlot = React.useMemo(() => {
    const map: Record<string, UploadedFile> = {};
    files.forEach((f) => {
      // Find files that match slot name
      const matchingSlot = aiRequiredDocs.find((doc) => f.name.toLowerCase().includes(doc.name.toLowerCase()) || (f as any).slotName === doc.name);
      if (matchingSlot) {
        map[matchingSlot.name] = f;
      }
    });
    return map;
  }, [files, aiRequiredDocs]);

  const progressCount = aiRequiredDocs.filter((doc) => uploadedFilesBySlot[doc.name]).length;
  const totalCount = aiRequiredDocs.length;
  const allUploaded = progressCount === totalCount;

  const handleBrowseClick = (slotName: string) => {
    inputRefs.current[slotName]?.click();
  };

  const validateAndAddFile = (file: File, slotName: string) => {
    const maxSizeBytes = 10 * 1024 * 1024; // 10 MB
    const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];
    const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (file.size > maxSizeBytes) {
      alert(`File "${file.name}" exceeds the 10 MB limit.`);
      return;
    }

    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    const isValidType = allowedExtensions.includes(extension) || allowedMimeTypes.includes(file.type);

    if (!isValidType) {
      alert(`File "${file.name}" has an unsupported format. Supported formats: PDF, JPG, PNG.`);
      return;
    }

    // Generate object url for local preview if it's an image
    let previewUrl = "";
    if (file.type.startsWith("image/")) {
      previewUrl = URL.createObjectURL(file);
    }

    const newUploadedFile: UploadedFile = {
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      progress: 0,
      rawFile: file,
      previewUrl,
      status: "Uploading",
    };
    (newUploadedFile as any).slotName = slotName;

    // Filter out previous files for this slot
    setFiles((prev) => [
      ...prev.filter((f) => (f as any).slotName !== slotName),
      newUploadedFile,
    ]);

    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setFiles((prev) =>
        prev.map((f) => {
          if ((f as any).slotName === slotName) {
            return {
              ...f,
              progress: currentProgress,
              status: currentProgress >= 100 ? "Completed" : "Uploading",
            };
          }
          return f;
        })
      );

      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, slotName: string) => {
    if (e.target.files && e.target.files[0]) {
      validateAndAddFile(e.target.files[0], slotName);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent, slotName: string) => {
    e.preventDefault();
    setDragActiveSlot(slotName);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActiveSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotName: string) => {
    e.preventDefault();
    setDragActiveSlot(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndAddFile(e.dataTransfer.files[0], slotName);
    }
  };

  const removeFile = (slotName: string) => {
    const file = uploadedFilesBySlot[slotName];
    if (file && file.previewUrl) {
      URL.revokeObjectURL(file.previewUrl);
    }
    setFiles((prev) => prev.filter((f) => (f as any).slotName !== slotName));
  };

  const toggleSelfDoc = (docName: string) => {
    setCheckedSelfDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const handleProceedToAnalysis = () => {
    if (!allUploaded) return;
    router.push("/dashboard/analysis?run=true");
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <DashboardSidebar currentTab="upload" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader setMobileOpen={() => {}} />
        <main className="flex-grow overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05),_transparent_36%)] p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header / Selected Scheme Information Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                    {isHindi ? "अपलोड कार्यक्षेत्र" : "Upload Workspace"}
                  </p>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {scheme.name}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {scheme.authority}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="rounded-xl text-xs font-bold border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                    onClick={() => router.push("/dashboard/schemes")}
                  >
                    Change Scheme
                  </Button>
                </div>
              </div>

              {/* Upload checklist progress */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-900 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-300">
                    {isHindi ? "एआई-सत्यापित दस्तावेज़ प्रगति" : "AI-Verified Documents Uploaded"}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {progressCount} / {totalCount} Completed
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${(progressCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Core Upload Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dynamic AI Verified Slots */}
              <div className="space-y-6 md:col-span-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-blue-500" />
                  {isHindi ? "एआई सत्यापन आवश्यक दस्तावेज़" : "Required Documents (AI-Verified)"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {aiRequiredDocs.map((doc) => {
                    const uploadedFile = uploadedFilesBySlot[doc.name];
                    const isDragActive = dragActiveSlot === doc.name;
                    const isCompleted = uploadedFile?.status === "Completed";
                    const isUploading = uploadedFile?.status === "Uploading";

                    return (
                      <div
                        key={doc.name}
                        onDragOver={(e) => handleDragOver(e, doc.name)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, doc.name)}
                        className={cn(
                          "relative rounded-2xl border bg-white p-5 flex flex-col justify-between transition-all duration-300 min-h-[190px]",
                          isDragActive
                            ? "border-blue-500 bg-blue-50/20 dark:border-blue-400 dark:bg-blue-950/10"
                            : isCompleted
                            ? "border-emerald-100/80 bg-emerald-50/10 dark:border-emerald-950/20"
                            : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/40"
                        )}
                      >
                        <input
                          type="file"
                          ref={(el) => {
                            inputRefs.current[doc.name] = el;
                          }}
                          onChange={(e) => handleFileChange(e, doc.name)}
                          accept=".pdf,.jpg,.jpeg,.png,image/jpeg,image/png,application/pdf"
                          className="hidden"
                        />

                        {/* Title & requirement info */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {doc.name}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[9px] font-black uppercase px-2 py-0.5 border rounded-full",
                                isCompleted
                                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                                  : isUploading
                                  ? "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
                                  : "bg-slate-100 text-slate-500 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                              )}
                            >
                              {isCompleted ? "Completed" : isUploading ? "Uploading" : "Pending"}
                            </Badge>
                          </div>
                          <p className="text-[11px] leading-relaxed text-slate-400 font-semibold pr-4">
                            {doc.requirement}
                          </p>
                        </div>

                        {/* Uploader slot status layout */}
                        <div className="mt-5">
                          {uploadedFile ? (
                            <div className="rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50/40 dark:bg-slate-900/40 p-3.5 flex items-center justify-between">
                              <div className="flex items-center gap-2.5 min-w-0">
                                {uploadedFile.previewUrl ? (
                                  <img
                                    src={uploadedFile.previewUrl}
                                    alt="preview"
                                    className="h-9 w-9 object-cover rounded-lg border border-slate-200 dark:border-slate-800 shrink-0"
                                  />
                                ) : (
                                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 shrink-0">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate pr-2">
                                    {uploadedFile.name}
                                  </p>
                                  <span className="text-[10px] text-slate-400 font-semibold">
                                    {uploadedFile.size}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {isUploading ? (
                                  <div className="text-[10px] font-black text-blue-600 dark:text-blue-400">
                                    {uploadedFile.progress}%
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleBrowseClick(doc.name)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 transition-colors"
                                      title="Replace file"
                                    >
                                      <RefreshCw className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => removeFile(doc.name)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800 transition-colors"
                                      title="Delete file"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => handleBrowseClick(doc.name)}
                              className="border border-dashed border-slate-300 dark:border-slate-800 rounded-xl py-5 px-4 text-center cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all flex flex-col items-center justify-center gap-1.5"
                            >
                              <UploadCloud className="h-5 w-5 text-slate-400 animate-pulse" />
                              <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                {isHindi ? "दस्तावेज़ खींचें या ब्राउज़ करें" : "Drag & drop file or browse"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Self-Certified Side checklist */}
              {selfCertifiedDocs.length > 0 && (
                <div className="md:col-span-2 space-y-4 pt-4">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckSquare className="h-4 w-4 text-emerald-500" />
                    {isHindi ? "स्व-प्रमाणित सहायक दस्तावेज़" : "Supporting Documents (Self-Certified)"}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selfCertifiedDocs.map((doc) => {
                      const isChecked = !!checkedSelfDocs[doc.name];
                      return (
                        <div
                          key={doc.name}
                          onClick={() => toggleSelfDoc(doc.name)}
                          className={cn(
                            "group cursor-pointer p-4 rounded-xl border flex items-start gap-3 bg-white dark:bg-slate-950/20 transition-all hover:shadow-sm",
                            isChecked
                              ? "border-emerald-200 bg-emerald-50/5 dark:border-emerald-950/30"
                              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          )}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                            ) : (
                              <Square className="h-4.5 w-4.5 text-slate-300 dark:text-slate-700 group-hover:border-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {doc.requirement}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800 shadow-sm gap-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-slate-400" />
                <span className="text-[11px] font-semibold text-slate-500">
                  {isHindi 
                    ? "सभी आवश्यक एआई-सत्यापित फ़ाइलें लोड होने के बाद विश्लेषण सक्रिय हो जाएगा।"
                    : "Verification utilizes existing pre-screening logic for fields & layout parameters."}
                </span>
              </div>
              <Button
                onClick={handleProceedToAnalysis}
                disabled={!allUploaded}
                className="h-11 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 font-bold text-white shadow-lg shadow-blue-500/10 transition-all hover:opacity-95 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
              >
                Proceed to AI Verification
                <ChevronRight className="h-4.5 w-4.5 ml-1" />
              </Button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
