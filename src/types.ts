export type QueueLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface QueueStatusData {
  level: QueueLevel;
  label: string;
  peopleWaiting: number;
  estimatedWaitMinutes: number;
  color: string;
  badgeBg: string;
  borderColor: string;
  glowColor: string;
  dotColor: string;
  recommendation: string;
  appNotification: string;
  crowdLevelText: string;
}

export interface CanteenLocation {
  id: string;
  name: string;
  shortName: string;
  location: string;
  floor: string;
  building: string;
  operatingHours: string;
  currentLevel: QueueLevel;
  peopleWaiting: number;
  estimatedWaitMinutes: number;
  walkingTime: string;
  specialty: string;
  mapCoords: { x: number; y: number };
}

export type FoodAvailability = 'Available' | 'Limited' | 'Sold Out';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Snacks' | 'Meals' | 'Beverages';
  description: string;
  prepTime: string;
  isVeg: boolean;
  popular?: boolean;
  availability: FoodAvailability;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderStatus =
  | 'Received'
  | 'Preparing'
  | 'Ready'
  | 'Completed'
  | 'Order Received'
  | 'Ready for Collection';

export interface DemoOrder {
  id: string;
  tokenNumber: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  placedAt: string;
  estimatedMinutes: number;
  canteenName: string;
  completedAt?: string;
  isCancelled?: boolean;
}

export interface QueueTrendPoint {
  time: string;
  level: QueueLevel;
  people: number;
  waitMinutes: number;
  isPeak?: boolean;
  label?: string;
}

export interface NotificationAlert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'low_queue' | 'order_update' | 'peak_alert' | 'system';
  read: boolean;
}

export interface ProblemCardItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AiWorkCardItem {
  id: string;
  title: string;
  description: string;
  clarification?: string;
  icon: string;
}

export interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FutureScopeItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PredictionGraphPoint {
  timeLabel: string;
  minutesOffset: number;
  level: QueueLevel;
  people: number;
  waitMinutes: number;
  isForecast: boolean;
}

export interface AiQueuePredictionScenario {
  id: string;
  scenarioName: string;
  currentLevel: QueueLevel;
  currentPeople: number;
  currentWaitMinutes: number;
  predictedLevel15Min: QueueLevel;
  predictedWaitMinutes: number;
  predictedPeople: number;
  predictedLevel30Min?: QueueLevel;
  predictedWaitMinutes30Min?: number;
  peakHourIndicator: string;
  peakHourWindow: string;
  aiRecommendation: string;
  crowdAlert: {
    isActive: boolean;
    headline: string;
    description: string;
    severity: 'low' | 'warning' | 'critical';
  };
  forecastPoints: PredictionGraphPoint[];
}

