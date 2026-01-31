// Expense Pie Chart (Max 120 satır)
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { formatCurrency } from '../utils/format';
import type { CategorySummary } from '../types';

interface Props {
  data: CategorySummary[];
  totalExpense: number;
}

const CHART_SIZE = Dimensions.get('window').width - 64;

export const ExpenseChart: React.FC<Props> = ({ data, totalExpense }) => {
  if (data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Henüz harcama yok</Text>
      </View>
    );
  }

  const chartData = data.slice(0, 6).map((item) => ({
    name: item.category.name,
    population: item.total,
    color: item.category.color,
    legendFontColor: colors.textSecondary,
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bu Ay</Text>
      
      <View style={styles.chartWrapper}>
        <PieChart
          data={chartData}
          width={CHART_SIZE}
          height={180}
          chartConfig={{
            color: () => colors.text,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute={false}
          hasLegend={false}
        />
        
        <View style={styles.centerLabel}>
          <Text style={styles.centerAmount}>{formatCurrency(totalExpense)}</Text>
          <Text style={styles.centerText}>Toplam</Text>
        </View>
      </View>

      <View style={styles.legend}>
        {data.slice(0, 4).map((item) => (
          <View key={item.category.id} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: item.category.color }]} />
            <Text style={styles.legendName} numberOfLines={1}>
              {item.category.name}
            </Text>
            <Text style={styles.legendPercent}>%{item.percentage.toFixed(0)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  title: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  chartWrapper: { alignItems: 'center', position: 'relative' },
  centerLabel: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
  },
  centerAmount: { color: colors.text, fontSize: fontSize.lg, fontWeight: 'bold' },
  centerText: { color: colors.textSecondary, fontSize: fontSize.xs },
  legend: { marginTop: spacing.md, gap: spacing.xs },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: spacing.sm },
  legendName: { color: colors.text, fontSize: fontSize.sm, flex: 1 },
  legendPercent: { color: colors.textSecondary, fontSize: fontSize.sm },
  empty: { padding: spacing.xl, alignItems: 'center' },
  emptyText: { color: colors.textSecondary, fontSize: fontSize.md },
});

