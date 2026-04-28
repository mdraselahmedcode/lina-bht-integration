// app/(main)/routines/step-details.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { routineSteps } from '@/constants/routineData';
import { useToast } from '@/hooks/useToast';
import { TutorialVideoPlayer } from '@/components/tutorials/TutorialVideoPlayer';
import { Ionicons } from '@expo/vector-icons';
import { StarWithDoublePlusIcon } from '@/components/icons/StarWithDoublePlusIcon';
import { BookIcon, CheckInCircleIcon, FlameIcon } from '@/components/icons';
import { KeyNutrientsSection, Nutrient } from '@/components/scans/KeyNutrientsSection';
import {
  FoodRecommendationSection,
  RecommendedFood,
} from '@/components/scans/FoodRecommendationSection';
import { RecipesSection, RecommendedRecipe } from '@/components/scans/RecipesSection';
import { HydrationTargetCard } from '@/components/scans/HydrationTargetCard';

// Static nutrients data - just like the others!
const NUTRIENTS_DATA: Nutrient[] = [
  {
    id: 'omega-3',
    name: 'Omega-3',
    description: 'Reduces inflammation, strengthens the skin barrier and improves hydration.',
    imageUrl: require('@/assets/images/nutrition_static_images/omega-3.png'),
  },
  {
    id: 'zinc',
    name: 'Zinc',
    description: 'Supports skin healing, reduces inflammation, and helps with acne management.',
    imageUrl: require('@/assets/images/nutrition_static_images/zinc.png'),
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C',
    description: 'Boosts collagen production, brightens skin, and provides antioxidant protection.',
    imageUrl: require('@/assets/images/nutrition_static_images/vitamin-c.png'),
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    description:
      'Supports skin cell repair, balances the microbiome, and calms persistent inflammation.',
    imageUrl: require('@/assets/images/nutrition_static_images/magnesium.png'),
  },
];

// Static recommendation food data
const RECOMMENDED_FOODS_DATA: RecommendedFood[] = [
  {
    id: 'avocado',
    name: 'Avocado',
    description: 'Healthy fats',
    imageUrl: require('@/assets/images/nutrition_static_images/avocado.png'),
  },
  {
    id: 'salmon',
    name: 'Salmon',
    description: 'Omega-3',
    imageUrl: require('@/assets/images/nutrition_static_images/salmon.png'),
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    description: 'Antioxidants',
    imageUrl: require('@/assets/images/nutrition_static_images/blueberries.png'),
  },
  {
    id: 'spinach',
    name: 'Spinach',
    description: 'Magnesium',
    imageUrl: require('@/assets/images/nutrition_static_images/spinach.png'),
  },
  {
    id: 'chiaseeds',
    name: 'Chia Seeds',
    description: 'Antioxidants',
    imageUrl: require('@/assets/images/nutrition_static_images/chiaseeds.png'),
  },
  {
    id: 'almonds',
    name: 'Almonds',
    description: 'Vitamin E',
    imageUrl: require('@/assets/images/nutrition_static_images/almonds.png'),
  },
];

const RECOMMENDED_RECIPES_DATA: RecommendedRecipe[] = [
  {
    id: 'avocado-smoothie',
    title: 'Avocado & Berry Smoothie',
    description: 'Packed with healthy fats and antioxidants for glowing skin.',
    imageUrl: require('@/assets/images/nutrition_static_images/recipe_1.jpg'),
    tags: ['Breakfast', 'Quick'],
  },
  {
    id: 'salmon-bowl',
    title: 'Omega-3 Salmon Bowl',
    description: 'Rich in omega-3 fatty acids to reduce inflammation.',
    imageUrl: require('@/assets/images/nutrition_static_images/recipe_2.jpg'),
    tags: ['Lunch', 'High Protein'],
  },
  {
    id: 'berry-parfait',
    title: 'Antioxidant Berry Parfait',
    description: 'Loaded with vitamin C and antioxidants for skin repair.',
    imageUrl: require('@/assets/images/nutrition_static_images/recipe_3.jpg'),
    tags: ['Breakfast', 'Dessert'],
  },
  {
    id: 'spinach-salad',
    title: 'Magnesium Rich Spinach Salad',
    description: 'Supports skin cell repair and reduces inflammation.',
    // imageUrl: require('@/assets/images/nutrition_static_images/recipe_2.jpg'),
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviMY8z9K4g1wxRIUBbyTZ5B8lWTN6_ECvjQ&s',
    tags: ['Lunch', 'Vegetarian'],
  },
  {
    id: 'chia-pudding',
    title: 'Chia Seed Pudding',
    description: 'Rich in omega-3 and fiber for skin health.',
    imageUrl:
      'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Fish-Tacos-1337495.jpg?quality=90&resize=708,643',
    tags: ['Breakfast', 'Dairy-Free'],
  },
];

export default function RoutineStepDetailsScreen() {
  const router = useRouter();
  const { showError } = useToast();
  const params = useLocalSearchParams();
  const [stepDetail, setStepDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const routineType = params.routineType as string;
  const stepId = params.stepId as string;
  const stepNumber = params.stepNumber;
  const title = params.title;
  const isCustom = params.isCustom === 'true';

  useEffect(() => {
    fetchStepDetails();
  }, []);

  const fetchStepDetails = async () => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      // const response = await api.getRoutineStepDetail(routineType, stepId);
      // setStepDetail(response.data);

      // Find step from local data (mock)
      setTimeout(() => {
        const steps = routineSteps[routineType as keyof typeof routineSteps] || [];
        const step = steps.find((s) => s.id === stepId);

        if (step) {
          setStepDetail(step);
        } else if (isCustom) {
          // Custom step fallback
          setStepDetail({
            id: stepId,
            stepNumber: stepNumber,
            title: title,
            description: 'Your custom routine step',
            type: 'custom',
            detailedContent: `
              <h2>Custom Step</h2>
              <p>This is a custom step you added to your routine. You can edit the details in your routine settings.</p>
              <h2>Instructions</h2>
              <p>Follow the instructions you provided when adding this step.</p>
            `,
          });
        }
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching step details:', error);
      showError('Failed to load step details');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Step Details" height={50} backButton={true} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#977857" />
          <Text className="text-descriptionTextColor mt-4 font-outfit text-[14px]">
            Loading step details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!stepDetail) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Step Details" height={50} backButton={true} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-descriptionTextColor font-outfit text-[16px]">
            Step details not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Step Details" height={50} backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 20,
        }}
        className="flex-1">
        <View className=" px-container ">
          {/* The Video Player */}
          <TutorialVideoPlayer
            videoUrl="https://www.youtube.com/watch?v=McNHLZlNoiA"
            onReady={() => console.log('Video is ready to play!')}
            onError={() => alert('Could not load the video.')}
          />
          <View className="flex-row items-center gap-3">
            <Text className="font-outfitMedium text-[18px] text-titleTextColor ">
              Drawing Up Injectable Medications
            </Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={18} />
              <Text className="font-outfit text-[12px] text-[#2E2117] ">3 min read</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="videocam-outline" size={18} />
              <Text className="font-outfit text-[12px] text-[#2E2117] ">Video</Text>
            </View>
          </View>

          <View className="mt-6 flex-row items-center gap-4 ">
            <Image
              source={require('@/assets/images/product_images/cleanser.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: '#000000',
                overflow: 'hidden',
              }}
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="font-outfitMedium text-[16px] text-[#977857] ">Cleanser</Text>
              <Text className="mt-2 font-outfitMedium text-[22px] text-[#2E2117] ">
                Gentle Oat Cleanser
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-start font-outfit text-[14px] leading-6 text-[#2E2117CC] ">
            To protect your barrier, avoid harshchemical exfoliants like PHAs orphysical exfoliants
            and opt for gentle lactic acid. Always follow up with a ceramide-rich moisturizer to
            lock in hydration and support the skin&apos;s natural repair process.
          </Text>
          <BorderlessShadowCard
            style={{
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginTop: 24,
            }}>
            <View className="flex-row items-center gap-3">
              {/* <IconBadge icon={<StarWithDoublePlusIcon size={20} color="#361A0D" />} /> */}
              <View
                className="h-8 w-8 items-center justify-center bg-backgroundColor "
                style={{
                  borderRadius: 6,
                  // iOS Shadow
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.15,
                  shadowRadius: 2,
                  // Android Shadow
                  elevation: 3,
                }}>
                <StarWithDoublePlusIcon size={20} color="#361A0D" />
              </View>
              <Text className="font-outfitMedium text-[16px] text-[#2E2117] ">Key Benefits</Text>
            </View>
            <View className="flex-row items-start gap-3">
              <FlameIcon size={16} color="#7A8B6A" style={{ marginTop: 11 }} />
              <Text className=" mt-3 flex-1 font-outfit text-[14px] text-[#2E2117CC]">
                Reduces facial puffiness and swelling
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <FlameIcon size={16} color="#7A8B6A" style={{ marginTop: 11 }} />
              <Text className=" mt-3 font-outfit text-[14px] text-[#2E2117CC]">
                Promotes toxin removal
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <FlameIcon size={16} color="#7A8B6A" style={{ marginTop: 11 }} />
              <Text className=" mt-3 flex-1 font-outfit text-[14px] text-[#2E2117CC]">
                Improves blood circulation for a natural glow
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <FlameIcon size={16} color="#7A8B6A" style={{ marginTop: 11 }} />
              <Text className=" mt-3 flex-1 font-outfit text-[14px] text-[#2E2117CC]">
                Relieves tension in jaw and neckRelieves tension in jaw and neckRelieves tension in
                jaw and neck
              </Text>
            </View>
          </BorderlessShadowCard>

          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={24}
            b_br={24}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginTop: 12,
            }}>
            <View className="flex-row items-center gap-3  ">
              <View
                className="h-8 w-8 items-center justify-center bg-backgroundColor "
                style={{
                  borderRadius: 6,
                  // iOS Shadow
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.15,
                  shadowRadius: 2,
                  // Android Shadow
                  elevation: 3,
                }}>
                <BookIcon size={20} color="#361A0D" />
              </View>
              <Text className="font-outfitMedium text-[16px] text-[#2E2117] ">
                What You’ll Learn
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <CheckInCircleIcon size={16} color="#2E2117" style={{ marginTop: 13 }} />
              <Text className=" mt-3 flex-1 font-outfit text-[14px] text-[#2E2117CC]">
                Reduces facial puffiness and swelling
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <CheckInCircleIcon size={16} color="#2E2117" style={{ marginTop: 13 }} />
              <Text className=" mt-3 font-outfit text-[14px] text-[#2E2117CC]">
                Promotes toxin removal
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <CheckInCircleIcon size={16} color="#2E2117" style={{ marginTop: 13 }} />
              <Text className=" mt-3 flex-1 font-outfit text-[14px] text-[#2E2117CC]">
                Improves blood circulation for a natural glow
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <CheckInCircleIcon size={16} color="#2E2117" style={{ marginTop: 13 }} />
              <Text className=" mt-3 flex-1 font-outfit text-[14px] text-[#2E2117CC]">
                Relieves tension in jaw and neckRelieves tension in jaw and neckRelieves tension in
                jaw and neck
              </Text>
            </View>
          </BorderlessShadowCard>

          {/* Key Nutrients for Your Skin - Using static data like the others */}
          <KeyNutrientsSection
            nutrients={NUTRIENTS_DATA}
            title="Key Nutrients for Your Skin"
            showIcon={true}
          />

          {/* Food Recommendations */}
          <FoodRecommendationSection
            recommendedFoods={RECOMMENDED_FOODS_DATA}
            title="Your Food Recommendations"
            showIcon={true}
          />

          {/* Recipes Skin */}
          <RecipesSection
            recommendedRecipes={RECOMMENDED_RECIPES_DATA}
            title="Recipes for Your Skin"
            showIcon={true}
            onRecipePress={(recipe) => {
              console.log('Recipe pressed:', recipe.title);
              // Navigate to recipe details
            }}
          />

          <HydrationTargetCard
            goal="2.4L of Water"
            description="Drinking enough water helps flush inflammatory markers and revitalizes areas detected in your scan."
            title="Hydration Target"
            iconSize={20}
            iconColor="#A68A61"
          />
        </View>
        <View className="py-3" />
      </ScrollView>
    </SafeAreaView>
  );
}
