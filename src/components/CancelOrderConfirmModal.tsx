import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface CancelOrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
  tokenNumber?: string;
}

export const CancelOrderConfirmModal: React.FC<CancelOrderConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmCancel,
  tokenNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="cancel-order-confirm-dialog"
        className="w-full max-w-md bg-[#0f1b38] border border-rose-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-rose-950/50 text-slate-100 animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white font-['Poppins'] mb-2">
          Cancel Order?
        </h3>

        {/* Exact required text: “Are you sure you want to cancel this order?” */}
        <p className="text-sm text-slate-200 leading-relaxed mb-4">
          Are you sure you want to cancel this order?
        </p>

        {tokenNumber && (
          <div className="mb-5 p-3 rounded-xl bg-[#0b132b] border border-slate-700/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Token to cancel:</span>
            <span className="font-mono font-bold text-rose-400 text-sm">
              {tokenNumber}
            </span>
          </div>
        )}

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 mb-6">
          <span className="text-slate-300 font-semibold">Demo Notice:</span> This is only a demo/prototype feature. Your token will be cleared, allowing you to simulate placing a new order.
        </div>

        {/* Exact requested buttons: “Yes, Cancel Order” and “No, Keep Order” */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            id="confirm-yes-cancel-order-btn"
            onClick={onConfirmCancel}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
          >
            Yes, Cancel Order
          </button>
          <button
            id="confirm-no-keep-order-btn"
            onClick={onClose}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors cursor-pointer"
          >
            No, Keep Order
          </button>
        </div>
      </div>
    </div>
  );
};
