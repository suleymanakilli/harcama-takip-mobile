// Hero Dashboard Card (Max 120 satır)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { formatCurrency } from '../utils/format';
import type { DashboardStats } from '../types';

interface Props {
  stats: DashboardStats;
  budgetLimit: number;
}

export const HeroCard: React.FC<Props> = ({ stats, budgetLimit }) => {
  const { totalIncome, totalExpense, remaining, budgetUsagePercent } = stats;

  const getBudgetColor = () => {
    if (budgetUsagePercent >= 100) return colors.expense;
    if (budgetUsagePercent >= 80) return colors.warning;
    return colors.income;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.statBox}>
          <Text style={styles.label}>Gelir</Text>
          <Text style={[styles.value, styles.income]}>
            {formatCurrency(totalIncome)}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.label}>Gider</Text>
          <Text style={[styles.value, styles.expense]}>
            {formatCurrency(totalExpense)}
          </Text>
        </View>
      </View>

      <View style={styles.remainingBox}>
        <Text style={styles.remainingLabel}>Kalan</Text>
        <Text style={[styles.remainingValue, remaining < 0 && styles.negative]}>
          {formatCurrency(remaining)}
        </Text>
      </View>

      {budgetLimit > 0 && (
        <View style={styles.budgetBar}>
          <View style={styles.budgetTrack}>
            <View 
              style={[
                styles.budgetProgress, 
                { width: `${Math.min(budgetUsagePercent, 100)}%`, backgroundColor: getBudgetColor() }
              ]} 
            />
          </View>
          <Text style={styles.budgetText}>
            Bütçe: %{budgetUsagePercent.toFixed(0)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statBox: { alignItems: 'center', flex: 1 },
  label: { color: colors.textSecondary, fontSize: fontSize.sm },
  value: { fontSize: fontSize.xl, fontWeight: '600', marginTop: spacing.xs },
  income: { color: colors.income },
  expense: { color: colors.expense },
  remainingBox: { alignItems: 'center', paddingVertical: spacing.md },
  remainingLabel: { color: colors.textSecondary, fontSize: fontSize.md },
  remainingValue: { 
    color: colors.text, 
    fontSize: fontSize.hero, 
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  negative: { color: colors.expense },
  budgetBar: { marginTop: spacing.md },
  budgetTrack: {
    height: 6,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  budgetProgress: { height: '100%', borderRadius: borderRadius.full },
  budgetText: { 
    color: colors.textSecondary, 
    fontSize: fontSize.xs, 
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});

