import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useAuth } from './useAuth';
import { useToast } from './useToast';
import { useGoogleSignInMutation } from '@/store/api/authApi';
import { useCallback } from 'react';
import { extractApiError } from '@/utils/apiError';

// ─── Call this once at app startup in _layout.tsx ────────────────────────────
export function configureGoogleSignIn() {
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '';
  console.log('[Google] configureGoogleSignIn webClientId:', webClientId); // 👈 add this
  GoogleSignin.configure({
    webClientId,
  });
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useGoogleAuth() {
  const { persistAndLogin } = useAuth();
  const { showError } = useToast();
  const [googleSignIn, { isLoading }] = useGoogleSignInMutation();

  const signInWithGoogle = useCallback(async () => {
    try {
      // 1. Check Play Services (Android only, no-op on iOS)
      console.log('[Google] Checking Play Services...');
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('[Google] Play Services OK');

      // 2. Trigger native Google sign-in sheet
      console.log('[Google] Starting sign-in...');
      const userInfo = await GoogleSignin.signIn();
      console.log('[Google] Sign-in result:', JSON.stringify(userInfo, null, 2));

      const idToken = userInfo.data?.idToken;
      console.log('[Google] ID Token:', idToken ? `${idToken.slice(0, 40)}...` : 'NULL');

      if (!idToken) {
        showError('Google sign-in did not return a token. Please try again.');
        return;
      }

      // 3. Send id_token directly to your backend — no Firebase needed
      console.log('[Google] Calling backend /auth/google...');
      const data = await googleSignIn({ id_token: idToken }).unwrap();
      console.log('[Google] Backend OK:', JSON.stringify(data, null, 2));

      // 4. Persist session
      await persistAndLogin(data);
      console.log('[Google] Done!');
    } catch (error: any) {
      console.error('[Google] ERROR:', JSON.stringify(error, null, 2));
      console.error('[Google] code:', error?.code);
      console.error('[Google] message:', error?.message);

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            return; // user dismissed — no toast
          case statusCodes.IN_PROGRESS:
            return; // already in progress — no toast
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            showError('Google Play Services are not available on this device.');
            return;
          default:
            break;
        }
      }

      showError(extractApiError(error, 'Google sign-in failed. Please try again.'));
    }
  }, [googleSignIn, persistAndLogin, showError]);

  return { signInWithGoogle, isLoading };
}
