// components/progress/AnalyticsChart.tsx
import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import IconBadge from '@/components/icons/modified/IconBadge';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { CurvedArrowTopRightIcon } from '@/components/icons';
import { ScanType } from '@/types/progress';

const { width } = Dimensions.get('window');

interface AnalyticsChartProps {
  scanType: ScanType;
  chartData: Array<{ value: number; label: string; dataPointText: string }>;
  improvement: number;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  scanType,
  chartData,
  improvement,
}) => {
  return (
    <BorderlessShadowCard
      b_tl={0}
      b_tr={0}
      b_bl={24}
      b_br={24}
      style={{
        paddingVertical: 24,
        paddingHorizontal: 24,
      }}>
      {/* Header with Overall Score */}
      <View className="mb-6 flex-row items-center justify-between">
        <View className="flex-1 pr-4">
          <Text className="font-outfitMedium text-[14px]" style={{ color: '#2E2117' }}>
            Overall {scanType === 'face' ? 'Skin' : 'Scalp'} Score
          </Text>
          <Text className="font-outfit text-[12px]" style={{ color: '#2E211799' }}>
            {improvement > 0 ? '+' : ''}
            {improvement.toFixed(0)}% improvement
          </Text>
        </View>

        <IconBadge
          style={{ backgroundColor: '#7A8B6A1A' }}
          size={40}
          icon={<CurvedArrowTopRightIcon size={20} color="#7A8B6A" />}
        />
      </View>

      {/* Chart */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <LineChart
            data={chartData}
            height={250}
            width={Math.max(width - 60, chartData.length * 55)}
            spacing={45}
            initialSpacing={10}
            color1="#7A8B6A"
            textColor1="#2E2117"
            textFontSize={10}
            textShiftY={-8}
            dataPointsColor1="#7A8B6A"
            dataPointsHeight={6}
            dataPointsWidth={6}
            showVerticalLines={false}
            showXAxisIndices={true}
            xAxisIndicesColor="#2E211733"
            xAxisColor="#2E211733"
            yAxisColor="#2E211733"
            yAxisTextStyle={{
              color: '#9C7C5C',
              fontSize: 12,
              fontFamily: 'Outfit-Regular',
            }}
            xAxisLabelTextStyle={{
              color: '#9C7C5C',
              fontSize: 12,
              fontFamily: 'Outfit-Regular',
            }}
            yAxisSide="left"
            yAxisIndices={[0, 20, 40, 60, 80, 100]}
            yAxisIndicesHeight={6}
            noOfSections={5}
            maxValue={100}
            minValue={0}
            stepValue={20}
            areaChart
            startFillColor="#7A8B6A33"
            endFillColor="#7A8B6A00"
            startOpacity={0.4}
            endOpacity={0}
            isAnimated
            animationDuration={1000}
            pointerConfig={{
              pointerStripHeight: 250,
              pointerStripColor: '#7A8B6A',
              pointerColor: '#7A8B6A',
              radius: 6,
              pointerLabelWidth: 40,
              pointerLabelHeight: 25,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: true,
              pointerLabelComponent: (items: any) => (
                <View
                  style={{
                    backgroundColor: '#7A8B6A',
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}>
                  <Text style={{ color: 'white', fontSize: 12, fontFamily: 'outfit-medium' }}>
                    {items[0].value}
                  </Text>
                </View>
              ),
            }}
          />
        </View>
      </ScrollView>

      {/* Legend */}
      <View className="mt-4 flex-row justify-center gap-6">
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-4 rounded-full bg-[#7A8B6A]" />
          <Text className="font-outfit text-[10px]" style={{ color: '#2E211799' }}>
            {scanType === 'face' ? 'Skin Health Score' : 'Scalp Health Score'}
          </Text>
        </View>
      </View>
    </BorderlessShadowCard>
  );
};
