import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Sparkles,
  ShoppingBag,
  Ticket,
  ArrowRight,
  RefreshCw,
  Utensils,
  Layers,
  Settings,
  TrendingUp
} from 'lucide-react';
import { QueueLevel, DemoOrder, MenuItem, FoodAvailability, CanteenLocation } from '../types';
import { QUEUE_STATES } from '../data/canteenData';

interface AdminDashboardSectionProps {
  activeQueueLevel: QueueLevel;
  onSelectQueueLevel: (level: QueueLevel) => void;
  activeOrder: DemoOrder | null;
  orderHistory: DemoOrder[];
  menuItems: MenuItem[];
  onToggleFoodAvailability: (itemId: string, newAvailability: FoodAvailability) => void;
  onAdvanceActiveOrderStatus?: (orderId: string) => void;
  selectedCanteen: CanteenLocation;
  onOpenFullScreenAdmin?: () => void;
}

export const AdminDashboardSection: React.FC<AdminDashboardSectionProps> = ({
  activeQueueLevel,
  onSelectQueueLevel,
  activeOrder,
  orderHistory,
  menuItems,
  onToggleFoodAvailability,
  onAdvanceActiveOrderStatus,
  selectedCanteen,
  onOpenFullScreenAdmin,
}) => {
  const currentQueueData = QUEUE_STATES[activeQueueLevel];

  // Count active orders vs ready orders
  const activeOrdersCount = activeOrder && activeOrder.status !== 'Ready for Collection' ? 1 : 0;
  const readyOrdersCount = (activeOrder && activeOrder.status === 'Ready for Collection' ? 1 : 0) +
    orderHistory.filter((o) => o.status === 'Ready for Collection' && !o.isCancelled).length;

  return (
    <section id="admin-view" className="py-16 md:py-20 bg-[#090f21] relative border-t-2 border-cyan-500/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/15 border border-purple-400/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Settings className="w-3.5 h-3.5" />
              Cafeteria Staff & Management View
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins'] flex items-center gap-3">
              <span>Admin Dashboard</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Staff Control Panel
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Real-time administrative controls to oversee counter congestion, dispatch kitchen tokens, and update item stock status for <strong className="text-cyan-300">{selectedCanteen.name}</strong>.
            </p>
          </div>

          {/* Action & Disclaimer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {onOpenFullScreenAdmin && (
              <button
                id="open-fullscreen-admin-btn"
                onClick={onOpenFullScreenAdmin}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Launch Full Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-400 flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Demo Mode Active</span>
            </div>
          </div>
        </div>

        {/* 4 Core Admin KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* 1. Current Queue Level Card with Instant Toggles */}
          <div className="p-5 rounded-2xl bg-[#131d38] border border-cyan-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider">Current Queue</span>
                <span className="text-base">
                  {activeQueueLevel === 'LOW' ? '🟢' : activeQueueLevel === 'MEDIUM' ? '🟡' : '🔴'}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-['Poppins']">
                {activeQueueLevel} LEVEL
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Wait: ~{currentQueueData.estimatedWaitMinutes} mins
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/80">
              <span className="text-[10px] text-slate-400 font-semibold block mb-1.5 uppercase">
                Admin Queue Switcher:
              </span>
              <div className="grid grid-cols-3 gap-1">
                {(['LOW', 'MEDIUM', 'HIGH'] as QueueLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    id={`admin-set-queue-${lvl.toLowerCase()}`}
                    onClick={() => onSelectQueueLevel(lvl)}
                    className={`py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      activeQueueLevel === lvl
                        ? lvl === 'LOW'
                          ? 'bg-emerald-500 text-slate-950 shadow'
                          : lvl === 'MEDIUM'
                          ? 'bg-amber-400 text-slate-950 shadow'
                          : 'bg-rose-500 text-white shadow'
                        : 'bg-[#0b132b] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. People Waiting */}
          <div className="p-5 rounded-2xl bg-[#131d38] border border-slate-700/80 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider">People Waiting</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-extrabold text-cyan-300 font-mono">
                {currentQueueData.peopleWaiting}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Estimated counter density at {selectedCanteen.shortName}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Counter Status:</span>
              <span className="font-semibold text-emerald-400">2 Stations Active</span>
            </div>
          </div>

          {/* 3. Active Orders */}
          <div className="p-5 rounded-2xl bg-[#131d38] border border-slate-700/80 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider">Active Orders</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-3xl font-extrabold text-amber-300 font-mono">
                {activeOrdersCount}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {activeOrder && activeOrder.status !== 'Ready for Collection'
                  ? `Token ${activeOrder.tokenNumber} in prep`
                  : 'No pending orders in prep'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Kitchen Pace:</span>
              <span className="font-semibold text-cyan-400">On Schedule</span>
            </div>
          </div>

          {/* 4. Ready Orders */}
          <div className="p-5 rounded-2xl bg-[#131d38] border border-slate-700/80 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider">Ready Orders</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-extrabold text-emerald-400 font-mono">
                {readyOrdersCount}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tokens waiting for student collection at Counter 1
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Counter Pickup:</span>
              <span className="font-semibold text-emerald-400">Ready for Dispatch</span>
            </div>
          </div>
        </div>

        {/* Two-Column Detail Block: Active Orders Dispatcher & Food Availability Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Orders Management (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#131d38]/90 border border-slate-700/80 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-base font-bold text-white font-['Poppins']">
                    Live Token Dispatcher
                  </h4>
                </div>
                <span className="text-xs font-mono text-cyan-300">
                  {selectedCanteen.shortName}
                </span>
              </div>

              {activeOrder ? (
                <div className="p-4 rounded-2xl bg-[#0b132b] border border-cyan-500/30 space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-mono">
                        Active Token
                      </span>
                      <span className="text-2xl font-black text-cyan-400 font-mono">
                        {activeOrder.tokenNumber}
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      activeOrder.status === 'Ready for Collection'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {activeOrder.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <p className="text-slate-400">Items to prepare:</p>
                    {activeOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between font-mono text-slate-200">
                        <span>{it.quantity}x {it.item.name}</span>
                        <span>₹{it.item.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Admin Fast Advance button */}
                  {onAdvanceActiveOrderStatus && activeOrder.status !== 'Ready for Collection' && (
                    <button
                      id="admin-advance-order-btn"
                      onClick={() => onAdvanceActiveOrderStatus(activeOrder.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        Advance Status: {activeOrder.status === 'Order Received' ? 'Set to Preparing' : 'Mark Ready for Collection'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 border border-dashed border-slate-700/80 rounded-2xl mb-4">
                  <Ticket className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs">No active kitchen orders currently waiting.</p>
                  <p className="text-[11px] text-slate-500 mt-1">Place a demo order from the menu to test kitchen token tracking.</p>
                </div>
              )}

              {/* Ready Orders Summary */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Recent Fulfilled Tokens ({readyOrdersCount})
                </span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {orderHistory.slice(0, 3).map((hist) => (
                    <div
                      key={hist.id}
                      className="p-2.5 rounded-xl bg-[#0b132b]/80 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-300">{hist.tokenNumber}</span>
                        <span className="text-slate-400 truncate max-w-[120px]">
                          {hist.items.map((i) => i.item.name).join(', ')}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        Ready
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Kitchen Dispatch Queue</span>
              <span className="text-cyan-400 font-mono">Live Demo</span>
            </div>
          </div>

          {/* Food Availability Management Matrix (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#131d38]/90 border border-slate-700/80 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-base font-bold text-white font-['Poppins']">
                    Food Availability Inventory Matrix
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">
                  Click status pill to toggle
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4">
                Update stock status in real-time. Students viewing the food menu will immediately see items as <strong>Available</strong>, <strong>Limited</strong>, or <strong>Sold Out</strong>.
              </p>

              {/* Items Availability Table / Grid */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {menuItems.map((item) => {
                  return (
                    <div
                      key={item.id}
                      id={`admin-item-row-${item.id}`}
                      className="p-3 rounded-2xl bg-[#0b132b]/80 border border-slate-700/70 hover:border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                        <div>
                          <h5 className="font-bold text-sm text-white">{item.name}</h5>
                          <span className="text-[11px] text-slate-400 font-mono">
                            ₹{item.price} • {item.category}
                          </span>
                        </div>
                      </div>

                      {/* 3 Availability Buttons */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center">
                        {(['Available', 'Limited', 'Sold Out'] as FoodAvailability[]).map((avail) => {
                          const isCurrent = item.availability === avail;
                          return (
                            <button
                              key={avail}
                              id={`admin-avail-btn-${item.id}-${avail.toLowerCase().replace(' ', '-')}`}
                              onClick={() => onToggleFoodAvailability(item.id, avail)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                isCurrent
                                  ? avail === 'Available'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow'
                                    : avail === 'Limited'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400 shadow'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-400 shadow'
                                  : 'bg-[#152042] text-slate-400 hover:text-slate-200 border border-slate-700'
                              }`}
                            >
                              {avail === 'Available' && '🟢 Available'}
                              {avail === 'Limited' && '🟡 Limited'}
                              {avail === 'Sold Out' && '🔴 Sold Out'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Admin changes propagate instantly to student food ordering</span>
              <span className="text-cyan-400 font-mono">Prototype UI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
