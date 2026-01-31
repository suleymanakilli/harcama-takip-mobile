// Categories Service (Max 80 satır)
import { supabase, getCurrentUserId } from './supabase';
import type { Category, CategoryForm, TransactionType } from '../types';

export const getCategories = async (): Promise<Category[]> => {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('name');

  if (error) throw error;
  return data || [];
};

export const getCategoriesByType = async (type: TransactionType): Promise<Category[]> => {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .eq('type', type)
    .order('name');

  if (error) throw error;
  return data || [];
};

export const createCategory = async (form: CategoryForm): Promise<Category> => {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase.from('categories').insert({
    user_id: userId,
    name: form.name,
    type: form.type,
    color: form.color,
    icon: form.icon,
    budget_limit: form.budget_limit ? parseFloat(form.budget_limit) : null,
  }).select().single();

  if (error) throw error;
  return data;
};

export const updateCategory = async (id: string, form: Partial<CategoryForm>) => {
  const updateData: Record<string, unknown> = {};
  if (form.name) updateData.name = form.name;
  if (form.type) updateData.type = form.type;
  if (form.color) updateData.color = form.color;
  if (form.icon) updateData.icon = form.icon;
  if (form.budget_limit !== undefined) {
    updateData.budget_limit = form.budget_limit ? parseFloat(form.budget_limit) : null;
  }

  const { error } = await supabase.from('categories').update(updateData).eq('id', id);
  if (error) throw error;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
};

// Seed default categories for new users
export const seedDefaultCategories = async () => {
  const defaults = [
    { name: 'Yemek', type: 'expense', color: '#FF6B6B', icon: 'food' },
    { name: 'Ulaşım', type: 'expense', color: '#4ECDC4', icon: 'car' },
    { name: 'Maaş', type: 'income', color: '#96CEB4', icon: 'cash' },
  ];
  for (const cat of defaults) {
    await createCategory({ ...cat, budget_limit: '' } as CategoryForm);
  }
};

