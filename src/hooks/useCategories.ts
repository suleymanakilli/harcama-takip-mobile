// Categories Hook (Max 60 satır)
import { useCallback, useEffect } from 'react';
import { useStore } from '../store/useStore';
import * as categoryService from '../services/categories';
import type { CategoryForm, TransactionType } from '../types';

export const useCategories = () => {
  const { categories, setCategories, recentCategoryIds, addRecentCategory, setLoading } = useStore();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Fetch categories error:', error);
    } finally {
      setLoading(false);
    }
  }, [setCategories, setLoading]);

  const create = useCallback(async (form: CategoryForm) => {
    setLoading(true);
    try {
      const newCat = await categoryService.createCategory(form);
      setCategories([...categories, newCat]);
      return newCat;
    } finally {
      setLoading(false);
    }
  }, [categories, setCategories, setLoading]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await categoryService.deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    } finally {
      setLoading(false);
    }
  }, [categories, setCategories, setLoading]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const getByType = (type: TransactionType) => 
    categories.filter((c) => c.type === type);

  const recentCategories = recentCategoryIds
    .map((id) => categories.find((c) => c.id === id))
    .filter(Boolean);

  return { 
    categories, 
    recentCategories, 
    getByType, 
    create, 
    remove, 
    addRecent: addRecentCategory,
    refresh: fetchCategories,
  };
};

