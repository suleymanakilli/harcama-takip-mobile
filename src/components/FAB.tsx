// Floating Action Button (Max 120 satır)
import React, { useRef, useEffect } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Animated, 
  ViewStyle 
} from 'react-native';
import { colors, borderRadius } from '../constants/theme';

interface Props {
  onPress: () => void;
  style?: ViewStyle;
}

export const FAB: React.FC<Props> = ({ onPress, style }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        style,
        { transform: [{ scale: pulseAnim }] }
      ]}
    >
      <TouchableOpacity 
        style={styles.button} 
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    shadowColor: colors.income,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.income,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '300',
    marginTop: -2,
  },
});

