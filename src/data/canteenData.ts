import {
  QueueLevel,
  QueueStatusData,
  ProblemCardItem,
  AiWorkCardItem,
  BenefitItem,
  FutureScopeItem,
  CanteenLocation,
  MenuItem,
  QueueTrendPoint,
  NotificationAlert,
  DemoOrder,
  AiQueuePredictionScenario,
  PredictionGraphPoint
} from '../types';

export const QUEUE_STATES: Record<QueueLevel, QueueStatusData> = {
  LOW: {
    level: 'LOW',
    label: 'Low Queue',
    peopleWaiting: 6,
    estimatedWaitMinutes: 5,
    color: 'emerald',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderColor: 'border-emerald-500/40',
    glowColor: 'shadow-emerald-500/20',
    dotColor: 'bg-emerald-400',
    recommendation: 'Good time to visit the canteen.',
    appNotification: 'Queue is currently less crowded.',
    crowdLevelText: 'Available & Quick Service'
  },
  MEDIUM: {
    level: 'MEDIUM',
    label: 'Medium Queue',
    peopleWaiting: 14,
    estimatedWaitMinutes: 10,
    color: 'amber',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    borderColor: 'border-amber-500/40',
    glowColor: 'shadow-amber-500/20',
    dotColor: 'bg-amber-400',
    recommendation: 'Moderate crowd; expected wait time is around 10 minutes.',
    appNotification: 'Queue is filling up for lunch break.',
    crowdLevelText: 'Moderate Traffic'
  },
  HIGH: {
    level: 'HIGH',
    label: 'High Queue',
    peopleWaiting: 25,
    estimatedWaitMinutes: 20,
    color: 'rose',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    borderColor: 'border-rose-500/40',
    glowColor: 'shadow-rose-500/20',
    dotColor: 'bg-rose-400',
    recommendation: 'Peak crowd. Consider visiting after 15-20 minutes.',
    appNotification: 'Heavy queue alert: Long wait times at counters.',
    crowdLevelText: 'High Peak Crowd'
  }
};

export const PROBLEM_CARDS: ProblemCardItem[] = [
  {
    id: 'prob-1',
    icon: 'Hourglass',
    title: 'Long Waiting Time',
    description: 'Students spend a large portion of their short 15-to-30 minute class break standing in long, stagnant queues.'
  },
  {
    id: 'prob-2',
    icon: 'Users',
    title: 'Crowding',
    description: 'Rush hour clustering near order counters causes physical congestion, confusion, and difficulty reaching the food pickup point.'
  },
  {
    id: 'prob-3',
    icon: 'HelpCircle',
    title: 'Unknown Waiting Time',
    description: 'Students have no way to estimate how long a queue will take before physically walking all the way to the canteen.'
  },
  {
    id: 'prob-4',
    icon: 'SmartphoneOff',
    title: 'No Real-Time Queue Information',
    description: 'Absence of digital visibility leaves campus learners guessing whether the cafeteria is empty or packed.'
  }
];

export const AI_SOLUTION_PIPELINE = [
  { step: '01', title: 'Camera / Sensor', desc: 'Ceiling-mounted overhead camera captures counter queue area', icon: 'Camera' },
  { step: '02', title: 'AI Computer Vision', desc: 'Processes real-time video frames filtering out background objects', icon: 'Eye' },
  { step: '03', title: 'People Detection', desc: 'Detects individuals specifically standing in the queue zone', icon: 'ScanFace' },
  { step: '04', title: 'Queue Analysis', desc: 'Computes current head count and line density algorithmically', icon: 'TrendingUp' },
  { step: '05', title: 'Waiting Time Estimation', desc: 'Calculates predicted minutes based on service rate per person', icon: 'Clock' },
  { step: '06', title: 'Student App / Display', desc: 'Broadcasts instant queue status to campus mobile screens', icon: 'Smartphone' }
];

export const AI_WORK_CARDS: AiWorkCardItem[] = [
  {
    id: 'ai-1',
    title: 'COMPUTER VISION',
    description: 'Only detect people standing in the canteen queue.',
    clarification: 'Detects people and vehicles? No. The computer vision model ignores general tables, chairs, and unrelated surroundings.',
    icon: 'Cpu'
  },
  {
    id: 'ai-2',
    title: 'QUEUE DETECTION',
    description: 'Analyses the exact number of people standing in the designated queue polygon.',
    clarification: 'Separates students in active queue lines from bystanders walking past the canteen corridor.',
    icon: 'Users'
  },
  {
    id: 'ai-3',
    title: 'WAITING TIME ESTIMATION',
    description: 'Estimates waiting time based on queue length and live counter service conditions.',
    clarification: 'Calculates dynamic wait times by multiplying person count with average service transaction rate.',
    icon: 'Clock'
  },
  {
    id: 'ai-4',
    title: 'PATTERN LEARNING',
    description: 'Can learn busy and less-busy periods from historical queue data over academic semesters.',
    clarification: 'Helps identify recurring peak hours across lecture break schedules and practical sessions.',
    icon: 'LineChart'
  }
];

export const USER_BENEFITS: BenefitItem[] = [
  {
    id: 'ben-1',
    icon: 'Clock',
    title: 'Save Break Time',
    description: 'Spend break time resting or reviewing notes instead of waiting in endless lines.'
  },
  {
    id: 'ben-2',
    icon: 'Users2',
    title: 'Reduce Crowd Confusion',
    description: 'Minimizes chaotic clusters and disordered crowding around food delivery counters.'
  },
  {
    id: 'ben-3',
    icon: 'Smartphone',
    title: 'Get Real-Time Information',
    description: 'Instant remote visibility from lecture halls, labs, or library before walking to canteen.'
  },
  {
    id: 'ben-4',
    icon: 'Bell',
    title: 'Receive Queue Alerts',
    description: 'Get notified when the canteen reaches "LOW QUEUE" status for optimal visit timing.'
  },
  {
    id: 'ben-5',
    icon: 'UtensilsCrossed',
    title: 'Improve Canteen Experience',
    description: 'Fosters a relaxed, organized campus environment with predictable meal pickups.'
  },
  {
    id: 'ben-6',
    icon: 'ChefHat',
    title: 'Help Canteen Staff Manage Crowds',
    description: 'Provides kitchen cooks and billing personnel advance insight into oncoming rushes.'
  }
];

export const USER_FLOW_STEPS = [
  { step: 1, title: 'Student Opens App', desc: 'Launches Smart Canteen portal on phone or campus kiosk', icon: 'Smartphone' },
  { step: 2, title: 'Checks Live Queue', desc: 'Inspects real-time queue status (Low, Medium, or High)', icon: 'Activity' },
  { step: 3, title: 'Sees Waiting Time', desc: 'Views estimated minutes needed before receiving order', icon: 'Clock' },
  { step: 4, title: 'Decides When to Visit', desc: 'Chooses the optimal moment to visit during the break', icon: 'CheckCircle2' },
  { step: 5, title: 'Less Unnecessary Waiting', desc: 'Collects meal promptly with minimal waiting duration', icon: 'Sparkles' }
];

export const PRIVACY_AND_LIMITATIONS = {
  privacy: 'The system should focus on queue counting and should not identify individual students. No facial recognition, personal biometric data, or student identity records are saved or processed.',
  limitations: [
    { title: 'Camera visibility', desc: 'Obstructed viewpoints, counter pillars, or glare can occasionally block camera perspective.' },
    { title: 'People detection accuracy', desc: 'Crowds overlapping or carrying large backpacks can slightly alter bounding box counts.' },
    { title: 'Network connectivity', desc: 'Campus Wi-Fi latency or dropped packets can cause minor delays in live status synchronization.' },
    { title: 'Crowded queue conditions', desc: 'Disorganized clusters without clear linear queues make precise queue-line isolation challenging.' },
    { title: 'Waiting-time estimation may vary', desc: 'Individual ordering times differ if a student orders a large multi-item meal versus a quick snack.' }
  ]
};

export const FUTURE_SCOPE_ITEMS: FutureScopeItem[] = [
  { id: 'fs-1', icon: 'Sandwich', title: 'Food Pre-Ordering', description: 'Order your favorite meal in advance from your phone before reaching the cafeteria.' },
  { id: 'fs-2', icon: 'Ticket', title: 'Digital Token System', description: 'Eliminate paper slips with automated QR digital tokens for instant pickup verification.' },
  { id: 'fs-3', icon: 'CreditCard', title: 'Online Payment', description: 'Integrated UPI and student ID card wallet payment directly in the portal.' },
  { id: 'fs-4', icon: 'BellRing', title: 'Smart Notifications', description: 'Automated push alerts when your token number is 2 orders away from readiness.' },
  { id: 'fs-5', icon: 'BarChart3', title: 'Queue Prediction', description: 'Predict queue density 30 minutes in advance based on timetable break schedules.' },
  { id: 'fs-6', icon: 'Utensils', title: 'Live Food Menu', description: 'Real-time daily specials, item availability, and out-of-stock indicators.' },
  { id: 'fs-7', icon: 'Building2', title: 'Multiple Canteen Integration', description: 'Centralized queue tracking for Main Canteen, Food Court, and Hostel Mess.' },
  { id: 'fs-8', icon: 'Bot', title: 'Advanced AI Prediction', description: 'Edge AI model training on local microcontroller hardware for zero latency inference.' }
];

export const PROJECT_DETAILS = {
  projectTitle: 'AI-Based Smart Canteen Queue Management System',
  studentName: 'Gokul',
  studentClass: 'AI & DS – A',
  batch: 'C29',
  college: 'Rathinam Technical Campus',
  statement: 'Designed to solve a real-world student problem using Artificial Intelligence.'
};

export const CANTEEN_LIST: CanteenLocation[] = [
  {
    id: 'main-canteen',
    name: 'Main Canteen',
    shortName: 'Central',
    location: 'Central Campus Ground Floor',
    floor: 'Ground Floor, Near Student Activity Center',
    building: 'Central Amenities Block',
    operatingHours: '8:00 AM – 6:30 PM',
    currentLevel: 'LOW',
    peopleWaiting: 6,
    estimatedWaitMinutes: 5,
    walkingTime: '2 min walk from Central Plaza',
    specialty: 'South Indian Meals, Fresh Snacks & Juices',
    mapCoords: { x: 48, y: 52 }
  },
  {
    id: 'mech-block-canteen',
    name: 'Mechanical Block Canteen',
    shortName: 'Mech Block',
    location: 'Mechanical Engineering Wing',
    floor: 'Ground Floor, Near Workshop & Labs',
    building: 'Mechanical Department Block',
    operatingHours: '8:30 AM – 5:30 PM',
    currentLevel: 'MEDIUM',
    peopleWaiting: 15,
    estimatedWaitMinutes: 11,
    walkingTime: '3 min walk from Workshop Quad',
    specialty: 'Quick Bites, Hot Tea, Rolls & Samosas',
    mapCoords: { x: 26, y: 35 }
  },
  {
    id: 'mba-food-court',
    name: 'MBA Block Food Court',
    shortName: 'MBA Court',
    location: 'Management Studies Complex',
    floor: 'Ground Floor & Atrium Lounge',
    building: 'MBA & Executive Studies Tower',
    operatingHours: '9:00 AM – 8:00 PM',
    currentLevel: 'HIGH',
    peopleWaiting: 26,
    estimatedWaitMinutes: 22,
    walkingTime: '4 min walk from Management Wing',
    specialty: 'Pizzas, Burgers, Sandwiches & Cold Beverages',
    mapCoords: { x: 74, y: 68 }
  }
];

export const INITIAL_NOTIFICATIONS: NotificationAlert[] = [
  {
    id: 'notif-1',
    title: 'Queue Alert 🔔',
    message: 'Queue is less crowded now. Good time to visit!',
    timestamp: 'Just now',
    type: 'low_queue',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Peak Hour Notice 🕐',
    message: 'Approaching lunchtime rush (12:30 PM – 1:30 PM). Pre-ordering recommended.',
    timestamp: '15m ago',
    type: 'peak_alert',
    read: true
  }
];


export const SAMPLE_FOOD_MENU: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Veg Pizza',
    price: 50,
    category: 'Meals',
    description: 'Crispy thin crust topped with mozzarella, diced bell peppers, sweet corn, and herbs.',
    prepTime: '8-10 min',
    isVeg: true,
    popular: true,
    availability: 'Available'
  },
  {
    id: 'item-2',
    name: 'Sandwich',
    price: 40,
    category: 'Snacks',
    description: 'Grilled double-decker sandwich layered with cucumber, tomato, potato, and green chutney.',
    prepTime: '4-6 min',
    isVeg: true,
    popular: true,
    availability: 'Available'
  },
  {
    id: 'item-3',
    name: 'Samosa',
    price: 15,
    category: 'Snacks',
    description: 'Golden-fried flaky pastry filled with spiced potato and green peas, served with sweet tamarind dip.',
    prepTime: 'Ready',
    isVeg: true,
    popular: true,
    availability: 'Limited'
  },
  {
    id: 'item-4',
    name: 'Fresh Juice',
    price: 30,
    category: 'Beverages',
    description: 'Cold-pressed fresh seasonal fruit juice made to order without added preservatives.',
    prepTime: '3-5 min',
    isVeg: true,
    popular: true,
    availability: 'Available'
  },
  {
    id: 'item-5',
    name: 'Masala Dosa',
    price: 45,
    category: 'Meals',
    description: 'Crispy fermented crepe smeared with red chutney and stuffed with spiced potato mash.',
    prepTime: '6-8 min',
    isVeg: true,
    availability: 'Available'
  },
  {
    id: 'item-6',
    name: 'Veg Burger',
    price: 45,
    category: 'Meals',
    description: 'Toasted sesame bun with a spiced potato-pea patty, sliced tomatoes, and creamy sauce.',
    prepTime: '5-7 min',
    isVeg: true,
    availability: 'Limited'
  },
  {
    id: 'item-7',
    name: 'Cold Coffee',
    price: 35,
    category: 'Beverages',
    description: 'Chilled blended brew of roasted coffee beans, whole milk, and cocoa drizzle.',
    prepTime: '2-3 min',
    isVeg: true,
    availability: 'Sold Out'
  },
  {
    id: 'item-8',
    name: 'Paneer Roll',
    price: 60,
    category: 'Snacks',
    description: 'Warm flaky paratha wrapped around tikka-spiced grilled cottage cheese and mint mayo.',
    prepTime: '6-8 min',
    isVeg: true,
    availability: 'Available'
  }
];

export const INITIAL_DEMO_ORDERS: DemoOrder[] = [
  {
    id: 'ord-101',
    tokenNumber: 'A105',
    canteenName: 'Main Canteen',
    items: [
      { item: SAMPLE_FOOD_MENU[0], quantity: 1 }, // Veg Pizza
      { item: SAMPLE_FOOD_MENU[2], quantity: 2 }, // Samosa
    ],
    totalAmount: 80,
    status: 'Preparing',
    estimatedMinutes: 6,
    placedAt: '12:42 PM',
  },
  {
    id: 'ord-102',
    tokenNumber: 'B108',
    canteenName: 'Main Canteen',
    items: [
      { item: SAMPLE_FOOD_MENU[4], quantity: 1 }, // Masala Dosa
      { item: SAMPLE_FOOD_MENU[6], quantity: 1 }, // Cold Coffee
    ],
    totalAmount: 80,
    status: 'Received',
    estimatedMinutes: 10,
    placedAt: '12:45 PM',
  },
  {
    id: 'ord-103',
    tokenNumber: 'C112',
    canteenName: 'Main Canteen',
    items: [
      { item: SAMPLE_FOOD_MENU[1], quantity: 2 }, // Sandwich
      { item: SAMPLE_FOOD_MENU[3], quantity: 1 }, // Fresh Juice
    ],
    totalAmount: 110,
    status: 'Preparing',
    estimatedMinutes: 4,
    placedAt: '12:40 PM',
  },
  {
    id: 'ord-104',
    tokenNumber: 'A094',
    canteenName: 'Main Canteen',
    items: [
      { item: SAMPLE_FOOD_MENU[4], quantity: 1 }, // Masala Dosa
      { item: SAMPLE_FOOD_MENU[3], quantity: 1 }, // Fresh Juice
    ],
    totalAmount: 75,
    status: 'Ready',
    estimatedMinutes: 0,
    placedAt: '12:30 PM',
    completedAt: '12:38 PM',
  },
  {
    id: 'ord-105',
    tokenNumber: 'B082',
    canteenName: 'Mechanical Block Canteen',
    items: [
      { item: SAMPLE_FOOD_MENU[1], quantity: 2 }, // Sandwich
    ],
    totalAmount: 80,
    status: 'Completed',
    estimatedMinutes: 0,
    placedAt: '12:15 PM',
    completedAt: '12:22 PM',
  },
  {
    id: 'ord-106',
    tokenNumber: 'C055',
    canteenName: 'MBA Block Food Court',
    items: [
      { item: SAMPLE_FOOD_MENU[0], quantity: 1 }, // Veg Pizza
    ],
    totalAmount: 50,
    status: 'Completed',
    estimatedMinutes: 0,
    placedAt: '12:05 PM',
    completedAt: '12:14 PM',
  },
];

export const INITIAL_ORDER_HISTORY: DemoOrder[] = [
  {
    id: 'hist-1',
    tokenNumber: 'A094',
    canteenName: 'Main Canteen',
    items: [
      {
        item: {
          id: 'item-5',
          name: 'Masala Dosa',
          price: 45,
          category: 'Meals',
          description: '',
          prepTime: '6-8 min',
          isVeg: true,
          availability: 'Available'
        },
        quantity: 1
      },
      {
        item: {
          id: 'item-4',
          name: 'Fresh Juice',
          price: 30,
          category: 'Beverages',
          description: '',
          prepTime: '3-5 min',
          isVeg: true,
          availability: 'Available'
        },
        quantity: 1
      }
    ],
    totalAmount: 75,
    status: 'Ready for Collection',
    placedAt: '11:15 AM',
    estimatedMinutes: 0,
    completedAt: '11:24 AM'
  },
  {
    id: 'hist-2',
    tokenNumber: 'B082',
    canteenName: 'Mechanical Block Canteen',
    items: [
      {
        item: {
          id: 'item-2',
          name: 'Sandwich',
          price: 40,
          category: 'Snacks',
          description: '',
          prepTime: '4-6 min',
          isVeg: true,
          availability: 'Available'
        },
        quantity: 2
      }
    ],
    totalAmount: 80,
    status: 'Ready for Collection',
    placedAt: '09:40 AM',
    estimatedMinutes: 0,
    completedAt: '09:47 AM'
  },
  {
    id: 'hist-3',
    tokenNumber: 'C055',
    canteenName: 'MBA Block Food Court',
    items: [
      {
        item: {
          id: 'item-1',
          name: 'Veg Pizza',
          price: 50,
          category: 'Meals',
          description: '',
          prepTime: '8-10 min',
          isVeg: true,
          availability: 'Available'
        },
        quantity: 1
      }
    ],
    totalAmount: 50,
    status: 'Ready for Collection',
    placedAt: 'Yesterday, 01:20 PM',
    estimatedMinutes: 0,
    completedAt: 'Yesterday, 01:32 PM'
  }
];


export const QUEUE_TREND_DATA: QueueTrendPoint[] = [
  { time: '08:30 AM', level: 'LOW', people: 4, waitMinutes: 3, label: 'Morning Opening' },
  { time: '09:45 AM', level: 'LOW', people: 7, waitMinutes: 5, label: 'Morning Tea' },
  { time: '11:00 AM', level: 'MEDIUM', people: 12, waitMinutes: 9, label: 'Short Recess' },
  { time: '12:00 PM', level: 'MEDIUM', people: 16, waitMinutes: 12, label: 'Pre-Lunch' },
  { time: '12:30 PM', level: 'HIGH', people: 27, waitMinutes: 22, isPeak: true, label: 'Lunch Rush Peak' },
  { time: '01:00 PM', level: 'HIGH', people: 29, waitMinutes: 24, isPeak: true, label: 'Lunch Break Peak' },
  { time: '01:30 PM', level: 'HIGH', people: 24, waitMinutes: 19, isPeak: true, label: 'Late Lunch Rush' },
  { time: '02:00 PM', level: 'MEDIUM', people: 13, waitMinutes: 9, label: 'Post-Lunch Settling' },
  { time: '03:15 PM', level: 'LOW', people: 6, waitMinutes: 5, label: 'Afternoon Tea Break' },
  { time: '04:30 PM', level: 'LOW', people: 5, waitMinutes: 4, label: 'Evening Snacks' }
];

export const PEAK_HOURS_INFO = {
  peakRange: '12:30 PM – 1:30 PM',
  statusWhenLow: 'Current: Less Busy',
  statusWhenMedium: 'Current: Moderately Busy',
  statusWhenHigh: 'Current: High Peak Rush',
  recommendation: 'Campus classes dismiss for lunch between 12:30 PM and 1:30 PM resulting in the highest counter density.',
  disclaimer: 'Demo / Simulation Data — schedule timings represent synthetic campus prototype values.'
};

export const AI_RECOMMENDATION_MESSAGES: Record<QueueLevel, string> = {
  LOW: 'Visit now – queue is less crowded.',
  MEDIUM: 'You can visit, but expect some waiting.',
  HIGH: 'Consider visiting later to avoid long waiting.'
};

export const FOOD_ORDER_QUEUE_FLOW = [
  { step: '1', title: 'Check Live Queue', desc: 'Inspect current queue density & wait time in your canteen', icon: 'Eye' },
  { step: '2', title: 'Choose Food', desc: 'Browse sample cafeteria menu with transparent campus pricing', icon: 'Utensils' },
  { step: '3', title: 'Add to Cart', desc: 'Select portions and verify order details in your demo tray', icon: 'ShoppingBag' },
  { step: '4', title: 'Place Order', desc: 'Confirm your simulated order with zero payment hassle', icon: 'CheckSquare' },
  { step: '5', title: 'Get Digital Token', desc: 'Instantly generate an assigned token number like A105', icon: 'Ticket' },
  { step: '6', title: 'Track Order', desc: 'Watch status transition from Preparing to Ready for Collection', icon: 'Clock' },
  { step: '7', title: 'Collect Food', desc: 'Walk to the counter right as your order is ready', icon: 'Sparkles' }
];

export const AI_QUEUE_PREDICTION_SCENARIOS: Record<QueueLevel, AiQueuePredictionScenario> = {
  MEDIUM: {
    id: 'pred-medium-to-high',
    scenarioName: 'Pre-Lunch Surge (User Example)',
    currentLevel: 'MEDIUM',
    currentPeople: 14,
    currentWaitMinutes: 10,
    predictedLevel15Min: 'HIGH',
    predictedWaitMinutes: 20,
    predictedPeople: 25,
    predictedLevel30Min: 'HIGH',
    predictedWaitMinutes30Min: 24,
    peakHourIndicator: '12:30 PM – 1:30 PM',
    peakHourWindow: 'Lunch Break Peak Rush (Upcoming in 15 min)',
    aiRecommendation: 'Consider visiting later.',
    crowdAlert: {
      isActive: true,
      headline: '⚠️ High crowd expected soon!',
      description: 'Incoming campus lunch dismissal predicted to push counter waiting times from 10 min to 20 min.',
      severity: 'warning'
    },
    forecastPoints: [
      { timeLabel: '15m Ago', minutesOffset: -15, level: 'LOW', people: 8, waitMinutes: 6, isForecast: false },
      { timeLabel: 'Now (Current)', minutesOffset: 0, level: 'MEDIUM', people: 14, waitMinutes: 10, isForecast: false },
      { timeLabel: '+15 Min (Predicted)', minutesOffset: 15, level: 'HIGH', people: 25, waitMinutes: 20, isForecast: true },
      { timeLabel: '+30 Min (Forecast)', minutesOffset: 30, level: 'HIGH', people: 28, waitMinutes: 24, isForecast: true },
      { timeLabel: '+45 Min (Forecast)', minutesOffset: 45, level: 'MEDIUM', people: 16, waitMinutes: 12, isForecast: true }
    ]
  },
  LOW: {
    id: 'pred-low-to-med',
    scenarioName: 'Morning Transition Flow',
    currentLevel: 'LOW',
    currentPeople: 6,
    currentWaitMinutes: 5,
    predictedLevel15Min: 'MEDIUM',
    predictedWaitMinutes: 10,
    predictedPeople: 12,
    predictedLevel30Min: 'MEDIUM',
    predictedWaitMinutes30Min: 14,
    peakHourIndicator: '12:30 PM – 1:30 PM',
    peakHourWindow: 'Off-Peak Window (Peak begins in ~60 min)',
    aiRecommendation: 'Visit now – queue is less crowded and food preparation is swift.',
    crowdAlert: {
      isActive: false,
      headline: 'Queue is Clear & Smooth',
      description: 'Optimal counter availability. Moderate transition expected after next lecture bell.',
      severity: 'low'
    },
    forecastPoints: [
      { timeLabel: '15m Ago', minutesOffset: -15, level: 'LOW', people: 4, waitMinutes: 3, isForecast: false },
      { timeLabel: 'Now (Current)', minutesOffset: 0, level: 'LOW', people: 6, waitMinutes: 5, isForecast: false },
      { timeLabel: '+15 Min (Predicted)', minutesOffset: 15, level: 'MEDIUM', people: 12, waitMinutes: 10, isForecast: true },
      { timeLabel: '+30 Min (Forecast)', minutesOffset: 30, level: 'MEDIUM', people: 15, waitMinutes: 12, isForecast: true },
      { timeLabel: '+45 Min (Forecast)', minutesOffset: 45, level: 'HIGH', people: 22, waitMinutes: 18, isForecast: true }
    ]
  },
  HIGH: {
    id: 'pred-high-peak',
    scenarioName: 'Midday Peak Climax',
    currentLevel: 'HIGH',
    currentPeople: 26,
    currentWaitMinutes: 22,
    predictedLevel15Min: 'HIGH',
    predictedWaitMinutes: 25,
    predictedPeople: 29,
    predictedLevel30Min: 'HIGH',
    predictedWaitMinutes30Min: 22,
    peakHourIndicator: '12:30 PM – 1:30 PM',
    peakHourWindow: 'Active Peak Rush (Max Class Turnout)',
    aiRecommendation: 'High crowd detected. Consider visiting after 25–30 minutes or pre-order in-app.',
    crowdAlert: {
      isActive: true,
      headline: '⚠️ High crowd detected & continuing!',
      description: 'Cafeteria lines are operating at capacity. Counter wait times exceed 20+ minutes.',
      severity: 'critical'
    },
    forecastPoints: [
      { timeLabel: '15m Ago', minutesOffset: -15, level: 'MEDIUM', people: 17, waitMinutes: 13, isForecast: false },
      { timeLabel: 'Now (Current)', minutesOffset: 0, level: 'HIGH', people: 26, waitMinutes: 22, isForecast: false },
      { timeLabel: '+15 Min (Predicted)', minutesOffset: 15, level: 'HIGH', people: 29, waitMinutes: 25, isForecast: true },
      { timeLabel: '+30 Min (Forecast)', minutesOffset: 30, level: 'HIGH', people: 24, waitMinutes: 19, isForecast: true },
      { timeLabel: '+45 Min (Forecast)', minutesOffset: 45, level: 'MEDIUM', people: 14, waitMinutes: 10, isForecast: true }
    ]
  }
};

