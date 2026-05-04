import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { REWARDS } from "../types";
import { ShoppingBag, ArrowRight, CheckCircle2, ShoppingCart, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export default function Marketplace() {
  const { user, refreshUser } = useAuth();
  const [redeeming, setRedeeming] = useState<string | null>(null);
  const [notif, setNotif] = useState<string | null>(null);

  const handleRedeem = async (rewardId: string, cost: number) => {
    if (!user) return alert("Please login first");
    if (user.points < cost) return alert("Not enough points!");

    setRedeeming(rewardId);
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, points: cost }),
      });
      if (res.ok) {
        await refreshUser();
        setNotif("Redemption successful! Check your email for the voucher.");
        setTimeout(() => setNotif(null), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRedeeming(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-3 italic">Incentive <span className="text-primary">Marketplace</span></h1>
          <p className="text-slate-500 max-w-lg">Redeem your hard-earned eco-points for basic goods, vouchers, and sustainable products. Supporting local vendors.</p>
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center gap-6 shadow-xl">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Your Wallet</p>
            <p className="text-3xl font-bold text-secondary">{user?.points || 0} <span className="text-sm font-normal text-slate-400">pts</span></p>
          </div>
          <div className="h-10 w-px bg-slate-700" />
          <ShoppingCart className="h-8 w-8 text-secondary/50" />
        </div>
      </div>

      <AnimatePresence>
        {notif && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8"
          >
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">{notif}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REWARDS.map((reward) => (
          <motion.div 
            key={reward.id}
            whileHover={{ y: -5 }}
            className="card-glass flex flex-col group"
          >
            <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Tag className="h-3 w-3" />
                {reward.category}
              </div>
              <ShoppingBag className="h-16 w-16 text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">{reward.description}</p>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary">{reward.cost}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Pts Required</span>
                </div>
                <button
                  disabled={redeeming === reward.id || (user && user.points < reward.cost)}
                  onClick={() => handleRedeem(reward.id, reward.cost)}
                  className={cn(
                    "h-10 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
                    (!user || user.points < reward.cost) 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90 active:scale-95"
                  )}
                >
                  {redeeming === reward.id ? "..." : "Redeem"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-slate-400 text-sm">More rewards added weekly by our Barangay partners.</p>
      </div>
    </div>
  );
}
