import React from 'react';
import { QueueLevel, QueueStatusData, MenuItem, DemoOrder } from '../types';
import { QUEUE_STATES } from '../data/canteenData';
import { Users, Clock, AlertCircle, Info, Sparkles, Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { PeakHourIndicator } from './PeakHourIndicator';
import { AiRecommendationCard } from './AiRecommendationCard';

interface LiveQueueDashboardProps {
  activeLevel: QueueLevel;
  onSelectLevel: (level: QueueLevel) => void;
  isAutoRefresh?: boolean;
  onToggleAutoRefresh?: () => void;
  onExploreMenu?: () => void;
  menuItems?: MenuItem[];
  activeOrder?: DemoOrder | null;
}

export const LiveQueueDashboard: React.FC<LiveQueueDashboardProps> = ({
  activeLevel,
  onSelectLevel,
  isAutoRefresh = false,
  onToggleAutoRefresh,
  onExploreMenu,
  menuItems = [],
  activeOrder = null,
}) => {
  const currentStatus: QueueStatusData = QUEUE_STATES[activeLevel];

  const statusCardsList: { level: QueueLevel; data: QueueStatusData; indicator: string }[] = [
    { level: 'LOW', data: QUEUE_STATES.LOW, indicator: '🟢' },
    { level: 'MEDIUM', data: QUEUE_STATES.MEDIUM, indicator: '🟡' },
    { level: 'HIGH', data: QUEUE_STATES.HIGH, indicator: '🔴' },
  ];

  const isCrowded = activeLevel === 'HIGH';

  return (
    <section id="live-queue" className="py-16 md:py-24 bg-[#080e1e] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Real-Time Monitor
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            Live Canteen Queue
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Interactive simulation of college canteen queue density and wait-time estimations.
          </p>

          {/* Mandatory Demo Data Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Demo Data Notice:</strong> All values shown below are simulated prototype measurements for project demonstration.
            </span>
          </div>
        </div>

        {/* Interactive Demo Mode Controls Bar with Auto-Refresh Toggle */}
        <div className="mb-10 max-w-3xl mx-auto p-4 rounded-2xl bg-[#1c2541]/90 border border-cyan-500/30 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">Simulate Queue Status:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="select-low-status-btn"
                  onClick={() => onSelectLevel('LOW')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeLevel === 'LOW'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-105'
                      : 'bg-[#0b132b] text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10'
                  }`}
                >
                  <span>🟢 LOW</span>
                  {activeLevel === 'LOW' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <button
                  id="select-medium-status-btn"
                  onClick={() => onSelectLevel('MEDIUM')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeLevel === 'MEDIUM'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30 scale-105'
                      : 'bg-[#0b132b] text-amber-400 border border-amber-500/30 hover:bg-amber-500/10'
                  }`}
                >
                  <span>🟡 MEDIUM</span>
                  {activeLevel === 'MEDIUM' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <button
                  id="select-high-status-btn"
                  onClick={() => onSelectLevel('HIGH')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeLevel === 'HIGH'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                      : 'bg-[#0b132b] text-rose-400 border border-rose-500/30 hover:bg-rose-500/10'
                  }`}
                >
                  <span>🔴 HIGH</span>
                  {activeLevel === 'HIGH' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              </div>

              {/* Requirement 10: Auto Refresh Toggle */}
              {onToggleAutoRefresh && (
                <button
                  id="auto-refresh-toggle-btn"
                  onClick={onToggleAutoRefresh}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isAutoRefresh
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30'
                      : 'bg-[#0b132b] text-slate-300 border-slate-700 hover:border-cyan-500/50'
                  }`}
                  title="Automatically cycles between LOW, MEDIUM, and HIGH for presentation demonstration"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAutoRefresh ? 'animate-spin' : ''}`} />
                  <span>Auto Refresh: {isAutoRefresh ? 'ON' : 'OFF'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Auto Refresh Info banner */}
          <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-[10px] text-cyan-300/80">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {isAutoRefresh
                ? 'Auto-cycle active: Smoothly rotating simulated queue levels every 7 seconds.'
                : 'Click Auto Refresh ON to simulate continuous camera status transitions.'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              Simulated, not live camera hardware
            </span>
          </div>
        </div>

        {/* Requirement 5: CROWD ALERT (When queue is HIGH) */}
        {isCrowded && (
          <div
            id="crowd-alert-banner"
            className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-950/90 via-red-900/60 to-[#1f0d14] border-2 border-rose-500 shadow-2xl shadow-rose-500/20 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/30 border border-rose-400 flex items-center justify-center text-rose-300 flex-shrink-0 animate-pulse">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400 text-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                  PEAK DENSITY ALERT
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-rose-200 font-['Poppins']">
                  ⚠️ Canteen is crowded. Consider visiting later.
                </h3>
                <p className="text-xs sm:text-sm text-rose-100/80 mt-1">
                  Current wait time is approximately <strong>{currentStatus.estimatedWaitMinutes} minutes</strong> with <strong>{currentStatus.peopleWaiting} students</strong> in line. Pre-order online to avoid physical counter delay.
                </p>
              </div>
            </div>

            {onExploreMenu && (
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-lg shadow-rose-500/30 transition-all cursor-pointer whitespace-nowrap"
              >
                Pre-Order to Skip Line
              </button>
            )}
          </div>
        )}

        {/* Three Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statusCardsList.map(({ level, data, indicator }) => {
            const isSelected = activeLevel === level;
            return (
              <div
                key={level}
                id={`status-card-${level.toLowerCase()}`}
                onClick={() => onSelectLevel(level)}
                className={`relative p-6 rounded-2xl bg-[#1c2541]/60 border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? `${data.borderColor} bg-[#1c2541]/90 shadow-xl ring-2 ${
                        level === 'LOW'
                          ? 'ring-emerald-500/40 shadow-emerald-500/15'
                          : level === 'MEDIUM'
                          ? 'ring-amber-500/40 shadow-amber-500/15'
                          : 'ring-rose-500/40 shadow-rose-500/15'
                      } scale-[1.02]`
                    : 'border-slate-700/60 hover:border-slate-500 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Active selection badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    CURRENT STATE
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{indicator}</span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-['Poppins']">
                    {level}
                  </h3>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0b132b]/80 border border-slate-700/60">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      People Waiting:
                    </span>
                    <span className="font-bold text-white text-base">
                      {data.peopleWaiting}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0b132b]/80 border border-slate-700/60">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      Estimated Wait:
                    </span>
                    <span className="font-bold text-cyan-300 text-base">
                      ~{data.estimatedWaitMinutes} mins
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 italic pt-1">
                    “{data.crowdLevelText}”
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Current Status Highlight Banner */}
        <div
          id="main-current-status-banner"
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-2xl backdrop-blur-md mb-8 ${
            activeLevel === 'LOW'
              ? 'bg-gradient-to-r from-emerald-950/40 via-[#1c2541]/90 to-[#131d38] border-emerald-500/40 shadow-emerald-950/40'
              : activeLevel === 'MEDIUM'
              ? 'bg-gradient-to-r from-amber-950/40 via-[#1c2541]/90 to-[#131d38] border-amber-500/40 shadow-amber-950/40'
              : 'bg-gradient-to-r from-rose-950/40 via-[#1c2541]/90 to-[#131d38] border-rose-500/40 shadow-rose-950/40'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  CURRENT STATUS
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  Demo Data
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-2xl sm:text-3xl">
                  {activeLevel === 'LOW' ? '🟢' : activeLevel === 'MEDIUM' ? '🟡' : '🔴'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight font-['Poppins']">
                  {activeLevel} QUEUE
                </h3>
              </div>

              <p className="text-base sm:text-lg text-slate-200 font-medium">
                “{currentStatus.recommendation}”
              </p>
            </div>

            {/* Quick Metrics in Current Status */}
            <div className="flex items-center gap-4 bg-[#0b132b]/80 p-4 rounded-xl border border-slate-700/80">
              <div className="text-center px-3 border-r border-slate-700">
                <div className="text-[11px] text-slate-400">Waiting Count</div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {currentStatus.peopleWaiting}
                </div>
                <div className="text-[10px] text-slate-400">students</div>
              </div>
              <div className="text-center px-3">
                <div className="text-[11px] text-slate-400">Estimated Duration</div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-300 mt-0.5">
                  {currentStatus.estimatedWaitMinutes}
                </div>
                <div className="text-[10px] text-slate-400">minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation (Requirement 7) & Peak Hour Indicator (Requirement 3) */}
        <div className="space-y-6">
          <AiRecommendationCard
            activeLevel={activeLevel}
            menuItems={menuItems}
            activeOrder={activeOrder}
            onExploreMenu={onExploreMenu}
          />
          <PeakHourIndicator activeLevel={activeLevel} />
        </div>
      </div>
    </section>
  );
};
