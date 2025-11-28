import React from 'react';
import { Brain, Cpu, Database, Hammer } from 'lucide-react';

const Philosophy: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-700">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Mining & Refining</h2>
        <p className="text-xl text-slate-300 leading-relaxed">
            Think of this process not as "writing a paper," but as an <span className="text-amber-500 font-bold">industrial process</span> of mining raw data and refining it into a high-value product.
        </p>
        <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-amber-500">
            <h3 className="text-xl font-bold text-white mb-2">The Golden Rule</h3>
            <p className="text-slate-300 italic">"AI generates options; Humans make decisions."</p>
        </div>
        <p className="text-slate-400">
            Domain expertise decisions (thesis synthesis, source credibility, counterargument evaluation) cannot be delegated. Tactical decisions (formatting, phrasing) can leverage AI with lighter oversight.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center hover:bg-slate-750 transition-colors">
            <div className="p-4 bg-blue-500/20 rounded-full mb-4">
                <Cpu size={32} className="text-blue-400" />
            </div>
            <h4 className="font-bold text-white mb-2">AI Role</h4>
            <p className="text-sm text-slate-400 uppercase font-mono tracking-wider mb-2">Processing Plant</p>
            <p className="text-sm text-slate-300">Handles volume, summarization, structural drafting, and pattern matching.</p>
        </div>

         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center hover:bg-slate-750 transition-colors">
            <div className="p-4 bg-amber-500/20 rounded-full mb-4">
                <Brain size={32} className="text-amber-500" />
            </div>
            <h4 className="font-bold text-white mb-2">Human Role</h4>
            <p className="text-sm text-slate-400 uppercase font-mono tracking-wider mb-2">Decision Authority</p>
            <p className="text-sm text-slate-300">Provides intent, assesses logic, defines victory conditions, and validates output.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center hover:bg-slate-750 transition-colors">
            <div className="p-4 bg-purple-500/20 rounded-full mb-4">
                <Database size={32} className="text-purple-400" />
            </div>
            <h4 className="font-bold text-white mb-2">The Ore</h4>
            <p className="text-sm text-slate-400 uppercase font-mono tracking-wider mb-2">Raw Data</p>
            <p className="text-sm text-slate-300">PDFs, statistics, reports, and course readings.</p>
        </div>

         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center hover:bg-slate-750 transition-colors">
            <div className="p-4 bg-emerald-500/20 rounded-full mb-4">
                <Hammer size={32} className="text-emerald-400" />
            </div>
            <h4 className="font-bold text-white mb-2">The Product</h4>
            <p className="text-sm text-slate-400 uppercase font-mono tracking-wider mb-2">Knowledge</p>
            <p className="text-sm text-slate-300">A refined, defended thesis with wired citations.</p>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;
