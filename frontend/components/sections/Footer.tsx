import React from "react";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Docready-AI
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Supercharging applications with advanced AI screening. Helping
              students globally get their scholarships and government schemes ready without errors.
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#features"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Use Cases
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Scholarship Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Privacy & Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <span>
            © {new Date().getFullYear()} Docready-AI Inc. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              Cookies
            </a>
            <a href="#" className="hover:underline">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
