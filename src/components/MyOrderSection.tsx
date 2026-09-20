import React, { useState } from 'react';
import {
  Ticket,
  Clock,
  CheckCircle2,
  QrCode,
  Sparkles,
  ChefHat,
  ArrowRight,
  Utensils,
  AlertCircle,
  XCircle,
  Bell,
  Check
} from 'lucide-react';
import { DemoOrder, OrderStatus } from '../types';
import { CancelOrderConfirmModal } from './CancelOrderConfirmModal';

interface MyOrderSectionProps {
  order: DemoOrder | null;
  onAdvanceStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onExploreMenu: () => void;
  onCancelOrder?: () => void;
}

export const MyOrderSection: React.FC<MyOrderSectionProps> = ({
  order,
  onAdvanceStatus,
  onExploreMenu,
  onCancelOrder,
}) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const statuses: OrderStatus[] = ['Order Received', 'Preparing', 'Ready for Collection'];

  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    if (current === 'Order Received') return 'Preparing';
    if (current === 'Preparing') return 'Ready for Collection';
    return null;
  };

  const nextStatus = order ? getNextStatus(order.status) : null;

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    if (onCancelOrder) {
      onCancelOrder();
    }
  };

  // Progress percentage for animated bar
  const getProgressPercentage = (status: OrderStatus): number => {
    switch (status) {
      case 'Order Received':
        return 28;
      case 'Preparing':
        return 68;
      case 'Ready for Collection':
        return 100;
      default:
        return 0;
    }
  };

  const isReady = order?.status === 'Ready for Collection';
  const progressPercent = order ? getProgressPercentage(order.status) : 0;

  return (
    <section id="my-order" className="py-16 md:py-20 bg-[#090f21] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Ticket className="w-3.5 h-3.5" />
              Order Token & Kitchen Tracker
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins'] flex items-center gap-3">
              <span>My Order Status</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Digital Pass
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Track your real-time kitchen token status without waiting in the physical crowd. Display your digital token at the pickup counter when ready.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {order && onCancelOrder && (
              <button
                id="my-order-cancel-btn"
                onClick={() => setIsCancelModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:text-rose-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                title="Cancel active token order"
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Cancel Order ❌</span>
              </button>
            )}

            <button
              id="my-order-order-more-btn"
              onClick={onExploreMenu}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c2541] hover:bg-[#27355c] border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Order Another Item</span>
            </button>
          </div>
        </div>

        {order ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Main Order & Stepper Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Ready Announcement Banner (Requirement 3) */}
              {isReady && (
                <div
                  id="order-ready-collection-alert"
                  className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/50 to-[#0e2a22] border-2 border-emerald-400 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300 flex items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-emerald-300 flex-shrink-0 animate-bounce">
                      <Bell className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-emerald-300 font-['Poppins'] flex items-center gap-2">
                        <span>🔔 Your order is ready for collection!</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                        Token <strong className="font-mono text-white font-extrabold">{order.tokenNumber}</strong> is packaged. Please proceed to <strong>Counter 1 ({order.canteenName})</strong>.
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold font-mono">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Counter Ready
                  </span>
                </div>
              )}

              {/* Order Status Stepper Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#131d38]/90 border border-cyan-500/30 backdrop-blur-md shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-700/80">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                      ACTIVE TOKEN PASS
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight mt-1">
                      {order.tokenNumber}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Kitchen: <strong className="text-white">{order.canteenName}</strong> • Placed: {order.placedAt}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 block uppercase">
                      Est. Preparation Time
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-1.5 sm:justify-end">
                      <Clock className="w-5 h-5 text-cyan-400" />
                      {order.estimatedMinutes} mins
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {isReady ? 'Ready at pickup counter!' : 'Counter preparation in progress'}
                    </span>
                  </div>
                </div>

                {/* Requirement 2: Smooth Progress Animation & Clear Steps */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ChefHat className="w-4 h-4 text-cyan-400" />
                      Order Preparation Tracker
                    </span>
                    <span className="font-mono text-xs text-cyan-400 font-bold">
                      {progressPercent}% Complete
                    </span>
                  </div>

                  {/* Smooth Animated Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-[#0b132b] p-0.5 border border-slate-700 overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-700 ease-out shadow-lg shadow-cyan-500/40 relative overflow-hidden"
                      style={{ width: `${progressPercent}%` }}
                    >
                      {/* Animated Shimmer Bar */}
                      <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]"></div>
                    </div>
                  </div>

                  {/* Clear Flow Indicator: Order Received → Preparing → Ready for Collection */}
                  <div className="p-3 rounded-xl bg-[#0b132b]/80 border border-slate-800 text-center text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 flex-wrap font-mono">
                    <span className={order.status === 'Order Received' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                      Order Received
                    </span>
                    <span className="text-cyan-500">→</span>
                    <span className={order.status === 'Preparing' ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                      Preparing
                    </span>
                    <span className="text-cyan-500">→</span>
                    <span className={order.status === 'Ready for Collection' ? 'text-emerald-400 font-bold animate-pulse' : 'text-slate-400'}>
                      Ready for Collection
                    </span>
                  </div>

                  {/* 3-State Progress Stepper Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {statuses.map((statusName, idx) => {
                      const currentIdx = statuses.indexOf(order.status);
                      const isComplete = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div
                          key={statusName}
                          className={`p-3.5 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                            isCurrent
                              ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400/50'
                              : isComplete
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                              : 'bg-[#0b132b] border-slate-800 text-slate-500 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold">
                              Step 0{idx + 1}
                            </span>
                            {isComplete ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold font-['Poppins'] block">
                              {statusName}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {idx === 0 && 'Logged into cafeteria queue'}
                              {idx === 1 && 'Chef is cooking your items'}
                              {idx === 2 && 'Proceed to counter to collect'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Status Simulation Switcher for Reviewers */}
                <div className="p-4 rounded-2xl bg-[#0b132b] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>
                      Demo Status Simulator: <strong className="text-white">{order.status}</strong>
                    </span>
                  </div>

                  {nextStatus ? (
                    <button
                      id="advance-order-status-btn"
                      onClick={() => onAdvanceStatus(order.id, nextStatus)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                    >
                      <span>Simulate: Advance to “{nextStatus}”</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ready for Pickup at Counter 1</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Order Items Detail Card */}
              <div className="p-6 rounded-3xl bg-[#131d38]/90 border border-slate-700/80 backdrop-blur-md">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                  Items in this Order
                </h4>
                <div className="divide-y divide-slate-800">
                  {order.items.map((ci, index) => (
                    <div key={index} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <div>
                          <span className="text-sm font-semibold text-white block">
                            {ci.item.name}
                          </span>
                          <span className="text-xs text-slate-400">
                            ₹{ci.item.price} each • Qty: {ci.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-cyan-300 font-mono">
                        ₹{ci.item.price * ci.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Simulated Amount</span>
                  <span className="text-xl font-extrabold text-cyan-400 font-mono">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Visual Digital Token Pass */}
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#152244] to-[#0c1326] border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/10 text-center relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none"></div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
                  CAMPUS DIGITAL PASS
                </div>

                <h4 className="text-sm font-bold text-slate-300">
                  {order.canteenName}
                </h4>

                <div className="my-6 p-6 rounded-2xl bg-[#0b132b] border border-cyan-500/40 shadow-inner">
                  <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">
                    TOKEN NUMBER
                  </span>
                  <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400 font-mono tracking-wider my-2">
                    {order.tokenNumber}
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    Show this number at counter
                  </span>
                </div>

                {/* Simulated QR Code Box */}
                <div className="p-4 bg-white rounded-2xl w-40 h-40 mx-auto flex flex-col items-center justify-center shadow-lg">
                  <QrCode className="w-28 h-28 text-slate-900" />
                  <span className="text-[9px] font-mono text-slate-600 font-bold mt-1">
                    SCAN AT COUNTER
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  No printed paper slips needed. Digital queue pass verified at cafeteria collection point.
                </p>

                <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Status:</span>
                  <span className={`font-bold font-mono ${isReady ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State: No active order placed yet */
          <div
            id="my-order-empty-state"
            className="text-center py-16 p-8 rounded-3xl bg-[#131d38]/60 border border-slate-700/80 backdrop-blur-md max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
              <Ticket className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-white font-['Poppins'] mb-2">
              No Active Token Order
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              You do not have any active kitchen orders right now. Browse our food menu, select items, and place a simulated demo order to receive a digital token.
            </p>

            <button
              id="empty-order-browse-menu-btn"
              onClick={onExploreMenu}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all cursor-pointer hover:scale-105"
            >
              <Utensils className="w-4 h-4" />
              <span>Browse Menu & Place Demo Order</span>
            </button>

            <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-500">
              Simulation Notice: All orders are client-side prototypes demonstrating queue-token integration.
            </div>
          </div>
        )}
      </div>

      {/* Cancel Order Confirmation Modal */}
      <CancelOrderConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancel}
        tokenNumber={order?.tokenNumber}
      />
    </section>
  );
};
