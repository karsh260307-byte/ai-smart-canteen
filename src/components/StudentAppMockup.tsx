import React from 'react';
import { QueueLevel, QueueStatusData } from '../types';
import { QUEUE_STATES } from '../data/canteenData';
import { Wifi, Battery, Signal, Bell, ArrowRight, CheckCircle2, Clock, Users, Sparkles } from 'lucide-react';

interface StudentAppMockupProps {
  activeLevel: QueueLevel;
  onSelectLevel: (level: QueueLevel) => void;
  onScrollTo: (id: string) => void;
}

export const StudentAppMockup: React.FC<StudentAppMockupProps> = ({
  activeLevel,
  onSelectLevel,
  onScrollTo,
}) => {
  const currentStatus: QueueStatusData = QUEUE_STATES[activeLevel];

  return (
    <section id="student-app-mockup" className="py-16 md:py-24 bg-[#0b132b] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Interactive Controls */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              Student Mobile Interface
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
              Campus Mobile Experience
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Students access this interface directly on their mobile browsers or smart campus progressive web apps to check canteen conditions between classes without leaving the classroom or library.
            </p>

            {/* Simulation controls */}
            <div className="p-4 rounded-xl bg-[#1c2541]/70 border border-cyan-500/30">
              <div className="text-xs font-semibold text-slate-300 mb-2.5 flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate App State (Updates Phone Mockup in Real-Time):</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {(['LOW', 'MEDIUM', 'HIGH'] as QueueLevel[]).map((level) => (
                  <button
                    key={level}
                    id={`mockup-toggle-${level.toLowerCase()}`}
                    onClick={() => onSelectLevel(level)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeLevel === level
                        ? level === 'LOW'
                          ? 'bg-emerald-500 text-slate-950 shadow-md'
                          : level === 'MEDIUM'
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-rose-500 text-white shadow-md'
                        : 'bg-[#0b132b] text-slate-300 border border-slate-700 hover:bg-[#152243]'
                    }`}
                  >
                    Set {level}
                  </button>
                ))}
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-300 text-left max-w-md mx-auto lg:mx-0">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Instant visual queue indicator before stepping out of lectures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Predictive wait-time calculation keeps lunch schedules efficient.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Automated smart recommendation advice based on queue load.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: The Phone Frame Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            {/* Phone Outer Shell */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-[44px] bg-[#020617] p-4 shadow-2xl shadow-cyan-950/80 border-4 border-slate-700/80 relative">
              {/* Dynamic Island / Speaker */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-900" />
              </div>

              {/* Phone Inner Screen */}
              <div className="rounded-[34px] bg-[#0b132b] border border-cyan-500/20 overflow-hidden flex flex-col min-h-[580px] text-slate-100 relative">
                {/* Phone Status Bar */}
                <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-white">12:45 PM</span>
                  <div className="flex items-center gap-1.5">
                    <Signal className="w-3 h-3 text-slate-300" />
                    <Wifi className="w-3 h-3 text-slate-300" />
                    <Battery className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                </div>

                {/* App Navigation Bar */}
                <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold tracking-wider text-white font-['Poppins']">
                      SMART CANTEEN
                    </h3>
                    <p className="text-[10px] text-cyan-400">Rathinam Campus</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1c2541] border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>

                {/* App Content Area */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  {/* Notification Banner */}
                  <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${
                    activeLevel === 'LOW'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : activeLevel === 'MEDIUM'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}>
                    <Bell className="w-4 h-4 flex-shrink-0 animate-bounce" />
                    <span className="font-medium">{currentStatus.appNotification}</span>
                  </div>

                  {/* Main Status Block */}
                  <div className="p-4 rounded-2xl bg-[#1c2541]/80 border border-slate-700/80 text-center shadow-lg">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                      Canteen Status
                    </span>
                    <div className="flex items-center justify-center gap-2 mt-1 mb-3">
                      <span className="text-lg">
                        {activeLevel === 'LOW' ? '🟢' : activeLevel === 'MEDIUM' ? '🟡' : '🔴'}
                      </span>
                      <span className="text-lg font-bold text-white uppercase tracking-wide font-['Poppins']">
                        {activeLevel} QUEUE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-slate-700/60">
                      <div className="p-2 bg-[#0b132b]/80 rounded-lg">
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Users className="w-3 h-3 text-cyan-400" />
                          <span>People Waiting</span>
                        </div>
                        <div className="text-lg font-bold text-white mt-0.5">
                          {currentStatus.peopleWaiting}
                        </div>
                      </div>

                      <div className="p-2 bg-[#0b132b]/80 rounded-lg">
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>Estimated Wait</span>
                        </div>
                        <div className="text-lg font-bold text-cyan-300 mt-0.5">
                          {currentStatus.estimatedWaitMinutes} min
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended advice box */}
                  <div className="p-3.5 rounded-xl bg-[#131d38] border border-cyan-500/30 text-xs">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">
                      Recommendation:
                    </div>
                    <p className="text-slate-100 font-medium mt-1">
                      “{activeLevel === 'LOW' ? 'Now is a good time to visit.' : currentStatus.recommendation}”
                    </p>
                  </div>

                  {/* Phone Button */}
                  <div className="pt-2">
                    <button
                      id="mockup-view-live-queue-btn"
                      onClick={() => onScrollTo('live-queue')}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                    >
                      <span>View Live Queue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-2">
                      Demo Student App View • Rathinam C29
                    </p>
                  </div>
                </div>

                {/* Home indicator bar */}
                <div className="py-2 flex justify-center">
                  <div className="w-28 h-1 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
