import React, { useState } from 'react';
import { Gamepad2, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { filterGamingWords } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';

export default function WordFilter() {
  const [text, setText] = useState('');
  const [filtered, setFiltered] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFilter = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await filterGamingWords(text);
      setFiltered(res || "");
    } catch (error) {
      setFiltered("Error filtering text.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (filtered) {
      navigator.clipboard.writeText(filtered);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <Gamepad2 size={24} />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold">Gaming Word Filter</h2>
          <p className="text-sm text-slate-500">Turn toxic chat into something positive!</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste gaming chat or words you found online here..."
            className="w-full h-32 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm resize-none"
          />
          <button
            onClick={handleFilter}
            disabled={loading || !text.trim()}
            className="absolute bottom-3 right-3 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-all flex items-center gap-2 font-medium"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            Filter Text
          </button>
        </div>

        <AnimatePresence>
          {filtered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-6 bg-indigo-50 border border-indigo-100 rounded-xl"
            >
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Filtered Result</h3>
              <p className="text-indigo-900 font-medium italic">"{filtered}"</p>
              
              <button
                onClick={copyToClipboard}
                className="absolute top-3 right-3 p-2 text-indigo-400 hover:text-indigo-600 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-slate-100 rounded-xl">
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong>How it works:</strong> Our AI looks for mean or inappropriate words and swaps them for fun alternatives. 
          Use this to keep your gaming environment friendly!
        </p>
      </div>
    </div>
  );
}
