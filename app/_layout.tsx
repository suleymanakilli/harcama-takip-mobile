// Root Layout (Max 100 satır)
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../src/hooks/useAuth';
import { colors } from '../src/constants/theme';

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

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

