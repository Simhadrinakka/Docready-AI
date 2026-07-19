"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface UploadedFile {
  name: string;
  size: string;
  type: string;
  progress: number;
  rawFile?: File;
  previewUrl?: string;
  status: "Pending" | "Completed" | "Uploading" | "Error";
}

export interface AnalysisResult {
  success: boolean;
  total_files: number;
  files: Array<{
    filename: string;
    document_type: string;
    fields: Record<string, any>;
    readiness: {
      score: number;
      status: string;
    };
    issues: string[];
    recommendations: string[];
    extracted_text?: string;
  }>;
  comparison: {
    name_match: boolean;
    missing_documents: string[];
    summary: string[];
  };
}

export interface HistoryItem {
  id: string;
  schemeId: string;
  schemeName: string;
  applicantName: string;
  date: string;
  result: AnalysisResult;
  processingTimeSec: number;
  filesCount: number;
}

interface DashboardAnalysisContextValue {
  selectedScheme: string;
  setSelectedScheme: (scheme: string) => void;
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  checkedSelfDocs: Record<string, boolean>;
  setCheckedSelfDocs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  isAnalyzing: boolean;
  setIsAnalyzing: (val: boolean) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  analysisHistory: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, "id" | "date">) => void;
  clearHistory: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
}

const DashboardAnalysisContext = createContext<DashboardAnalysisContextValue | undefined>(
  undefined
);

export function DashboardAnalysisProvider({ children }: { children: ReactNode }) {
  const [selectedScheme, setSelectedSchemeState] = useState("nsp");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [checkedSelfDocs, setCheckedSelfDocs] = useState<Record<string, boolean>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [analysisHistory, setAnalysisHistory] = useState<HistoryItem[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const setSelectedScheme = (schemeId: string) => {
    setSelectedSchemeState(schemeId);
    setCheckedSelfDocs({});
  };

  // Load state from localStorage once client side mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load Theme
      const savedTheme = localStorage.getItem("docready-theme") as "light" | "dark" | null;
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
      setTheme(initialTheme);
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Load History
      const savedHistory = localStorage.getItem("docready-history");
      if (savedHistory) {
        try {
          setAnalysisHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Failed to parse history from localStorage", e);
        }
      }

      // Load Language
      const savedLang = localStorage.getItem("docready-lang") as "en" | "hi" | null;
      if (savedLang) {
        setLanguage(savedLang);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("docready-theme", nextTheme);
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleSetLanguage = (lang: "en" | "hi") => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("docready-lang", lang);
    }
  };

  const addToHistory = (item: Omit<HistoryItem, "id" | "date">) => {
    const newItem: HistoryItem = {
      ...item,
      id: "rpt-" + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    const updatedHistory = [newItem, ...analysisHistory];
    setAnalysisHistory(updatedHistory);
    if (typeof window !== "undefined") {
      localStorage.setItem("docready-history", JSON.stringify(updatedHistory));
    }
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("docready-history");
    }
  };

  return (
    <DashboardAnalysisContext.Provider
      value={{
        selectedScheme,
        setSelectedScheme,
        files,
        setFiles,
        checkedSelfDocs,
        setCheckedSelfDocs,
        isAnalyzing,
        setIsAnalyzing,
        analysisResult,
        setAnalysisResult,
        activeStep,
        setActiveStep,
        analysisHistory,
        addToHistory,
        clearHistory,
        theme,
        toggleTheme,
        language,
        setLanguage: handleSetLanguage,
      }}
    >
      {children}
    </DashboardAnalysisContext.Provider>
  );
}

export function useDashboardAnalysis() {
  const context = useContext(DashboardAnalysisContext);
  if (!context) {
    throw new Error("useDashboardAnalysis must be used within DashboardAnalysisProvider");
  }
  return context;
}
