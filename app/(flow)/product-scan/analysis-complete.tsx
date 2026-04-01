// app/(flow)/product-scan/analysis-complete.tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { IInCircleIcon } from '@/components/icons/IInCircleIcon';

export default function ProductAnalysisComplete() {
    const detectedConditions = [
        { id: 1, name: 'Product Name', value: 'Hydrating Face Cream', icon: '🧴' },
        { id: 2, name: 'Key Ingredients', value: 'Hyaluronic Acid, Vitamin C', icon: '🔬' },
        { id: 3, name: 'Compatibility Score', value: '92% - Excellent Match', icon: '⭐' },
        { id: 4, name: 'Skin Type Match', value: 'Dry & Combination Skin', icon: '✨' },
    ];

    const ingredients = [
        { id: 1, name: 'Hyaluronic Acid', status: 'Beneficial', icon: '✅' },
        { id: 2, name: 'Vitamin C', status: 'Beneficial', icon: '✅' },
        { id: 3, name: 'Fragrance', status: 'May cause sensitivity', icon: '⚠️' },
    ];

    return (
        <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
            <CustomHeader title="Product Analysis Complete" height={40} backButton />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
                    paddingTop: 24,
                }}
                className="flex-1 px-container"
            >
                {/* Product Overview */}
                <View className="mt-3">
                    <Text className="font-outfitMedium text-[16px] text-[#2E2117] text-start mb-3">
                        Product Overview
                    </Text>

                    {detectedConditions.map((item) => (
                        <View
                            key={item.id}
                            style={{
                                backgroundColor: 'white',
                                paddingVertical: 16,
                                paddingHorizontal: 20,
                                marginBottom: 12,
                                borderRadius: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.05,
                                shadowRadius: 8,
                                elevation: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-10 h-10 rounded-full bg-[#F5EDE3] items-center justify-center">
                                    <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-outfitMedium text-[15px] text-[#2E2117]">
                                        {item.name}
                                    </Text>
                                    <Text className="font-outfit text-[12px] text-[#2E2117CC]">
                                        {item.value}
                                    </Text>
                                </View>
                            </View>
                            <IInCircleIcon size={24} color="#7A5D3E" />
                        </View>
                    ))}
                </View>

                {/* Ingredient Analysis */}
                <View className="mt-6">
                    <Text className="font-outfitMedium text-[16px] text-[#2E2117] text-start mb-3">
                        Ingredient Analysis
                    </Text>

                    {ingredients.map((ingredient) => (
                        <View
                            key={ingredient.id}
                            style={{
                                backgroundColor: 'white',
                                paddingVertical: 16,
                                paddingHorizontal: 20,
                                marginBottom: 12,
                                borderRadius: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.05,
                                shadowRadius: 8,
                                elevation: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-10 h-10 rounded-full bg-[#F5EDE3] items-center justify-center">
                                    <Text style={{ fontSize: 20 }}>{ingredient.icon}</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-outfitMedium text-[15px] text-[#2E2117]">
                                        {ingredient.name}
                                    </Text>
                                    <Text className="font-outfit text-[12px] text-[#2E2117CC]">
                                        {ingredient.status}
                                    </Text>
                                </View>
                            </View>
                            <IInCircleIcon size={24} color="#7A5D3E" />
                        </View>
                    ))}
                </View>

                {/* Recommendations */}
                <View className="mt-6 mb-8">
                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            borderRadius: 16,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 8,
                            elevation: 2,
                        }}
                    >
                        <Text className="font-outfitMedium text-[14px] text-[#2E2117] mb-2">
                            Product Recommendations
                        </Text>
                        <Text className="font-outfit text-[12px] text-[#2E2117CC] leading-5 mb-3">
                            This product is an excellent match for your skin type. The ingredients align well with your skin needs.
                        </Text>
                        <Text className="font-outfit text-[12px] text-[#2E2117CC] leading-5">
                            ⚠️ Note: Contains fragrance which may cause sensitivity. Consider patch testing before full application.
                        </Text>
                    </View>
                </View>

                <View className="flex-row gap-3 mb-8">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-1 bg-[#F5EDE3] py-4 rounded-2xl"
                    >
                        <Text className="text-center font-outfitMedium text-[16px] text-[#2E2117]">
                            New Scan
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/(main)')}
                        className="flex-1 bg-[#2E2117] py-4 rounded-2xl"
                    >
                        <Text className="text-center font-outfitMedium text-[16px] text-white">
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}