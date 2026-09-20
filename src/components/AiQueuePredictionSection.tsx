import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Info,
  ChevronRight,
  Zap,
  CheckCircle2,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { QueueLevel, CanteenLocation } from '../types';
import { AI_QUEUE_PREDICTION_SCENARIOS, QUEUE_STATES } from '../data/canteenData';

interface AiQueuePredictionSectionProps {
  currentQueueLevel: QueueLevel;
  onSelectQueueLevel?: (level: QueueLevel) => void;
  selectedCanteen?: CanteenLocation;
}

export const AiQueuePredictionSection: React.FC<AiQueuePredictionSectionProps> = ({
  currentQueueLevel,
  onSelectQueueLevel,
  selectedCanteen
}) => {
  // Local active level (synced with parent queue level, with override capability for demo exploration)
  const [activeLevel, setActiveLevel] = useState<QueueLevel>(currentQueueLevel);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState<number>(2); // Default to '+15 Min (Predicted)'
  const [hasSimulated15MinJump, setHasSimulated15MinJump] = useState<boolean>(false);

  // Sync if parent changes and not simulating jump
  React.useEffect(() => {
    setActiveLevel(currentQueueLevel);
    setHasSimulated15MinJump(false);
  }, [currentQueueLevel]);

  // Retrieve current scenario based on activeLevel
  const scenario = AI_QUEUE_PREDICTION_SCENARIOS[activeLevel] || AI_QUEUE_PREDICTION_SCENARIOS.MEDIUM;

  const currentStatus = QUEUE_STATES[scenario.currentLevel];
  const predictedStatus = QUEUE_STATES[scenario.predictedLevel15Min];

  const handleLevelChange = (level: QueueLevel) => {
    setActiveLevel(level);
    setHasSimulated15MinJump(false);
    setSelectedGraphIndex(2); // Reset focus to +15 Min
    if (onSelectQueueLevel) {
      onSelectQueueLevel(level);
    }
  };

  const handleSimulate15MinJump = () => {
    // When simulating 15 minutes jump, the predicted state becomes the new current state!
    const nextLevel = scenario.predictedLevel15Min;
    setActiveLevel(nextLevel);
    setHasSimulated15MinJump(true);
    if (onSelectQueueLevel) {
      onSelectQueueLevel(nextLevel);
    }
  };

  // SVG Chart Geometry
  const svgWidth = 720;
  const svgHeight = 220;
  const padX = 50;
  const padY = 35;
  const graphWidth = svgWidth - padX * 2;
  const graphHeight = svgHeight - padY * 2;
  const maxWaitY = 30; // Max minutes on Y axis

  const points = scenario.forecastPoints.map((pt, idx) => {
    const x = padX + (idx / (scenario.forecastPoints.length - 1)) * graphWidth;
    const y = svgHeight - padY - (pt.waitMinutes / maxWaitY) * graphHeight;
    return { ...pt, x, y, index: idx };
  });

  const nowPointIndex = points.findIndex((p) => p.minutesOffset === 0);
  const pastAndNowPoints = points.slice(0, nowPointIndex + 1);
  const forecastPoints = points.slice(nowPointIndex);

  // Construct SVG paths
  const makePath = (pts: typeof points) => {
    return pts.reduce((acc, curr, idx, arr) => {
      if (idx === 0) return `M ${curr.x} ${curr.y}`;
      const prev = arr[idx - 1];
      const cp1x = prev.x + (curr.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = prev.x + (curr.x - prev.x) / 2;
      const cp2y = curr.y;
      return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }, '');
  };

  const solidPath = makePath(pastAndNowPoints);
  const dashedPath = makePath(forecastPoints);

  const selectedPoint = points[selectedGraphIndex] || points[2];

  // Helper colors for levels
  const getLevelBadge = (level: QueueLevel) => {
    switch (level) {
      case 'LOW':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'HIGH':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-700 text-slate-200 border-slate-600';
    }
  };

  const getLevelColorHex = (level: QueueLevel) => {
    switch (level) {
      case 'LOW':
        return '#10b981';
      case 'MEDIUM':
        return '#f59e0b';
      case 'HIGH':
        return '#f43f5e';
    }
  };

  return (
    <section
      id="ai-queue-prediction"
      className="py-16 md:py-24 bg-gradient-to-b from-[#091124] via-[#0d1730] to-[#0a1124] relative border-t border-slate-800 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Context */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                AI Queue Prediction
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
                AI Demo / Simulation Data
              </span>
              {selectedCanteen && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">
                  {selectedCanteen.name}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-['Poppins'] flex items-center gap-3">
              <span>Predictive Crowd Forecast</span>
            </h2>

            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Simulates counter density and queue growth 15 minutes ahead by projecting class schedules, lecture break surges, and order queue velocity.
            </p>
          </div>

          {/* Scenario / Current Queue Selector Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 rounded-2xl bg-[#141f3d]/90 border border-slate-700/80 shadow-lg backdrop-blur-md">
            <span className="text-xs font-medium text-slate-400">Simulate Queue:</span>
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {(['LOW', 'MEDIUM', 'HIGH'] as QueueLevel[]).map((level) => {
                const isActive = activeLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleLevelChange(level)}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      isActive
                        ? level === 'LOW'
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                          : level === 'MEDIUM'
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                          : 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {level}
                    {level === 'MEDIUM' && (
                      <span className="ml-1 text-[10px] opacity-80">(Example)</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mandatory Transparency & Simulation Disclaimer Banner */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Notice: AI Demo / Simulation Data</span>
            <p className="mt-0.5 text-amber-200/80 leading-relaxed">
              Queue numbers, waiting time estimates, and 15-minute predictions are generated via prototype simulation algorithms designed for academic presentation. No physical cameras or live hardware sensors are active.
            </p>
          </div>
        </div>

        {/* CROWD ALERT (Requirement) */}
        {scenario.crowdAlert.isActive && (
          <div
            className={`mb-8 p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-lg ${
              scenario.crowdAlert.severity === 'critical'
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 shadow-rose-950/20'
                : 'bg-amber-950/30 border-amber-500/40 text-amber-200 shadow-amber-950/20'
            }`}
          >
            <div className="flex items-start sm:items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  scenario.crowdAlert.severity === 'critical'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Crowd Alert
                  </span>
                  <span className="text-xs text-slate-400">Predicted Surge</span>
                </div>
                <h4 className="font-bold text-base sm:text-lg mt-0.5 text-white">
                  {scenario.crowdAlert.headline}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {scenario.crowdAlert.description}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2 sm:self-center">
              <button
                type="button"
                onClick={handleSimulate15MinJump}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate +15m Advance</span>
              </button>
            </div>
          </div>
        )}

        {/* 6 CORE REQUIRED ITEMS GRID (High Contrast & Clear Hierarchy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Current Queue */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#131d38]/90 border border-slate-700 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Current Queue (Now)
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Live Status
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span
                className={`text-3xl sm:text-4xl font-black font-['Poppins'] tracking-tight ${
                  scenario.currentLevel === 'LOW'
                    ? 'text-emerald-400'
                    : scenario.currentLevel === 'MEDIUM'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {scenario.currentLevel}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getLevelBadge(
                  scenario.currentLevel
                )}`}
              >
                {scenario.currentPeople} students waiting
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Current Wait Time:</span>
              <span className="font-bold text-white text-sm">
                ~{scenario.currentWaitMinutes} minutes
              </span>
            </div>
          </div>

          {/* Card 2: Predicted Queue in 15 Minutes */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#152042] border border-cyan-500/40 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                Predicted Queue (in 15 Mins)
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                +15 Min Forecast
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span
                className={`text-3xl sm:text-4xl font-black font-['Poppins'] tracking-tight ${
                  scenario.predictedLevel15Min === 'LOW'
                    ? 'text-emerald-400'
                    : scenario.predictedLevel15Min === 'MEDIUM'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {scenario.predictedLevel15Min}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getLevelBadge(
                  scenario.predictedLevel15Min
                )}`}
              >
                ~{scenario.predictedPeople} students expected
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span>Predicted Wait Time:</span>
              <span className="font-extrabold text-cyan-300 text-base">
                {scenario.predictedWaitMinutes} min
              </span>
            </div>
          </div>

          {/* Card 3: Predicted Waiting Time Metric */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#131d38]/90 border border-slate-700 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Predicted Waiting Time
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                Delta: {scenario.predictedWaitMinutes >= scenario.currentWaitMinutes ? '+' : ''}
                {scenario.predictedWaitMinutes - scenario.currentWaitMinutes} min
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-['Poppins']">
                {scenario.predictedWaitMinutes}
              </span>
              <span className="text-lg font-bold text-amber-400">minutes</span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Counter Delay Status:</span>
              <span
                className={`font-semibold ${
                  scenario.predictedWaitMinutes >= 20
                    ? 'text-rose-400'
                    : scenario.predictedWaitMinutes >= 10
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {scenario.predictedWaitMinutes >= 20
                  ? 'Heavy Delay Expected'
                  : scenario.predictedWaitMinutes >= 10
                  ? 'Moderate Waiting'
                  : 'Fast Counter Flow'}
              </span>
            </div>
          </div>

          {/* Card 4: Peak Hour Indicator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#131d38]/90 border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Peak Hour Indicator
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Campus Timetable
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-bold text-amber-300 font-['Poppins']">
              {scenario.peakHourIndicator}
            </div>

            <p className="mt-2 text-xs text-slate-300 leading-snug">
              {scenario.peakHourWindow}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              Classes release between 12:30 PM – 1:30 PM creating peak lunch traffic.
            </div>
          </div>

          {/* Card 5 & 6: AI Recommendation & Action Guidance */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#122247] to-[#162752] border border-cyan-500/30 shadow-xl md:col-span-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                AI Recommendation
              </span>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Actionable Advice
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#091124]/80 border border-cyan-500/20 mb-3">
              <p className="text-base sm:text-lg font-semibold text-white italic">
                “{scenario.aiRecommendation}”
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Pre-order food in app to skip manual counter queue</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Best alternative window: Before 12:15 PM or after 1:45 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* VISUAL GRAPH: CURRENT VS PREDICTED QUEUE (Requirement) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121c38]/80 border border-cyan-500/30 shadow-2xl backdrop-blur-md mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700/80">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-['Poppins']">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <span>Current vs Predicted Queue Comparison</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Visual timeline tracking counter queue transition from Current moment into 15-minute and 30-minute AI forecast.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-cyan-400 rounded-full"></span>
                <span className="text-slate-300">Solid: Current State</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 border-t-2 border-dashed border-amber-400"></span>
                <span className="text-amber-300 font-medium">Dashed: 15m AI Forecast</span>
              </div>
            </div>
          </div>

          {/* DUAL COMPARISON HIGHLIGHT BARS (Now vs +15 Min) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Left: Now (Current) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1328]/90 border border-slate-700 relative">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider">
                  📍 Current State (Now)
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-[11px] border ${getLevelBadge(scenario.currentLevel)}`}>
                  {scenario.currentLevel}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Estimated Wait Time</span>
                    <span className="font-bold text-white">{scenario.currentWaitMinutes} min</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (scenario.currentWaitMinutes / 25) * 100)}%`,
                        backgroundColor: getLevelColorHex(scenario.currentLevel)
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Students Waiting</span>
                    <span className="font-bold text-white">{scenario.currentPeople} students</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (scenario.currentPeople / 30) * 100)}%`,
                        backgroundColor: getLevelColorHex(scenario.currentLevel)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: +15 Min (Predicted) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1328]/90 border border-cyan-500/40 relative">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  🔮 Predicted State (+15 Min)
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-[11px] border ${getLevelBadge(scenario.predictedLevel15Min)}`}>
                  {scenario.predictedLevel15Min}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Predicted Wait Time</span>
                    <span className="font-extrabold text-cyan-300">{scenario.predictedWaitMinutes} min</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (scenario.predictedWaitMinutes / 25) * 100)}%`,
                        backgroundColor: getLevelColorHex(scenario.predictedLevel15Min)
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Predicted Crowd Size</span>
                    <span className="font-extrabold text-cyan-300">{scenario.predictedPeople} students</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (scenario.predictedPeople / 30) * 100)}%`,
                        backgroundColor: getLevelColorHex(scenario.predictedLevel15Min)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SVG TIMELINE CURVE GRAPH */}
          <div className="relative overflow-x-auto">
            <div className="min-w-[640px] pb-2">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible select-none">
                <defs>
                  {/* Subtle Gradient under solid curve */}
                  <linearGradient id="currentAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Gradient under forecast curve */}
                  <linearGradient id="forecastAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference threshold lines */}
                {/* 20 min mark (HIGH threshold) */}
                <line
                  x1={padX}
                  y1={svgHeight - padY - (20 / maxWaitY) * graphHeight}
                  x2={svgWidth - padX}
                  y2={svgHeight - padY - (20 / maxWaitY) * graphHeight}
                  stroke="#f43f5e"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
                <text
                  x={padX - 8}
                  y={svgHeight - padY - (20 / maxWaitY) * graphHeight + 4}
                  textAnchor="end"
                  fill="#f43f5e"
                  fontSize="10"
                  fontWeight="600"
                >
                  20m (HIGH)
                </text>

                {/* 10 min mark (MEDIUM threshold) */}
                <line
                  x1={padX}
                  y1={svgHeight - padY - (10 / maxWaitY) * graphHeight}
                  x2={svgWidth - padX}
                  y2={svgHeight - padY - (10 / maxWaitY) * graphHeight}
                  stroke="#f59e0b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
                <text
                  x={padX - 8}
                  y={svgHeight - padY - (10 / maxWaitY) * graphHeight + 4}
                  textAnchor="end"
                  fill="#f59e0b"
                  fontSize="10"
                  fontWeight="600"
                >
                  10m (MED)
                </text>

                {/* 5 min mark (LOW threshold) */}
                <line
                  x1={padX}
                  y1={svgHeight - padY - (5 / maxWaitY) * graphHeight}
                  x2={svgWidth - padX}
                  y2={svgHeight - padY - (5 / maxWaitY) * graphHeight}
                  stroke="#10b981"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.25"
                />
                <text
                  x={padX - 8}
                  y={svgHeight - padY - (5 / maxWaitY) * graphHeight + 4}
                  textAnchor="end"
                  fill="#10b981"
                  fontSize="10"
                  fontWeight="600"
                >
                  5m (LOW)
                </text>

                {/* Vertical Separator for NOW */}
                {nowPointIndex >= 0 && (
                  <line
                    x1={points[nowPointIndex].x}
                    y1={padY - 10}
                    x2={points[nowPointIndex].x}
                    y2={svgHeight - padY}
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.6"
                  />
                )}

                {/* Solid Line (Current / Past) */}
                <path d={solidPath} fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />

                {/* Dashed Line (AI 15-Minute Forecast Trajectory) */}
                <path
                  d={dashedPath}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />

                {/* Node Points on graph */}
                {points.map((pt, idx) => {
                  const isSelected = selectedGraphIndex === idx;
                  const isNow = pt.minutesOffset === 0;
                  const is15Min = pt.minutesOffset === 15;
                  const nodeColor = getLevelColorHex(pt.level);

                  return (
                    <g
                      key={idx}
                      className="cursor-pointer transition-transform"
                      onClick={() => setSelectedGraphIndex(idx)}
                    >
                      {/* Pulse circle for Now and 15m */}
                      {(isNow || is15Min) && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? '14' : '10'}
                          fill={is15Min ? '#f59e0b' : '#06b6d4'}
                          opacity={is15Min ? '0.25' : '0.3'}
                          className="animate-ping"
                        />
                      )}

                      {/* Outer ring */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? '8' : is15Min || isNow ? '7' : '5'}
                        fill="#0a1124"
                        stroke={is15Min ? '#f59e0b' : isNow ? '#06b6d4' : nodeColor}
                        strokeWidth={isSelected ? '3' : '2'}
                      />

                      {/* Inner dot */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? '4' : '3'}
                        fill={is15Min ? '#f59e0b' : nodeColor}
                      />

                      {/* Metric Tag Above Point */}
                      <text
                        x={pt.x}
                        y={pt.y - 12}
                        textAnchor="middle"
                        fill={is15Min ? '#fde047' : isNow ? '#67e8f9' : '#cbd5e1'}
                        fontSize={is15Min || isNow ? '11' : '10'}
                        fontWeight="bold"
                      >
                        {pt.waitMinutes}m
                      </text>

                      {/* X-axis label */}
                      <text
                        x={pt.x}
                        y={svgHeight - padY + 20}
                        textAnchor="middle"
                        fill={is15Min ? '#f59e0b' : isNow ? '#22d3ee' : '#94a3b8'}
                        fontSize="11"
                        fontWeight={is15Min || isNow ? '700' : '500'}
                      >
                        {pt.timeLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Interactive Selected Point Detail Banner */}
          <div className="mt-4 p-4 rounded-2xl bg-[#091124]/90 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: getLevelColorHex(selectedPoint.level) }}
              ></div>
              <div>
                <span className="font-bold text-white text-sm">
                  {selectedPoint.timeLabel}: {selectedPoint.level} Queue
                </span>
                <span className="text-slate-400 ml-2">
                  ({selectedPoint.people} students waiting · ~{selectedPoint.waitMinutes} min wait)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                {selectedPoint.isForecast ? 'Simulated AI Prediction' : 'Historical / Current Snapshot'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Transition Simulation Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e1730] border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              Want to see what happens when the 15-minute prediction takes effect?
            </span>
          </div>

          <button
            type="button"
            onClick={handleSimulate15MinJump}
            className="w-full sm:w-auto px-4 py-2 rounded-xl font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Advance 15 Minutes to {scenario.predictedLevel15Min}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
