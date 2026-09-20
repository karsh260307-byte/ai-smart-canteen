import React, { useState } from 'react';
import { Bot, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, XCircle, Utensils, Ticket, Bell } from 'lucide-react';
import { QueueLevel, MenuItem, DemoOrder, FoodAvailability } from '../types';

interface AiRecommendationCardProps {
  activeLevel: QueueLevel;
  menuItems?: MenuItem[];
  activeOrder?: DemoOrder | null;
  onExploreMenu?: () => void;
}

export const AiRecommendationCard: React.FC<AiRecommendationCardProps> = ({
  activeLevel,
  menuItems = [],
  activeOrder = null,
  onExploreMenu
}) => {
  // Let user pick or highlight a sample food item to see how AI recommendation adapts dynamically!
  const [selectedItemId, setSelectedItemId] = useState<string>(menuItems[0]?.id || 'item-1');

  const selectedItem = menuItems.find((i) => i.id === selectedItemId) || menuItems[0];
  const itemAvailability: FoodAvailability = selectedItem ? selectedItem.availability : 'Available';

  // Compute Smart AI Recommendation based on queue + food availability + order status (Requirement 7)
  let recommendationHeadline = '';
  let recommendationSubtext = '';
  let recommendationBadge = 'OPTIMAL VISIT';
  let badgeTheme = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

  if (activeOrder && activeOrder.status === 'Ready for Collection') {
    recommendationHeadline = '🔔 Your order is ready for collection!';
    recommendationSubtext = `Token ${activeOrder.tokenNumber} is ready at Counter 1. Proceed immediately to pick up your food.`;
    recommendationBadge = 'ORDER READY';
    badgeTheme = 'bg-emerald-500/20 text-emerald-300 border-emerald-400';
  } else if (activeOrder && activeOrder.status === 'Preparing') {
    recommendationHeadline = `Your order (${activeOrder.tokenNumber}) is currently being prepared.`;
    recommendationSubtext = 'Relax in the seating area or study hall. You will be notified when your token is called.';
    recommendationBadge = 'IN KITCHEN PREP';
    badgeTheme = 'bg-amber-500/20 text-amber-300 border-amber-400';
  } else if (activeLevel === 'HIGH') {
    // When queue is HIGH (Requirement 5 & 7)
    if (itemAvailability === 'Sold Out') {
      recommendationHeadline = `Queue is high and ${selectedItem?.name || 'this item'} is sold out.`;
      recommendationSubtext = 'Consider visiting later or choose an alternative item from another cafeteria counter.';
    } else {
      recommendationHeadline = 'Queue is high. You can place your order and visit when it is ready.';
      recommendationSubtext = 'Pre-ordering your meal saves approximately 18-22 minutes of waiting in line.';
    }
    recommendationBadge = 'HIGH RUSH PEAK';
    badgeTheme = 'bg-rose-500/20 text-rose-300 border-rose-400';
  } else if (activeLevel === 'MEDIUM') {
    if (itemAvailability === 'Limited') {
      recommendationHeadline = `Queue is moderate and ${selectedItem?.name || 'selected item'} has limited stock.`;
      recommendationSubtext = 'Order now to secure your meal before it sells out during recess rush.';
    } else {
      recommendationHeadline = 'Moderate queue. Place your order now for pickup in ~8-10 minutes.';
      recommendationSubtext = 'Counter turnaround is steady. Good window to grab lunch without extreme wait.';
    }
    recommendationBadge = 'MODERATE QUEUE';
    badgeTheme = 'bg-amber-500/20 text-amber-300 border-amber-400';
  } else {
    // LOW queue
    if (itemAvailability === 'Sold Out') {
      recommendationHeadline = `Queue is low, but ${selectedItem?.name || 'this item'} is currently sold out.`;
      recommendationSubtext = 'Check other available snacks or explore another campus block canteen.';
      recommendationBadge = 'ITEM RESTOCKING';
      badgeTheme = 'bg-amber-500/20 text-amber-300 border-amber-400';
    } else {
      recommendationHeadline = 'Queue is low and your selected food is available. Good time to visit.';
      recommendationSubtext = 'Minimal counter delay (~3-5 mins). Direct walk-in ordering is optimal right now.';
      recommendationBadge = 'OPTIMAL VISIT';
      badgeTheme = 'bg-emerald-500/20 text-emerald-300 border-emerald-400';
    }
  }

  const borderGradient =
    activeLevel === 'LOW'
      ? 'border-emerald-500/40 from-emerald-950/30 via-[#1c2541]/90 to-[#0b132b]'
      : activeLevel === 'MEDIUM'
      ? 'border-amber-500/40 from-amber-950/30 via-[#1c2541]/90 to-[#0b132b]'
      : 'border-rose-500/40 from-rose-950/30 via-[#1c2541]/90 to-[#0b132b]';

  return (
    <div
      id="smart-ai-recommendation-card"
      className={`relative p-6 sm:p-7 rounded-3xl bg-gradient-to-r ${borderGradient} border backdrop-blur-xl shadow-xl transition-all duration-300`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 flex-shrink-0 border border-cyan-300/30">
            <Bot className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Smart AI Recommendation (Demo Engine)
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${badgeTheme}`}>
                {recommendationBadge}
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white font-['Poppins'] leading-snug">
              “{recommendationHeadline}”
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {recommendationSubtext}
            </p>
          </div>
        </div>

        {onExploreMenu && (
          <button
            id="ai-recommendation-explore-btn"
            onClick={onExploreMenu}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-2xl text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
          >
            <span>Browse Food Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Interactive Item Selector to see AI react to different food availabilities */}
      {menuItems.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Utensils className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulate recommendation for selected item:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {menuItems.slice(0, 5).map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedItemId(m.id)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                  selectedItemId === m.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'bg-[#0f172a] text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                {m.name} ({m.availability === 'Available' ? '🟢' : m.availability === 'Limited' ? '🟡' : '🔴'})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
