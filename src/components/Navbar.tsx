import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Recycle, User, Menu, X, Sun, Moon, LogOut, Palette } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme, ThemeColor } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode, accentColor, setAccentColor } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showPalette, setShowPalette] = React.useState(false);
  const location = useLocation();

  const themes: { name: string; color: ThemeColor; hex: string }[] = [
    { name: "Emerald", color: "emerald", hex: "#10b981" },
    { name: "Teal", color: "teal", hex: "#0d9488" },
    { name: "Blue", color: "blue", hex: "#3b82f6" },
    { name: "Navy", color: "navy", hex: "#1e3a8a" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Education", path: "/education" },
  ];

  if (user) {
    navLinks.push({ name: "Dashboard", path: "/dashboard" });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-dark/80 backdrop-blur-xl border-bottom border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2.5 rounded-xl transition-all group-hover:rotate-12 group-active:scale-90 shadow-lg shadow-primary/20">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-primary leading-none">
                KOLEKTA<span className="text-secondary italic">.PH</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
                E-Waste Community
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mr-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                    location.pathname === link.path 
                      ? "bg-white dark:bg-slate-900 text-primary shadow-sm" 
                      : "text-slate-500 dark:text-slate-400 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowPalette(!showPalette)}
                  className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                  title="Customize Theme"
                >
                  <Palette className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {showPalette && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 flex flex-col gap-1 min-w-[120px]"
                    >
                      {themes.map((t) => (
                        <button
                          key={t.color}
                          onClick={() => { setAccentColor(t.color); setShowPalette(false); }}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-colors",
                            accentColor === t.color ? "bg-slate-100 dark:bg-slate-700 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                          )}
                        >
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: t.hex }} />
                          {t.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold">{user.name}</span>
                  <span className="text-xs text-primary font-bold">{user.points} pts</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-5 text-sm">
                Join Community
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2">
              {darkMode ? <Sun className="h-5 w-5 text-slate-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-neutral-dark border-b border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-center btn-primary"
                >
                  Login
                </Link>
              )}
              {user && (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full text-left px-3 py-2 text-red-600 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
