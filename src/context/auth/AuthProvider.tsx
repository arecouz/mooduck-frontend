import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN') {
        window.history.replaceState({}, '', '/dashboard');
        navigate('/dashboard');
      }

      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <h1>Loading…</h1>
      </div>
    );
  }

  return <AuthContext.Provider value={{ user, session, loading }}>{children}</AuthContext.Provider>;
};
