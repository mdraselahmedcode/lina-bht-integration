// components/scans/hairScan/HairAnalysisCards.tsx
import React from 'react';
import { View, Text, Image, useWindowDimensions, ImageSourcePropType } from 'react-native';
import { GradientProgressBar } from '@/components/GradientProgressBar';
import CircularProgressStroke from '../CircularProgressStroke';

interface HairAnalysisCardsProps {
  // hairImageUri?: string | number;
  hairImageUri?: ImageSourcePropType;
  scalpHealth: number;
  flakinessScore: number;
  flakinessProgress: number;
  flakinessLabel?: string;
}

export const HairAnalysisCards: React.FC<HairAnalysisCardsProps> = ({
  hairImageUri,
  scalpHealth,
  flakinessScore,
  flakinessProgress,
  flakinessLabel = 'Flakiness Pattern',
}) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;
  const chartSize = isSmallScreen ? 140 : 160;

  // Helper to get image source correctly
  const getImageSource = () => {
    if (!hairImageUri) return null;
    if (typeof hairImageUri === 'number') {
      return hairImageUri;
    }
    return { uri: hairImageUri };
  };

  // const imageSource = getImageSource();

  if (isSmallScreen) {
    // Stack vertically on small screens
    return (
      <View className="gap-4">
        {/* Left Card - Hair Image & Flakiness */}
        <View
          style={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#FFFFFF99',
            borderRadius: 24,
            padding: 12,
          }}>
          {/* Hair Image */}
          <View className="w-full overflow-hidden rounded-xl">
            {hairImageUri ? (
              <Image
                source={hairImageUri}
                style={{ width: '100%', height: 200 }}
                resizeMode="cover"
              />
            ) : (
              <View className="h-[200px] w-full items-center justify-center rounded-xl bg-[#F0E6D8]">
                <Text className="font-outfit text-[12px] text-[#2E211799]">Hair Image</Text>
              </View>
            )}
          </View>

          {/* Flakiness Info */}
          <Text
            className="mt-3 font-OutfitBold text-[12px] text-[#2E211799]"
            style={{
              textShadowColor: '#FFFFFF',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
            }}>
            {flakinessLabel}
          </Text>

          <Text
            className="mt-3 font-OutfitBold text-[12px] text-[#2E2117]"
            style={{
              textShadowColor: '#FFFFFF',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
            }}>
            Score :{' '}
            <Text
              className="font-outfit text-[12px]"
              style={{
                textShadowColor: '#FFFFFF',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
              }}>
              {flakinessScore}/100
            </Text>
          </Text>

          <GradientProgressBar
            style={{
              marginTop: 6,
              height: 10,
              borderWidth: 1,
              borderTopColor: '#c9beb177',
              borderLeftColor: '#c9beb177',
              borderBottomColor: '#FFFFFF99',
              borderRightColor: '#FFFFFF99',
            }}
            progress={flakinessProgress}
            gradientColors={['#FBBF24', '#D97706']}
            backgroundColor="#ddd9d6"
          />
        </View>

        {/* Right Card - Scalp Health Chart */}
        <View
          style={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#FFFFFF99',
            borderRadius: 24,
            padding: 16,
            alignItems: 'center',
          }}>
          <Text
            className="font-outfitBold w-full text-start text-[24px] text-[#2E2117]"
            style={{
              textShadowColor: '#FFFFFF',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}>
            {scalpHealth}%
          </Text>
          <Text
            className="mb-4 mt-1 w-full text-start font-outfitMedium text-[14px] text-[#2E211799]"
            style={{
              textShadowColor: '#FFFFFF',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}>
            Scalp Health
          </Text>
          <CircularProgressStroke
            progress={scalpHealth}
            size={chartSize}
            strokeWidth={22}
            progressColor="#60A5FA"
            trackColor="#E8DDD0"
            gradientColors={['#CAA789A3', '#CAA789A3']}
            showPercentage={true}
          />
        </View>
      </View>
    );
  }
};
