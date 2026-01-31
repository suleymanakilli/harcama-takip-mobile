// Settings Screen (Max 200 satır)
import React from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView 
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { useAuth } from '../src/hooks/useAuth';
import { useStore } from '../src/store/useStore';
import { colors, spacing, fontSize, borderRadius } from '../src/constants/theme';
import { formatCurrency, formatDateFull } from '../src/utils/format';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { transactions, categories } = useStore();

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkmak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış', style: 'destructive', onPress: logout },
    ]);
  };

  const exportCSV = async () => {
    const headers = 'Tarih,Kategori,Tür,Tutar,Açıklama\n';
    const rows = transactions.map((tx) => {
      const cat = categories.find((c) => c.id === tx.category_id);
      return `${tx.date},${cat?.name || ''},${tx.type === 'expense' ? 'Gider' : 'Gelir'},${tx.amount},${tx.description || ''}`;
    }).join('\n');
    
    const csv = headers + rows;
    const { uri } = await Print.printToFileAsync({ html: `<pre>${csv}</pre>` });
    await Sharing.shareAsync(uri, { mimeType: 'text/csv', dialogTitle: 'CSV Paylaş' });
  };

  const exportPDF = async () => {
    const total = transactions.reduce((sum, tx) => 
      tx.type === 'expense' ? sum - tx.amount : sum + tx.amount, 0
    );

    const html = `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h1 { color: #1a1a2e; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #1a1a2e; color: white; }
            .expense { color: #FF6B6B; }
            .income { color: #51CF66; }
          </style>
        </head>
        <body>
          <h1>Harcama Raporu</h1>
          <p>Oluşturulma: ${formatDateFull(new Date())}</p>
          <p><strong>Net Bakiye: ${formatCurrency(total)}</strong></p>
          <table>
            <tr><th>Tarih</th><th>Kategori</th><th>Tür</th><th>Tutar</th></tr>
            ${transactions.slice(0, 50).map((tx) => {
              const cat = categories.find((c) => c.id === tx.category_id);
              return `<tr>
                <td>${tx.date}</td>
                <td>${cat?.name || '-'}</td>
                <td>${tx.type === 'expense' ? 'Gider' : 'Gelir'}</td>
                <td class="${tx.type}">${formatCurrency(tx.amount)}</td>
              </tr>`;
            }).join('')}
          </table>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  const MenuItem = ({ icon, title, onPress, danger = false }: { 
    icon: string; title: string; onPress: () => void; danger?: boolean 
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <MaterialCommunityIcons 
        name={icon as keyof typeof MaterialCommunityIcons.glyphMap} 
        size={24} 
        color={danger ? colors.expense : colors.text} 
      />
      <Text style={[styles.menuText, danger && styles.dangerText]}>{title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Veriler</Text>
        <MenuItem icon="file-delimited" title="CSV Olarak İndir" onPress={exportCSV} />
        <MenuItem icon="file-pdf-box" title="PDF Raporu" onPress={exportPDF} />
        <MenuItem icon="folder" title="Kategoriler" onPress={() => router.push('/categories')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap</Text>
        <MenuItem icon="logout" title="Çıkış Yap" onPress={handleLogout} danger />
      </View>

      <Text style={styles.version}>v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  profile: { alignItems: 'center', paddingVertical: spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.income, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  avatarText: { color: colors.white, fontSize: fontSize.xxl, fontWeight: 'bold' },
  name: { color: colors.text, fontSize: fontSize.xl, fontWeight: '600' },
  email: { color: colors.textSecondary, fontSize: fontSize.sm },
  section: { marginTop: spacing.lg, paddingHorizontal: spacing.md },
  sectionTitle: { color: colors.textSecondary, fontSize: fontSize.sm, marginBottom: spacing.sm, marginLeft: spacing.sm },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm, gap: spacing.md },
  menuText: { flex: 1, color: colors.text, fontSize: fontSize.md },
  dangerText: { color: colors.expense },
  version: { color: colors.textSecondary, fontSize: fontSize.xs, textAlign: 'center', marginTop: spacing.xl, marginBottom: spacing.lg },
});

