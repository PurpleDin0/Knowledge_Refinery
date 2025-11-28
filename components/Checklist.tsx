import React, { useState } from 'react';
import { CHECKLIST_ITEMS } from '../data';
import { CheckSquare, Square } from 'lucide-react';

const Checklist: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>(new Array(CHECKLIST_ITEMS.length).fill(false));

  const toggle = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const allChecked = checked.every(Boolean);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Verification Checklist</h2>
        <p className="text-slate-400">After your research is complete, verify if you outsourced too much cognition.</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-xl">
        <div className="space-y-4">
            {CHECKLIST_ITEMS.map((item, index) => (
                <div 
                    key={index} 
                    onClick={() => toggle(index)}
                    className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all border ${checked[index] ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-slate-900/30 border-slate-700 hover:bg-slate-700/50'}`}
                >
                    <div className={`mt-1 ${checked[index] ? 'text-emerald-500' : 'text-slate-500'}`}>
                        {checked[index] ? <CheckSquare size={24} /> : <Square size={24} />}
                    </div>
                    <p className={`text-lg ${checked[index] ? 'text-emerald-100 line-through opacity-70' : 'text-slate-200'}`}>
                        {item}
                    </p>
                </div>
            ))}
        </div>

        {allChecked && (
            <div className="mt-8 p-6 bg-amber-500/20 border border-amber-500/50 rounded-lg text-center animate-bounce">
                <h3 className="text-amber-500 font-bold text-xl mb-2">Ready for Submission</h3>
                <p className="text-amber-200">You have verified human decision authority. Proceed to export.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Checklist;
