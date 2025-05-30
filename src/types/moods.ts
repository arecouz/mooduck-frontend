import { Database } from './supabase';

export type MoodEntry = Database['public']['Tables']['mood_out_of_five']['Row'];
export type NewMoodEntry = Database['public']['Tables']['mood_out_of_five']['Insert'];
export type UpdateMoodEntry = Database['public']['Tables']['mood_out_of_five']['Update'];
