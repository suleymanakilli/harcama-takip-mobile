// Dashboard Stats Hook (Max 60 satır)
import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import type { DashboardStats, CategorySummary, DailyTrend } from '../types';

export const useDashboard = (budgetLimit = 0) => {
  const { transactions, categories } = useStore();

  const stats = useMemo((): DashboardStats => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyTxs = transactions.filter(
      (t) => new Date(t.date) >= monthStart
    );

    const totalIncome = monthlyTxs
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = monthlyTxs
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const remaining = totalIncome - totalExpense;
    const budgetUsagePercent = budgetLimit > 0 
      ? Math.min((totalExpense / budgetLimit) * 100, 100) 
      : 0;

    return { totalIncome, totalExpense, remaining, budgetUsagePercent };
  }, [transactions, budgetLimit]);

  const categorySummary = useMemo((): CategorySummary[] => {
    const expenseTotal = stats.totalExpense || 1;
    const grouped = new Map<string, number>();

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        grouped.set(t.category_id, (grouped.get(t.category_id) || 0) + t.amount);
      });

    return Array.from(grouped.entries())
      .map(([catId, total]) => ({
        category: categories.find((c) => c.id === catId)!,
        total,
        percentage: (total / expenseTotal) * 100,
        count: transactions.filter((t) => t.category_id === catId).length,
      }))
      .filter((s) => s.category)
      .sort((a, b) => b.total - a.total);
  }, [transactions, categories, stats.totalExpense]);

  return { stats, categorySummary };
};

