import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Loader2, Link2 } from 'lucide-react';
import { analyzeScam } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

interface ScamResult {
  isScam: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  reason: string;
  advice: string;
}

export default function ScamShield() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<ScamResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeScam(content);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-500 bg-red-50 border-red-100';
      case 'Medium': return 'text-amber-500 bg-amber-50 border-amber-100';
      default: return 'text-emerald-500 bg-emerald-50 border-emerald-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold">Scam Shield</h2>
          <p className="text-sm text-slate-500">Check messages or links for potential scams.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste a suspicious message, email, or link here..."
            className="w-full h-32 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all shadow-sm resize-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !content.trim()}
            className="absolute bottom-3 right-3 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-all flex items-center gap-2 font-medium"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Link2 size={18} />}
            Analyze
          </button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-6 border rounded-xl space-y-4",
                getRiskColor(result.riskLevel)
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-display font-bold text-lg">
                  {result.isScam ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                  {result.isScam ? "Potential Scam Detected!" : "Looks Safe!"}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/50 border border-current">
                  {result.riskLevel} Risk
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium opacity-90">
                  <strong>Why:</strong> {result.reason}
                </p>
                <div className="p-3 bg-white/40 rounded-lg border border-white/20">
                  <p className="text-sm font-bold">What should you do?</p>
                  <p className="text-sm opacity-90 italic">{result.advice}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-slate-200 rounded-xl bg-white">
          <h4 className="text-sm font-bold mb-1">Common Red Flags:</h4>
          <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
            <li>Asking for passwords or personal info</li>
            <li>"Too good to be true" deals</li>
            <li>Urgent language (e.g., "Act now!")</li>
            <li>Strange links or weird spelling</li>
          </ul>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white">
          <h4 className="text-sm font-bold mb-1">Stay Safe:</h4>
          <p className="text-xs text-slate-500">
            If you're unsure, always ask a teacher or parent before clicking links or sharing information online.
          </p>
        </div>
      </div>
    </div>
  );
}
