// // components/scans/RecipesSection.tsx
// import React from 'react';
// import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
// import { RecipesIcon } from '../icons/RecipesIcon';

// export interface RecommendedRecipe {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: any;
//   tags: string[];
//   duration?: string;
// }

// interface RecipesSectionProps {
//   recommendedRecipes: RecommendedRecipe[];
//   title?: string;
//   showIcon?: boolean;
//   onRecipePress?: (recipe: RecommendedRecipe) => void;
// }

// export const RecipesSection: React.FC<RecipesSectionProps> = ({
//   recommendedRecipes,
//   title = 'Recipes for Your Skin',
//   showIcon = true,
//   onRecipePress,
// }) => {
//   const screenWidth = Dimensions.get('window').width;
//   const horizontalPadding = 32; // matches px-container
//   const cardWidth = screenWidth - horizontalPadding;
//   const imageHeight = 180;

//   const getImageSource = (source: any) => {
//     if (
//       typeof source === 'string' &&
//       (source.startsWith('http://') || source.startsWith('https://'))
//     ) {
//       return { uri: source };
//     }
//     return source;
//   };

//   return (
//     <View className="mt-6">
//       {/* Header */}
//       <View className="flex-row items-center gap-3">
//         {showIcon && <RecipesIcon size={32} />}
//         <Text className="font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
//           {title}
//         </Text>
//       </View>

//       {recommendedRecipes.length === 0 ? (
//         <View
//           className="mt-3 p-4"
//           style={{
//             borderRadius: 24,
//             borderWidth: 1,
//             borderColor: '#FFFFFF99',
//             alignItems: 'center',
//           }}>
//           <Text className="text-center font-outfit text-[14px]" style={{ color: '#977857' }}>
//             No recipes available
//           </Text>
//         </View>
//       ) : (
//         <>
//           <ScrollView
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             decelerationRate="fast"
//             snapToInterval={cardWidth + 12} // card width + gap
//             snapToAlignment="start"
//             className="mt-3"
//             contentContainerStyle={{ gap: 12, paddingRight: 16 }}>
//             {recommendedRecipes.map((recipe) => {
//               const imageSource = getImageSource(recipe.imageUrl);

//               return (
//                 <TouchableOpacity
//                   key={recipe.id}
//                   activeOpacity={0.95}
//                   onPress={() => onRecipePress?.(recipe)}
//                   style={{
//                     width: cardWidth,
//                     borderRadius: 24,
//                     backgroundColor: 'transparent',
//                     overflow: 'hidden',
//                     borderWidth: 3,
//                     borderLeftWidth: 1.5,
//                     borderRightWidth: 1.5,
//                     borderColor: '#FFFFFF66',
//                   }}>
//                   {/* Image */}
//                   <View
//                     style={{
//                       width: '100%',
//                       height: imageHeight,
//                       overflow: 'hidden',
//                       backgroundColor: '#E8DDD0',
//                     }}>
//                     <Image
//                       source={imageSource}
//                       style={{ width: '100%', height: '100%' }}
//                       resizeMode="cover"
//                     />
//                   </View>

//                   {/* Content */}
//                   <View style={{ padding: 14, gap: 6 }}>
//                     <Text
//                       className="font-outfitMedium text-[15px]"
//                       style={{ color: '#2E2117' }}
//                       numberOfLines={2}>
//                       {recipe.title}
//                     </Text>
//                     <Text
//                       className="font-outfit text-[12px]"
//                       style={{ color: '#666666', lineHeight: 16 }}
//                       numberOfLines={2}>
//                       {recipe.description}
//                     </Text>

//                     {/* Tags */}
//                     <View className="mt-2 flex-row flex-wrap gap-2">
//                       {recipe.tags.map((tag, index) => (
//                         <View
//                           key={index}
//                           style={{
//                             backgroundColor: '#FCEBE1',
//                             paddingHorizontal: 10,
//                             paddingVertical: 4,
//                             borderRadius: 20,
//                             borderWidth: 1,
//                             borderTopWidth: 1.5,
//                             borderBottomWidth: 1.5,
//                             borderColor: '#FFFFFF66',
//                           }}>
//                           <Text
//                             className="font-outfitMedium text-[10px]"
//                             style={{ color: '#A65E3A' }}>
//                             {tag}
//                           </Text>
//                         </View>
//                       ))}
//                       {recipe.duration && (
//                         <View
//                           style={{
//                             backgroundColor: '#FCEBE1',
//                             paddingHorizontal: 10,
//                             paddingVertical: 4,
//                             borderRadius: 20,
//                           }}>
//                           <Text
//                             className="font-outfitMedium text-[10px]"
//                             style={{ color: '#A65E3A' }}>
//                             🕒 {recipe.duration}
//                           </Text>
//                         </View>
//                       )}
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>

//           {/* Dot indicators — only shown when more than one recipe */}
//           {recommendedRecipes.length > 1 && (
//             <View className="mt-3 flex-row items-center justify-center gap-1">
//               {recommendedRecipes.map((_, i) => (
//                 <View
//                   key={i}
//                   style={{
//                     width: i === 0 ? 16 : 6,
//                     height: 6,
//                     borderRadius: 3,
//                     backgroundColor: i === 0 ? '#977857' : '#97785740',
//                   }}
//                 />
//               ))}
//             </View>
//           )}
//         </>
//       )}
//     </View>
//   );
// };

// components/scans/RecipesSection.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { RecipesIcon } from '../icons/RecipesIcon';

export interface RecommendedRecipe {
  id: string;
  title: string;
  description: string;
  imageUrl: any;
  tags: string[];
  duration?: string;
}

interface RecipesSectionProps {
  recommendedRecipes: RecommendedRecipe[];
  title?: string;
  showIcon?: boolean;
  onRecipePress?: (recipe: RecommendedRecipe) => void;
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({
  recommendedRecipes,
  title = 'Recipes for Your Skin',
  showIcon = true,
  onRecipePress,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 32;
  const cardWidth = screenWidth - horizontalPadding;
  const imageHeight = 180;
  const snapInterval = cardWidth + 12; // card width + gap

  // ── Active dot tracking ──────────────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / snapInterval);
    const clamped = Math.max(0, Math.min(index, recommendedRecipes.length - 1));
    if (clamped !== activeIndex) setActiveIndex(clamped);
  };

  const getImageSource = (source: any) => {
    if (
      typeof source === 'string' &&
      (source.startsWith('http://') || source.startsWith('https://'))
    ) {
      return { uri: source };
    }
    return source;
  };

  return (
    <View className="mt-6">
      {/* Header */}
      <View className="flex-row items-center gap-3">
        {showIcon && <RecipesIcon size={32} />}
        <Text className="font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
          {title}
        </Text>
      </View>

      {recommendedRecipes.length === 0 ? (
        <View
          className="mt-3 p-4"
          style={{
            borderRadius: 24,
            borderWidth: 1,
            borderColor: '#FFFFFF99',
            alignItems: 'center',
          }}>
          <Text className="text-center font-outfit text-[14px]" style={{ color: '#977857' }}>
            No recipes available
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={snapInterval}
            snapToAlignment="start"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            className="mt-3"
            contentContainerStyle={{ gap: 12, paddingRight: 16 }}>
            {recommendedRecipes.map((recipe) => {
              const imageSource = getImageSource(recipe.imageUrl);

              return (
                <TouchableOpacity
                  key={recipe.id}
                  activeOpacity={0.95}
                  onPress={() => onRecipePress?.(recipe)}
                  style={{
                    width: cardWidth,
                    borderRadius: 24,
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                    borderWidth: 3,
                    borderLeftWidth: 1.5,
                    borderRightWidth: 1.5,
                    borderColor: '#FFFFFF66',
                  }}>
                  {/* Image */}
                  <View
                    style={{
                      width: '100%',
                      height: imageHeight,
                      overflow: 'hidden',
                      backgroundColor: '#E8DDD0',
                    }}>
                    <Image
                      source={imageSource}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  </View>

                  {/* Content */}
                  <View style={{ padding: 14, gap: 6 }}>
                    <Text
                      className="font-outfitMedium text-[15px]"
                      style={{ color: '#2E2117' }}
                      numberOfLines={2}>
                      {recipe.title}
                    </Text>
                    <Text
                      className="font-outfit text-[12px]"
                      style={{ color: '#666666', lineHeight: 16 }}
                      numberOfLines={2}>
                      {recipe.description}
                    </Text>

                    {/* Tags */}
                    <View className="mt-2 flex-row flex-wrap gap-2">
                      {recipe.tags.map((tag, index) => (
                        <View
                          key={index}
                          style={{
                            backgroundColor: '#FCEBE1',
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderTopWidth: 1.5,
                            borderBottomWidth: 1.5,
                            borderColor: '#FFFFFF66',
                          }}>
                          <Text
                            className="font-outfitMedium text-[10px]"
                            style={{ color: '#A65E3A' }}>
                            {tag}
                          </Text>
                        </View>
                      ))}
                      {recipe.duration && (
                        <View
                          style={{
                            backgroundColor: '#FCEBE1',
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 20,
                          }}>
                          <Text
                            className="font-outfitMedium text-[10px]"
                            style={{ color: '#A65E3A' }}>
                            🕒 {recipe.duration}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Dot indicators — tracks active card via scroll position */}
          {recommendedRecipes.length > 1 && (
            <View className="mt-3 flex-row items-center justify-center gap-1">
              {recommendedRecipes.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: i === activeIndex ? 16 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: i === activeIndex ? '#977857' : '#97785740',
                  }}
                />
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};
