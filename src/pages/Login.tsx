import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, UserPlus, Recycle, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row">
      <div className="flex-1 bg-primary p-12 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10"><Recycle className="w-40 h-40" /></div>
          <div className="absolute bottom-10 right-10"><Shield className="w-32 h-32" /></div>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold mb-6">Cleaning the Philippines, one barangay at a time.</h2>
          <p className="text-lg text-white/80 mb-8">
            "Waste is only waste if we waste it." Join thousands of collectors turning local trash into community treasure.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-10 w-10 bg-white/20 border-2 border-primary rounded-full" />
              ))}
            </div>
            <p className="text-sm font-medium">8.4k Residents Joined Today</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-neutral-dark p-12 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400">Enter your credentials to manage your eco-points.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="juan.delacruz@email.com"
                className="input-field"
              />
            </div>
            <div className="group space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="input-field"
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                <span className="text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
              </label>
              <Link to="#" className="text-primary font-bold hover:underline">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-primary w-full h-14 shadow-xl">
              <LogIn className="h-5 w-5" />
              Sign In to Your Account
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 text-sm">
            Don't have an account? <Link to="/signup" className="text-primary font-bold">Sign up for your Barangay</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
