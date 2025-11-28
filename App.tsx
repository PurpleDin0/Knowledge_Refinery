
import React, { useState } from 'react';
import { Layout, CheckCircle, BookOpen, Menu, X, Hammer, Image as ImageIcon, Eye } from 'lucide-react';
import WorkflowDiagram from './components/WorkflowDiagram';
import PhaseDetail from './components/PhaseDetail';
import ToolMatrix from './components/ToolMatrix';
import Checklist from './components/Checklist';
import Philosophy from './components/Philosophy';
import Library from './components/Library';
import { PHASES } from './data';
import { ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>('workflow');
  const [activePhaseId, setActivePhaseId] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInfographic, setShowInfographic] = useState(false);

  const activePhase = PHASES.find(p => p.id === activePhaseId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('workflow')}>
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-slate-900 font-bold">KR</div>
              <span className="font-bold text-xl tracking-tight text-slate-200">Knowledge Refinery</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => setView('philosophy')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'philosophy' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:text-white'}`}>The Philosophy</button>
                <button onClick={() => setView('workflow')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'workflow' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:text-white'}`}>Workflow</button>
                <button onClick={() => setView('library')} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'library' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:text-white'}`}>
                    <BookOpen size={16} /> Library
                </button>
                <button onClick={() => setView('matrix')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'matrix' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:text-white'}`}>Tool Matrix</button>
                <button onClick={() => setView('checklist')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'checklist' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:text-white'}`}>Checklist</button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300 hover:text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button onClick={() => { setView('philosophy'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">The Philosophy</button>
             <button onClick={() => { setView('workflow'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Workflow</button>
             <button onClick={() => { setView('library'); setMobileMenuOpen(false); }} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"><BookOpen size={16}/> Library</button>
             <button onClick={() => { setView('matrix'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Tool Matrix</button>
             <button onClick={() => { setView('checklist'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Checklist</button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        
        {view === 'philosophy' && (
           <Philosophy />
        )}

        {view === 'library' && (
           <Library />
        )}

        {view === 'matrix' && (
            <ToolMatrix />
        )}

        {view === 'checklist' && (
            <Checklist />
        )}

        {view === 'workflow' && (
            <div className="space-y-8 relative">
                {/* Background Image for Large Screens */}
                <div 
                  className="fixed right-0 top-16 bottom-0 w-[400px] bg-cover bg-center opacity-10 pointer-events-none hidden 2xl:block"
                  style={{ 
                      // Assumes image is in public folder and served at root
                      backgroundImage: 'url("/AI_Knowledge_Refinery.jpg")', 
                      maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', 
                      WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' 
                  }}
                ></div>

                <div className="text-center mb-10 relative">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4">
                        Refining Knowledge
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-6">
                        A seven-phase methodology for AI-enhanced academic writing that develops analytical expertise while utilizing AI tools to streamline volume processing.
                    </p>
                    
                    <button 
                        onClick={() => setShowInfographic(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-sm text-slate-300 transition-colors"
                    >
                        <ImageIcon size={16} className="text-amber-500" />
                        View Full Infographic
                    </button>
                </div>

                <WorkflowDiagram 
                    activePhase={activePhaseId} 
                    onPhaseSelect={setActivePhaseId} 
                />

                <div className="mt-8">
                    {activePhase ? (
                        <PhaseDetail phase={activePhase} />
                    ) : (
                        <div className="text-center p-12 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
                            <p className="text-slate-500">Select a phase from the pipeline above to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">
                Based on "GUIDE: AI-Assisted Research & Writing Workflow" v1.1 (Nov 2025). 
                <br/>Not an official NDU product. For educational purposes.
            </p>
        </div>
      </footer>

      {/* Infographic Modal */}
      {showInfographic && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4" onClick={() => setShowInfographic(false)}>
            <div className="relative max-w-6xl max-h-[90vh] w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700 flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <ImageIcon size={20} className="text-amber-500"/>
                        Workflow Infographic
                    </h3>
                    <button onClick={() => setShowInfographic(false)} className="text-slate-400 hover:text-white p-2">
                        <X size={24} />
                    </button>
                </div>
                <div className="overflow-auto flex-1 p-4 bg-slate-950">
                    <img 
                        src="/AI_Knowledge_Refinery.jpg" 
                        alt="AI Knowledge Refinery Infographic" 
                        className="w-full h-auto rounded shadow-2xl"
                        onError={(e) => {
                            // Fallback if image fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML += `
                                <div class="text-center p-12 text-slate-500 flex flex-col items-center gap-4">
                                    <span class="text-amber-500 font-bold">Image Not Found</span>
                                    <span class="text-xs">Please ensure 'AI_Knowledge_Refinery.jpg' is in the public folder.</span>
                                </div>`;
                        }}
                    />
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
