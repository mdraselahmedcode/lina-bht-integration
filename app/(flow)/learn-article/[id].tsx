// app/(flow)/learn-article/[id].tsx
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { SAMPLE_ARTICLES } from '@/constants/sampleArticles';
import { ArticleVideoPlayer } from '@/components/articles/ArticleVideoPlayer';
import { HTMLRenderer } from '@/components/articles/HTMLRenderer';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Make sure id is a string
  const articleId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    loadArticle();
  }, [articleId]);

  const loadArticle = () => {
    try {
      // Small delay to simulate loading (optional)
      setTimeout(() => {
        const foundArticle = SAMPLE_ARTICLES.find((a) => a.id === articleId);
        if (!foundArticle) {
          setError('Article not found');
        } else {
          setArticle(foundArticle);
        }
        setIsLoading(false);
      }, 300);
    } catch (err) {
      setError('Failed to load article');
      console.error('Error loading article:', err);
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    loadArticle();
  };

  const hasVideo = article?.videoUrl && article.videoUrl.length > 0;

  // Show loading state
  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Article" height={50} backButton={true} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#759A52" />
          <Text className="mt-3 font-outfit text-[14px]" style={{ color: '#2E211799' }}>
            Loading article...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error if article not found
  if (error || !article) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Article" height={50} backButton={true} />
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="document-text-outline" size={64} color="#2E211733" />
          <Text className="mt-4 text-center font-outfit text-[16px]" style={{ color: '#2E2117CC' }}>
            {error || 'Article not found'}
          </Text>
          <Text className="mt-2 text-center font-outfit text-[14px]" style={{ color: '#2E211799' }}>
            The article you&apos;re looking for doesn&apos;t exist or has been removed.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Article" height={50} backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 10,
          flexGrow: 1,
        }}
        className="flex-1">
        <View className="px-container">
          {/* Show Video Player if video URL exists, otherwise show image */}
          {hasVideo ? (
            <ArticleVideoPlayer videoUrl={article.videoUrl!} />
          ) : (
            <Image
              source={{ uri: article.imageUrl }}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 24,
                marginBottom: 16,
              }}
              resizeMode="cover"
            />
          )}

          {/* Title */}
          <Text className="font-outfitBold text-[24px]" style={{ color: '#361A0D' }}>
            {article.title}
          </Text>

          {/* Read Time */}
          <View className="mt-2 flex-row items-center gap-1">
            <Ionicons name="time-outline" size={14} color="#2E2117CC" />
            <Text className="font-outfit text-[12px]" style={{ color: '#2E2117CC' }}>
              {article.readTime}
            </Text>
          </View>

          {/* Divider */}
          <View className="my-4 h-[1px] bg-[#2E2117]/10" />

          {/* Content */}
          {article.content ? (
            <HTMLRenderer content={article.content} />
          ) : (
            <Text className="font-outfit text-[14px] leading-6" style={{ color: '#2E2117CC' }}>
              {article.description}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
