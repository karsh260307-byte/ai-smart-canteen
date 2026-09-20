import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Ticket, Clock, XCircle } from 'lucide-react';
import { CartItem, DemoOrder, CanteenLocation } from '../types';
import { CancelOrderConfirmModal } from './CancelOrderConfirmModal';

interface FoodOrderingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (canteen: CanteenLocation) => DemoOrder;
  selectedCanteen: CanteenLocation;
  onViewMyOrder: () => void;
  lastPlacedOrder: DemoOrder | null;
  onCancelOrder?: () => void;
}

export const FoodOrderingCartModal: React.FC<FoodOrderingCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  selectedCanteen,
  onViewMyOrder,
  lastPlacedOrder,
  onCancelOrder
}) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  const totalItemCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    if (onCancelOrder) {
      onCancelOrder();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="food-cart-modal"
        className="w-full max-w-xl bg-[#0e172e] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-700/80 flex items-center justify-between bg-[#152042]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-['Poppins']">
                Canteen Order Tray
              </h3>
              <p className="text-xs text-slate-400">
                Ordering from: <span className="text-cyan-300 font-semibold">{selectedCanteen.name}</span>
              </p>
            </div>
          </div>
          <button
            id="close-cart-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#0b132b] hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Demo disclaimer banner */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Simulation Only:</strong> This is a student AI Immersion ordering flow. No real payment or real cafeteria fulfillment is executed.
            </span>
          </div>

          {/* Active Order Card in Cart with Cancel Order option */}
          {lastPlacedOrder && onCancelOrder && (
            <div className="p-4 rounded-2xl bg-[#131d38] border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">Active Token:</span>
                    <span className="text-sm font-extrabold text-cyan-400 font-mono">
                      {lastPlacedOrder.tokenNumber}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      {lastPlacedOrder.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {lastPlacedOrder.canteenName} • ~{lastPlacedOrder.estimatedMinutes}m prep
                  </p>
                </div>
              </div>

              <button
                id="cart-cancel-order-active-btn"
                onClick={() => setIsCancelModalOpen(true)}
                className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Cancel this placed order"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Cancel Order</span>
              </button>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">Your tray is empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our sample campus canteen menu below and add delicious snacks or meals.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Selected Items in Tray:</span>
                {onCancelOrder && lastPlacedOrder && (
                  <button
                    onClick={() => setIsCancelModalOpen(true)}
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel Active Order</span>
                  </button>
                )}
              </div>

              {cartItems.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  id={`cart-item-row-${item.id}`}
                  className="p-3.5 rounded-2xl bg-[#131d38] border border-slate-700/80 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" title="Pure Veg"></span>
                      <h5 className="font-bold text-sm text-white truncate font-['Poppins']">
                        {item.name}
                      </h5>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <span className="text-cyan-300 font-semibold font-mono">
                        ₹{item.price}
                      </span>
                      <span>•</span>
                      <span>Prep: ~{item.prepTime}</span>
                    </div>
                  </div>

                  {/* Quantity control */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#0b132b] rounded-xl border border-slate-700 p-1">
                      <button
                        id={`cart-dec-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white font-mono">
                        {quantity}
                      </span>
                      <button
                        id={`cart-inc-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="w-14 text-right text-xs font-bold text-white font-mono">
                      ₹{item.price * quantity}
                    </span>

                    {/* Remove button */}
                    <button
                      id={`cart-remove-${item.id}`}
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={onClearCart}
                  className="text-slate-400 hover:text-rose-400 underline transition-colors cursor-pointer"
                >
                  Clear tray items
                </button>
                {onCancelOrder && (
                  <button
                    id="cart-cancel-order-link"
                    onClick={() => setIsCancelModalOpen(true)}
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel Order</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Pricing summary */}
          {cartItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#0b132b] border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Count:</span>
                <span className="font-mono text-white">{totalItemCount} items</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Prep Time:</span>
                <span className="font-mono text-cyan-300">~8 to 12 minutes</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Pickup Counter:</span>
                <span className="text-slate-200">{selectedCanteen.floor}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                <span className="text-white">Simulated Total:</span>
                <span className="text-cyan-400 text-lg font-mono">₹{totalAmount}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-[#152042] border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-center sm:text-left">
              <span className="text-[11px] text-slate-400 block">Total Due (Demo)</span>
              <span className="text-xl font-bold text-white font-mono">₹{totalAmount}</span>
            </div>
            {onCancelOrder && (
              <button
                id="cart-footer-cancel-btn"
                onClick={() => setIsCancelModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Cancel Order</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Add More Items
            </button>
            <button
              id="confirm-place-order-btn"
              disabled={cartItems.length === 0}
              onClick={() => {
                onPlaceOrder(selectedCanteen);
                onClose();
                onViewMyOrder();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Place Demo Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Reusable Cancel Order Confirmation Modal */}
      <CancelOrderConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancel}
        tokenNumber={lastPlacedOrder?.tokenNumber}
      />
    </div>
  );
};
