import React from 'react';
import { KeyboardAvoidingView, Platform, ViewStyle, StyleProp } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FormLayoutProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, contentContainerStyle }) => {
  return (
    <SafeAreaView className="flex-1 ">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <KeyboardAwareScrollView
          className=""
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            {
              flexGrow: 1,
              justifyContent: 'center',

              // paddingVertical: 60,
            },
            contentContainerStyle,
          ]}>
          {children}
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormLayout;
