"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  progress: number;
  rawFile?: File;
}

interface UploadAreaProps {
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export default function UploadArea({ files, setFiles }: UploadAreaProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndAddFiles = (fileList: FileList) => {
    const validFiles: UploadedFile[] = [];
    const maxSizeBytes = 10 * 1024 * 1024; // 10 MB
    const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];
    const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Validate file size
      if (file.size > maxSizeBytes) {
        alert(`File "${file.name}" exceeds the 10 MB limit.`);
        continue;
      }

      // Validate file type
      const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      const isValidType = allowedExtensions.includes(extension) || allowedMimeTypes.includes(file.type);

      if (!isValidType) {
        alert(`File "${file.name}" has an unsupported format. Supported formats: PDF, JPG, PNG.`);
        continue;
      }

      // Check if file already exists in the uploaded files list by name
      if (files.some(f => f.name === file.name)) {
        continue;
      }

      validFiles.push({
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        progress: 100,
        rawFile: file,
      });
    }

    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
    // Reset file input value so the same file can be uploaded again if deleted
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept=".pdf,.jpg,.jpeg,.png,image/jpeg,image/png,application/pdf"
        className="hidden"
      />
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-300",
          isDragActive
            ? "border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/20"
            : "border-slate-300 bg-white hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-blue-400"
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-500/10 text-blue-600 dark:text-emerald-400 mb-4 animate-pulse">
          <UploadCloud className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Drag & drop your files here
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          or{" "}
          <span
            onClick={handleBrowse}
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            browse files
          </span>{" "}
          from your device
        </p>

        <p className="mt-4 text-xs text-slate-400/80 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full inline-block">
          Supported: PDF, JPG, PNG (Max 10 MB)
        </p>
      </div>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Uploaded Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {file.name}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {file.size} &bull; Ready
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
