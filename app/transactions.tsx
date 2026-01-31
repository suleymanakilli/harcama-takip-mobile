// All Transactions Screen (Max 200 satır)
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTransactions } from '../src/hooks/useTransactions';
import { TransactionItem } from '../src/components/TransactionItem';
import { colors, spacing, fontSize, borderRadius } from '../src/constants/theme';
import { formatCurrency } from '../src/utils/format';
import type { Transaction } from '../src/types';

type FilterType = 'all' | 'expense' | 'income';

export default function TransactionsScreen() {
  const { transactions, remove, refresh } = useTransactions();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const handleDelete = (tx: Transaction) => {
    Alert.alert(
      'İşlemi Sil',
      `${formatCurrency(tx.amount)} tutarındaki işlemi silmek istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: () => remove(tx.id),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity 
      onLongPress={() => handleDelete(item)}
      delayLongPress={500}
    >
      <TransactionItem transaction={item} />
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.filterRow}>
      {(['all', 'expense', 'income'] as const).map((type) => (
        <TouchableOpacity
          key={type}
          style={[styles.filterBtn, filter === type && styles.filterActive]}
          onPress={() => setFilter(type)}
        >
          <Text style={[styles.filterText, filter === type && styles.filterTextActive]}>
            {type === 'all' ? 'Tümü' : type === 'expense' ? 'Gider' : 'Gelir'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.empty}>
      <MaterialCommunityIcons 
        name="receipt" 
        size={64} 
        color={colors.textSecondary} 
      />
      <Text style={styles.emptyText}>Henüz işlem yok</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refresh}
        refreshing={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
    flexGrow: 1,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  filterActive: {
    backgroundColor: colors.accent,
    borderColor: colors.income,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  filterTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginTop: spacing.md,
  },
});

