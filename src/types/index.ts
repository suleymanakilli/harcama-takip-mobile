// Harcama Takip - Type Definitions (Max 100 satır)

export type TransactionType = 'expense' | 'income';

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon: string;
  budget_limit: number | null;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  type: TransactionType;
  description: string | null;
  date: string;
  created_at: string;
  category?: Category;
}

export interface Budget {
  id: string;
  user_id: string;
  month: number;
  year: number;
  total_limit: number;
  alert_threshold: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  remaining: number;
  budgetUsagePercent: number;
}

export interface CategorySummary {
  category: Category;
  total: number;
  percentage: number;
  count: number;
}

export interface DailyTrend {
  date: string;
  total: number;
}

// Form Types
export interface TransactionForm {
  amount: string;
  category_id: string;
  type: TransactionType;
  description: string;
  date: Date;
}

export interface CategoryForm {
  name: string;
  type: TransactionType;
  color: string;
  icon: string;
  budget_limit: string;
}

// Navigation Types
export type RootStackParamList = {
  index: undefined;
  login: undefined;
  transactions: undefined;
  categories: undefined;
  settings: undefined;
};

// Preset Colors
export const PRESET_COLORS = [
  '#FF6B6B', // Soft Red
  '#4ECDC4', // Teal
  '#45B7D1', // Sky Blue
  '#96CEB4', // Sage Green
  '#FFEAA7', // Soft Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint
  '#F7DC6F', // Gold
] as const;

// Preset Icons (Expo Vector Icons - MaterialCommunityIcons)
export const PRESET_ICONS = [
  'food', 'coffee', 'cart', 'car', 'home', 'medical-bag',
  'airplane', 'gift', 'gamepad-variant', 'dumbbell', 'book',
  'tshirt-crew', 'cellphone', 'credit-card', 'cash',
] as const;

