import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { 
  Trash2, Package, Wine, Utensils, Send, History, Award, TrendingUp, AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const [logging, setLogging] = useState(false);
  const [formData, setFormData] = useState({ plastic: 0, paper: 0, glass: 0, bio: 0 });
  const [successMsg, setSuccessMsg] = useState("");

  if (!user) return <div className="text-center py-20">Please login to view dashboard</div>;

  const chartData = [
    { name: "Plastic", value: user.logs.reduce((s, l) => s + l.plastic, 0), color: "#06b6d4" },
    { name: "Paper", value: user.logs.reduce((s, l) => s + l.paper, 0), color: "#3b82f6" },
    { name: "Glass", value: user.logs.reduce((s, l) => s + l.glass, 0), color: "#f59e0b" },
    { name: "Bio", value: user.logs.reduce((s, l) => s + l.bio, 0), color: "#059669" },
  ];

  const handleLogWaste = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogging(true);
    try {
      const res = await fetch("/api/waste-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, ...formData }),
      });
      const data = await res.json();
      await refreshUser();
      setSuccessMsg(`Success! You earned ${data.earned} eco-points!`);
      setFormData({ plastic: 0, paper: 0, glass: 0, bio: 0 });
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, <span className="text-primary italic">Collector!</span></h1>
          <p className="text-slate-500 dark:text-slate-400">Barangay {user.barangay} • ID: {user.id}</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 flex-1">
            <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400">Total Eco-Points</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{user.points}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Logging & Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Logging Form */}
          <div className="card-glass p-8">
            <div className="flex items-center gap-2 mb-6">
              <History className="text-primary" />
              <h2 className="text-xl font-bold">Log New Collection</h2>
            </div>
            
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-xl mb-6 flex items-center gap-3"
              >
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">{successMsg}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogWaste} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-cyan-500" /> Plastic (kg)
                </label>
                <input 
                  type="number" step="0.1" 
                  value={formData.plastic}
                  onChange={e => setFormData({...formData, plastic: parseFloat(e.target.value) || 0})}
                  className="input-field"
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-500" /> Paper (kg)
                </label>
                <input 
                  type="number" step="0.1"
                  value={formData.paper}
                  onChange={e => setFormData({...formData, paper: parseFloat(e.target.value) || 0})}
                  className="input-field"
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Wine className="h-4 w-4 text-amber-500" /> Glass (kg)
                </label>
                <input 
                  type="number" step="0.1"
                  value={formData.glass}
                  onChange={e => setFormData({...formData, glass: parseFloat(e.target.value) || 0})}
                  className="input-field"
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-emerald-500" /> Biodegradable (kg)
                </label>
                <input 
                  type="number" step="0.1"
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: parseFloat(e.target.value) || 0})}
                  className="input-field"
                  placeholder="0.0"
                />
              </div>
              <button 
                disabled={logging}
                type="submit" 
                className={cn("col-span-1 sm:col-span-2 btn-primary h-14 mt-4 shadow-xl", logging && "opacity-50 cursor-not-allowed")}
              >
                {logging ? "Processing..." : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Log Entry
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Chart Section */}
          <div className="card-glass p-8">
            <h3 className="text-xl font-bold mb-8">Waste Category Impact</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
                            <p className="text-xs font-bold text-slate-500 uppercase">{payload[0].payload.name}</p>
                            <p className="text-lg font-bold">{payload[0].value} kg</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 grid grid-cols-4 gap-2">
              {chartData.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-sm font-bold">{item.value}kg</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-tighter">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="space-y-8">
          <div className="card-glass p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Recent Logs
            </h3>
            <div className="space-y-4">
              {user.logs.slice().reverse().map((log, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold">{log.date}</span>
                    <span className="text-sm font-bold text-primary">+{log.points} pts</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {log.plastic > 0 && <span className="text-[10px] bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">Pl: {log.plastic}kg</span>}
                    {log.paper > 0 && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Pa: {log.paper}kg</span>}
                    {log.glass > 0 && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Gl: {log.glass}kg</span>}
                    {log.bio > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Bi: {log.bio}kg</span>}
                  </div>
                </div>
              ))}
              {user.logs.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">No waste logs yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-primary/10 dark:bg-primary/5 p-6 rounded-2xl border border-primary/20">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Pro Tip
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Clean your plastic bottles before disposal to earn an extra 5% points! Verified clean plastics are easier to process for our recycling partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
