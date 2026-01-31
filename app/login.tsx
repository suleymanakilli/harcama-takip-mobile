// Login Screen (Max 200 satır)
import React from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView 
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../src/hooks/useAuth';
import { colors, spacing, fontSize, borderRadius } from '../src/constants/theme';

export default function LoginScreen() {
  const { login, isGoogleReady } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
              name="wallet" 
              size={64} 
              color={colors.income} 
            />
          </View>
          <Text style={styles.title}>Harcama Takip</Text>
          <Text style={styles.subtitle}>
            Paranızı kontrol altına alın
          </Text>
        </View>

        <View style={styles.features}>
          {[
            { icon: 'lightning-bolt', text: '3 saniyede giriş' },
            { icon: 'chart-pie', text: 'Görsel raporlar' },
            { icon: 'shield-check', text: 'Güvenli & özel' },
          ].map((item, idx) => (
            <View key={idx} style={styles.featureRow}>
              <MaterialCommunityIcons 
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap} 
                size={24} 
                color={colors.income} 
              />
              <Text style={styles.featureText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.googleBtn, !isGoogleReady && styles.disabled]}
          onPress={handleLogin}
          disabled={!isGoogleReady}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="google" size={24} color={colors.textDark} />
          <Text style={styles.googleText}>Google ile Giriş Yap</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Giriş yaparak Kullanım Şartlarını kabul etmiş olursunuz
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.income,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  features: {
    marginBottom: spacing.xl * 2,
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureText: {
    color: colors.text,
    fontSize: fontSize.md,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  disabled: {
    opacity: 0.5,
  },
  googleText: {
    color: colors.textDark,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  terms: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});

