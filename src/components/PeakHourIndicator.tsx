import React from 'react';
import { Clock, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { QueueLevel } from '../types';
import { PEAK_HOURS_INFO } from '../data/canteenData';

interface PeakHourIndicatorProps {
  activeLevel: QueueLevel;
}

export const PeakHourIndicator: React.FC<PeakHourIndicatorProps> = ({ activeLevel }) => {
  const currentStatusText =
    activeLevel === 'LOW'
      ? PEAK_HOURS_INFO.statusWhenLow
      : activeLevel === 'MEDIUM'
      ? PEAK_HOURS_INFO.statusWhenMedium
      : PEAK_HOURS_INFO.statusWhenHigh;

  const statusColor =
    activeLevel === 'LOW'
      ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
      : activeLevel === 'MEDIUM'
      ? 'text-amber-400 bg-amber-500/15 border-amber-500/30'
      : 'text-rose-400 bg-rose-500/15 border-rose-500/30';

  return (
    <div
      id="peak-hour-indicator-card"
      className="p-5 rounded-2xl bg-[#131d38]/80 border border-slate-700/80 backdrop-blur-md relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                CAMPUS TIMETABLE INSIGHT
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Demo Info
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusColor}`}>
                {currentStatusText}
              </span>
              <span className="text-xs text-slate-400 hidden md:inline">
                • Peak Hours: <strong className="text-white">{PEAK_HOURS_INFO.peakRange}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/60">
          <div className="text-left sm:text-right">
            <span className="text-[11px] text-slate-400 block">Peak Lunch Window</span>
            <span className="text-sm font-bold text-amber-300 font-mono">
              {PEAK_HOURS_INFO.peakRange}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#0b132b] border border-cyan-500/20 flex items-center gap-1.5 text-xs text-cyan-300">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>High Density</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          {PEAK_HOURS_INFO.recommendation}
        </span>
        <span className="text-[10px] text-slate-500 italic hidden sm:inline">
          Simulation metric
        </span>
      </div>
    </div>
  );
};
