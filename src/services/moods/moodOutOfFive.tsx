import { supabase } from '../../utils/supabaseClient';
import { MoodEntry, NewMoodEntry } from '../../types/moods';

export const insertMoodRating = async (
  userId: string,
  rating: number,
): Promise<{
  data: MoodEntry[] | null;
  error: Error | null;
}> => {
  return await supabase
    .from('mood_out_of_five')
    .insert([{ user_id: userId, rating }] as NewMoodEntry[])
    .select(); // To return inserted data
};

export const getMoodRatings = async (
  userId: string,
): Promise<{
  data: MoodEntry[] | null;
  error: Error | null;
}> => {
  return await supabase
    .from('mood_out_of_five')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};
