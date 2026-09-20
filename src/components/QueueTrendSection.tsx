import React, { useState } from 'react';
import { TrendingUp, Clock, Users, Info, AlertTriangle, Sparkles } from 'lucide-react';
import { QUEUE_TREND_DATA } from '../data/canteenData';
import { QueueLevel, QueueTrendPoint } from '../types';

interface QueueTrendSectionProps {
  onSelectLevel?: (level: QueueLevel) => void;
}

export const QueueTrendSection: React.FC<QueueTrendSectionProps> = ({ onSelectLevel }) => {
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(4); // Default to 12:30 PM peak
  const selectedPoint = QUEUE_TREND_DATA[selectedPointIndex];

  // SVG Chart Dimensions
  const svgWidth = 800;
  const svgHeight = 240;
  const paddingX = 45;
  const paddingY = 40;
  const graphWidth = svgWidth - paddingX * 2;
  const graphHeight = svgHeight - paddingY * 2;

  // Max people for scaling
  const maxPeople = 35;

  const pointsCoordinates = QUEUE_TREND_DATA.map((d, index) => {
    const x = paddingX + (index / (QUEUE_TREND_DATA.length - 1)) * graphWidth;
    const y = svgHeight - paddingY - (d.people / maxPeople) * graphHeight;
    return { ...d, x, y };
  });

  // Construct SVG Path
  const pathD = pointsCoordinates.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1];
    // Smooth bezier curve control points
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, '');

  // Fill area path
  const areaD = `${pathD} L ${pointsCoordinates[pointsCoordinates.length - 1].x} ${svgHeight - paddingY} L ${pointsCoordinates[0].x} ${svgHeight - paddingY} Z`;

  return (
    <section id="queue-trend" className="py-16 md:py-20 bg-[#0a1124] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Queue Analytics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Poppins'] flex items-center gap-3">
              <span>Campus Queue Trend</span>
              <span className="text-xs px-2.5 py-1 rounded-md font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Demo / Simulation Data
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Visual curve illustrating simulated hourly crowd cycles. Observe the shift from morning opening (LOW) to midday rush (HIGH) and post-lunch settlement.
            </p>
          </div>

          {/* Peak hour quick pill */}
          <div className="p-3 rounded-xl bg-[#1c2541]/80 border border-amber-500/30 text-xs flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Peak Rush Window</span>
              <span className="font-bold text-amber-300">12:30 PM – 1:30 PM (HIGH)</span>
            </div>
          </div>
        </div>

        {/* Graph Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#131d38]/70 border border-cyan-500/20 shadow-2xl backdrop-blur-md">
          {/* Level thresholds legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700/60 text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-slate-400 font-medium">Density Thresholds:</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                LOW (&lt; 10 students / &lt; 8 min)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                MEDIUM (10 - 20 students / 8 - 15 min)
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                HIGH (20+ students / 15 - 25 min)
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>Click on any time node to inspect simulated details</span>
            </div>
          </div>

          {/* SVG Canvas Container */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[640px]">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#0b132b" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="peakHighlight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference lines */}
                {[
                  { val: 30, label: '30 students (High)', y: svgHeight - paddingY - (30 / maxPeople) * graphHeight },
                  { val: 18, label: '18 students (Medium)', y: svgHeight - paddingY - (18 / maxPeople) * graphHeight },
                  { val: 8, label: '8 students (Low)', y: svgHeight - paddingY - (8 / maxPeople) * graphHeight }
                ].map((refLine) => (
                  <g key={refLine.val}>
                    <line
                      x1={paddingX}
                      y1={refLine.y}
                      x2={svgWidth - paddingX}
                      y2={refLine.y}
                      stroke="#334155"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 8}
                      y={refLine.y + 4}
                      fill="#64748b"
                      fontSize="10"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {refLine.val}
                    </text>
                  </g>
                ))}

                {/* Peak Hour Zone Overlay */}
                <rect
                  x={pointsCoordinates[4].x - 20}
                  y={paddingY - 15}
                  width={pointsCoordinates[6].x - pointsCoordinates[4].x + 40}
                  height={graphHeight + 25}
                  fill="url(#peakHighlight)"
                  rx="10"
                />
                <text
                  x={(pointsCoordinates[4].x + pointsCoordinates[6].x) / 2}
                  y={paddingY - 2}
                  fill="#f43f5e"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  ⚡ PEAK RUSH HOUR (12:30 PM – 1:30 PM)
                </text>

                {/* Filled Area */}
                <path d={areaD} fill="url(#trendGradient)" />

                {/* Smooth Curve Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {pointsCoordinates.map((pt, idx) => {
                  const isSelected = selectedPointIndex === idx;
                  const pointColor =
                    pt.level === 'LOW'
                      ? '#10b981'
                      : pt.level === 'MEDIUM'
                      ? '#f59e0b'
                      : '#f43f5e';

                  return (
                    <g
                      key={pt.time}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => {
                        setSelectedPointIndex(idx);
                        if (onSelectLevel) onSelectLevel(pt.level);
                      }}
                    >
                      {/* Outer pulse when selected */}
                      {isSelected && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill={pointColor}
                          opacity="0.3"
                          className="animate-ping"
                        />
                      )}

                      {/* Main Node Dot */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 7 : 5}
                        fill={pointColor}
                        stroke="#0b132b"
                        strokeWidth={isSelected ? 3 : 2}
                      />

                      {/* Value label above point */}
                      <text
                        x={pt.x}
                        y={pt.y - 12}
                        fill="#ffffff"
                        fontSize={isSelected ? '11' : '9'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        textAnchor="middle"
                      >
                        {pt.people}
                      </text>

                      {/* X-axis time label */}
                      <text
                        x={pt.x}
                        y={svgHeight - 12}
                        fill={isSelected ? '#00f0ff' : '#94a3b8'}
                        fontSize="10"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {pt.time}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Selected Point Breakdown Bar */}
          <div className="mt-6 p-4 rounded-2xl bg-[#0b132b]/90 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  selectedPoint.level === 'LOW'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : selectedPoint.level === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}
              >
                {selectedPoint.level === 'LOW' ? '🟢' : selectedPoint.level === 'MEDIUM' ? '🟡' : '🔴'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">
                    {selectedPoint.time}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ({selectedPoint.label})
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  Simulated Status: <strong className="text-white">{selectedPoint.level} QUEUE</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  People in Line
                </span>
                <span className="text-lg font-bold text-white flex items-center gap-1 justify-center">
                  <Users className="w-4 h-4 text-cyan-400" />
                  {selectedPoint.people}
                </span>
              </div>

              <div className="text-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Est. Wait Time
                </span>
                <span className="text-lg font-bold text-cyan-300 flex items-center gap-1 justify-center">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  {selectedPoint.waitMinutes} min
                </span>
              </div>

              {onSelectLevel && (
                <button
                  id={`apply-trend-level-${selectedPoint.level.toLowerCase()}`}
                  onClick={() => onSelectLevel(selectedPoint.level)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Apply to Demo
                </button>
              )}
            </div>
          </div>

          {/* Graph footer notice */}
          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Clearly labeled as simulated prototype data for academic presentation.
            </span>
            <span className="font-mono text-slate-500">
              Total 10 Time-Sample Nodes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
