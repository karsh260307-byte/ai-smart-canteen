import React from 'react';
import { Hourglass, Users, HelpCircle, Smartphone } from 'lucide-react';
import { PROBLEM_CARDS } from '../data/canteenData';

const getProblemIcon = (iconName: string) => {
  switch (iconName) {
    case 'Hourglass':
      return <Hourglass className="w-6 h-6 text-amber-400" />;
    case 'Users':
      return <Users className="w-6 h-6 text-rose-400" />;
    case 'HelpCircle':
      return <HelpCircle className="w-6 h-6 text-cyan-400" />;
    case 'SmartphoneOff':
    case 'Smartphone':
      return <Smartphone className="w-6 h-6 text-sky-400" />;
    default:
      return <Hourglass className="w-6 h-6 text-cyan-400" />;
  }
};

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem-section" className="py-16 md:py-20 bg-[#080e1e]/80 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Campus Pain Points
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            The Problem
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            During college break and lunch hours, the canteen can become crowded. Students may spend valuable break time waiting in queues and often cannot know the current waiting time before reaching the counter.
          </p>
        </div>

        {/* 4 Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.id}
              id={`problem-card-${card.id}`}
              className="p-6 rounded-2xl bg-[#1c2541]/50 hover:bg-[#1c2541]/80 border border-slate-700/70 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0b132b] border border-slate-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getProblemIcon(card.icon)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-['Poppins']">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>College Impact</span>
                <span className="text-rose-400 font-semibold">Unresolved Bottleneck</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
