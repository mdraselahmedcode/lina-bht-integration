// screens/home/components/QuickActionsRow.tsx
import React from 'react';
import { View, Text } from 'react-native';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { ScanProductIcon, ScanSkinIcon, RoutineIcon, AiAssistantIcon } from '@/components/icons';
import { QuickAction } from '@/types/home';

interface QuickActionsRowProps {
  actions: QuickAction[];
  onActionPress: (actionTitle: string) => void;
}

const getQuickActionIcon = (iconName: string, size: number, color: string) => {
  switch (iconName) {
    case 'scan_skin':
      return <ScanSkinIcon size={size} color={color} />;
    case 'scan_product':
      return <ScanProductIcon size={size} color={color} />;
    case 'routine':
      return <RoutineIcon size={size} color={color} />;
    case 'ai_assistant':
      return <AiAssistantIcon size={size} color={color} />;
    default:
      return null;
  }
};

const ActionButton: React.FC<{ action: QuickAction; onPress: () => void }> = ({
  action,
  onPress,
}) => (
  <BorderlessShadowCard
    b_bl={0}
    b_br={0}
    b_tl={0}
    b_tr={0}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    onPress={onPress}>
    <BorderlessShadowCard
      b_bl={12}
      b_br={12}
      b_tl={12}
      b_tr={12}
      style={{
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {getQuickActionIcon(action.icon, 26, '#361A0D')}
    </BorderlessShadowCard>
    <Text className="mt-3 font-outfitMedium text-[16px]">{action.title}</Text>
  </BorderlessShadowCard>
);

export const QuickActionsRow: React.FC<QuickActionsRowProps> = ({ actions, onActionPress }) => {
  const firstRow = actions.slice(0, 2);
  const secondRow = actions.slice(2, 4);

  return (
    <>
      <View className="mt-4 flex-row gap-4">
        {firstRow.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            onPress={() => onActionPress(action.title)}
          />
        ))}
      </View>

      <View className="mt-4 flex-row gap-4">
        {secondRow.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            onPress={() => onActionPress(action.title)}
          />
        ))}
      </View>
    </>
  );
};
