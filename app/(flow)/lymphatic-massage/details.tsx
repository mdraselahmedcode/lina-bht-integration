// app/(flow)/tutorial-details/index.tsx (using hook properly)
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { TutorialVideoPlayer } from '@/components/tutorials/TutorialVideoPlayer';
import { useTutorials } from '@/hooks/useTutorials';
import { useToast } from '@/hooks/useToast';
import IconBadge from '@/components/icons/modified/IconBadge';
import {
  ArrowRightHalfIcon,
  ArrowRightIcon,
  EarIcon,
  FlameIcon,
  LoveIcon,
  MoonIcon,
  SunIcon,
  ThreeCurvedIcon,
  WaterGlassIcon,
  ZLikeIcon,
} from '@/components/icons';
import IconButton from '@/components/buttons/IconButton';
import { Ionicons } from '@expo/vector-icons';
import { FaceIcon } from '@/components/icons/FaceIcon';
import { WheelChairIcon } from '@/components/icons/WheelChairIcon';
import { CheckIconButton } from '@/components/CheckIconButton';
import { StarWithDoublePlusIcon } from '@/components/icons/StarWithDoublePlusIcon';

export default function LymphaticMassageDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { showError } = useToast();
  const { tutorials, isLoading: isTutorialsLoading } = useTutorials();
  const [tutorial, setTutorial] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tutorialId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (!isTutorialsLoading && tutorials.length > 0) {
      const found = tutorials.find((t) => t.id === tutorialId);
      if (found) {
        setTutorial(found);
      } else {
        showError('Tutorial not found');
      }
      setIsLoading(false);
    }
  }, [tutorials, isTutorialsLoading, tutorialId]);

  if (isLoading || isTutorialsLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Tutorial" height={50} backButton={true} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#977857" />
          <Text className="text-descriptionTextColor mt-4 font-outfit text-[14px]">
            Loading tutorial...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!tutorial) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Tutorial" height={50} backButton={true} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-descriptionTextColor font-outfit text-[16px]">
            Tutorial not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Tutorial" height={50} backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 20,
        }}
        className="flex-1">
        <View className="px-container">
          {/* Section 1 */}
          <View
            className="overflow-hidden bg-backgroundColor p-5" // Added overflow-hidden
            style={{
              borderRadius: 24,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,

              borderColor: '#FFFFFF66',
            }}>
            <View className="flex-1 flex-row items-start gap-3 ">
              <View className="flex-1">
                <Text
                  className="mb-3  font-outfitMedium  text-[24px] text-titleTextColor"
                  style={
                    {
                      // textShadowColor: '#FFFFFF',
                      // textShadowOffset: { width: 1, height: 1 },
                      // textShadowRadius: 1,
                    }
                  }>
                  Support your lymph, transform your skin.
                </Text>
                <Text className="font-outfit text-[13px] text-[#6B6B66] ">
                  A simple daily routine to detox, reduce puffiness and reveal your natural glow.
                </Text>
              </View>

              <Image
                source={require('@/assets/images/lymphatic_massage/face_section_1_right.jpg')}
                className="h-[153px] w-[115px] rounded-2xl" // Given explicit height and rounding
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Section 1 */}
          <View
            className="mt-5 overflow-hidden bg-backgroundColor p-5" // Added overflow-hidden
            style={{
              borderRadius: 24,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,

              borderColor: '#FFFFFF66',
            }}>
            <Text className="font-outfitMedium text-[20px]  text-titleTextColor  ">
              1. What is the lymphatic system?
            </Text>
            <View className="mt-3 flex-1 flex-row items-start gap-4 ">
              <Image
                source={require('@/assets/images/lymphatic_massage/face_lymphatic_sys_left.jpg')}
                className="h-[153px] w-[115px] rounded-2xl" // Given explicit height and rounding
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="font-outfit text-[13px] text-[#6B6B66] " style={{}}>
                  The lymphatic system is a network of vessels that helps your body remove waste,
                  toxins and excess fluids.
                </Text>
                <Text className="mt-2 font-outfit text-[13px] text-[#6B6B66] ">
                  A simple daily routine to detox, reduce puffiness and natural glow.
                </Text>
              </View>
            </View>
          </View>

          {/* Section 3 */}
          <View
            className="mt-5 overflow-hidden bg-backgroundColor p-5" // Added overflow-hidden
            style={{
              borderRadius: 24,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,

              borderColor: '#FFFFFF66',
            }}>
            <Text className="font-outfitMedium text-[20px]  text-titleTextColor  ">
              2. Why does lymph become sluggish?
            </Text>
            <View className="mt-4 gap-3 ">
              <View className="flex-row items-start ">
                <View className="flex-row items-center gap-3  ">
                  <IconBadge
                    size={28}
                    style={{ backgroundColor: '#EEF1E8', borderWidth: 0 }}
                    icon={<ZLikeIcon width={14} height={14} color="#3F4D3A" />}
                  />
                  <Text className="font-outfit text-[13px] text-[#2A2A2A] ">Lack of movement</Text>
                </View>
              </View>
              <View className="flex-row items-start ">
                <View className="flex-row items-center gap-3  ">
                  <IconBadge
                    size={28}
                    style={{ backgroundColor: '#EEF1E8', borderWidth: 0 }}
                    icon={<ThreeCurvedIcon width={14} height={14} color="#3F4D3A" />}
                  />
                  <Text className="font-outfit text-[13px] text-[#2A2A2A] ">
                    Stress and shallow breathing
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start ">
                <View className="flex-row items-center gap-3  ">
                  <IconBadge
                    size={28}
                    style={{ backgroundColor: '#EEF1E8', borderWidth: 0 }}
                    icon={<FlameIcon width={14} height={14} color="#3F4D3A" />}
                  />
                  <Text className="font-outfit text-[13px] text-[#2A2A2A] ">Dehydration</Text>
                </View>
              </View>
            </View>
            <View
              className="mt-5 bg-[#EEF1E8] p-3 "
              style={{
                borderRadius: 16,
              }}>
              <Text className="font-outfitMedium text-[16px] text-[#2A2A2A]  ">
                When lymph slows down, you may experience:
              </Text>
              <View className="mt-3 gap-1">
                <View className="flex-row items-center gap-x-2">
                  <View className="h-1 w-1 rounded-full bg-[#3F4D3A]" />
                  <Text className="font-outfit text-[13px] text-[#6B6B66]">Facial puffiness</Text>
                </View>
                <View className="flex-row items-center gap-x-2">
                  <View className="h-1 w-1 rounded-full bg-[#3F4D3A]" />
                  <Text className="font-outfit text-[13px] text-[#6B6B66]">Dull skin</Text>
                </View>
                <View className="flex-row items-center gap-x-2">
                  <View className="h-1 w-1 rounded-full bg-[#3F4D3A]" />
                  <Text className="font-outfit text-[13px] text-[#6B6B66]">Breakouts</Text>
                </View>
                <View className="flex-row items-center gap-x-2">
                  <View className="h-1 w-1 rounded-full bg-[#3F4D3A]" />
                  <Text className="font-outfit text-[13px] text-[#6B6B66]">Dark circles</Text>
                </View>
                <View className="flex-row items-center gap-x-2">
                  <View className="h-1 w-1 rounded-full bg-[#3F4D3A]" />
                  <Text className="font-outfit text-[13px] text-[#6B6B66]">Scalp tension</Text>
                </View>
              </View>
            </View>

            <View
              className=" mt-4 flex-row flex-wrap items-center gap-6 bg-[#EEF1E8] px-[16px] py-[14px] "
              style={{
                borderRadius: 16,
              }}>
              <Text className="mt-2 flex-1 font-outfit text-[13px] text-[#6B6B66] ">
                Most skin and face issues are linked to poor lymph circulation.
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#3F4D3A" />
            </View>
          </View>

          {/* Section 3 - Before you start */}
          <View
            className="mt-5 overflow-hidden bg-backgroundColor"
            style={{
              borderRadius: 24,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: '#FFFFFF66',
              paddingVertical: 20,
            }}>
            {/* Header Section */}
            <View className="px-5">
              <Text className="font-outfitMedium text-[20px] text-titleTextColor">
                3. Before you start
              </Text>
              <Text className="mt-3 font-outfit text-[13px] text-[#6B6B66]">
                Prepare your body to help the lymph flow.
              </Text>
            </View>

            {/* Slideable Icons Section - Fixed spacing */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }} // Use gap for consistent spacing
              className="mt-6">
              {/* Item 1 - Fixed width ensures consistent spacing */}
              <View className="w-[80px] items-center">
                <IconBadge size={64} icon={<ThreeCurvedIcon width={24} height={24} />} />
                <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                  Take 5 deep belly breaths
                </Text>
              </View>

              {/* Item 2 */}
              <View className="w-[80px] items-center">
                <IconBadge size={64} icon={<FaceIcon width={24} height={24} />} />
                <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                  Relax your shoulders and jaw
                </Text>
              </View>

              {/* Item 3 */}
              <View className="w-[80px] items-center">
                <IconBadge size={64} icon={<WheelChairIcon width={24} height={24} />} />
                <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                  Sit or stand straight
                </Text>
              </View>

              {/* Item 4 */}
              <View className="w-[80px] items-center">
                <IconBadge size={64} icon={<WaterGlassIcon width={24} height={24} />} />
                <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                  Drink a glass of water
                </Text>
              </View>
            </ScrollView>

            {/* Footer Link Section */}
            <View className="mt-6 px-5">
              <View
                className="flex-row items-center justify-between bg-[#EEF1E8] px-4 py-3"
                style={{ borderRadius: 16 }}>
                <Text className="flex-1 pr-2 font-outfit text-[13px] leading-5 text-[#6B6B66]">
                  This activates your lymph and makes the massage more effective.
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#3F4D3A" />
              </View>
            </View>
          </View>

          {/* Section 4 */}
          <View
            className="mt-5 overflow-hidden bg-backgroundColor p-5"
            style={{
              borderRadius: 24,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: '#FFFFFF66',
            }}>
            <Text className="font-outfitMedium text-[20px] text-titleTextColor">
              4. Lymphatic Massage Tutorial
            </Text>

            <View className="mt-3">
              {/* Video Player */}
              <TutorialVideoPlayer videoUrl={tutorial.videoUrl} />
            </View>
            <View className="flex-row items-center gap-3 ">
              <View
                className="flex-1 rounded-2xl "
                style={{
                  backgroundColor: '#F5F0E8',
                  padding: 12,
                }}>
                <Text className="mb-2 font-outfitMedium text-[16px] text-titleTextColor ">
                  How often?
                </Text>
                <View className="gap-2">
                  <View className="flex-row items-start gap-x-2">
                    <View className="mt-[6px] h-2 w-2 rounded-full bg-[#3F4D3A]" />
                    <Text className="font-outfit text-[13px] text-[#6B6B66]">Facial puffiness</Text>
                  </View>
                  <View className="flex-row items-start gap-x-2">
                    <View className="mt-[6px] h-2 w-2 rounded-full bg-[#3F4D3A]" />
                    <Text className="font-outfit text-[13px] text-[#6B6B66]">
                      Twice a day if you have puffiness or skin issues
                    </Text>
                  </View>
                </View>
              </View>
              <View
                className="flex-1 rounded-2xl "
                style={{
                  backgroundColor: '#F5F0E8',
                  padding: 12,
                }}>
                <Text className="mb-2 font-outfitMedium text-[16px] text-titleTextColor ">
                  Best moments
                </Text>
                <View className="gap-2">
                  <View className="flex-row items-start gap-x-2">
                    <SunIcon size={14} color="#3F4D3A" style={{ marginTop: 2 }} />
                    <Text className="font-outfit text-[13px] text-[#6B6B66]">
                      Morning (depuff & glow)
                    </Text>
                  </View>
                  <View className="flex-row items-start gap-x-2">
                    <MoonIcon size={14} color="#3F4D3A" style={{ marginTop: 2 }} />
                    <Text className="font-outfit text-[13px] text-[#6B6B66]">
                      Evening (detox & relax)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Section 5 */}
          <View
            className="mt-5 overflow-hidden bg-backgroundColor p-5"
            style={{
              borderRadius: 24,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: '#FFFFFF66',
              paddingVertical: 20, // Keep vertical padding here
            }}>
            {/* Header Section - Manual padding since parent no longer has horizontal padding */}
            <Text className="font-outfitMedium text-[20px] text-titleTextColor">
              5. Massage Steps
            </Text>
            <Text className="mb-1 mt-2 font-outfit text-[13px] text-[#6B6B66]">
              Always move downwards toward the collarbones.
            </Text>

            {/* step--1 */}
            <View
              className="mt-3 "
              style={{
                backgroundColor: '#F5F0E899',
                padding: 10,
                borderRadius: 16,
              }}>
              <View className="flex-row items-start gap-3">
                <Image
                  source={require('@/assets/images/lymphatic_massage/face_steps/step_1.png')}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#FFFFFF88',
                  }}
                  resizeMode="cover"
                />
                <View className="flex-1 gap-2 ">
                  <View className="flex-row items-start gap-2 ">
                    <IconBadge
                      size={20}
                      style={{
                        backgroundColor: '#3F4D3A',
                        borderWidth: 0,
                      }}
                      icon={
                        <Text
                          className="font-outfitSemi text-[10px]  "
                          style={{
                            color: '#FFFFFF',
                          }}>
                          1
                        </Text>
                      }
                    />
                    <Text className="font-outfitMedium text-[13px] text-titleTextColor ">
                      Collarbones
                    </Text>
                  </View>
                  <Text className=" flex-1 flex-wrap font-outfit text-[10px] text-[#6B6B66] ">
                    Use flat hands, glide from the center of the chest outwards to the shoulders.
                    Repeat 3 times.
                  </Text>
                </View>
              </View>
            </View>

            {/* step--2 */}
            <View
              className="mt-3 "
              style={{
                backgroundColor: '#F5F0E899',
                padding: 10,
                borderRadius: 16,
              }}>
              <View className="flex-row items-start gap-3">
                <Image
                  source={require('@/assets/images/lymphatic_massage/face_steps/step_2.png')}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#FFFFFF88',
                  }}
                  resizeMode="cover"
                />
                <View className="flex-1 gap-2 ">
                  <View className="flex-row items-start gap-2 ">
                    <IconBadge
                      size={20}
                      style={{
                        backgroundColor: '#3F4D3A',
                        borderWidth: 0,
                      }}
                      icon={
                        <Text
                          className="font-outfitSemi text-[10px]  "
                          style={{
                            color: '#FFFFFF',
                          }}>
                          2
                        </Text>
                      }
                    />
                    <Text className="font-outfitMedium text-[13px] text-titleTextColor ">Neck</Text>
                  </View>
                  <Text className=" flex-1 flex-wrap font-outfit text-[10px] text-[#6B6B66] ">
                    Sweep downward on both sides of the neck, from behind the ears to the
                    collarbones.
                  </Text>
                </View>
              </View>
            </View>

            {/* step--3 */}
            <View
              className="mt-3 "
              style={{
                backgroundColor: '#F5F0E899',
                padding: 10,
                borderRadius: 16,
              }}>
              <View className="flex-row items-start gap-3">
                <Image
                  source={require('@/assets/images/lymphatic_massage/face_steps/step_3.png')}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#FFFFFF88',
                  }}
                  resizeMode="cover"
                />
                <View className="flex-1 gap-2 ">
                  <View className="flex-row items-start gap-2 ">
                    <IconBadge
                      size={20}
                      style={{
                        backgroundColor: '#3F4D3A',
                        borderWidth: 0,
                      }}
                      icon={
                        <Text
                          className="font-outfitSemi text-[10px]  "
                          style={{
                            color: '#FFFFFF',
                          }}>
                          3
                        </Text>
                      }
                    />
                    <Text className="font-outfitMedium text-[13px] text-titleTextColor ">Jaw</Text>
                  </View>
                  <Text className=" flex-1 flex-wrap font-outfit text-[10px] text-[#6B6B66] ">
                    Use your fingers or knuckles to glide from the chin to the ears.
                  </Text>
                </View>
              </View>
            </View>

            {/* step--4 */}
            <View
              className="mt-3 "
              style={{
                backgroundColor: '#F5F0E899',
                padding: 10,
                borderRadius: 16,
              }}>
              <View className="flex-row items-start gap-3">
                <Image
                  source={require('@/assets/images/lymphatic_massage/face_steps/step_4.png')}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#FFFFFF88',
                  }}
                  resizeMode="cover"
                />
                <View className="flex-1 gap-2 ">
                  <View className="flex-row items-start gap-2 ">
                    <IconBadge
                      size={20}
                      style={{
                        backgroundColor: '#3F4D3A',
                        borderWidth: 0,
                      }}
                      icon={
                        <Text
                          className="font-outfitSemi text-[10px]  "
                          style={{
                            color: '#FFFFFF',
                          }}>
                          4
                        </Text>
                      }
                    />
                    <Text className="font-outfitMedium text-[13px] text-titleTextColor ">Face</Text>
                  </View>
                  <Text className=" flex-1 flex-wrap font-outfit text-[10px] text-[#6B6B66] ">
                    Glide from the center of the face outwards and downwards toward the lymph nodes.
                  </Text>
                </View>
              </View>
            </View>

            {/* step--5 */}
            <View
              className="mt-3 "
              style={{
                backgroundColor: '#F5F0E899',
                padding: 10,
                borderRadius: 16,
              }}>
              <View className="flex-row items-start gap-3">
                <Image
                  source={require('@/assets/images/lymphatic_massage/face_steps/step_5.png')}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#FFFFFF88',
                  }}
                  resizeMode="cover"
                />
                <View className="flex-1 gap-2 ">
                  <View className="flex-row items-start gap-2 ">
                    <IconBadge
                      size={20}
                      style={{
                        backgroundColor: '#3F4D3A',
                        borderWidth: 0,
                      }}
                      icon={
                        <Text
                          className="font-outfitSemi text-[10px]  "
                          style={{
                            color: '#FFFFFF',
                          }}>
                          5
                        </Text>
                      }
                    />
                    <Text className="font-outfitMedium text-[13px] text-titleTextColor ">
                      Under Eyes
                    </Text>
                  </View>
                  <Text className=" flex-1 flex-wrap font-outfit text-[10px] text-[#6B6B66] ">
                    Gently sweep from the inner corner of the eye to the temples.
                  </Text>
                </View>
              </View>
            </View>

            {/* step--6 */}
            <View
              className="mt-3 "
              style={{
                backgroundColor: '#F5F0E899',
                padding: 10,
                borderRadius: 16,
              }}>
              <View className="flex-row items-start gap-3">
                <Image
                  source={require('@/assets/images/lymphatic_massage/face_steps/step_6.png')}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#FFFFFF88',
                  }}
                  resizeMode="cover"
                />
                <View className="flex-1 gap-2 ">
                  <View className="flex-row items-start gap-2 ">
                    <IconBadge
                      size={20}
                      style={{
                        backgroundColor: '#3F4D3A',
                        borderWidth: 0,
                      }}
                      icon={
                        <Text
                          className="font-outfitSemi text-[10px]  "
                          style={{
                            color: '#FFFFFF',
                          }}>
                          6
                        </Text>
                      }
                    />
                    <Text className="font-outfitMedium text-[13px] text-titleTextColor ">
                      Scalp (optional)
                    </Text>
                  </View>
                  <Text className=" flex-1 flex-wrap font-outfit text-[10px] text-[#6B6B66] ">
                    Use your fingertips to make small circles on the scalp. This helps detox and
                    stimulate circulation.
                  </Text>
                </View>
              </View>
            </View>

            {/* Footer Link Section */}
            <View
              className="mt-4 flex-row items-center justify-between bg-[#EEF1E8] px-[16px] py-[14px]"
              style={{ borderRadius: 16 }}>
              <View
                className="flex-1 flex-row items-center gap-3 pr-2 "
                style={{
                  marginRight: 40,
                }}>
                <IconBadge
                  style={{ backgroundColor: '#FFFFFF99' }}
                  size={28}
                  icon={<SunIcon size={16} color="#3F4D3A" />}
                />
                <Text className="  font-outfit text-[13px] text-[#6B6B66]">
                  Be gentle. Light pressure is enough. Consistency is the key.
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={16} color="#3F4D3A" />
            </View>
          </View>

          {/* Section 6 */}
          <View
            className="mt-5 overflow-hidden bg-backgroundColor"
            style={{
              borderRadius: 24,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: '#FFFFFF66',
              paddingVertical: 20,
            }}>
            {/* Header Section */}
            <View className="px-5">
              <Text className="font-outfitMedium text-[20px] text-titleTextColor">
                6. After the massage
              </Text>
              <Text className="mt-3 font-outfit text-[13px] text-[#6B6B66]">
                Your body is now eliminating toxins.
              </Text>
            </View>

            {/* Slideable Icons Section - Fixed spacing */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }} // Use gap for consistent spacing
              className="mt-6">
              {/* Item 1 - Fixed width ensures consistent spacing */}
              <View className="w-[80px] items-center">
                <IconBadge size={64} icon={<FlameIcon width={24} height={24} />} />
                <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                  You may feel the {'\n'} need to urinate
                </Text>
              </View>

              {/* Item 2 */}
              <View className="w-[80px] items-center">
                <IconBadge size={64} icon={<WaterGlassIcon width={24} height={24} />} />
                <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                  You may feel {'\n'} thirsty
                </Text>
              </View>

              {/* Item 3 */}
              <View className="w-[80px] items-center">
                <IconBadge size={64} icon={<MoonIcon width={24} height={24} />} />
                <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                  You may feel {'\n'} relaxed or sleepy
                </Text>
              </View>
            </ScrollView>

            {/* Footer Link Section */}
            <View className="mt-6 px-5">
              <View
                className="flex-row items-center justify-between bg-[#EEF1E8] px-4 py-3"
                style={{ borderRadius: 16 }}>
                <View
                  className="flex-1 flex-row items-center gap-3 pr-2 "
                  style={{
                    marginRight: 40,
                  }}>
                  <IconBadge
                    style={{ backgroundColor: '#FFFFFF99' }}
                    size={28}
                    icon={<WaterGlassIcon size={16} color="#3F4D3A" />}
                  />
                  <Text className="  font-outfit text-[13px] text-[#6B6B66]">
                    Be gentle. Light pressure is enough. Consistency is the key.
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={16} color="#3F4D3A" />
              </View>
            </View>
          </View>

          {/* Section 7 */}
          <View
            className="relative mt-6 bg-backgroundColor p-5 "
            style={{
              borderRadius: 24,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: '#FFFFFF66',
              paddingVertical: 20,
            }}>
            <Image
              source={require('@/assets/images/lymphatic_massage/two_leaf.png')}
              style={{
                width: 112,
                height: '100%',
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              resizeMode="cover"
            />
            <Text className="font-outfitMedium text-[20px] text-titleTextColor">
              7. Key Benefits
            </Text>
            <View className="flex-row items-center gap-2">
              <IconBadge
                size={20}
                icon={<Ionicons name="checkmark" size={12} color={'#3F4D3A'} />}
                style={{ marginTop: 12, backgroundColor: '#EEF1E8' }}
              />
              <Text className="mt-3 font-outfit text-[13px] text-subTitleTextColor">
                Your body is now eliminating toxins.
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <IconBadge
                size={20}
                icon={<Ionicons name="checkmark" size={12} color={'#3F4D3A'} />}
                style={{ marginTop: 12, backgroundColor: '#EEF1E8' }}
              />
              <Text className="mt-3 font-outfit text-[13px] text-subTitleTextColor">
                Improves skin glow and tone
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <IconBadge
                size={20}
                icon={<Ionicons name="checkmark" size={12} color={'#3F4D3A'} />}
                style={{ marginTop: 12, backgroundColor: '#EEF1E8' }}
              />
              <Text className="mt-3 font-outfit text-[13px] text-subTitleTextColor">
                Helps reduce breakouts
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <IconBadge
                size={20}
                icon={<Ionicons name="checkmark" size={12} color={'#3F4D3A'} />}
                style={{ marginTop: 12, backgroundColor: '#EEF1E8' }}
              />
              <Text className="mt-3 font-outfit text-[13px] text-subTitleTextColor">
                Reduces dark circles
              </Text>
            </View>
          </View>

          <Text
            className="mt-6 flex-1 text-center font-didot "
            style={{
              color: '#2A2A2A',
              fontSize: 18,
            }}>
            Be consistent, be gentle, be patient.
          </Text>

          <View className="mt-5">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              className="-mx-5">
              <View className="flex-row gap-4">
                {/* Item 1 - Take care of your lymph */}
                <View className="items-center" style={{ width: 85 }}>
                  <IconBadge
                    style={{ backgroundColor: '#FFFFFF' }}
                    size={48}
                    icon={<LoveIcon size={20} color="#3F4D3A" />}
                  />
                  <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                    Take care of your{'\n'}lymph
                  </Text>
                </View>

                {/* Item 2 - Listen to your body */}
                <View className="items-center" style={{ width: 85 }}>
                  <IconBadge
                    style={{ backgroundColor: '#FFFFFF' }}
                    size={48}
                    icon={<EarIcon size={20} color="#3F4D3A" />}
                  />
                  <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                    Listen to{'\n'}your body
                  </Text>
                </View>

                {/* Item 3 - Stay hydrated */}
                <View className="items-center" style={{ width: 85 }}>
                  <IconBadge
                    style={{ backgroundColor: '#FFFFFF' }}
                    size={48}
                    icon={<FlameIcon size={20} color="#3F4D3A" />}
                  />
                  <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                    Stay{'\n'}hydrated
                  </Text>
                </View>

                {/* Item 4 - Glow naturally */}
                <View className="items-center" style={{ width: 85 }}>
                  <IconBadge
                    style={{ backgroundColor: '#FFFFFF' }}
                    size={48}
                    icon={<StarWithDoublePlusIcon size={20} color="#3F4D3A" />}
                  />
                  <Text className="mt-2 text-center font-outfit text-[11px] leading-4 text-[#6B6B66]">
                    Glow{'\n'}naturally
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
