// Add Transaction Modal (Max 120 satır)
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Modal, TouchableOpacity, SafeAreaView 
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { NumPad } from './NumPad';
import { CategoryPicker } from './CategoryPicker';
import type { Category, TransactionType } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (amount: number, categoryId: string, type: TransactionType) => void;
  categories: Category[];
  recentCategories: Category[];
}

export const AddTransactionModal: React.FC<Props> = ({
  visible, onClose, onSubmit, categories, recentCategories,
}) => {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = () => {
    if (!amount || !selectedCategory) return;
    const numAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numAmount) || numAmount <= 0) return;
    onSubmit(numAmount, selectedCategory.id, type);
    resetAndClose();
  };

  const resetAndClose = () => {
    setAmount('');
    setSelectedCategory(null);
    setType('expense');
    onClose();
  };

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setType(cat.type);
  };

  const filteredCategories = categories.filter((c) => c.type === type);
  const filteredRecent = recentCategories.filter((c) => c.type === type);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={resetAndClose}>
              <Text style={styles.cancel}>İptal</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Yeni İşlem</Text>
            <TouchableOpacity onPress={handleSubmit} disabled={!amount || !selectedCategory}>
              <Text style={[styles.done, (!amount || !selectedCategory) && styles.disabled]}>
                Kaydet
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.typeRow}>
            {(['expense', 'income'] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.typeBtn, type === t && styles.typeBtnActive]}
                onPress={() => setType(t)}
              >
                <Text style={[styles.typeText, type === t && styles.typeTextActive]}>
                  {t === 'expense' ? 'Gider' : 'Gelir'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <NumPad value={amount} onChange={setAmount} />

          <View style={styles.categorySection}>
            <CategoryPicker
              categories={filteredCategories}
              recentCategories={filteredRecent}
              selectedId={selectedCategory?.id || null}
              onSelect={handleCategorySelect}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  cancel: { color: colors.expense, fontSize: fontSize.md },
  title: { color: colors.text, fontSize: fontSize.lg, fontWeight: '600' },
  done: { color: colors.income, fontSize: fontSize.md, fontWeight: '600' },
  disabled: { opacity: 0.4 },
  typeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  typeBtn: { flex: 1, paddingVertical: spacing.sm, borderRadius: borderRadius.md, backgroundColor: colors.secondary, alignItems: 'center' },
  typeBtnActive: { backgroundColor: colors.accent },
  typeText: { color: colors.textSecondary, fontSize: fontSize.md },
  typeTextActive: { color: colors.text, fontWeight: '600' },
  categorySection: { flex: 1, marginTop: spacing.lg },
});

