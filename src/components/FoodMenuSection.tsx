import React, { useState } from 'react';
import { Utensils, Plus, Check, ShoppingBag, Sparkles, Clock, Flame, Info, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';
import { MenuItem, CartItem, CanteenLocation, FoodAvailability } from '../types';

interface FoodMenuSectionProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  selectedCanteen: CanteenLocation;
  onToggleAvailability?: (itemId: string, newAvailability: FoodAvailability) => void;
}

export const FoodMenuSection: React.FC<FoodMenuSectionProps> = ({
  menuItems,
  onAddToCart,
  cartItems,
  onOpenCart,
  selectedCanteen,
  onToggleAvailability,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Snacks' | 'Meals' | 'Beverages'>('All');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: ('All' | 'Snacks' | 'Meals' | 'Beverages')[] = ['All', 'Snacks', 'Meals', 'Beverages'];

  const filteredMenu = menuItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const handleAddClick = (item: MenuItem) => {
    if (item.availability === 'Sold Out') return;
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const cycleAvailability = (current: FoodAvailability): FoodAvailability => {
    if (current === 'Available') return 'Limited';
    if (current === 'Limited') return 'Sold Out';
    return 'Available';
  };

  return (
    <section id="food-menu" className="py-16 md:py-20 bg-[#080d1e] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Cart Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Utensils className="w-3.5 h-3.5" />
              Pre-Order Canteen Menu
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins'] flex items-center gap-3">
              <span>Campus Food Menu</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Prototype / Demo Data
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Fresh campus snacks and meal options prepared at <strong className="text-cyan-300">{selectedCanteen.name}</strong>. Live availability indicators update in real-time.
            </p>
          </div>

          {/* Cart Tray Floating Trigger */}
          <button
            id="open-tray-btn"
            onClick={onOpenCart}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 cursor-pointer w-fit"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-[#0b132b] animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span>View Order Tray ({totalCartCount})</span>
          </button>
        </div>

        {/* Food Availability Legend & Demo Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-[#0f1b38] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              <strong>Food Availability:</strong> Status updates dynamically based on cafeteria kitchen inventory.
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Available
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Limited Stock
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span> Sold Out
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`menu-category-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-[#131d38] text-slate-300 hover:bg-[#1c2541] border border-slate-700/80'
                }`}
              >
                {cat === 'All' && '🍽️ All Items'}
                {cat === 'Snacks' && '🥟 Quick Snacks'}
                {cat === 'Meals' && '🍕 Meals & Dosa'}
                {cat === 'Beverages' && '🧃 Juices & Drinks'}
              </button>
            );
          })}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMenu.map((item) => {
            const isJustAdded = addedItemIds[item.id];
            const currentQuantityInCart =
              cartItems.find((ci) => ci.item.id === item.id)?.quantity || 0;
            const isSoldOut = item.availability === 'Sold Out';
            const isLimited = item.availability === 'Limited';

            return (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                className={`p-5 rounded-2xl border transition-all duration-200 backdrop-blur-md flex flex-col justify-between group shadow-lg ${
                  isSoldOut
                    ? 'bg-[#0f172a]/60 border-slate-800 opacity-75'
                    : isLimited
                    ? 'bg-[#141e3a]/90 border-amber-500/40 hover:border-amber-400'
                    : 'bg-[#131d38]/80 border-slate-700/80 hover:border-cyan-500/40 hover:bg-[#1c2541]/90'
                }`}
              >
                <div>
                  {/* Top tags: Veg + Availability Pill (Clickable for demo testing) */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Veg
                    </span>

                    {/* Interactive Availability Badge */}
                    <button
                      id={`toggle-item-avail-${item.id}`}
                      onClick={() => {
                        if (onToggleAvailability) {
                          onToggleAvailability(item.id, cycleAvailability(item.availability));
                        }
                      }}
                      title="Click to toggle demo availability (Available → Limited → Sold Out)"
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                        item.availability === 'Available'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                          : item.availability === 'Limited'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.availability === 'Available'
                            ? 'bg-emerald-400 animate-pulse'
                            : item.availability === 'Limited'
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                        }`}
                      ></span>
                      <span>{item.availability}</span>
                    </button>
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className={`text-base font-bold font-['Poppins'] transition-colors ${
                      isSoldOut ? 'text-slate-400 line-through' : 'text-white group-hover:text-cyan-300'
                    }`}>
                      {item.name}
                    </h3>
                    <span className="text-base font-extrabold text-cyan-400 font-mono flex-shrink-0">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Prep Time */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono mb-2">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Prep: {item.prepTime}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row: Tray count & Add button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {currentQuantityInCart > 0 ? (
                      <span className="text-cyan-300 font-bold">
                        {currentQuantityInCart} in tray
                      </span>
                    ) : isSoldOut ? (
                      <span className="text-rose-400">Sold out</span>
                    ) : isLimited ? (
                      <span className="text-amber-400">Hurry, limited</span>
                    ) : (
                      'Available'
                    )}
                  </span>

                  <button
                    id={`add-to-cart-btn-${item.id}`}
                    disabled={isSoldOut}
                    onClick={() => handleAddClick(item)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSoldOut
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : isJustAdded
                        ? 'bg-emerald-500 text-slate-950 scale-105 cursor-pointer'
                        : 'bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 cursor-pointer'
                    }`}
                  >
                    {isSoldOut ? (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Sold Out</span>
                      </>
                    ) : isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
