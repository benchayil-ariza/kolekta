import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeColor = "emerald" | "teal" | "blue" | "navy";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  accentColor: ThemeColor;
  setAccentColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || 
             (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  const [accentColor, setAccentColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem("accentColor") as ThemeColor) || "emerald";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    // Apply accent color to document
    const colors: Record<ThemeColor, string> = {
      emerald: "#10b981",
      teal: "#0d9488",
      blue: "#3b82f6",
      navy: "#1e3a8a"
    };
    document.documentElement.style.setProperty("--color-primary", colors[accentColor]);
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
