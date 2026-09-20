import React from 'react';
import { QueueLevel, QueueStatusData } from '../types';
import { Clock, Users, ArrowRight, BookOpen, Camera, ShieldCheck, Cpu } from 'lucide-react';

interface HeroSectionProps {
  currentStatus: QueueStatusData;
  activeLevel: QueueLevel;
  onScrollTo: (id: string) => void;
  onSelectLevel: (level: QueueLevel) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentStatus,
  activeLevel,
  onScrollTo,
  onSelectLevel
}) => {
  return (
    <section id="home" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading & Information */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Project Subtitle Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c2541]/80 border border-cyan-500/30 text-cyan-300 text-xs font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>College AI Immersion Project • Prototype Demo</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-tight font-['Poppins']">
              Smart Canteen{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                Queue Management
              </span>{' '}
              System
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              AI-powered real-time queue monitoring for a smarter and faster campus canteen experience.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-view-queue-btn"
                onClick={() => onScrollTo('live-queue')}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>View Live Queue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-how-it-works-btn"
                onClick={() => onScrollTo('how-it-works')}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#1c2541]/80 hover:bg-[#1c2541] text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/40 font-semibold rounded-xl transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>How It Works</span>
              </button>
            </div>

            {/* Quick Demo Selector in Hero */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Simulate Queue State:</span>
              <div className="inline-flex p-1 bg-[#131d38] rounded-lg border border-slate-700/80">
                {(['LOW', 'MEDIUM', 'HIGH'] as QueueLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    id={`hero-sim-${lvl.toLowerCase()}`}
                    onClick={() => onSelectLevel(lvl)}
                    className={`px-3 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
                      activeLevel === lvl
                        ? lvl === 'LOW'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                          : lvl === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Student attribution banner */}
            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Student Project by Gokul • AI &amp; DS – A (Batch C29)</span>
            </div>
          </div>

          {/* Right Column: Hero Visual - College Canteen with AI Detection */}
          <div className="lg:col-span-6 relative">
            {/* Visual Container */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#131f3d] to-[#0c142b] p-4 sm:p-5 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 overflow-hidden">
              {/* Header Bar of the Simulation Canvas */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/60 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[11px] text-cyan-300 font-semibold pl-1">
                    CANTEEN_FEED_CAM_01 • ROI: QUEUE_ZONE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AI Detection Active</span>
                </div>
              </div>

              {/* Graphic Canteen & Queue Scene */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl bg-[#080e1e] border border-slate-800 overflow-hidden flex flex-col justify-between p-3.5">
                {/* Visual Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Ceiling Camera Mount */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#1c2541]/90 border border-cyan-500/40 text-[11px] text-cyan-300">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Wide-Angle Optical Sensor #01</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] text-slate-400 font-mono">
                    <Cpu className="w-3 h-3 text-cyan-400" />
                    <span>Inference: YOLOv8-Queue-Model</span>
                  </div>
                </div>

                {/* Food Counter Section at the Top Right */}
                <div className="relative z-10 flex justify-end">
                  <div className="w-48 sm:w-56 p-2.5 bg-[#172554]/90 rounded-lg border border-blue-400/40 text-left shadow-lg">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                      <span>🍴 Canteen Food Counter #02</span>
                      <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] rounded">OPEN</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Staff Serving Rate: ~50s / student</span>
                    </div>
                  </div>
                </div>

                {/* Queue Zone / Bounding Box Visualization */}
                <div className="relative z-10 my-auto py-2">
                  <div className="relative rounded-lg border-2 border-dashed border-cyan-400/50 bg-cyan-950/20 p-2.5">
                    {/* Bounding Box Label */}
                    <div className="absolute -top-3 left-3 px-2 py-0.5 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded shadow-sm">
                      QUEUE DETECTION ROI [COUNT: {currentStatus.peopleWaiting}]
                    </div>

                    {/* People Avatars standing in the queue */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
                      {Array.from({ length: Math.min(currentStatus.peopleWaiting, 12) }).map((_, idx) => (
                        <div key={idx} className="flex-shrink-0 flex flex-col items-center group relative">
                          {/* AI Bounding Box around person */}
                          <div className={`p-1 rounded-md border ${
                            activeLevel === 'LOW'
                              ? 'border-emerald-400/70 bg-emerald-500/10'
                              : activeLevel === 'MEDIUM'
                              ? 'border-amber-400/70 bg-amber-500/10'
                              : 'border-rose-400/70 bg-rose-500/10'
                          } transition-all`}>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-700/80 flex items-center justify-center text-[10px] font-bold text-slate-200">
                              <span className="font-mono">P{idx + 1}</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-cyan-300 font-mono mt-0.5">
                            ID:0{idx + 1}
                          </span>
                        </div>
                      ))}
                      {currentStatus.peopleWaiting > 12 && (
                        <div className="flex-shrink-0 px-2.5 py-1.5 bg-rose-500/20 border border-rose-500/40 rounded text-rose-300 text-[11px] font-bold">
                          +{currentStatus.peopleWaiting - 12} more in line
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Direction arrow: Queue -> Food Counter */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span className="flex items-center gap-1 text-cyan-300 font-mono text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>No Biometrics • Anonymous Headcount Only</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Queue Direction → Counter
                  </span>
                </div>
              </div>

              {/* The Small Live Status Card required by prompt */}
              <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[#1c2541]/90 border border-cyan-500/30 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-900/60 text-cyan-300 border border-cyan-500/30">
                      LIVE STATUS
                    </span>
                    <span className="text-[10px] text-slate-400 italic">
                      (Demo Data)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300">
                    Counter: <strong className="text-white">Main Dining Hall</strong>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-left">
                  {/* Status Item 1: Queue Level */}
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#0b132b]/80 border border-slate-700/80">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">Queue</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${currentStatus.dotColor} ${activeLevel === 'LOW' ? 'animate-pulse' : ''}`} />
                      <span className="text-xs sm:text-sm font-bold text-white uppercase">
                        {currentStatus.level}
                      </span>
                    </div>
                  </div>

                  {/* Status Item 2: People Waiting */}
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#0b132b]/80 border border-slate-700/80">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <Users className="w-3 h-3 text-cyan-400" />
                      <span>Waiting</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-1">
                      {currentStatus.peopleWaiting} <span className="text-[11px] font-normal text-slate-400">People</span>
                    </div>
                  </div>

                  {/* Status Item 3: Estimated Wait */}
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#0b132b]/80 border border-slate-700/80">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>Est. Wait</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-cyan-300 mt-1">
                      {currentStatus.estimatedWaitMinutes} <span className="text-[11px] font-normal text-slate-400">min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
