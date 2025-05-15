import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } finally {
        setLoading(false);
      }
    };
    loadSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        setSession(session);
        setUser(session?.user ?? null);
      });
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, session, loading }}>{children}</AuthContext.Provider>;
};
