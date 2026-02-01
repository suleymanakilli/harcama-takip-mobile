// Dashboard Screen (Max 200 satır)
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView 
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../src/store/useStore';
import { useDashboard } from '../src/hooks/useDashboard';
import { useTransactions } from '../src/hooks/useTransactions';
import { useCategories } from '../src/hooks/useCategories';
import { HeroCard } from '../src/components/HeroCard';
import { FAB } from '../src/components/FAB';
import { ExpenseChart } from '../src/components/ExpenseChart';
import { TransactionItem } from '../src/components/TransactionItem';
import { AddTransactionModal } from '../src/components/AddTransactionModal';
import { colors, spacing, fontSize } from '../src/constants/theme';
import type { TransactionType } from '../src/types';

const BUDGET_LIMIT = 10000;

export default function DashboardScreen() {
  const { user, isAuthenticated } = useStore();
  const { stats, categorySummary } = useDashboard(BUDGET_LIMIT);
  const { recentTransactions, create } = useTransactions();
  const { categories, recentCategories, addRecent } = useCategories();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddTransaction = async (
    amount: number, 
    categoryId: string, 
    type: TransactionType
  ) => {
    await create({
      amount: amount.toString(),
      category_id: categoryId,
      type,
      description: '',
      date: new Date(),
    });
    addRecent(categoryId);
    setShowAddModal(false);
  };

  // Auth guard is handled in _layout.tsx, just show loading if not ready
  if (!isAuthenticated) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Merhaba,</Text>
          <Text style={styles.name}>{user?.name || 'Kullanıcı'}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <MaterialCommunityIcons name="cog" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroCard stats={stats} budgetLimit={BUDGET_LIMIT} />

        <View style={styles.section}>
          <ExpenseChart data={categorySummary} totalExpense={stats.totalExpense} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Son İşlemler</Text>
            <TouchableOpacity onPress={() => router.push('/transactions')}>
              <Text style={styles.seeAll}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {recentTransactions.length === 0 ? (
              <Text style={styles.emptyText}>Henüz işlem yok</Text>
            ) : (
              recentTransactions.map((tx) => (
                <TransactionItem key={tx.id} transaction={tx} />
              ))
            )}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <FAB onPress={() => setShowAddModal(true)} />

      <AddTransactionModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddTransaction}
        categories={categories}
        recentCategories={recentCategories as typeof categories}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loading: { 
    flex: 1, 
    backgroundColor: colors.background, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: { color: colors.textSecondary, fontSize: fontSize.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  greeting: { color: colors.textSecondary, fontSize: fontSize.sm },
  name: { color: colors.text, fontSize: fontSize.xl, fontWeight: 'bold' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  section: { marginTop: spacing.lg },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '600' },
  seeAll: { color: colors.income, fontSize: fontSize.sm },
  transactionsList: { paddingHorizontal: spacing.md },
  emptyText: { color: colors.textSecondary, textAlign: 'center', padding: spacing.lg },
  bottomSpacer: { height: 80 },
});
