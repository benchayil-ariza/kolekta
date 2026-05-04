import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Recycle, Award, MapPin, TrendingUp, ArrowRight, ShieldCheck, Leaf, Globe } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function Home() {
  const [stats, setStats] = useState({ totalWasteRecycled: 1250, activeCollectors: 84, pointsEarned: 24500 });
  const [truckStatus, setTruckStatus] = useState("San Isidro - Purok 2");

  useEffect(() => {
    fetch("/api/stats").then(res => res.json()).then(setStats);
    
    const statusIdx = ["Purok 1", "Purok 2", "Purok 3", "Purok 4"];
    let i = 0;
    const interval = setInterval(() => {
      setTruckStatus(`San Isidro - ${statusIdx[i % 4]}`);
      i++;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-neutral-dark pt-16 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8"
          >
            <Leaf className="h-4 w-4" />
            <span>Join 12,000+ residents in our Eco-Mission</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Turn Your Waste into <span className="text-secondary italic">Gold!</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10"
          >
            The Philippines' first community-driven waste management app. Segregate your waste, earn points, and redeem rewards for your family.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="btn-primary w-full sm:w-auto h-14 px-8">
              Sign Up For Your Barangay
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-3 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              See How It Works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 -mt-16 relative z-10 mx-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-5xl self-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">{stats.totalWasteRecycled.toLocaleString()}kg</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Waste Recycled</div>
          </div>
          <div className="text-center md:border-x border-slate-200 dark:border-slate-800">
            <div className="text-4xl font-bold text-secondary mb-1">{stats.activeCollectors}</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Collectors</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-1">{stats.pointsEarned.toLocaleString()}</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Points Redeemed</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple Path to a Green Life</h2>
          <p className="text-slate-600 dark:text-slate-400">Join the movement in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Recycle, title: "Segregate", desc: "Separate your plastic, paper, and glass at home.", color: "bg-emerald-100 text-emerald-600" },
            { icon: TrendingUp, title: "Log & Collect", desc: "Book a collection or visit a hub and log your entry.", color: "bg-blue-100 text-blue-600" },
            { icon: Award, title: "Earn & Redeem", desc: "Get eco-points immediately and redeem for rice or vouchers.", color: "bg-amber-100 text-amber-600" }
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className={cn("h-16 w-16 mb-6 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", step.color)}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Simulation Card */}
      <section className="bg-primary py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Real-Time Community Service</h2>
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Collection Truck Status", desc: "Know exactly where our trucks are in your Barangay." },
                { icon: ShieldCheck, title: "Verified Credits", desc: "All waste logs are checked by Barangay leaders." },
                { icon: Globe, title: "SDG 12 Impact", desc: "Directly contributes to sustainable global goals." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-wide">{item.title}</h4>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-glass p-8 border-none bg-white/10 text-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                <span className="font-bold uppercase text-xs tracking-widest text-sky-200">Live Collection Map</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">Update every 5s</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm opacity-60 mb-2">Current Collection Area:</p>
              <h3 className="text-2xl font-bold text-secondary">{truckStatus}</h3>
              <div className="mt-4 flex justify-between px-10">
                <div className="text-center">
                  <p className="text-[10px] uppercase opacity-50 mb-1">Queue</p>
                  <p className="font-bold">12 Bags</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase opacity-50 mb-1">Next Stop</p>
                  <p className="font-bold text-accent">Purok 4</p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5" />
              View Interaction Map
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
