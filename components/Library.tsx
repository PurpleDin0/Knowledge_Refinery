
import React, { useState } from 'react';
import { PHASES, PRO_TIPS } from '../data';
import { Copy, Terminal, Shield, Cpu, Mic, StopCircle, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';

const IconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={24} className="text-emerald-400" />,
  Cpu: <Cpu size={24} className="text-blue-400" />,
  Mic: <Mic size={24} className="text-amber-400" />,
  StopCircle: <StopCircle size={24} className="text-red-400" />,
};

const Library: React.FC = () => {
  const [openPhase, setOpenPhase] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const togglePhase = (id: number) => {
    setOpenPhase(openPhase === id ? null : id);
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
          <BookOpen className="text-amber-500" size={36} />
          Reference Library
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A collection of tested prompt strategies and field manual tips for the AI-assisted research workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Prompt Library */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
            <Terminal size={20} className="text-amber-500" />
            <h3 className="text-xl font-bold text-slate-200">Master Prompt Library</h3>
          </div>

          <div className="space-y-4">
            {PHASES.map((phase) => (
              <div key={phase.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm hover:border-slate-600 transition-colors">
                <button 
                  onClick={() => togglePhase(phase.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-slate-800 hover:bg-slate-750 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${openPhase === phase.id ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-400'}`}>
                      {phase.id}
                    </div>
                    <div>
                      <h4 className={`font-bold ${openPhase === phase.id ? 'text-white' : 'text-slate-300'}`}>{phase.title}</h4>
                      <p className="text-xs text-slate-500 font-mono uppercase">{phase.subtitle}</p>
                    </div>
                  </div>
                  {openPhase === phase.id ? <ChevronDown className="text-slate-400" /> : <ChevronRight className="text-slate-600" />}
                </button>

                {openPhase === phase.id && (
                  <div className="px-6 pb-6 pt-2 bg-slate-900/50 border-t border-slate-700">
                    <div className="mb-4">
                       <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Strategy: {phase.prompt.strategy}</span>
                    </div>
                    
                    <div className="relative group">
                      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                        <span className="text-blue-400 font-bold block mb-2">{phase.prompt.role}</span>
                        {phase.prompt.example}
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(`${phase.prompt.role}\n\n${phase.prompt.example}`, phase.id);
                        }}
                        className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded border border-slate-700 transition-colors opacity-0 group-hover:opacity-100"
                        title="Copy to clipboard"
                      >
                        {copiedId === phase.id ? <span className="text-green-400 font-bold text-xs">Copied</span> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tips & Tricks */}
        <div className="lg:col-span-4 space-y-6">
           <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
            <Shield size={20} className="text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-200">Field Manual Tips</h3>
          </div>

          <div className="space-y-4">
            {PRO_TIPS.map((tip, index) => (
              <div key={index} className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    {IconMap[tip.icon]}
                  </div>
                  <h4 className="font-bold text-slate-200">{tip.title}</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}

            <div className="p-5 rounded-xl border border-dashed border-slate-700 bg-slate-900/30 text-center">
              <p className="text-xs text-slate-500 italic">
                "The golden rule: AI generates options; Humans make decisions."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Library;
