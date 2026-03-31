import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 - 100
};

const CircularProgress: React.FC<Props> = ({ size = 80, strokeWidth = 8, progress }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke="#2A2118"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={5}
        />

        {/* Progress Circle */}
        <Circle
          stroke="#97C36D"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Center Text */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View className="flex items-center justify-center">
          <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: 20 }}>{progress}</Text>
          <Text style={{ fontFamily: 'Outfit-Regular', fontSize: 14 }}>Score</Text>
        </View>
      </View>
    </View>
  );
};

export default CircularProgress;
