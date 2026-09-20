import React from 'react';
import { History, Ticket, Clock, CheckCircle2, ShoppingBag, Utensils, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { DemoOrder, MenuItem } from '../types';

interface OrderHistorySectionProps {
  orderHistory: DemoOrder[];
  onReorder?: (items: DemoOrder['items']) => void;
  onExploreMenu: () => void;
}

export const OrderHistorySection: React.FC<OrderHistorySectionProps> = ({
  orderHistory,
  onReorder,
  onExploreMenu,
}) => {
  return (
    <section id="order-history" className="py-16 md:py-20 bg-[#080d1e] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <History className="w-3.5 h-3.5" />
              Past Activity
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins'] flex items-center gap-3">
              <span>Order History</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Demo / Simulation Data
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Inspect your previous simulated token receipts, past cafeteria visits, and fulfillment timestamps.
            </p>
          </div>

          <button
            id="order-history-explore-menu-btn"
            onClick={onExploreMenu}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c2541] hover:bg-[#27355c] border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer w-fit"
          >
            <Utensils className="w-4 h-4" />
            <span>Place New Order</span>
          </button>
        </div>

        {/* Demo Data Disclaimer */}
        <div className="mb-6 p-3 rounded-xl bg-[#0f1b38] border border-cyan-500/20 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              All orders shown here are synthetic demo records designed to demonstrate digital token retention for students.
            </span>
          </div>
          <span className="font-mono text-cyan-400 text-[11px] hidden sm:inline">
            Total History: {orderHistory.length} orders
          </span>
        </div>

        {/* Orders List / Cards Grid */}
        {orderHistory.length === 0 ? (
          <div className="text-center py-12 p-8 rounded-3xl bg-[#131d38]/60 border border-slate-700/80">
            <History className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">No Past Demo Orders</h4>
            <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
              You haven't placed any simulated orders yet. Browse our campus canteen menu to generate your first digital token.
            </p>
            <button
              onClick={onExploreMenu}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Browse Food Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderHistory.map((order) => {
              const isReady = order.status === 'Ready for Collection';
              const isCancelled = order.isCancelled;

              return (
                <div
                  key={order.id}
                  id={`order-history-card-${order.id}`}
                  className="p-5 rounded-2xl bg-[#131d38]/80 border border-slate-700/80 hover:border-cyan-500/40 hover:bg-[#1a2649] transition-all duration-200 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    {/* Top row: Token and status */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-700/80">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                          <Ticket className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Token</span>
                          <span className="text-base font-extrabold text-cyan-300 font-mono tracking-wide">
                            {order.tokenNumber}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          isCancelled
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : isReady
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        }`}
                      >
                        {isCancelled ? 'Cancelled' : order.status}
                      </span>
                    </div>

                    {/* Canteen & Timestamps */}
                    <div className="space-y-1 mb-3 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Canteen:</span>
                        <strong className="text-white font-medium">{order.canteenName}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" /> Placed:
                        </span>
                        <span className="font-mono text-slate-300">{order.placedAt}</span>
                      </div>
                      {order.completedAt && (
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed:
                          </span>
                          <span className="font-mono text-emerald-300">{order.completedAt}</span>
                        </div>
                      )}
                    </div>

                    {/* Ordered Items list */}
                    <div className="p-3 rounded-xl bg-[#0b132b]/80 border border-slate-800 mb-4 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                        Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
                      </span>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-slate-300">
                          <span className="truncate pr-2">
                            {it.quantity}x {it.item.name}
                          </span>
                          <span className="font-mono text-cyan-400 font-medium">
                            ₹{it.item.price * it.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Total and reorder */}
                  <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Total Simulated</span>
                      <span className="text-base font-bold text-white font-mono">
                        ₹{order.totalAmount}
                      </span>
                    </div>

                    {onReorder && (
                      <button
                        onClick={() => onReorder(order.items)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c2541] hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer"
                        title="Add these items to your current tray"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reorder</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
