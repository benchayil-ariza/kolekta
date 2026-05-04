import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl font-bold text-primary">Kolekta<span className="text-secondary">.ph</span></span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
            Empowering barangays to build a cleaner, greener Philippines through responsible waste management and community rewards.
          </p>
          <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">© 2024 Kolekta.ph. Supporting SDG 12.</p>
            <div className="flex gap-6 text-xs text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Barangay Partnership</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
