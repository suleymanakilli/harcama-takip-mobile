// Root Layout with Auth Guard (Max 100 satır)
import { useEffect, useState } from 'react';
import { Stack, useSegments, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { useStore } from '../src/store/useStore';
import { colors } from '../src/constants/theme';

export default function RootLayout() {
  const { isAuthenticated } = useStore();
  const segments = useSegments();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Wait for component to mount before navigating
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const inAuthGroup = segments[0] === 'login';

    // Use setTimeout to ensure navigation happens after render
    const timer = setTimeout(() => {
      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/login');
      } else if (isAuthenticated && inAuthGroup) {
        router.replace('/');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, segments, isMounted]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="transactions" 
          options={{ title: 'Tüm İşlemler' }} 
        />
        <Stack.Screen 
          name="categories" 
          options={{ title: 'Kategoriler' }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ title: 'Ayarlar' }} 
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
