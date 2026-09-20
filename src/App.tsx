import React, { useState, useEffect, useRef } from 'react';
import { QueueLevel, CartItem, MenuItem, DemoOrder, NotificationAlert, CanteenLocation, OrderStatus, FoodAvailability } from './types';
import { QUEUE_STATES, CANTEEN_LIST, SAMPLE_FOOD_MENU, INITIAL_NOTIFICATIONS, INITIAL_ORDER_HISTORY, INITIAL_DEMO_ORDERS } from './data/canteenData';

// Navigation & Hero
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';

// Prototype Additions
import { SearchCanteenSection } from './components/SearchCanteenSection';
import { LiveQueueDashboard } from './components/LiveQueueDashboard';
import { AiQueuePredictionSection } from './components/AiQueuePredictionSection';
import { QueueTrendSection } from './components/QueueTrendSection';
import { FoodOrderQueueFlowDiagram } from './components/FoodOrderQueueFlowDiagram';
import { FoodMenuSection } from './components/FoodMenuSection';
import { MyOrderSection } from './components/MyOrderSection';
import { OrderHistorySection } from './components/OrderHistorySection';
import { AdminDashboardSection } from './components/AdminDashboardSection';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { AdminLoginModal } from './components/AdminLoginModal';
import { CanteenRatingSection } from './components/CanteenRatingSection';

// Existing Retained Sections (Mandatory to keep)
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { QueueVisualization } from './components/QueueVisualization';
import { AiAnalysisSection } from './components/AiAnalysisSection';
import { StudentAppMockup } from './components/StudentAppMockup';
import { UserBenefitsSection } from './components/UserBenefitsSection';
import { UserFlowSection } from './components/UserFlowSection';
import { PrivacyLimitationsSection } from './components/PrivacyLimitationsSection';
import { FutureScopeSection } from './components/FutureScopeSection';
import { AboutProjectSection } from './components/AboutProjectSection';
import { Footer } from './components/Footer';

// Modals & Overlays
import { FoodOrderingCartModal } from './components/FoodOrderingCartModal';
import { CanteenLocationModal } from './components/CanteenLocationModal';
import { NotificationAlertToast } from './components/NotificationAlertToast';

export default function App() {
  // 1. Centralized interactive queue state: 'LOW' | 'MEDIUM' | 'HIGH'
  const [activeQueueLevel, setActiveQueueLevel] = useState<QueueLevel>('LOW');

  // 2. Multi-canteen selection state
  const [canteens, setCanteens] = useState<CanteenLocation[]>(CANTEEN_LIST);
  const [selectedCanteen, setSelectedCanteen] = useState<CanteenLocation>(CANTEEN_LIST[0]);

  // 3. Location Modal state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  // 4. Menu Items with live Availability state (Requirement 1 & 6)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(SAMPLE_FOOD_MENU);

  // 5. Food Ordering & Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { item: SAMPLE_FOOD_MENU[0], quantity: 1 }, // Veg Pizza - ₹50
    { item: SAMPLE_FOOD_MENU[2], quantity: 2 }, // Samosa - ₹15 x 2
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Active placed order seeded for immediate review
  const [activeOrder, setActiveOrder] = useState<DemoOrder | null>({
    id: 'ord-101',
    tokenNumber: 'A105',
    canteenName: 'Main Canteen',
    items: [
      { item: SAMPLE_FOOD_MENU[0], quantity: 1 },
      { item: SAMPLE_FOOD_MENU[2], quantity: 2 },
    ],
    totalAmount: 80,
    status: 'Preparing',
    estimatedMinutes: 6,
    placedAt: '12:42 PM',
  });

  // 6. Order History State (Requirement 4)
  const [orderHistory, setOrderHistory] = useState<DemoOrder[]>(INITIAL_ORDER_HISTORY);

  // 7. Full Demo Orders Pipeline for Admin Kitchen Management (Requirement 4)
  const [allDemoOrders, setAllDemoOrders] = useState<DemoOrder[]>(INITIAL_DEMO_ORDERS);

  // 8. View Routing: 'student' (Default) | 'admin' (Dedicated Admin Dashboard Page)
  const [currentView, setCurrentView] = useState<'student' | 'admin'>('student');
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);

  // 9. Notifications state
  const [notifications, setNotifications] = useState<NotificationAlert[]>(INITIAL_NOTIFICATIONS);
  const [activeToast, setActiveToast] = useState<NotificationAlert | null>(null);

  // 10. Auto Refresh state
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(false);
  const prevQueueRef = useRef<QueueLevel>(activeQueueLevel);

  // Smooth scroll helper
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sync selected canteen queue state when canteen changes
  const handleSelectCanteen = (canteen: CanteenLocation) => {
    setSelectedCanteen(canteen);
    setActiveQueueLevel(canteen.currentLevel);
  };

  // Sync queue state change to active canteen
  const handleQueueLevelChange = (level: QueueLevel) => {
    setActiveQueueLevel(level);
    setSelectedCanteen((prev) => ({ ...prev, currentLevel: level }));
    setCanteens((prev) =>
      prev.map((c) => (c.id === selectedCanteen.id ? { ...c, currentLevel: level } : c))
    );
  };

  // Auto Refresh timer
  useEffect(() => {
    if (!isAutoRefresh) return;

    const cycle: QueueLevel[] = ['LOW', 'MEDIUM', 'HIGH'];
    const timer = setInterval(() => {
      setActiveQueueLevel((current) => {
        const nextIdx = (cycle.indexOf(current) + 1) % cycle.length;
        const nextLevel = cycle[nextIdx];
        setSelectedCanteen((prev) => ({ ...prev, currentLevel: nextLevel }));
        setCanteens((prevList) =>
          prevList.map((c) => (c.id === selectedCanteen.id ? { ...c, currentLevel: nextLevel } : c))
        );
        return nextLevel;
      });
    }, 7000);

    return () => clearInterval(timer);
  }, [isAutoRefresh, selectedCanteen.id]);

  // Trigger LOW Queue Notification or Crowd Alert on HIGH (Requirements 1 & 5)
  useEffect(() => {
    if (activeQueueLevel === 'LOW' && prevQueueRef.current !== 'LOW') {
      triggerLowQueueAlert();
    } else if (activeQueueLevel === 'HIGH' && prevQueueRef.current !== 'HIGH') {
      triggerCrowdAlert();
    }
    prevQueueRef.current = activeQueueLevel;
  }, [activeQueueLevel]);

  const triggerLowQueueAlert = () => {
    const alertId = `notif-${Date.now()}`;
    const newAlert: NotificationAlert = {
      id: alertId,
      type: 'low_queue',
      title: 'Queue Alert 🔔',
      message: 'Queue is less crowded now. Good time to visit!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setNotifications((prev) => [newAlert, ...prev]);
    setActiveToast(newAlert);
  };

  // Requirement 5: Crowd Alert when queue is HIGH
  const triggerCrowdAlert = () => {
    const alertId = `notif-${Date.now()}`;
    const newAlert: NotificationAlert = {
      id: alertId,
      type: 'peak_alert',
      title: 'Crowd Alert ⚠️',
      message: '⚠️ Canteen is crowded. Consider visiting later.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setNotifications((prev) => [newAlert, ...prev]);
    setActiveToast(newAlert);
  };

  // Food Availability Handler (Requirement 1 & 6)
  const handleToggleFoodAvailability = (itemId: string, newAvailability: FoodAvailability) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, availability: newAvailability } : item))
    );
  };

  // Cart Handlers
  const handleAddToCart = (item: MenuItem) => {
    if (item.availability === 'Sold Out') return;
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Place Order -> Generate Digital Token
  const handlePlaceOrder = (canteen: CanteenLocation): DemoOrder => {
    const prefix = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
    const num = Math.floor(100 + Math.random() * 900);
    const token = `${prefix}${num}`;

    const total = cartItems.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);

    const newOrder: DemoOrder = {
      id: `ord-${Date.now()}`,
      tokenNumber: token,
      canteenName: canteen.name,
      items: [...cartItems],
      totalAmount: total,
      status: 'Order Received',
      estimatedMinutes: activeQueueLevel === 'HIGH' ? 12 : activeQueueLevel === 'MEDIUM' ? 7 : 4,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveOrder(newOrder);
    setCartItems([]);

    // Add to history too
    setOrderHistory((prev) => [newOrder, ...prev]);

    // Add to admin demo orders pipeline
    setAllDemoOrders((prev) => [newOrder, ...prev]);

    // Add notification about token
    const tokenNotif: NotificationAlert = {
      id: `notif-${Date.now()}`,
      type: 'order_update',
      title: 'Digital Token Generated 🎟️',
      message: `Your Order Token is ${token}. Estimated prep time: ${newOrder.estimatedMinutes} mins.`,
      timestamp: newOrder.placedAt,
      read: false,
    };
    setNotifications((prev) => [tokenNotif, ...prev]);
    setActiveToast(tokenNotif);

    return newOrder;
  };

  // Advance Order Status (Requirements 2 & 3)
  const handleAdvanceOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    // Update in allDemoOrders
    setAllDemoOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );

    if (activeOrder && activeOrder.id === orderId) {
      const isReady = nextStatus === 'Ready' || nextStatus === 'Ready for Collection';
      const updatedOrder: DemoOrder = {
        ...activeOrder,
        status: nextStatus,
        estimatedMinutes: isReady || nextStatus === 'Completed' ? 0 : Math.max(1, activeOrder.estimatedMinutes - 3),
        completedAt: (isReady || nextStatus === 'Completed')
          ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : activeOrder.completedAt,
      };
      setActiveOrder(updatedOrder);

      // Also sync into history
      setOrderHistory((prev) =>
        prev.map((o) => (o.id === orderId ? updatedOrder : o))
      );

      // Trigger notification (Requirement 3: "🔔 Your order is ready for collection!")
      const statusNotif: NotificationAlert = {
        id: `notif-${Date.now()}`,
        type: 'order_update',
        title: isReady ? 'Order Ready 🔔' : `Order Update: ${nextStatus} 🍔`,
        message: isReady
          ? '🔔 Your order is ready for collection!'
          : `Kitchen is now preparing your food token ${updatedOrder.tokenNumber}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setNotifications((prev) => [statusNotif, ...prev]);
      setActiveToast(statusNotif);
    }
  };

  // Admin Order Management Handler (Requirement 4)
  const handleAdminUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const isReady = newStatus === 'Ready' || newStatus === 'Ready for Collection';
    const isCompleted = newStatus === 'Completed';

    setAllDemoOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            estimatedMinutes: isReady || isCompleted ? 0 : ord.estimatedMinutes,
            completedAt: (isReady || isCompleted)
              ? (ord.completedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
              : ord.completedAt,
          };
        }
        return ord;
      })
    );

    // If it matches student's active order, sync it
    if (activeOrder && activeOrder.id === orderId) {
      const updatedActive: DemoOrder = {
        ...activeOrder,
        status: newStatus,
        estimatedMinutes: isReady || isCompleted ? 0 : activeOrder.estimatedMinutes,
        completedAt: (isReady || isCompleted)
          ? (activeOrder.completedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
          : activeOrder.completedAt,
      };
      setActiveOrder(updatedActive);

      setOrderHistory((prev) =>
        prev.map((o) => (o.id === orderId ? updatedActive : o))
      );
    }

    // When status becomes Ready, trigger notification (Requirement 3: "🔔 Your order is ready for collection!")
    if (isReady) {
      const readyNotif: NotificationAlert = {
        id: `notif-${Date.now()}`,
        type: 'order_update',
        title: 'Order Ready for Collection! 🔔',
        message: '🔔 Your order is ready for collection!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setNotifications((prev) => [readyNotif, ...prev]);
      setActiveToast(readyNotif);
    }
  };

  // Add a new simulated order in Admin view
  const handleAdminAddDemoOrder = () => {
    const prefixes = ['A', 'B', 'C', 'D'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(120 + Math.random() * 80);
    const token = `${prefix}${num}`;
    const item1 = menuItems[0] || SAMPLE_FOOD_MENU[0];
    const item2 = menuItems[2] || SAMPLE_FOOD_MENU[2];

    const newDemoOrder: DemoOrder = {
      id: `ord-${Date.now()}`,
      tokenNumber: token,
      canteenName: selectedCanteen.name,
      items: [
        { item: item1, quantity: 1 },
        { item: item2, quantity: 2 },
      ],
      totalAmount: item1.price + item2.price * 2,
      status: 'Received',
      estimatedMinutes: activeQueueLevel === 'HIGH' ? 12 : activeQueueLevel === 'MEDIUM' ? 7 : 4,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAllDemoOrders((prev) => [newDemoOrder, ...prev]);
  };

  // Cancel Order Handler
  const handleCancelOrder = () => {
    const cancelledToken = activeOrder?.tokenNumber;
    if (activeOrder) {
      const cancelledOrder: DemoOrder = {
        ...activeOrder,
        isCancelled: true,
        completedAt: 'Cancelled',
      };
      setOrderHistory((prev) => [cancelledOrder, ...prev.filter((o) => o.id !== activeOrder.id)]);
      setAllDemoOrders((prev) => prev.filter((o) => o.id !== activeOrder.id));
    }
    setActiveOrder(null);

    // Feedback Alert & Toast: “Order Cancelled Successfully”
    const cancelNotif: NotificationAlert = {
      id: `notif-${Date.now()}`,
      type: 'order_update',
      title: 'Order Cancelled Successfully',
      message: cancelledToken
        ? `Token ${cancelledToken} was cancelled. You can now place a new demo order.`
        : 'Order Cancelled Successfully. You can now place a new order.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setNotifications((prev) => [cancelNotif, ...prev]);
    setActiveToast(cancelNotif);
  };

  // Reorder from history (Requirement 4)
  const handleReorder = (items: CartItem[]) => {
    items.forEach((it) => {
      // Find updated item from menu to check availability
      const currentMenuItem = menuItems.find((m) => m.id === it.item.id) || it.item;
      if (currentMenuItem.availability !== 'Sold Out') {
        for (let i = 0; i < it.quantity; i++) {
          handleAddToCart(currentMenuItem);
        }
      }
    });
    setIsCartOpen(true);
  };

  // Notification management
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  const currentStatusData = QUEUE_STATES[activeQueueLevel];

  // 11. DEDICATED SEPARATE ADMIN DASHBOARD PAGE VIEW
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#070c1a] text-slate-100 font-['Poppins',sans-serif]">
        <AdminDashboardPage
          onBackToStudentApp={() => setCurrentView('student')}
          activeQueueLevel={activeQueueLevel}
          onSelectQueueLevel={handleQueueLevelChange}
          allOrders={allDemoOrders}
          onUpdateOrderStatus={handleAdminUpdateOrderStatus}
          onAddNewDemoOrder={handleAdminAddDemoOrder}
          menuItems={menuItems}
          onToggleFoodAvailability={handleToggleFoodAvailability}
          selectedCanteen={selectedCanteen}
          onSelectCanteen={handleSelectCanteen}
          allCanteens={canteens}
        />

        {/* Floating Notification Toast */}
        <NotificationAlertToast
          toast={activeToast}
          onDismiss={() => setActiveToast(null)}
          onViewQueue={() => setCurrentView('student')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b132b] text-slate-100 font-['Poppins',sans-serif] selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. HEADER / NAVIGATION */}
      <Navbar
        onScrollTo={handleScrollTo}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onClearNotifications={handleClearNotifications}
        onTriggerDemoLowQueueAlert={triggerLowQueueAlert}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdminDashboard={() => setIsAdminLoginModalOpen(true)}
      />

      {/* Floating Notification Toast */}
      <NotificationAlertToast
        toast={activeToast}
        onDismiss={() => setActiveToast(null)}
        onViewQueue={() => {
          setActiveToast(null);
          handleScrollTo('live-queue');
        }}
      />

      <main>
        {/* 2. HERO SECTION */}
        <HeroSection
          currentStatus={currentStatusData}
          activeLevel={activeQueueLevel}
          onScrollTo={handleScrollTo}
          onSelectLevel={handleQueueLevelChange}
        />

        {/* 3. MULTI-CANTEEN SEARCH & SELECTOR */}
        <SearchCanteenSection
          selectedCanteen={selectedCanteen}
          onSelectCanteen={handleSelectCanteen}
          activeQueueLevel={activeQueueLevel}
          onSyncLevelToCanteen={handleQueueLevelChange}
        />

        {/* 4. LIVE QUEUE DASHBOARD (with Crowd Alert, Smart Recommendation, Auto Refresh, Peak Hours) */}
        <LiveQueueDashboard
          activeLevel={activeQueueLevel}
          onSelectLevel={handleQueueLevelChange}
          isAutoRefresh={isAutoRefresh}
          onToggleAutoRefresh={() => setIsAutoRefresh(!isAutoRefresh)}
          onExploreMenu={() => handleScrollTo('food-menu')}
          menuItems={menuItems}
          activeOrder={activeOrder}
        />

        {/* 5. AI QUEUE PREDICTION (15-Minute Forecast & Visual Graph) */}
        <AiQueuePredictionSection
          currentQueueLevel={activeQueueLevel}
          onSelectQueueLevel={handleQueueLevelChange}
          selectedCanteen={selectedCanteen}
        />

        {/* 6. QUEUE TREND OVER TIME */}
        <QueueTrendSection onSelectLevel={handleQueueLevelChange} />

        {/* 6. FOOD ORDER + QUEUE CONNECTION FLOW */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <FoodOrderQueueFlowDiagram
            onCheckQueue={() => handleScrollTo('live-queue')}
            onChooseFood={() => handleScrollTo('food-menu')}
            onViewOrder={() => handleScrollTo('my-order')}
          />
        </div>

        {/* 7. CAMPUS FOOD MENU (with Availability Badges & Selector) */}
        <FoodMenuSection
          menuItems={menuItems}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
          selectedCanteen={selectedCanteen}
          onToggleAvailability={handleToggleFoodAvailability}
        />

        {/* 8. MY ORDER & ORDER PREPARATION TRACKER (Smooth Animation & Ready Alert) */}
        <MyOrderSection
          order={activeOrder}
          onAdvanceStatus={handleAdvanceOrderStatus}
          onExploreMenu={() => handleScrollTo('food-menu')}
          onCancelOrder={handleCancelOrder}
        />

        {/* 9. ORDER HISTORY (Requirement 4) */}
        <OrderHistorySection
          orderHistory={orderHistory}
          onReorder={handleReorder}
          onExploreMenu={() => handleScrollTo('food-menu')}
        />

        {/* 10. ADMIN DASHBOARD VIEW (Requirement 6) */}
        <AdminDashboardSection
          activeQueueLevel={activeQueueLevel}
          onSelectQueueLevel={handleQueueLevelChange}
          activeOrder={activeOrder}
          orderHistory={orderHistory}
          menuItems={menuItems}
          onToggleFoodAvailability={handleToggleFoodAvailability}
          onAdvanceActiveOrderStatus={(orderId) => {
            if (activeOrder) {
              const next =
                activeOrder.status === 'Order Received'
                  ? 'Preparing'
                  : 'Ready for Collection';
              handleAdvanceOrderStatus(orderId, next);
            }
          }}
          selectedCanteen={selectedCanteen}
          onOpenFullScreenAdmin={() => setCurrentView('admin')}
        />

        {/* 11. CANTEEN & QUEUE RATING */}
        <CanteenRatingSection />

        {/* 12. PROBLEM SECTION (Intact) */}
        <ProblemSection />

        {/* 13. AI SOLUTION SECTION (Intact) */}
        <SolutionSection />

        {/* 14. QUEUE VISUALIZATION (Intact) */}
        <QueueVisualization
          activeLevel={activeQueueLevel}
          onSelectLevel={handleQueueLevelChange}
        />

        {/* 15. AI ANALYSIS (Intact) */}
        <AiAnalysisSection />

        {/* 16. STUDENT APP MOCKUP (Intact) */}
        <StudentAppMockup
          activeLevel={activeQueueLevel}
          onSelectLevel={handleQueueLevelChange}
          onScrollTo={handleScrollTo}
        />

        {/* 17. USER BENEFITS (Intact) */}
        <UserBenefitsSection />

        {/* 18. USER FLOW (Intact) */}
        <UserFlowSection />

        {/* 19. PRIVACY & LIMITATIONS - RESPONSIBLE AI (Intact) */}
        <PrivacyLimitationsSection />

        {/* 20. FUTURE SCOPE (Intact) */}
        <FutureScopeSection />

        {/* 21. ABOUT THE PROJECT (Intact) */}
        <AboutProjectSection />
      </main>

      {/* 22. FOOTER */}
      <Footer onScrollTo={handleScrollTo} />

      {/* MODALS */}
      {/* Admin Login / Direct View Access Modal (Requirement 1) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginModalOpen(false);
          setCurrentView('admin');
        }}
      />

      {/* Food Ordering Cart & Checkout Drawer */}
      <FoodOrderingCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        selectedCanteen={selectedCanteen}
        onViewMyOrder={() => {
          setIsCartOpen(false);
          handleScrollTo('my-order');
        }}
        lastPlacedOrder={activeOrder}
        onCancelOrder={handleCancelOrder}
      />

      {/* Canteen Location Schematic Modal */}
      <CanteenLocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedCanteen={selectedCanteen}
        allCanteens={canteens}
        onSelectCanteen={(c) => {
          handleSelectCanteen(c);
          setIsLocationModalOpen(false);
        }}
      />
    </div>
  );
}
