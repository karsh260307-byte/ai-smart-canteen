import React from 'react';
import { Eye, Utensils, ShoppingBag, CheckSquare, Ticket, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { FOOD_ORDER_QUEUE_FLOW } from '../data/canteenData';

interface FoodOrderQueueFlowDiagramProps {
  onCheckQueue: () => void;
  onChooseFood: () => void;
  onViewOrder: () => void;
}

export const FoodOrderQueueFlowDiagram: React.FC<FoodOrderQueueFlowDiagramProps> = ({
  onCheckQueue,
  onChooseFood,
  onViewOrder
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Eye,
    Utensils,
    ShoppingBag,
    CheckSquare,
    Ticket,
    Clock,
    Sparkles
  };

  return (
    <div
      id="order-queue-connection-flow"
      className="p-6 sm:p-8 rounded-3xl bg-[#131d38]/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl mb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            Seamless Campus Journey
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-['Poppins']">
            Queue-Aware Food Ordering Flow
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            How smart queue intelligence connects directly with food pre-ordering to eliminate counter congestion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="flow-shortcut-menu"
            onClick={onChooseFood}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            Order Food Now
          </button>
        </div>
      </div>

      {/* 7-Step Connection Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {FOOD_ORDER_QUEUE_FLOW.map((item, idx) => {
          const Icon = iconMap[item.icon] || Sparkles;
          const isFirst = idx === 0;
          const isLast = idx === FOOD_ORDER_QUEUE_FLOW.length - 1;

          return (
            <div
              key={item.step}
              className={`p-3.5 rounded-2xl bg-[#0b132b]/80 border transition-all duration-200 flex flex-col justify-between ${
                isFirst
                  ? 'border-emerald-500/50 hover:border-emerald-400'
                  : isLast
                  ? 'border-cyan-400/60 bg-cyan-950/30'
                  : 'border-slate-700/80 hover:border-slate-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Step {item.step}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white font-['Poppins']">
                  {item.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
                <span className="font-mono">Stage 0{item.step}</span>
                {!isLast && <ArrowRight className="w-3 h-3 text-cyan-400 opacity-60" />}
                {isLast && <span className="text-cyan-400 font-bold">✓ Ready</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
