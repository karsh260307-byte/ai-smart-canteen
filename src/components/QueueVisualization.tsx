import React from 'react';
import { QueueLevel, QueueStatusData } from '../types';
import { QUEUE_STATES } from '../data/canteenData';
import { User, Utensils, ChefHat, ArrowRight, ShieldCheck } from 'lucide-react';

interface QueueVisualizationProps {
  activeLevel: QueueLevel;
  onSelectLevel: (level: QueueLevel) => void;
}

export const QueueVisualization: React.FC<QueueVisualizationProps> = ({
  activeLevel,
  onSelectLevel,
}) => {
  const currentStatus: QueueStatusData = QUEUE_STATES[activeLevel];

  // Number of students to display visually
  const count = currentStatus.peopleWaiting; // 6, 14, 25

  return (
    <section id="queue-visualization" className="py-16 md:py-20 bg-[#0b132b] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Physical Topology
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            Queue Visualization
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Interactive visual representation of student queue flow from entrance to food counter.
          </p>

          {/* AI Indicator required by prompt */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Queue Detection Active</span>
          </div>
        </div>

        {/* Status Switcher Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-medium text-slate-400 mr-2">Switch Visual Density:</span>
          {(['LOW', 'MEDIUM', 'HIGH'] as QueueLevel[]).map((level) => (
            <button
              key={level}
              id={`viz-toggle-${level.toLowerCase()}`}
              onClick={() => onSelectLevel(level)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLevel === level
                  ? level === 'LOW'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-300'
                    : level === 'MEDIUM'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25 ring-2 ring-amber-200'
                    : 'bg-rose-500 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-300'
                  : 'bg-[#1c2541] text-slate-300 border border-slate-700 hover:bg-[#253256]'
              }`}
            >
              {level === 'LOW' && '🟢 LOW (6 Students)'}
              {level === 'MEDIUM' && '🟡 MEDIUM (14 Students)'}
              {level === 'HIGH' && '🔴 HIGH (25 Students)'}
            </button>
          ))}
        </div>

        {/* Main Flow Stage: Students -> Queue -> Food Counter */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#131d38]/90 border border-cyan-500/30 shadow-2xl backdrop-blur-md">
          {/* Breadcrumb / Top Legend */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-700/80 text-xs flex-wrap gap-2">
            <div className="flex items-center gap-2 font-mono text-cyan-300">
              <span className="font-bold">FLOW PATH:</span>
              <span className="text-white">Students</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300 font-bold">Queue Lane</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-white">Food Counter</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="text-[11px] text-slate-400">Current Queue Size:</span>
              <span className="font-bold text-white px-2 py-0.5 bg-[#0b132b] rounded border border-slate-700">
                {count} Students Waiting
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                [Demo Data]
              </span>
            </div>
          </div>

          {/* Graphical Queue Lane Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 1. Entrance / Students Origin (Left - 3 Cols) */}
            <div className="lg:col-span-3 p-4 rounded-xl bg-[#0b132b]/80 border border-slate-700/80 text-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center mx-auto mb-3 text-cyan-300">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Students Arriving</h3>
              <p className="text-xs text-slate-400 mb-3">
                Students entering canteen during break intervals.
              </p>
              <div className="px-3 py-1 bg-[#1c2541] rounded-lg text-[11px] text-cyan-300 font-mono">
                Arrival Rate: Active
              </div>
            </div>

            {/* 2. The Interactive Queue Corridor (Center - 6 Cols) */}
            <div className="lg:col-span-6 p-4 rounded-xl bg-[#0b132b]/95 border-2 border-dashed border-cyan-500/30 relative">
              {/* Overlay Tag */}
              <div className="flex items-center justify-between mb-3 text-[11px]">
                <span className="font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  AI BOUNDING BOX ZONE [QUEUE_01]
                </span>
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                  activeLevel === 'LOW'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : activeLevel === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {activeLevel} LOAD
                </span>
              </div>

              {/* Grid of Student Icons */}
              <div className="min-h-[140px] p-3 rounded-lg bg-[#141e3a]/60 border border-slate-800 flex flex-wrap items-center justify-center gap-2.5">
                {Array.from({ length: count }).map((_, index) => (
                  <div
                    key={index}
                    id={`student-icon-${index}`}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all duration-300 ${
                      activeLevel === 'LOW'
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:scale-110'
                        : activeLevel === 'MEDIUM'
                        ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 hover:scale-110'
                        : 'border-rose-500/50 bg-rose-500/10 text-rose-300 hover:scale-110'
                    }`}
                    title={`Student ${index + 1} - In Queue`}
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[9px] font-mono mt-0.5 opacity-80">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Lane Direction Arrow */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Queue Entry ➔</span>
                <span className="font-mono text-cyan-300 text-[10px]">
                  Estimated Service: {currentStatus.estimatedWaitMinutes} mins
                </span>
                <span>➔ Order Counter</span>
              </div>
            </div>

            {/* 3. Food Counter (Right - 3 Cols) */}
            <div className="lg:col-span-3 p-4 rounded-xl bg-gradient-to-b from-[#1c2541] to-[#131d38] border border-blue-500/40 text-center shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-400/40 flex items-center justify-center mx-auto mb-3 text-blue-300">
                <ChefHat className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 flex items-center justify-center gap-1.5">
                <Utensils className="w-4 h-4 text-cyan-400" />
                Food Counter
              </h3>
              <p className="text-xs text-slate-300 mb-3">
                Order fulfillment and token handoff station.
              </p>
              <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-[11px] font-semibold">
                Counter 01: Active
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Anonymized person detection algorithm — No biometric logging</span>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              Prototype Visualizer v1.0
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
