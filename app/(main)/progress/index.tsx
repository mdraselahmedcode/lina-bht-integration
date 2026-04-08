// app/(main)/progress/index.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageView from 'react-native-image-viewing';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { ScanTypeFilter } from '@/components/progress/ScanTypeFilter';
import { TabFilter } from '@/components/progress/TabFilter';
import { AnalyticsChart } from '@/components/progress/AnalyticsChart';
import { BeforeAfterCard } from '@/components/progress/BeforeAfterCard';
import { useProgressData } from '@/hooks/useProgressData';
import { TabType, ScanType } from '@/types/progress';

const ProgressScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  const [activeScanType, setActiveScanType] = useState<ScanType>('face');
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);

  const { beforeAfterData, chartData, improvement } = useProgressData(activeScanType);

  const handleImagePress = (imageUrl: string) => {
    setSelectedImages([imageUrl]);
    setImageIndex(0);
    setImageViewerVisible(true);
  };

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader
        title="Your Progress"
        subtitle="Track your skin's journey over time."
        height={70}
        backButton={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 20,
          flexGrow: 1,
        }}
        className="flex-1">
        <View className="px-container">
          <ScanTypeFilter activeScanType={activeScanType} onSelect={setActiveScanType} />
          <TabFilter activeTab={activeTab} onSelect={setActiveTab} />

          {activeTab === 'analytics' && (
            <AnalyticsChart
              scanType={activeScanType}
              chartData={chartData}
              improvement={improvement}
            />
          )}

          {activeTab === 'beforeAfter' && (
            <View className="mt-0">
              {beforeAfterData.map((item, index) => (
                <BeforeAfterCard
                  key={item.id}
                  item={item}
                  isFirst={index === 0}
                  isLast={index === beforeAfterData.length - 1}
                  onImagePress={handleImagePress}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <ImageView
        images={selectedImages.map((uri) => ({ uri }))}
        imageIndex={imageIndex}
        visible={imageViewerVisible}
        onRequestClose={() => setImageViewerVisible(false)}
        animationType="slide"
        presentationStyle="overFullScreen"
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
      />
    </SafeAreaView>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({});
