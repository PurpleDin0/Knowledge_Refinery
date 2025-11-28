import React from 'react';
import { PHASES } from '../data';

interface Props {
  activePhase: number | null;
  onPhaseSelect: (id: number) => void;
}

const WorkflowDiagram: React.FC<Props> = ({ activePhase, onPhaseSelect }) => {
  return (
    <div className="w-full overflow-x-auto p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <div className="min-w-[800px] flex flex-col items-center">
        {/* Title */}
        <h3 className="text-amber-500 font-bold uppercase tracking-widest mb-6 text-sm">Refining Pipeline Visualization</h3>

        <svg viewBox="0 0 1000 350" className="w-full h-auto drop-shadow-lg">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
             <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
            </marker>
            <linearGradient id="pipe-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* Connection Pipes */}
          <path d="M 120 150 L 220 150" stroke={activePhase !== null && activePhase >= 1 ? "#f59e0b" : "#475569"} strokeWidth="4" markerEnd={activePhase !== null && activePhase >= 1 ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
          <path d="M 220 150 L 320 150" stroke={activePhase !== null && activePhase >= 2 ? "#f59e0b" : "#475569"} strokeWidth="4" markerEnd={activePhase !== null && activePhase >= 2 ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
          <path d="M 320 150 L 420 150" stroke={activePhase !== null && activePhase >= 3 ? "#f59e0b" : "#475569"} strokeWidth="4" markerEnd={activePhase !== null && activePhase >= 3 ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
          
          {/* Loop for Red Teaming at Phase 3 */}
          <path d="M 420 120 Q 450 80 480 120" fill="none" stroke={activePhase === 3 ? "#ef4444" : "#475569"} strokeWidth="2" strokeDasharray="5,5" />

          <path d="M 420 150 L 520 150" stroke={activePhase !== null && activePhase >= 4 ? "#f59e0b" : "#475569"} strokeWidth="4" markerEnd={activePhase !== null && activePhase >= 4 ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
          <path d="M 520 150 L 620 150" stroke={activePhase !== null && activePhase >= 5 ? "#f59e0b" : "#475569"} strokeWidth="4" markerEnd={activePhase !== null && activePhase >= 5 ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
          <path d="M 620 150 L 720 150" stroke={activePhase !== null && activePhase >= 6 ? "#f59e0b" : "#475569"} strokeWidth="4" markerEnd={activePhase !== null && activePhase >= 6 ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
          <path d="M 720 150 L 850 150" stroke={activePhase !== null && activePhase >= 7 ? "#f59e0b" : "#475569"} strokeWidth="4" markerEnd={activePhase !== null && activePhase >= 7 ? "url(#arrowhead-active)" : "url(#arrowhead)"} />

          {/* Nodes */}
          {PHASES.map((phase, index) => {
            // Calculate position
            const x = 70 + (index * 110);
            const y = 150;
            const isActive = activePhase === index;
            
            // Phase 0 is special (Start)
            if (index === 0) {
               return (
                <g key={phase.id} onClick={() => onPhaseSelect(phase.id)} className="cursor-pointer transition-all duration-300 hover:opacity-80">
                  <circle cx={x} cy={y} r="40" fill={isActive ? "#f59e0b" : "#1e293b"} stroke={isActive ? "#fcd34d" : "#64748b"} strokeWidth="3" />
                  <text x={x} y={y + 5} textAnchor="middle" fill={isActive ? "#0f172a" : "#cbd5e1"} fontSize="20" fontWeight="bold">0</text>
                  <text x={x} y={y + 60} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Framing</text>
                </g>
               )
            }
            
            // Phase 7 is special (End)
            if (index === 7) {
                 return (
                <g key={phase.id} onClick={() => onPhaseSelect(phase.id)} className="cursor-pointer transition-all duration-300 hover:opacity-80">
                  <rect x={x - 30} y={y - 30} width="60" height="60" rx="10" fill={isActive ? "#10b981" : "#1e293b"} stroke={isActive ? "#6ee7b7" : "#64748b"} strokeWidth="3" />
                   <text x={x} y={y + 5} textAnchor="middle" fill={isActive ? "#0f172a" : "#cbd5e1"} fontSize="20" fontWeight="bold">7</text>
                   <text x={x} y={y + 60} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Disclosure</text>
                </g>
               )
            }

            // Standard Nodes
            return (
              <g key={phase.id} onClick={() => onPhaseSelect(phase.id)} className="cursor-pointer transition-all duration-300 hover:opacity-80 group">
                <rect x={x - 25} y={y - 25} width="50" height="50" rx="8" fill={isActive ? "#f59e0b" : "#1e293b"} stroke={isActive ? "#fcd34d" : "#64748b"} strokeWidth="2" filter={isActive ? "url(#glow)" : ""} />
                <text x={x} y={y + 6} textAnchor="middle" fill={isActive ? "#0f172a" : "#cbd5e1"} fontSize="16" fontWeight="bold">{index}</text>
                
                {/* Connecting Lines for Labels */}
                <line x1={x} y1={y + 35} x2={x} y2={y + 45} stroke="#334155" strokeWidth="1" />
                <text x={x} y={y + 60} textAnchor="middle" fill={isActive ? "#f59e0b" : "#94a3b8"} fontSize="11" fontWeight="medium" className="uppercase tracking-tighter">
                  {phase.title.split(' ')[0]}
                </text>
              </g>
            );
          })}

        </svg>
      </div>
    </div>
  );
};

export default WorkflowDiagram;
