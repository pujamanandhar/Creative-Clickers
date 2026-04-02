import React, { useState } from 'react';
import { Search, ShieldCheck, Info, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { moderateResearch } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';

export default function ResearchModerator() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await moderateResearch(query);
      setResult(res || "No response received.");
    } catch (error) {
      setResult("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
          <Search size={24} />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold">AI Research Moderator</h2>
          <p className="text-sm text-slate-500">Conduct your research safely and ethically.</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you researching today?"
          className="w-full px-4 py-4 pr-12 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="text-emerald-500 mt-1" size={20} />
              <div className="markdown-body w-full">
                <Markdown>{result}</Markdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !loading && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
          <Info className="text-blue-500 shrink-0" size={20} />
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> Try asking about "Solar Energy", "Ancient Civilizations", or "How AI works". 
            I'll help you find safe information!
          </p>
        </div>
      )}
    </div>
  );
}
