// Custom NumPad for Fast Entry (Max 120 satır)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';

interface Props {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [',', '0', '⌫'],
];

export const NumPad: React.FC<Props> = ({ value, onChange, maxLength = 10 }) => {
  const handlePress = (key: string) => {
    if (key === '⌫') {
      onChange(value.slice(0, -1));
      return;
    }

    if (key === ',') {
      if (value.includes(',') || value === '') return;
      onChange(value + ',');
      return;
    }

    if (value.length >= maxLength) return;

    // Max 2 decimal places
    const parts = value.split(',');
    if (parts[1] && parts[1].length >= 2) return;

    onChange(value + key);
  };

  const displayValue = value || '0';

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.currency}>₺</Text>
        <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue.replace(',', '.')}
        </Text>
      </View>

      <View style={styles.keys}>
        {KEYS.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={[styles.key, key === '⌫' && styles.deleteKey]}
                onPress={() => handlePress(key)}
                activeOpacity={0.6}
              >
                <Text style={[styles.keyText, key === '⌫' && styles.deleteText]}>
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  display: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    marginBottom: spacing.md,
  },
  currency: {
    color: colors.textSecondary,
    fontSize: fontSize.xxl,
    marginRight: spacing.sm,
  },
  value: {
    color: colors.text,
    fontSize: 48,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  keys: { gap: spacing.sm },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  key: {
    width: 72,
    height: 56,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteKey: { backgroundColor: colors.accent },
  keyText: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: '500',
  },
  deleteText: { fontSize: fontSize.lg },
});

