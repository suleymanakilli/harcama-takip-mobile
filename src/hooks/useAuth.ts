// Auth Hook (Max 60 satır)
import { useEffect } from 'react';
import { useGoogleAuth, signInWithGoogle, signOut, onAuthStateChange } from '../services/auth';
import { useStore } from '../store/useStore';
import type { User } from '../types';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, setLoading } = useStore();
  const { request, response, promptAsync } = useGoogleAuth();

  useEffect(() => {
    const { data } = onAuthStateChange((session) => {
      if (session) {
        const userData = (session as { user: { id: string; email: string; user_metadata: { full_name?: string; avatar_url?: string } } }).user;
        setUser({
          id: userData.id,
          email: userData.email || '',
          name: userData.user_metadata?.full_name || 'Kullanıcı',
          avatar_url: userData.user_metadata?.avatar_url,
        } as User);
      } else {
        setUser(null);
      }
    });

    return () => data.subscription.unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.idToken) {
      setLoading(true);
      signInWithGoogle(response.authentication.idToken)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [response, setLoading]);

  const login = () => promptAsync();
  const logout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return { user, isAuthenticated, login, logout, isGoogleReady: !!request };
};

