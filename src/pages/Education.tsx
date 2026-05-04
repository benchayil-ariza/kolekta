import React from "react";
import { BookOpen, Sprout, Filter, Lightbulb, ArrowRight, Bookmark } from "lucide-react";
import { motion } from "motion/react";

const ARTICLES = [
  {
    title: "How to Segregate Waste Properly",
    category: "Basics",
    readTime: "5 min",
    excerpt: "Learn the golden rules of the 3 R's: Reduce, Reuse, Recycle. A guide for every household.",
    color: "border-emerald-500",
    bg: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "DIY Composting Guide for Small Homes",
    category: "Composting",
    readTime: "8 min",
    excerpt: "No garden? No problem. Here is how you can compost your kitchen waste in an apartment.",
    color: "border-amber-500",
    bg: "bg-amber-50 text-amber-600"
  },
  {
    title: "Urban Gardening Tips for Beginners",
    category: "Gardening",
    readTime: "12 min",
    excerpt: "Turn your eco-points into seeds and start your own garden on your balcony.",
    color: "border-blue-500",
    bg: "bg-blue-50 text-blue-600"
  },
  {
    title: "The Plastic Crisis in the Philippines",
    category: "Research",
    readTime: "15 min",
    excerpt: "Understanding the impact of single-use plastics in our local waterways and cities.",
    color: "border-red-500",
    bg: "bg-red-50 text-red-600"
  }
];

export default function Education() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 italic">Educational <span className="text-primary">Hub</span></h1>
          <p className="text-slate-500 text-lg">Knowledge is power. Learn how your daily choices can help restore our environment and build more sustainable barangays.</p>
        </div>
        <BookOpen className="h-24 w-24 text-slate-100 dark:text-slate-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARTICLES.map((article, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col md:flex-row group card-glass border-l-4 overflow-hidden"
            style={{ borderLeftColor: article.color.split('-')[1] }}
          >
            <div className="md:w-1/3 bg-slate-100 dark:bg-slate-800 p-8 flex items-center justify-center relative">
              <Bookmark className="absolute top-4 left-4 h-4 w-4 text-slate-300" />
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${article.bg}`}>
                {idx === 0 ? <Filter /> : idx === 1 ? <Sprout /> : <Lightbulb />}
              </div>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase font-black tracking-widest px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{article.readTime} read</span>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors mb-2">{article.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{article.excerpt}</p>
              </div>
              <button className="flex items-center gap-2 text-primary font-bold text-sm">
                Read Article
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 card-glass p-12 bg-primary text-white border-none relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <Sprout className="h-64 w-64" />
        </div>
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl font-bold mb-4italic">Weekly Webinars</h2>
          <p className="text-white/80 mb-8">Join our live sessions every Saturday 10 AM with experts on waste management and urban farming.</p>
          <button className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-all">
            Browse Upcoming Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
