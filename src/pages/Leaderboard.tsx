import React, { useState, useEffect } from "react";
import { Trophy, Medal, Star, MapPin, Hash } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface LeaderboardEntry {
  name: string;
  points: number;
  barangay: string;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard").then(res => res.json()).then(setEntries);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex h-16 w-16 bg-secondary/20 rounded-full items-center justify-center mb-6"
        >
          <Trophy className="h-8 w-8 text-secondary" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 italic uppercase tracking-tighter">Hall of <span className="text-primary">Fame</span></h1>
        <p className="text-slate-500 max-w-md mx-auto">Celebrating our top Eco-Collectors. Your contribution makes a real difference in Mother Earth's health.</p>
      </div>

      <div className="space-y-4">
        {entries.map((entry, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "card-glass p-6 flex items-center justify-between group hover:border-primary/50 transition-all",
              idx === 0 && "bg-secondary/5 border-secondary/20 scale-[1.02] shadow-secondary/10"
            )}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-10 text-xl font-black text-slate-300 italic">
                {idx === 0 ? <Medal className="text-secondary h-8 w-8" /> : idx + 1}
              </div>
              <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="text-xl font-bold text-slate-400">{entry.name[0]}</div>
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {entry.name}
                  {idx === 0 && <Star className="h-4 w-4 fill-secondary text-secondary" />}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Barangay {entry.barangay}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-black text-primary italic">{entry.points.toLocaleString()}</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Eco-Points</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Hash className="text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Your Ranking</h4>
            <p className="text-sm text-slate-500">Keep logging to reach the top 10!</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-xs text-slate-400 mb-1 italic">Current Position</p>
          <span className="bg-primary text-white font-bold px-4 py-1 rounded-full">#84 in Barangay</span>
        </div>
      </div>
    </div>
  );
}
