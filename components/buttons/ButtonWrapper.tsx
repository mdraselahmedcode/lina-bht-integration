// components/buttons/ButtonWrapper.tsx
import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';

interface ButtonWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export default function ButtonWrapper({ children, delay = 50 }: ButtonWrapperProps) {
  const [isReady, setIsReady] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.98))[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <View style={{ opacity: 0 }}>{children}</View>;
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}>
      {children}
    </Animated.View>
  );
}
