// app/(flow)/notification/index.tsx
import { ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { DangerBanner } from '@/components/notifications/DangerBanner';
import { NotificationList } from '@/components/notifications/NotificationList';
import { EmptyState } from '@/components/notifications/EmptyState';
import { SAMPLE_NOTIFICATIONS } from '@/constants/sampleNotifications';
import { Notification } from '@/types/notification';

export default function NotificationScreen() {
  const router = useRouter();
  const { showSuccess } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dangerCount, setDangerCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    const danger = notifications.filter((n) => n.type === 'danger' && !n.read).length;
    setUnreadCount(count);
    setDangerCount(danger);
  }, [notifications]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showSuccess('Notifications refreshed');
    }, 1500);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
    showSuccess('All notifications marked as read');
  };

  const clearAllNotifications = () => {
    setShowClearConfirm(true);
  };

  const confirmClearAll = () => {
    setNotifications([]);
    showSuccess('All notifications cleared');
    setShowClearConfirm(false);
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    showSuccess('Notification deleted');
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    if (notification.type === 'danger') {
      Alert.alert(
        '⚠️ Health Alert',
        notification.message,
        [
          { text: 'Dismiss', style: 'cancel' },
          { text: 'View Details', onPress: () => router.push('/(flow)/health-alert') },
        ],
        { cancelable: true }
      );
      return;
    }

    switch (notification.type) {
      case 'scan':
        router.push('/(flow)/face-scan/analysis-complete');
        break;
      case 'routine':
        router.push('/(flow)/face-scan/analysis-compatibility-check');
        break;
      case 'product':
        router.push('/(flow)/product-scan/analysis-complete');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader
        title="Notifications"
        height={50}
        backButton={true}
        rightIcon={
          notifications.length > 0 && (
            <TouchableOpacity onPress={markAllAsRead} className="mr-2">
              <Text className="font-outfitMedium text-[14px]" style={{ color: '#977857' }}>
                Mark all read
              </Text>
            </TouchableOpacity>
          )
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 10,
          flexGrow: 1,
        }}
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#7A8B6A']} />
        }>
        {notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <DangerBanner count={dangerCount} />
            <NotificationList
              notifications={notifications}
              unreadCount={unreadCount}
              onNotificationPress={handleNotificationPress}
              onDelete={deleteNotification}
            />
            {/* Clear All Button */}
            <TouchableOpacity
              onPress={clearAllNotifications}
              className="mb-8 mt-4 items-center justify-center py-3">
              <Text className="font-outfitMedium text-[14px]" style={{ color: '#2E211780' }}>
                Clear All Notifications
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearAll}
        title="Clear All Notifications"
        message="Are you sure you want to delete all notifications? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        iconName="trash-outline"
        iconColor="#EF4444"
        confirmButtonColor="#EF4444"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
