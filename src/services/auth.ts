// Google Auth Service (Max 80 satır)
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './supabase';

WebBrowser.maybeCompleteAuthSession();

const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
const googleClientIdIos = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS || '';
const googleClientIdAndroid = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID || '';

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: googleClientId,
    iosClientId: googleClientIdIos,
    androidClientId: googleClientIdAndroid,
  });

  return { request, response, promptAsync };
};

export const signInWithGoogle = async (idToken: string) => {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: idToken,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const onAuthStateChange = (callback: (session: unknown) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};

