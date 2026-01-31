// Transactions Service (Max 80 satır)
import { supabase, getCurrentUserId } from './supabase';
import type { Transaction, TransactionForm } from '../types';

export const getTransactions = async (limit = 50): Promise<Transaction[]> => {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('transactions')
    .select('*, category:categories(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

export const getMonthlyTransactions = async (
  year: number,
  month: number
): Promise<Transaction[]> => {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('transactions')
    .select('*, category:categories(*)')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createTransaction = async (form: TransactionForm) => {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase.from('transactions').insert({
    user_id: userId,
    category_id: form.category_id,
    amount: parseFloat(form.amount),
    type: form.type,
    description: form.description || null,
    date: form.date.toISOString().split('T')[0],
  }).select().single();

  if (error) throw error;
  return data;
};

export const deleteTransaction = async (id: string) => {
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
};

export const updateTransaction = async (id: string, form: Partial<TransactionForm>) => {
  const updateData: Record<string, unknown> = {};
  if (form.amount) updateData.amount = parseFloat(form.amount);
  if (form.category_id) updateData.category_id = form.category_id;
  if (form.type) updateData.type = form.type;
  if (form.description !== undefined) updateData.description = form.description;
  if (form.date) updateData.date = form.date.toISOString().split('T')[0];

  const { error } = await supabase.from('transactions').update(updateData).eq('id', id);
  if (error) throw error;
};

