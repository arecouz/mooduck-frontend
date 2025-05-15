import { Session, User } from '@supabase/supabase-js';

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};
