import { DashboardAnalysisProvider } from "@/components/dashboard/DashboardAnalysisContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardAnalysisProvider>{children}</DashboardAnalysisProvider>;
}
