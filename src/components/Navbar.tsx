import React, { useState } from 'react';
import { Sparkles, Menu, X, Radio, ArrowRight, ShoppingBag, Shield } from 'lucide-react';
import { NotificationAlert } from '../types';
import { NotificationBellDropdown } from './NotificationBellDropdown';

interface NavbarProps {
  onScrollTo: (id: string) => void;
  notifications: NotificationAlert[];
  onMarkNotificationRead: (id: string) => void;
  onClearNotifications: () => void;
  onTriggerDemoLowQueueAlert: () => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
  onOpenAdminDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollTo,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  onTriggerDemoLowQueueAlert,
  cartItemCount = 0,
  onOpenCart,
  onOpenAdminDashboard,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation menu items including Order History and Admin View:
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Live Queue', id: 'live-queue' },
    { label: 'Prediction', id: 'ai-queue-prediction' },
    { label: 'Food Menu', id: 'food-menu' },
    { label: 'My Order', id: 'my-order' },
    { label: 'History', id: 'order-history' },
    { label: 'AI Analysis', id: 'ai-analysis' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'About Project', id: 'about-project' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'admin-page' && onOpenAdminDashboard) {
      onOpenAdminDashboard();
      setIsMobileMenuOpen(false);
      return;
    }
    onScrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b132b]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        {/* Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer transition-transform hover:scale-[1.02] flex-shrink-0"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-300/30">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-['Poppins']">
                Smart Canteen <span className="text-cyan-400">AI</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 rounded border border-cyan-500/30">
                Immersion Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Rathinam Technical Campus • AI & DS
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className="px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Notifications Bell + Cart + View Queue */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Bell (Requirement 1) */}
          <NotificationBellDropdown
            notifications={notifications}
            onMarkAsRead={onMarkNotificationRead}
            onClearAll={onClearNotifications}
            onTriggerDemoLowQueueAlert={onTriggerDemoLowQueueAlert}
            onSelectNotificationAction={() => handleNavClick('live-queue')}
          />

          {/* Cart Tray Button (Requirement 4 & 5) */}
          {onOpenCart && (
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#1c2541] hover:bg-[#253258] border border-cyan-500/30 text-slate-200 hover:text-cyan-300 transition-all cursor-pointer"
              aria-label="View Order Tray"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#0b132b]">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}

          {/* Admin Login / Admin View (Requirement 1) */}
          {onOpenAdminDashboard && (
            <button
              id="nav-admin-login-btn"
              onClick={onOpenAdminDashboard}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-400/40 text-purple-200 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Open Separate Admin Dashboard"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Admin Login / Admin View</span>
              <span className="sm:hidden">Admin</span>
            </button>
          )}

          {/* View Queue CTA */}
          <button
            id="nav-view-queue-btn"
            onClick={() => handleNavClick('live-queue')}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/25 transition-all transform hover:translate-y-[-1px] cursor-pointer whitespace-nowrap"
          >
            <span>Live Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-[#1c2541] rounded-lg border border-slate-700 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0e172e] border-b border-cyan-500/20 px-4 pt-3 pb-5 space-y-2">
          <div className="px-3 py-1.5 mb-2 bg-[#1c2541] rounded-md border border-cyan-500/30 flex items-center justify-between text-xs text-slate-300">
            <span>Rathinam Tech Campus</span>
            <span className="text-cyan-400 font-medium">AI & DS • Batch C29</span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-[#1c2541] rounded-lg transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {onOpenAdminDashboard && (
              <button
                id="mobile-nav-admin-dashboard"
                onClick={() => {
                  onOpenAdminDashboard();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-500/20 border border-purple-400/40 text-purple-200 text-sm font-semibold rounded-lg hover:bg-purple-500/30 transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4 text-purple-300" />
                <span>Admin Login / Admin View</span>
              </button>
            )}
            {onOpenCart && (
              <button
                onClick={() => {
                  onOpenCart();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1c2541] border border-cyan-500/40 text-cyan-300 text-sm font-semibold rounded-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Open Order Tray ({cartItemCount} items)</span>
              </button>
            )}
            <button
              id="mobile-nav-live-queue"
              onClick={() => handleNavClick('live-queue')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-sm font-bold rounded-lg shadow-md shadow-cyan-500/25 cursor-pointer"
            >
              <span>View Live Queue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

