import React from 'react';
import { Smartphone, Activity, Clock, CheckCircle2, Sparkles, ChevronRight, ArrowDown } from 'lucide-react';
import { USER_FLOW_STEPS } from '../data/canteenData';

const getFlowIcon = (iconName: string) => {
  switch (iconName) {
    case 'Smartphone':
      return <Smartphone className="w-5 h-5 text-cyan-400" />;
    case 'Activity':
      return <Activity className="w-5 h-5 text-sky-400" />;
    case 'Clock':
      return <Clock className="w-5 h-5 text-indigo-400" />;
    case 'CheckCircle2':
      return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-amber-300" />;
    default:
      return <Smartphone className="w-5 h-5 text-cyan-400" />;
  }
};

export const UserFlowSection: React.FC = () => {
  return (
    <section id="user-flow" className="py-16 md:py-24 bg-[#0b132b] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Interaction Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            User Flow
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            How a campus student navigates the application to save time during break intervals.
          </p>
        </div>

        {/* 5-step Flow representation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {USER_FLOW_STEPS.map((flowItem, idx) => (
            <div key={flowItem.step} className="relative flex flex-col items-center">
              <div
                id={`flow-step-${flowItem.step}`}
                className="w-full h-full p-6 rounded-2xl bg-[#1c2541]/70 border border-cyan-500/20 hover:border-cyan-400/60 transition-all text-center flex flex-col justify-between backdrop-blur-sm group shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0b132b] border border-slate-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {getFlowIcon(flowItem.icon)}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Step 0{flowItem.step}
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight mt-1 mb-2 font-['Poppins']">
                    {flowItem.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {flowItem.desc}
                  </p>
                </div>
              </div>

              {/* Arrow Connector for Desktop */}
              {idx < USER_FLOW_STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-[#0b132b] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Arrow Connector for Mobile */}
              {idx < USER_FLOW_STEPS.length - 1 && (
                <div className="md:hidden my-2 flex justify-center text-cyan-400">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
