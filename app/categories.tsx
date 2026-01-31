// Categories Management Screen (Max 200 satır)
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  Modal, TextInput, Alert, SafeAreaView 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCategories } from '../src/hooks/useCategories';
import { colors, spacing, fontSize, borderRadius } from '../src/constants/theme';
import { PRESET_COLORS, PRESET_ICONS, type Category, type TransactionType } from '../src/types';

export default function CategoriesScreen() {
  const { categories, create, remove } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [icon, setIcon] = useState(PRESET_ICONS[0]);

  const handleCreate = async () => {
    if (!name.trim()) return;
    await create({ name: name.trim(), type, color, icon, budget_limit: '' });
    resetAndClose();
  };

  const resetAndClose = () => {
    setName('');
    setType('expense');
    setColor(PRESET_COLORS[0]);
    setIcon(PRESET_ICONS[0]);
    setShowModal(false);
  };

  const handleDelete = (cat: Category) => {
    Alert.alert('Kategori Sil', `"${cat.name}" silinsin mi?`, [
      { text: 'İptal', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => remove(cat.id) },
    ]);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.item} 
      onLongPress={() => handleDelete(item)}
    >
      <View style={[styles.iconBox, { backgroundColor: item.color }]}>
        <MaterialCommunityIcons 
          name={(item.icon as keyof typeof MaterialCommunityIcons.glyphMap) || 'tag'} 
          size={24} 
          color={colors.white} 
        />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>
          {item.type === 'expense' ? 'Gider' : 'Gelir'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => setShowModal(true)}>
        <MaterialCommunityIcons name="plus" size={24} color={colors.white} />
        <Text style={styles.addText}>Yeni Kategori</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={resetAndClose}>
                <Text style={styles.cancel}>İptal</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Yeni Kategori</Text>
              <TouchableOpacity onPress={handleCreate}>
                <Text style={styles.done}>Ekle</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Kategori adı"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
              maxLength={12}
            />

            <View style={styles.typeRow}>
              {(['expense', 'income'] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeBtn, type === t && styles.typeActive]}
                  onPress={() => setType(t)}
                >
                  <Text style={styles.typeText}>{t === 'expense' ? 'Gider' : 'Gelir'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Renk</Text>
            <View style={styles.colorsRow}>
              {PRESET_COLORS.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.colorDot, { backgroundColor: c }, color === c && styles.colorSelected]}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>

            <Text style={styles.label}>İkon</Text>
            <View style={styles.iconsRow}>
              {PRESET_ICONS.slice(0, 10).map((i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.iconBtn, icon === i && styles.iconSelected]}
                  onPress={() => setIcon(i)}
                >
                  <MaterialCommunityIcons name={i as keyof typeof MaterialCommunityIcons.glyphMap} size={24} color={colors.text} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.cardBorder },
  iconBox: { width: 48, height: 48, borderRadius: borderRadius.md, justifyContent: 'center', alignItems: 'center' },
  itemContent: { marginLeft: spacing.md },
  itemName: { color: colors.text, fontSize: fontSize.md, fontWeight: '600' },
  itemType: { color: colors.textSecondary, fontSize: fontSize.sm },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.income, margin: spacing.md, padding: spacing.md, borderRadius: borderRadius.lg, gap: spacing.sm },
  addText: { color: colors.white, fontSize: fontSize.md, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: colors.background },
  modalContent: { flex: 1, padding: spacing.md },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  cancel: { color: colors.expense, fontSize: fontSize.md },
  modalTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '600' },
  done: { color: colors.income, fontSize: fontSize.md, fontWeight: '600' },
  input: { backgroundColor: colors.card, color: colors.text, padding: spacing.md, borderRadius: borderRadius.md, fontSize: fontSize.md, marginBottom: spacing.md },
  typeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  typeBtn: { flex: 1, padding: spacing.sm, backgroundColor: colors.card, borderRadius: borderRadius.md, alignItems: 'center' },
  typeActive: { backgroundColor: colors.accent },
  typeText: { color: colors.text },
  label: { color: colors.textSecondary, fontSize: fontSize.sm, marginBottom: spacing.sm },
  colorsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg, flexWrap: 'wrap' },
  colorDot: { width: 36, height: 36, borderRadius: 18 },
  colorSelected: { borderWidth: 3, borderColor: colors.white },
  iconsRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  iconBtn: { width: 44, height: 44, backgroundColor: colors.card, borderRadius: borderRadius.sm, justifyContent: 'center', alignItems: 'center' },
  iconSelected: { backgroundColor: colors.accent },
});

