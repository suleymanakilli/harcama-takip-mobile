// Auth Hook (Max 60 satır)
import { useEffect, useState } from 'react';
import { signInWithGoogle, signOut, onAuthStateChange, getSession } from '../services/auth';
import { useStore } from '../store/useStore';
import type { User } from '../types';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, setLoading } = useStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check initial session
    getSession().then((session) => {
      if (session?.user) {
        const userData = session.user;
        setUser({
          id: userData.id,
          email: userData.email || '',
          name: userData.user_metadata?.full_name || 'Kullanıcı',
          avatar_url: userData.user_metadata?.avatar_url,
        } as User);
      }
      setIsReady(true);
    });

    // Listen for auth changes
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

  const login = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOut();
    setUser(null);
    setLoading(false);
  };

  return { user, isAuthenticated, login, logout, isGoogleReady: isReady };
};
