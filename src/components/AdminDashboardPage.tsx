import React, { useState } from 'react';
import {
  QueueLevel,
  DemoOrder,
  MenuItem,
  FoodAvailability,
  CanteenLocation,
  OrderStatus
} from '../types';
import { QUEUE_STATES, PEAK_HOURS_INFO } from '../data/canteenData';
import {
  ArrowLeft,
  Shield,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShoppingBag,
  Ticket,
  Utensils,
  RefreshCw,
  Search,
  Filter,
  Info,
  ChevronRight,
  TrendingUp,
  PlusCircle,
  Building,
  Check
} from 'lucide-react';

interface AdminDashboardPageProps {
  onBackToStudentApp: () => void;
  activeQueueLevel: QueueLevel;
  onSelectQueueLevel: (level: QueueLevel) => void;
  allOrders: DemoOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onAddNewDemoOrder?: () => void;
  menuItems: MenuItem[];
  onToggleFoodAvailability: (itemId: string, newAvailability: FoodAvailability) => void;
  selectedCanteen: CanteenLocation;
  onSelectCanteen?: (canteen: CanteenLocation) => void;
  allCanteens?: CanteenLocation[];
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onBackToStudentApp,
  activeQueueLevel,
  onSelectQueueLevel,
  allOrders,
  onUpdateOrderStatus,
  onAddNewDemoOrder,
  menuItems,
  onToggleFoodAvailability,
  selectedCanteen,
  onSelectCanteen,
  allCanteens = [],
}) => {
  const [orderFilter, setOrderFilter] = useState<'ALL' | 'Received' | 'Preparing' | 'Ready' | 'Completed'>('ALL');
  const [foodCategoryFilter, setFoodCategoryFilter] = useState<'All' | 'Snacks' | 'Meals' | 'Beverages'>('All');
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  const [statusChangeFeedback, setStatusChangeFeedback] = useState<string | null>(null);

  const currentQueueData = QUEUE_STATES[activeQueueLevel];

  // Derive counts for KPI cards:
  // Active Orders = Received + Preparing
  const activeOrdersList = allOrders.filter(
    (o) => (o.status === 'Received' || o.status === 'Order Received' || o.status === 'Preparing') && !o.isCancelled
  );
  const preparingOrdersList = allOrders.filter(
    (o) => o.status === 'Preparing' && !o.isCancelled
  );
  const readyOrdersList = allOrders.filter(
    (o) => (o.status === 'Ready' || o.status === 'Ready for Collection') && !o.isCancelled
  );
  const completedOrdersList = allOrders.filter(
    (o) => o.status === 'Completed' && !o.isCancelled
  );

  // Food availability stats:
  const availableFoodCount = menuItems.filter((m) => m.availability === 'Available').length;
  const limitedFoodCount = menuItems.filter((m) => m.availability === 'Limited').length;
  const soldOutFoodCount = menuItems.filter((m) => m.availability === 'Sold Out').length;

  // Filter orders for table display:
  const filteredOrders = allOrders.filter((order) => {
    if (orderFilter === 'ALL') return true;
    if (orderFilter === 'Received') {
      return order.status === 'Received' || order.status === 'Order Received';
    }
    if (orderFilter === 'Preparing') {
      return order.status === 'Preparing';
    }
    if (orderFilter === 'Ready') {
      return order.status === 'Ready' || order.status === 'Ready for Collection';
    }
    if (orderFilter === 'Completed') {
      return order.status === 'Completed';
    }
    return true;
  });

  // Filter food items:
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCat = foodCategoryFilter === 'All' || item.category === foodCategoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(foodSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleStatusChangeWithFeedback = (orderId: string, token: string, newStatus: OrderStatus) => {
    onUpdateOrderStatus(orderId, newStatus);
    setStatusChangeFeedback(`Order ${token} updated to "${newStatus}"`);
    setTimeout(() => {
      setStatusChangeFeedback(null);
    }, 3000);
  };

  const getNextStatus = (current: OrderStatus): OrderStatus => {
    if (current === 'Received' || current === 'Order Received') return 'Preparing';
    if (current === 'Preparing') return 'Ready';
    if (current === 'Ready' || current === 'Ready for Collection') return 'Completed';
    return 'Completed';
  };

  // Requirement 7: AI Recommended Action based on queue level
  const getAiRecommendedAction = (level: QueueLevel): string => {
    switch (level) {
      case 'LOW':
        return 'Encourage walk-ins; kitchen and counter capacity is optimal for quick order turnaround.';
      case 'MEDIUM':
        return 'Moderate rush detected. Recommend students pre-order via app to prevent physical queue buildup.';
      case 'HIGH':
        return 'Deploy backup staff to serving counter 2 and prioritize digital token pickups.';
    }
  };

  return (
    <div className="min-h-screen bg-[#070c1a] text-slate-100 font-['Poppins',sans-serif] selection:bg-cyan-500 selection:text-slate-950 pb-20">
      {/* 1. TOP ADMIN APP HEADER */}
      <header className="sticky top-0 z-40 bg-[#091124]/95 border-b border-cyan-500/30 backdrop-blur-lg shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30 font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Smart Canteen AI
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-400/40">
                    Admin Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Cafeteria Staff Control & Queue Management
                </p>
              </div>
            </div>

            {/* Back button on mobile (visible in top bar) */}
            <button
              onClick={onBackToStudentApp}
              className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Student App</span>
            </button>
          </div>

          {/* Right Header Controls: Canteen Location Switcher + Return to Student App Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {allCanteens.length > 0 && onSelectCanteen && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131d38] border border-slate-700 text-xs text-slate-300">
                <Building className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <select
                  value={selectedCanteen.id}
                  onChange={(e) => {
                    const found = allCanteens.find((c) => c.id === e.target.value);
                    if (found) onSelectCanteen(found);
                  }}
                  className="bg-transparent text-xs text-cyan-300 font-semibold focus:outline-none cursor-pointer"
                >
                  {allCanteens.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0b132b] text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Prominent Back to Student App Button (Requirement 8) */}
            <button
              id="admin-back-to-student-app-btn"
              onClick={onBackToStudentApp}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-x-0.5 cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Student App</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. DEMO / SIMULATION NOTICE BANNER (Strict Requirement) */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-300">
          <Info className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span>
            <strong>PROTOTYPE SIMULATION DATA:</strong> All queue counts, waiting times, orders, food stock statuses, and AI insights are simulated demo values for project demonstration. No live AI cameras or external payment gateways are connected.
          </span>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Status update feedback toast */}
        {statusChangeFeedback && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{statusChangeFeedback}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Synced to Student View</span>
          </div>
        )}

        {/* 3. CROWD ALERT BANNER (Requirement 6) */}
        {activeQueueLevel === 'HIGH' && (
          <div
            id="admin-crowd-alert"
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-950/90 via-red-900/60 to-[#1e0a12] border-2 border-rose-500 shadow-2xl shadow-rose-500/25 backdrop-blur-xl animate-in fade-in duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/30 border border-rose-400 flex items-center justify-center text-rose-300 flex-shrink-0 animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400 text-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                    CROWD ALERT SYSTEM
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-rose-200 font-['Poppins']">
                    ⚠️ High crowd detected. Consider managing the queue.
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-100/80 mt-1">
                    Estimated <strong>25 students waiting</strong> with <strong>~20 min wait time</strong>. Staff action: Open auxiliary pickup counter and expedite preparing orders.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onSelectQueueLevel('MEDIUM')}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  Lower to Medium
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. DASHBOARD KPIS (Requirement 2: 7 Metric Cards) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white font-['Poppins'] flex items-center gap-2">
              <span>Operational Metrics Overview</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                Real-Time Simulation
              </span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Active Canteen: <strong className="text-cyan-300">{selectedCanteen.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5 sm:gap-4">
            {/* 1. Current Queue Status */}
            <div className="p-4 rounded-2xl bg-[#121c36] border border-cyan-500/30 backdrop-blur-md shadow-lg flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Queue Status
              </span>
              <div className="my-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">
                    {activeQueueLevel === 'LOW' ? '🟢' : activeQueueLevel === 'MEDIUM' ? '🟡' : '🔴'}
                  </span>
                  <span className="text-xl font-black text-white font-['Poppins']">
                    {activeQueueLevel}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Current Density</span>
              </div>
              <div className="text-[10px] text-cyan-300 font-semibold">
                {activeQueueLevel === 'LOW' ? 'Optimal Flow' : activeQueueLevel === 'MEDIUM' ? 'Moderate' : 'Crowded'}
              </div>
            </div>

            {/* 2. People Waiting */}
            <div className="p-4 rounded-2xl bg-[#121c36] border border-slate-700/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  People Waiting
                </span>
                <Users className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl font-black text-cyan-300 font-mono">
                  {currentQueueData.peopleWaiting}
                </span>
                <span className="text-xs text-slate-400 block">students in line</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeQueueLevel === 'LOW' ? '6 mapped' : activeQueueLevel === 'MEDIUM' ? '14 mapped' : '25 mapped'}
              </span>
            </div>

            {/* 3. Estimated Wait Time */}
            <div className="p-4 rounded-2xl bg-[#121c36] border border-slate-700/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Wait Time
                </span>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl font-black text-amber-300 font-mono">
                  {currentQueueData.estimatedWaitMinutes}
                </span>
                <span className="text-xs text-slate-400 ml-1">minutes</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeQueueLevel === 'LOW' ? '5 min avg' : activeQueueLevel === 'MEDIUM' ? '10 min avg' : '20 min avg'}
              </span>
            </div>

            {/* 4. Active Orders */}
            <div className="p-4 rounded-2xl bg-[#121c36] border border-slate-700/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Active Orders
                </span>
                <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl font-black text-blue-300 font-mono">
                  {activeOrdersList.length}
                </span>
                <span className="text-xs text-slate-400 block">in pipeline</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Pending dispatch
              </span>
            </div>

            {/* 5. Preparing Orders */}
            <div className="p-4 rounded-2xl bg-[#121c36] border border-slate-700/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Preparing
                </span>
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl font-black text-amber-300 font-mono">
                  {preparingOrdersList.length}
                </span>
                <span className="text-xs text-slate-400 block">kitchen stove</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Cooking active
              </span>
            </div>

            {/* 6. Ready Orders */}
            <div className="p-4 rounded-2xl bg-[#121c36] border border-slate-700/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Ready Orders
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl font-black text-emerald-300 font-mono">
                  {readyOrdersList.length}
                </span>
                <span className="text-xs text-slate-400 block">for collection</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                Counter 1 pickup
              </span>
            </div>

            {/* 7. Food Availability */}
            <div className="p-4 rounded-2xl bg-[#121c36] border border-slate-700/80 backdrop-blur-md shadow-lg flex flex-col justify-between col-span-2 sm:col-span-1 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Food Stock
                </span>
                <Utensils className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl font-black text-purple-300 font-mono">
                  {availableFoodCount}
                </span>
                <span className="text-xs text-slate-400 block">of {menuItems.length} items</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {limitedFoodCount} lim • {soldOutFoodCount} out
              </span>
            </div>
          </div>
        </div>

        {/* 5. TWO-COLUMN OPERATIONAL CONTROLS: QUEUE MANAGEMENT & AI INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* QUEUE MANAGEMENT (Requirement 3: 7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#101933] border border-cyan-500/30 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white font-['Poppins']">
                    Queue Management Override
                  </h3>
                  <p className="text-xs text-slate-400">
                    Switch the queue density level to test and adjust student wait times in real time.
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-cyan-300 font-mono">
                Admin Control
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Select one of the three preset density stages. When clicked, people counts and estimated wait minutes update automatically across all student interfaces:
            </p>

            {/* Requirement 3 Buttons: LOW, MEDIUM, HIGH with specific mapped values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* LOW: 6 people / 5 min */}
              <button
                id="admin-queue-btn-low"
                onClick={() => onSelectQueueLevel('LOW')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                  activeQueueLevel === 'LOW'
                    ? 'bg-gradient-to-b from-emerald-950/60 to-emerald-900/30 border-emerald-400 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/40'
                    : 'bg-[#0b132b] border-slate-700/80 hover:border-emerald-500/40 text-slate-300'
                }`}
              >
                {activeQueueLevel === 'LOW' && (
                  <span className="absolute top-3 right-3 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-slate-950">
                    ACTIVE
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🟢</span>
                  <span className="font-extrabold text-white text-base">LOW</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-mono text-emerald-300 font-bold">
                    6 people / 5 min
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Optimal line, quick turnover
                  </div>
                </div>
              </button>

              {/* MEDIUM: 14 people / 10 min */}
              <button
                id="admin-queue-btn-medium"
                onClick={() => onSelectQueueLevel('MEDIUM')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                  activeQueueLevel === 'MEDIUM'
                    ? 'bg-gradient-to-b from-amber-950/60 to-amber-900/30 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-500/40'
                    : 'bg-[#0b132b] border-slate-700/80 hover:border-amber-500/40 text-slate-300'
                }`}
              >
                {activeQueueLevel === 'MEDIUM' && (
                  <span className="absolute top-3 right-3 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400 text-slate-950">
                    ACTIVE
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🟡</span>
                  <span className="font-extrabold text-white text-base">MEDIUM</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-mono text-amber-300 font-bold">
                    14 people / 10 min
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Steady line, moderate wait
                  </div>
                </div>
              </button>

              {/* HIGH: 25 people / 20 min */}
              <button
                id="admin-queue-btn-high"
                onClick={() => onSelectQueueLevel('HIGH')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                  activeQueueLevel === 'HIGH'
                    ? 'bg-gradient-to-b from-rose-950/60 to-rose-900/30 border-rose-400 shadow-lg shadow-rose-500/20 ring-2 ring-rose-500/40'
                    : 'bg-[#0b132b] border-slate-700/80 hover:border-rose-500/40 text-slate-300'
                }`}
              >
                {activeQueueLevel === 'HIGH' && (
                  <span className="absolute top-3 right-3 px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500 text-white">
                    ACTIVE
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔴</span>
                  <span className="font-extrabold text-white text-base">HIGH</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-mono text-rose-300 font-bold">
                    25 people / 20 min
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Triggers Crowd Alert
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Directly affects Student Live Queue, Waiting timers & Notification triggers</span>
              <span className="font-mono text-cyan-300">Live Sync ON</span>
            </div>
          </div>

          {/* AI INSIGHTS (Requirement 7: 5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#101933] border border-cyan-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white font-['Poppins']">
                    AI Insights & Recommendations
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  Demo AI Model
                </span>
              </div>

              {/* Requirement 7: The 4 Insights */}
              <div className="space-y-3.5">
                {/* 1. Current Queue Level */}
                <div className="p-3 rounded-xl bg-[#0b132b] border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Current Queue Level:</span>
                  <div className="flex items-center gap-2 font-mono font-bold text-sm">
                    <span>{activeQueueLevel === 'LOW' ? '🟢' : activeQueueLevel === 'MEDIUM' ? '🟡' : '🔴'}</span>
                    <span className={activeQueueLevel === 'LOW' ? 'text-emerald-300' : activeQueueLevel === 'MEDIUM' ? 'text-amber-300' : 'text-rose-300'}>
                      {activeQueueLevel} ({currentQueueData.peopleWaiting} people)
                    </span>
                  </div>
                </div>

                {/* 2. Estimated Waiting Time */}
                <div className="p-3 rounded-xl bg-[#0b132b] border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Estimated Waiting Time:</span>
                  <span className="text-sm font-mono font-bold text-cyan-300">
                    ~{currentQueueData.estimatedWaitMinutes} minutes
                  </span>
                </div>

                {/* 3. Recommended Action */}
                <div className="p-3.5 rounded-xl bg-[#0b132b] border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Recommended Action:</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    “{getAiRecommendedAction(activeQueueLevel)}”
                  </p>
                </div>

                {/* 4. Peak Hour Indicator */}
                <div className="p-3 rounded-xl bg-[#0b132b] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Peak Hour Window:</span>
                    <span className="font-mono font-bold text-amber-300">
                      {PEAK_HOURS_INFO.peakRange}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                    <span className="text-slate-400">Peak Indicator Status:</span>
                    <span className={`font-semibold ${
                      activeQueueLevel === 'HIGH'
                        ? 'text-rose-400'
                        : activeQueueLevel === 'MEDIUM'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}>
                      {activeQueueLevel === 'HIGH' ? '🔴 Lunch Rush Active' : activeQueueLevel === 'MEDIUM' ? '🟡 Recess Congestion' : '🟢 Off-Peak Flow'}
                    </span>
                  </div>
                </div>

                {/* 5. 15-Minute Queue Prediction (Simulation) */}
                <div className="p-3 rounded-xl bg-[#0b132b] border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Predicted in 15 Min:</span>
                    <span className="text-[10px] text-slate-300">AI Simulation Model</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold text-sm ${
                      activeQueueLevel === 'LOW' ? 'text-amber-300' : 'text-rose-400'
                    }`}>
                      {activeQueueLevel === 'LOW'
                        ? 'MEDIUM (~10m wait)'
                        : activeQueueLevel === 'MEDIUM'
                        ? 'HIGH (~20m wait)'
                        : 'HIGH (~25m wait)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Insights generated using simulated queue density heuristics</span>
              <span className="text-cyan-400 font-mono">Demo AI</span>
            </div>
          </div>
        </div>

        {/* 6. ORDER MANAGEMENT (Requirement 4: Table/Card View with Status Changes) */}
        <div id="admin-order-management" className="p-6 rounded-3xl bg-[#101933] border border-cyan-500/30 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Poppins']">
                  Order Management & Kitchen Dispatch
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Review live demo tokens and change status: <strong>Received → Preparing → Ready → Completed</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Order Status Filters */}
              <div className="flex items-center bg-[#070c1c] p-1 rounded-xl border border-slate-800 text-xs">
                {(['ALL', 'Received', 'Preparing', 'Ready', 'Completed'] as const).map((filterVal) => (
                  <button
                    key={filterVal}
                    onClick={() => setOrderFilter(filterVal)}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                      orderFilter === filterVal
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filterVal}
                  </button>
                ))}
              </div>

              {/* Add Demo Order Button */}
              {onAddNewDemoOrder && (
                <button
                  id="admin-add-demo-order-btn"
                  onClick={onAddNewDemoOrder}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Simulate a new incoming student order token"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-purple-300" />
                  <span>Add Demo Order</span>
                </button>
              )}
            </div>
          </div>

          {/* Orders Desktop Table / Mobile Card Layout */}
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-slate-400 border border-dashed border-slate-800 rounded-2xl">
              <Ticket className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">No orders found matching “{orderFilter}”.</p>
              <p className="text-xs text-slate-400 mt-1">Select “ALL” or click “Add Demo Order” to test order transitions.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Desktop Table View */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                    <th className="py-3 px-3">Token #</th>
                    <th className="py-3 px-3">Food Item(s)</th>
                    <th className="py-3 px-3">Quantity</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Current Status</th>
                    <th className="py-3 px-3 text-right">Change Status (Admin Action)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredOrders.map((order) => {
                    const totalQty = order.items.reduce((acc, it) => acc + it.quantity, 0);
                    const isOrderReady = order.status === 'Ready' || order.status === 'Ready for Collection';
                    const isOrderPreparing = order.status === 'Preparing';
                    const isOrderReceived = order.status === 'Received' || order.status === 'Order Received';
                    const isOrderCompleted = order.status === 'Completed';

                    return (
                      <tr
                        key={order.id}
                        id={`admin-order-row-${order.id}`}
                        className="hover:bg-[#131e3d]/50 transition-colors"
                      >
                        {/* 1. Token Number */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm text-cyan-400">
                              #{order.tokenNumber}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {order.placedAt} • {order.canteenName}
                          </span>
                        </td>

                        {/* 2. Food Item */}
                        <td className="py-3.5 px-3">
                          <div className="font-medium text-slate-200">
                            {order.items.map((it, idx) => (
                              <span key={idx}>
                                {it.item.name}
                                {idx < order.items.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {order.items.length} distinct item{order.items.length > 1 ? 's' : ''}
                          </span>
                        </td>

                        {/* 3. Quantity */}
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-300">
                          {totalQty} items
                        </td>

                        {/* 4. Total Amount */}
                        <td className="py-3.5 px-3 font-mono font-bold text-white">
                          ₹{order.totalAmount}
                        </td>

                        {/* 5. Status Badge */}
                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                              isOrderReceived
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                : isOrderPreparing
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : isOrderReady
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isOrderReceived ? 'bg-blue-400' : isOrderPreparing ? 'bg-amber-400' : isOrderReady ? 'bg-emerald-400' : 'bg-slate-500'
                            }`} />
                            {order.status}
                          </span>
                        </td>

                        {/* 6. Admin Change Status Buttons (Requirement 4) */}
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            {(['Received', 'Preparing', 'Ready', 'Completed'] as OrderStatus[]).map((st) => {
                              const isActive =
                                (st === 'Received' && isOrderReceived) ||
                                (st === 'Preparing' && isOrderPreparing) ||
                                (st === 'Ready' && isOrderReady) ||
                                (st === 'Completed' && isOrderCompleted);

                              return (
                                <button
                                  key={st}
                                  id={`admin-order-${order.id}-set-${st.toLowerCase()}`}
                                  onClick={() => handleStatusChangeWithFeedback(order.id, order.tokenNumber, st)}
                                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                    isActive
                                      ? st === 'Received'
                                        ? 'bg-blue-500 text-white shadow'
                                        : st === 'Preparing'
                                        ? 'bg-amber-400 text-slate-950 shadow'
                                        : st === 'Ready'
                                        ? 'bg-emerald-500 text-slate-950 shadow'
                                        : 'bg-slate-700 text-white'
                                      : 'bg-[#0b132b] text-slate-400 hover:text-white border border-slate-800 hover:border-cyan-500/40'
                                  }`}
                                  title={`Change status to ${st}`}
                                >
                                  {st}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Setting status to <strong>Ready</strong> sends the student notification alert: <em>“🔔 Your order is ready for collection!”</em></span>
            <span className="text-cyan-400 font-mono">Demo Kitchen Sync</span>
          </div>
        </div>

        {/* 7. FOOD MANAGEMENT (Requirement 5: Available / Limited / Sold Out) */}
        <div id="admin-food-management" className="p-6 rounded-3xl bg-[#101933] border border-cyan-500/30 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Poppins']">
                  Food Inventory & Stock Management
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle item stock status: <strong>Available</strong>, <strong>Limited</strong>, or <strong>Sold Out</strong>. Changes immediately update the student menu.
              </p>
            </div>

            {/* Category Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-[#070c1c] p-1 rounded-xl border border-slate-800 text-xs">
                {(['All', 'Snacks', 'Meals', 'Beverages'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFoodCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                      foodCategoryFilter === cat
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={foodSearchQuery}
                  onChange={(e) => setFoodSearchQuery(e.target.value)}
                  placeholder="Search food item..."
                  className="pl-8 pr-3 py-1.5 bg-[#070c1c] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-36 sm:w-44"
                />
              </div>
            </div>
          </div>

          {/* Food Items Stock Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredMenuItems.map((item) => {
              return (
                <div
                  key={item.id}
                  id={`admin-food-item-${item.id}`}
                  className="p-4 rounded-2xl bg-[#0b132b] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                        ₹{item.price} • {item.category} • Prep: {item.prepTime}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      item.availability === 'Available'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : item.availability === 'Limited'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}>
                      {item.availability}
                    </span>
                  </div>

                  {/* Stock Buttons (Requirement 5) */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block mb-1.5 uppercase font-semibold">
                      Change Availability:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['Available', 'Limited', 'Sold Out'] as FoodAvailability[]).map((avail) => {
                        const isCurrent = item.availability === avail;
                        return (
                          <button
                            key={avail}
                            id={`admin-stock-btn-${item.id}-${avail.toLowerCase().replace(' ', '-')}`}
                            onClick={() => onToggleFoodAvailability(item.id, avail)}
                            className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                              isCurrent
                                ? avail === 'Available'
                                  ? 'bg-emerald-500 text-slate-950 shadow'
                                  : avail === 'Limited'
                                  ? 'bg-amber-400 text-slate-950 shadow'
                                  : 'bg-rose-500 text-white shadow'
                                : 'bg-[#141f3d] text-slate-400 hover:text-white border border-slate-700/80 hover:border-slate-500'
                            }`}
                          >
                            <span>
                              {avail === 'Available' && '🟢 Avail'}
                              {avail === 'Limited' && '🟡 Limit'}
                              {avail === 'Sold Out' && '🔴 Out'}
                            </span>
                            {isCurrent && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Items marked <strong>Sold Out</strong> disable the student *Add to Cart* action immediately.</span>
            <span className="text-cyan-400 font-mono">Stock Sync Enabled</span>
          </div>
        </div>

        {/* 8. BOTTOM ACTION: RETURN TO STUDENT APP BANNER (Requirement 8) */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#101933] to-blue-950/40 border border-cyan-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white font-['Poppins'] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Finished administrative review?</span>
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              All queue levels, token statuses, and food stock changes are live. Return to the student app to inspect user experience.
            </p>
          </div>

          <button
            id="admin-bottom-back-to-student-btn"
            onClick={onBackToStudentApp}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student App</span>
          </button>
        </div>
      </main>
    </div>
  );
};
