// Transactions Hook (Max 60 satır)
import { useCallback, useEffect } from 'react';
import { useStore } from '../store/useStore';
import * as transactionService from '../services/transactions';
import type { TransactionForm } from '../types';

export const useTransactions = () => {
  const { transactions, setTransactions, addTransaction, removeTransaction, setLoading } = useStore();

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await transactionService.getTransactions(100);
      setTransactions(data);
    } catch (error) {
      console.error('Fetch transactions error:', error);
    } finally {
      setLoading(false);
    }
  }, [setTransactions, setLoading]);

  const create = useCallback(async (form: TransactionForm) => {
    setLoading(true);
    try {
      const newTx = await transactionService.createTransaction(form);
      addTransaction(newTx);
      return newTx;
    } finally {
      setLoading(false);
    }
  }, [addTransaction, setLoading]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await transactionService.deleteTransaction(id);
      removeTransaction(id);
    } finally {
      setLoading(false);
    }
  }, [removeTransaction, setLoading]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const recentTransactions = transactions.slice(0, 5);

  return { 
    transactions, 
    recentTransactions, 
    create, 
    remove, 
    refresh: fetchTransactions 
  };
};

