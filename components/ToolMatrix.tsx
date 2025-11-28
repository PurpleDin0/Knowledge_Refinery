import React from 'react';
import { TOOLS, TOOL_MATRIX } from '../data';
import { Check, X, HelpCircle, Star, Circle, Info } from 'lucide-react';
import { MatrixCell } from '../types';

const RatingIcon = ({ rating, size = 18 }: { rating: string, size?: number }) => {
  switch (rating) {
    case 'Gold':
      return <Star className="text-amber-400 fill-amber-400" size={size} />;
    case 'Green':
      return <Check className="text-emerald-400" strokeWidth={3} size={size} />;
    case 'Grey':
      return <Circle className="text-slate-400" strokeWidth={2.5} size={size * 0.8} />;
    case 'Red':
      return <X className="text-red-400" strokeWidth={3} size={size} />;
    default:
      return <HelpCircle className="text-blue-400" size={size} />;
  }
};

const RatingCell = ({ cell }: { cell: MatrixCell }) => {
  return (
    <div className="group relative flex justify-center py-2 w-full h-full">
      <div className="cursor-help flex flex-col items-center">
        <RatingIcon rating={cell.rating} />
        <span className="text-[10px] uppercase font-bold text-slate-500 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
            {cell.rating === 'Gold' ? 'Best' : cell.rating === 'Green' ? 'Strong' : cell.rating === 'Grey' ? 'Usable' : cell.rating === 'Red' ? 'No' : 'TBD'}
        </span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-900 text-slate-200 text-xs p-3 rounded-lg border border-slate-600 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 transform translate-y-2 group-hover:translate-y-0">
        <div className="font-bold mb-1 text-slate-400 capitalize border-b border-slate-700 pb-1 mb-1">{cell.rating === 'Unknown' ? 'Unknown/TBD' : cell.rating + ' Match'}</div>
        <p className="leading-relaxed">{cell.text}</p>
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-600 rotate-45"></div>
      </div>
    </div>
  );
};

const ToolMatrix: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500 pb-12">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-2">Field Equipment Manifest (v1.1)</h2>
        <p className="text-slate-400">Current recommended tools for the research protocol. Roles are metaphors; skeptical evaluation is essential.</p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <div key={tool.name} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-amber-500/50 transition-colors group">
            <div className={`h-2 w-full ${tool.score === 'Gold' ? 'bg-amber-400' : tool.score === 'Green' ? 'bg-emerald-500' : tool.score === 'Grey' ? 'bg-slate-500' : 'bg-red-500'}`}></div>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{tool.name}</h3>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{tool.role}</span>
                    </div>
                    {tool.score === 'Gold' && <Star className="text-amber-400 fill-amber-400" size={20}/>}
                </div>

                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 min-h-[80px]">
                    <p className="text-sm text-slate-300">{tool.bestUse}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                        <span className="block text-slate-500 mb-1">Cost</span>
                        <span className="font-medium text-slate-200">{tool.cost}</span>
                    </div>
                    <div>
                         <span className="block text-slate-500 mb-1">Context</span>
                        <span className="font-medium text-slate-200">{tool.contextWindow}</span>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Matrix Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-amber-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                Task × Tool Capability Matrix
                <span className="text-slate-500 normal-case font-normal text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                  <Info size={12} /> Hover cells for details
                </span>
            </h3>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-3 text-xs text-slate-400 bg-slate-950/50 px-3 py-2 rounded-lg border border-slate-800/50">
                <div className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400"/> Best</div>
                <div className="flex items-center gap-1"><Check size={12} className="text-emerald-400"/> Strong</div>
                <div className="flex items-center gap-1"><Circle size={10} className="text-slate-400"/> Usable</div>
                <div className="flex items-center gap-1"><X size={12} className="text-red-400"/> Not Suitable</div>
                <div className="flex items-center gap-1"><HelpCircle size={12} className="text-blue-400"/> TBD</div>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-6">
              <table className="w-full text-sm text-left border-collapse">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                      <tr>
                          <th className="px-6 py-4 w-1/4 sticky left-0 bg-slate-900 border-r border-slate-800 shadow-[2px_0_5px_rgba(0,0,0,0.3)] z-20">Task / Step</th>
                          <th className="px-2 py-4 text-center min-w-[140px] border-r border-slate-800/30">NotebookLM<br/><span className="text-[10px] opacity-50 lowercase">(Google)</span></th>
                          <th className="px-2 py-4 text-center min-w-[140px] border-r border-slate-800/30">GPT-5.1 Thinking<br/><span className="text-[10px] opacity-50 lowercase">(OpenAI)</span></th>
                          <th className="px-2 py-4 text-center min-w-[140px] border-r border-slate-800/30">Claude Sonnet 4.5<br/><span className="text-[10px] opacity-50 lowercase">(Anthropic)</span></th>
                          <th className="px-2 py-4 text-center min-w-[140px] border-r border-slate-800/30">Gemini 2.5<br/><span className="text-[10px] opacity-50 lowercase">(Google)</span></th>
                          <th className="px-2 py-4 text-center min-w-[140px]">Perplexity<br/><span className="text-[10px] opacity-50 lowercase"> </span></th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                      {TOOL_MATRIX.map((row, index) => (
                        <tr key={index} className="bg-slate-900 hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 font-medium border-r border-slate-800 bg-slate-900/95 sticky left-0 z-10 text-slate-200">
                                {row.task}
                            </td>
                            <td className="px-2 py-2 border-r border-slate-800/50"><RatingCell cell={row.notebookLM} /></td>
                            <td className="px-2 py-2 border-r border-slate-800/50"><RatingCell cell={row.gpt51} /></td>
                            <td className="px-2 py-2 border-r border-slate-800/50"><RatingCell cell={row.claude} /></td>
                            <td className="px-2 py-2 border-r border-slate-800/50"><RatingCell cell={row.gemini} /></td>
                            <td className="px-2 py-2"><RatingCell cell={row.perplexity} /></td>
                        </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

      {/* Placeholder for Multi-model / Unique Use Cases */}
      <div className="border-2 border-dashed border-slate-700 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/50 hover:border-amber-500/30 transition-all">
        <div className="p-4 bg-slate-800 rounded-full mb-4 ring-1 ring-slate-700 shadow-lg">
             <Info className="text-amber-500" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Multi-Model & Specialized Tasks</h3>
        <p className="text-slate-400 max-w-lg mb-8">
            A specialized matrix for complex multimodal tasks—including infographic creation, slide generation, and code interpretation—is currently under development.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            {['Infographic Creation', 'Slide Generation', 'Code Analysis', 'Data Visualization'].map((tag) => (
                <div key={tag} className="flex items-center justify-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                    {tag}
                </div>
            ))}
        </div>
        
        <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Coming Soon
        </div>
      </div>

    </div>
  );
};

export default ToolMatrix;