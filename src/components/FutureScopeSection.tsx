import React from 'react';
import { Sandwich, Ticket, CreditCard, BellRing, BarChart3, Utensils, Building2, Bot } from 'lucide-react';
import { FUTURE_SCOPE_ITEMS } from '../data/canteenData';

const getFutureIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sandwich':
      return <Sandwich className="w-5 h-5 text-amber-400" />;
    case 'Ticket':
      return <Ticket className="w-5 h-5 text-cyan-400" />;
    case 'CreditCard':
      return <CreditCard className="w-5 h-5 text-emerald-400" />;
    case 'BellRing':
      return <BellRing className="w-5 h-5 text-sky-400" />;
    case 'BarChart3':
      return <BarChart3 className="w-5 h-5 text-indigo-400" />;
    case 'Utensils':
      return <Utensils className="w-5 h-5 text-rose-400" />;
    case 'Building2':
      return <Building2 className="w-5 h-5 text-cyan-300" />;
    case 'Bot':
      return <Bot className="w-5 h-5 text-teal-400" />;
    default:
      return <Bot className="w-5 h-5 text-cyan-400" />;
  }
};

export const FutureScopeSection: React.FC = () => {
  return (
    <section id="future-scope" className="py-16 md:py-24 bg-[#0b132b] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Roadmap & Expansion
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            Future Scope
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Next evolution milestones for scaling the Smart Canteen architecture across campus food outlets.
          </p>
        </div>

        {/* 8 Future Scope Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FUTURE_SCOPE_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`future-scope-${item.id}`}
              className="p-5 rounded-2xl bg-[#1c2541]/50 hover:bg-[#1c2541]/80 border border-slate-700/70 hover:border-cyan-500/40 transition-all flex flex-col justify-between group backdrop-blur-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0b132b] border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getFutureIcon(item.icon)}
                </div>
                <h3 className="text-sm font-bold text-white mb-2 font-['Poppins']">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                <span>Phase 2 Milestone</span>
                <span>Planned</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
