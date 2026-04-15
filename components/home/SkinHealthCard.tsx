// // screens/home/components/SkinHealthCard.tsx
// import React from 'react';
// import { View, Text } from 'react-native';
// import ShadowCard from '@/components/cards/ShadowCard';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import CircularProgress from '@/components/home/CircularProgress';
// import HeaderPrimary from '@/components/texts/HeaderPrimary';
// import Subtitle from '@/components/texts/Subtitle';
// import { SkinMetric } from '@/types/home';

// interface SkinHealthCardProps {
//   score: number;
//   description: string;
//   metrics: SkinMetric[];
// }

// export const SkinHealthCard: React.FC<SkinHealthCardProps> = ({ score, description, metrics }) => {
//   return (
//     <ShadowCard style={{ borderBottomColor: '#FFFFFF66', borderBottomWidth: 2 }}>
//       <View className="flex-row items-center gap-7">
//         <CircularProgress progress={score} />
//         <View className="flex-1">
//           <HeaderPrimary text="Skin Health" style={{ color: '#2A2118' }} />
//           <Subtitle style={{ color: '#2A2118CC', fontSize: 16 }} text={description} />
//         </View>
//       </View>

//       <View className="mt-6 flex-row items-center gap-4">
//         {metrics.map((metric) => (
//           <View key={metric.id} className="flex-1">
//             <BorderlessShadowCard b_bl={12} b_br={12} b_tl={12} b_tr={12}>
//               <View className="flex-row items-center justify-center gap-1">
//                 <View
//                   className="h-[10] w-[10] rounded-full"
//                   style={{ backgroundColor: metric.color }}
//                 />
//                 <Text className="font-outfitMedium text-[12px] text-[#2A211899]">
//                   {metric.label}
//                 </Text>
//               </View>
//               <Text className="mt-3 text-center font-outfitMedium text-[16px]">{metric.value}</Text>
//             </BorderlessShadowCard>
//           </View>
//         ))}
//       </View>
//     </ShadowCard>
//   );
// };

// screens/home/components/SkinHealthCard.tsx
import React from 'react';
import { View, Text } from 'react-native';
import ShadowCard from '@/components/cards/ShadowCard';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import CircularProgress from '@/components/home/CircularProgress';
// import { FaceScanIcon, HairIcon } from '@/components/icons';
import { SkinMetric } from '@/types/home';

interface SkinHealthCardProps {
  faceScore: number;
  hairScore: number;
  metrics: SkinMetric[];
}

export const SkinHealthCard: React.FC<SkinHealthCardProps> = ({
  faceScore,
  hairScore,
  metrics,
}) => {
  return (
    <ShadowCard style={{ borderBottomColor: '#FFFFFF66', borderBottomWidth: 2 }}>
      {/* Face and Hair Scores Row */}
      <View className="flex-row items-center justify-between px-4 py-6">
        {/* Face Score - Left */}
        <View className="flex-1 items-center">
          <CircularProgress progress={faceScore} size={100} strokeWidth={8} />
          <View className="mt-4 flex-row items-center justify-center gap-2">
            {/* <FaceScanIcon size={20} color="#361A0D" /> */}
            <Text className="font-outfitMedium text-[14px] text-[#2A211899]">Face Scan</Text>
          </View>
        </View>

        {/* Vertical Divider Line */}
        <View
          style={{
            width: 1,
            height: 120,
            backgroundColor: '#D4C5B0',
            marginHorizontal: 16,
          }}
        />

        {/* Hair Score - Right */}
        <View className="flex-1 items-center">
          <CircularProgress progress={hairScore} size={100} strokeWidth={8} />
          <View className="mt-4 flex-row items-center justify-center gap-2">
            {/* <HairIcon size={20} color="#361A0D" /> */}
            <Text className="font-outfitMedium text-[14px] text-[#2A211899]">Hair Scan</Text>
          </View>
        </View>
      </View>

      {/* Skin Metrics Section */}
      <View className="mb-4 mt-2 flex-row items-center gap-4">
        {metrics.map((metric) => (
          <View key={metric.id} className="flex-1">
            <BorderlessShadowCard b_bl={12} b_br={12} b_tl={12} b_tr={12}>
              <View className="flex-row items-center justify-center gap-1">
                <View
                  className="h-[10] w-[10] rounded-full"
                  style={{ backgroundColor: metric.color }}
                />
                <Text className="font-outfitMedium text-[12px] text-[#2A211899]">
                  {metric.label}
                </Text>
              </View>
              <Text className="mt-3 text-center font-outfitMedium text-[16px]">{metric.value}</Text>
            </BorderlessShadowCard>
          </View>
        ))}
      </View>
    </ShadowCard>
  );
};
