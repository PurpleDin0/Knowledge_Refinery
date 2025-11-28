import React from 'react';
import { Phase } from '../types';
import { Bot, User, Copy, ChevronRight, AlertTriangle, Lightbulb } from 'lucide-react';

interface Props {
  phase: Phase;
}

const PhaseDetail: React.FC<Props> = ({ phase }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${phase.prompt.role}\n\n${phase.prompt.example}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-slate-900/50 p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">PHASE {phase.id}</span>
            <h2 className="text-2xl font-bold text-slate-100">{phase.title}</h2>
          </div>
          <p className="text-amber-500/80 font-mono text-sm uppercase tracking-wide">{phase.subtitle}</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-600 flex items-center gap-2">
            <Lightbulb size={16} className="text-yellow-400" />
            <span className="text-slate-300 text-sm font-medium">Best Tool: <span className="text-white">{phase.bestTool}</span></span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Context */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Goal</h4>
            <p className="text-slate-200 text-sm leading-relaxed">{phase.goal}</p>
          </div>

          <div>
             <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                Inputs <ChevronRight size={12}/> Outputs
             </h4>
             <div className="flex flex-col gap-2">
                <div className="bg-slate-700/30 p-3 rounded border-l-2 border-blue-400">
                    <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside marker:text-blue-400">
                        {phase.inputs.map((input, i) => <li key={i}>{input}</li>)}
                    </ul>
                </div>
                <div className="flex justify-center text-slate-500"><ChevronRight className="rotate-90 md:rotate-0" /></div>
                <div className="bg-slate-700/30 p-3 rounded border-l-2 border-green-400">
                    <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside marker:text-green-400">
                        {phase.outputs.map((output, i) => <li key={i}>{output}</li>)}
                    </ul>
                </div>
             </div>
          </div>
          
          <div className="pt-4 border-t border-slate-700">
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Responsibility Matrix</h4>
            <div className="grid grid-cols-1 gap-3">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Bot size={18}/></div>
                    <div>
                        <span className="text-xs text-blue-400 font-bold block mb-1">AI Jobs (Staff Work)</span>
                        <ul className="text-xs text-slate-400 space-y-1">
                            {phase.aiJobs.map((job, i) => <li key={i}>• {job}</li>)}
                        </ul>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><User size={18}/></div>
                    <div>
                        <span className="text-xs text-amber-500 font-bold block mb-1">Human Jobs (Command)</span>
                         <ul className="text-xs text-slate-400 space-y-1">
                            {phase.humanJobs.map((job, i) => <li key={i}>• {job}</li>)}
                        </ul>
                    </div>
                 </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prompt Strategy */}
        <div className="lg:col-span-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-amber-500/30 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                           <span className="text-amber-500">Prompt Strategy:</span> {phase.prompt.strategy}
                        </h3>
                        <button 
                            onClick={handleCopy}
                            className="text-xs flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded transition-colors"
                        >
                            {copied ? 'Copied!' : <><Copy size={14}/> Copy Prompt</>}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-slate-500 uppercase">Role Definition</span>
                            <div className="font-mono text-sm text-blue-300 bg-slate-950/50 p-3 rounded border border-slate-700/50">
                                {phase.prompt.role}
                            </div>
                        </div>

                         <div className="space-y-1">
                            <span className="text-xs font-bold text-slate-500 uppercase">Example Prompt</span>
                            <div className="font-mono text-sm text-green-300 bg-slate-950/50 p-4 rounded border border-slate-700/50 whitespace-pre-wrap">
                                {phase.prompt.example}
                            </div>
                        </div>
                    </div>
                </div>
                
                {phase.id === 3 && (
                    <div className="bg-red-500/10 border-t border-red-500/30 p-4 flex items-start gap-3">
                        <AlertTriangle className="text-red-500 shrink-0" size={20} />
                        <div className="text-sm text-red-200">
                            <strong>Steelman Warning:</strong> Do not just perfunctorily ask for counterarguments. You must genuinely consider if the AI disproves your thesis. If you immediately dismiss it, you are performing adversarial theater, not intellectual rigor.
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseDetail;
