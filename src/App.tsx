/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Search, Gamepad2, AlertTriangle, Menu, X, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ResearchModerator from './components/ResearchModerator';
import WordFilter from './components/WordFilter';
import ScamShield from './components/ScamShield';
import { cn } from './utils';

type Tab = 'research' | 'gaming' | 'scam';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('research');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'research', label: 'AI Research', icon: Search, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'gaming', label: 'Gaming Filter', icon: Gamepad2, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'scam', label: 'Scam Shield', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar / Mobile Nav */}
      <nav className={cn(
        "fixed inset-0 z-50 bg-white md:relative md:flex md:w-72 md:flex-col border-r border-slate-200 transition-transform duration-300",
        isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Shield size={24} />
            </div>
            <h1 className="text-xl font-display font-bold tracking-tight">Guardian AI</h1>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="md:hidden p-2 text-slate-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 px-4 py-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as Tab);
                setIsMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                activeTab === tab.id 
                  ? `${tab.bg} ${tab.color} shadow-sm` 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Student Safety</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for PYP5 students to explore the digital world safely.
            </p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 text-slate-500">
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              AI Safety Active
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">PYP5 Explorer</p>
              <p className="text-xs text-slate-500">Digital Citizen</p>
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <img 
                src="https://picsum.photos/seed/student/100/100" 
                alt="Avatar" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'research' && <ResearchModerator />}
              {activeTab === 'gaming' && <WordFilter />}
              {activeTab === 'scam' && <ScamShield />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Guardian AI Toolkit • Built for Digital Safety Education
          </p>
        </footer>
      </main>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
