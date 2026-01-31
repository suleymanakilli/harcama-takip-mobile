// Zustand Store with Persist (Max 80 satır)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, Category, Transaction } from '../types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;

  // Categories (cached)
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  recentCategoryIds: string[];
  addRecentCategory: (id: string) => void;

  // Transactions (cached for offline)
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;

  // UI State
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      // Categories
      categories: [],
      setCategories: (categories) => set({ categories }),
      recentCategoryIds: [],
      addRecentCategory: (id) => {
        const { recentCategoryIds } = get();
        const filtered = recentCategoryIds.filter((cid) => cid !== id);
        set({ recentCategoryIds: [id, ...filtered].slice(0, 3) });
      },

      // Transactions
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // UI
      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'harcama-takip-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        categories: state.categories,
        recentCategoryIds: state.recentCategoryIds,
        transactions: state.transactions,
      }),
    }
  )
);

