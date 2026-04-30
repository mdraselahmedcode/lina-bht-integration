// components/scans/RecommendedArticles.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';

export interface RecommendedArticle {
  id: string;
  title: string;
  description: string;
  readTime: string; // e.g., "5 min read"
  imageUrl: any;
  category: string;
  onPress?: () => void;
}

interface RecommendedArticlesProps {
  articles: RecommendedArticle[];
  title?: string;
  showIcon?: boolean;
  onArticlePress?: (article: RecommendedArticle) => void;
}

export const RecommendedArticles: React.FC<RecommendedArticlesProps> = ({
  articles,
  title = 'Recommended Articles',
  showIcon = true,
  onArticlePress,
}) => {
  return (
    <View className="mt-6">
      {/* Header */}
      <View className="mb-3 flex-row items-center gap-2">
        {showIcon && <Ionicons name="newspaper-outline" size={20} color="#977857" />}
        <Text className="font-outfitMedium text-[18px]" style={{ color: '#361A0D' }}>
          {title}
        </Text>
      </View>

      {/* Articles List */}
      <View className="gap-3">
        {articles.map((article) => (
          <TouchableOpacity
            key={article.id}
            activeOpacity={1}
            onPress={() => onArticlePress?.(article)}>
            <BorderlessShadowCard b_tl={20} b_tr={20} b_bl={20} b_br={20} style={{ padding: 12 }}>
              <View className="flex-row gap-3">
                {/* Article Image */}
                <Image
                  source={article.imageUrl}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    backgroundColor: '#F0E6D8',
                  }}
                  resizeMode="cover"
                />

                {/* Article Content */}
                <View className="flex-1 justify-center">
                  <View className="mb-1 flex-row items-center gap-2">
                    <View className="rounded-full bg-[#97785720] px-2 py-0.5">
                      <Text className="font-outfitMedium text-[10px]" style={{ color: '#977857' }}>
                        {article.category}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={10} color="#2E211780" />
                      <Text className="font-outfit text-[10px]" style={{ color: '#2E211780' }}>
                        {article.readTime}
                      </Text>
                    </View>
                  </View>

                  <Text
                    className="font-outfitMedium text-[14px]"
                    style={{ color: '#361A0D', lineHeight: 20 }}>
                    {article.title}
                  </Text>

                  <Text
                    className="mt-1 font-outfit text-[12px]"
                    style={{ color: '#2E211780' }}
                    numberOfLines={2}>
                    {article.description}
                  </Text>
                </View>

                {/* Arrow Icon */}
                <View className="justify-center">
                  <Ionicons name="chevron-forward" size={20} color="#977857" />
                </View>
              </View>
            </BorderlessShadowCard>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
