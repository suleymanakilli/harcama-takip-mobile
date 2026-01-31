// Transaction List Item (Max 120 satır)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { formatCurrency, getRelativeDate } from '../utils/format';
import type { Transaction } from '../types';

interface Props {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem: React.FC<Props> = ({ transaction, onPress }) => {
  const { amount, type, description, date, category } = transaction;
  const isExpense = type === 'expense';

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View 
        style={[
          styles.iconBox, 
          { backgroundColor: category?.color || colors.accent }
        ]}
      >
        <MaterialCommunityIcons 
          name={(category?.icon as keyof typeof MaterialCommunityIcons.glyphMap) || 'cash'} 
          size={20} 
          color={colors.white} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.category} numberOfLines={1}>
          {category?.name || 'Kategori'}
        </Text>
        {description && (
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        )}
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, isExpense ? styles.expense : styles.income]}>
          {isExpense ? '-' : '+'}{formatCurrency(amount)}
        </Text>
        <Text style={styles.date}>{getRelativeDate(date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  category: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  description: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: fontSize.md,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  expense: { color: colors.expense },
  income: { color: colors.income },
  date: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    marginTop: 2,
  },
});

