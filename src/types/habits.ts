import { Database } from '../types/supabase';

export type Habit = Database['public']['Tables']['habits']['Row'];
export type HabitInsert = Database['public']['Tables']['habits']['Insert'];
export type HabitLog = Database['public']['Tables']['habit_logs']['Row'];
