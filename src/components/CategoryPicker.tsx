// Category Picker Component (Max 120 satır)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import type { Category } from '../types';

interface Props {
  categories: Category[];
  recentCategories: Category[];
  selectedId: string | null;
  onSelect: (category: Category) => void;
}

export const CategoryPicker: React.FC<Props> = ({ 
  categories, 
  recentCategories, 
  selectedId, 
  onSelect 
}) => {
  const renderItem = (cat: Category, isRecent = false) => (
    <TouchableOpacity
      key={cat.id}
      style={[
        styles.item,
        { borderColor: cat.color },
        selectedId === cat.id && styles.selected,
        isRecent && styles.recentItem,
      ]}
      onPress={() => onSelect(cat)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: cat.color }]}>
        <MaterialCommunityIcons 
          name={(cat.icon as keyof typeof MaterialCommunityIcons.glyphMap) || 'tag'} 
          size={18} 
          color={colors.white} 
        />
      </View>
      <Text style={styles.name} numberOfLines={1}>{cat.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {recentCategories.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Son Kullanılan</Text>
          <View style={styles.recentRow}>
            {recentCategories.map((cat) => renderItem(cat, true))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tüm Kategoriler</Text>
        <ScrollView 
          style={styles.scroll} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {categories.map((cat) => renderItem(cat))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginBottom: spacing.md },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  recentRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  recentItem: {
    flex: 1,
    minWidth: 80,
  },
  scroll: { maxHeight: 200 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    minWidth: '45%',
  },
  selected: {
    backgroundColor: colors.accent,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  name: {
    color: colors.text,
    fontSize: fontSize.sm,
    flex: 1,
  },
});

