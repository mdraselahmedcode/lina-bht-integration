// import { useAppleSignInMutation } from '@/store/api/authApi';
// import auth from '@react-native-firebase/auth';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as Crypto from 'expo-crypto';
// import { useAuth } from './useAuth';
// import { useToast } from './useToast';
// import { useCallback } from 'react';
// import { extractApiError } from '@/utils/apiError';

// export function useAppleAuth() {
//   const { persistAndLogin } = useAuth();
//   const { showError } = useToast();
//   const [appleSignIn, { isLoading }] = useAppleSignInMutation();

//   const signInWithApple = useCallback(async () => {
//     try {
//       // Generate a nonce for security
//       const rawNonce = Array.from(Crypto.getRandomBytes(32))
//         .map((b) => b.toString(16).padStart(2, '0'))
//         .join('');
//       const hashedNonce = await Crypto.digestStringAsync(
//         Crypto.CryptoDigestAlgorithm.SHA256,
//         rawNonce
//       );

//       const credential = await AppleAuthentication.signInAsync({
//         requestedScopes: [
//           AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//           AppleAuthentication.AppleAuthenticationScope.EMAIL,
//         ],
//         nonce: hashedNonce,
//       });

//       if (credential.authorizationCode === 'ERR_REQUEST_CANCELED') return;

//       const { givenName, familyName } = credential.fullName ?? {};
//       const fullName = [givenName, familyName].filter(Boolean).join(' ') || null;

//       // Sign into Firebase
//       const appleCredential = auth.AppleAuthProvider.credential(
//         credential.identityToken,
//         rawNonce // pass the RAW nonce to Firebase
//       );
//       await auth().signInWithCredential(appleCredential);

//       // Send identity_token to your backend
//       const data = await appleSignIn({
//         identity_token: credential.identityToken ?? '',
//         full_name: fullName,
//       }).unwrap();

//       console.log('Apple Identity Token:', credential.identityToken);

//       await persistAndLogin(data);
//     } catch (error: any) {
//       if (error?.code === 'ERR_REQUEST_CANCELED') return;
//       showError(extractApiError(error, 'Apple sign-in failed.'));
//     }
//   }, []);

//   return { signInWithApple, isLoading };
// }
