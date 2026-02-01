// Auth Callback Handler (Max 200 satır)
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../src/services/supabase';
import { colors, spacing, fontSize } from '../../src/constants/theme';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      // Get tokens from URL params
      const accessToken = params.access_token as string;
      const refreshToken = params.refresh_token as string;

      if (accessToken) {
        // Set session
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });

        if (error) throw error;

        // Success - navigate to home
        router.replace('/');
      } else {
        // No token - back to login
        console.log('No access token in callback');
        router.replace('/login');
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.income} />
      <Text style={styles.text}>Giriş yapılıyor...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  text: {
    color: colors.text,
    fontSize: fontSize.md,
  },
});
