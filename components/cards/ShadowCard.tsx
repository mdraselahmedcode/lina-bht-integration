import { View, ViewStyle, StyleProp, Platform } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  b_tl?: number;
  b_tr?: number;
  b_bl?: number;
  b_br?: number;
};

export default function ShadowCard({
  children,
  style,
  className,
  b_tl = 24,
  b_tr = 24,
  b_bl = 0,
  b_br = 0,
}: Props) {
  return (
    <View
      className={`bg-[#F0E6D8] px-[24px] py-[23px] ${className ?? ''}`}
      style={[
        {
          // ✅ Dynamic border radius (moved from className)
          borderTopLeftRadius: b_tl,
          borderTopRightRadius: b_tr,
          borderBottomLeftRadius: b_bl,
          borderBottomRightRadius: b_br,

          // ✅ Border
          borderWidth: 1,
          borderColor: '#FFFFFF66',

          // ✅ Right + Bottom shadow
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
            android: {
              elevation: 4,
            },
          }),
        },
        style,
      ]}>
      {children}
    </View>
  );
}
