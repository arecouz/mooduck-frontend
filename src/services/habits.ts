import { supabase } from '../utils/supabaseClient';
import { Tables, TablesInsert } from '../types/supabase'; // generated types

export type Habit = Tables<'habits'>;
export type HabitInsert = TablesInsert<'habits'>;
export type HabitLog = Tables<'habit_logs'>;
export type HabitLogInsert = TablesInsert<'habit_logs'>;

export const fetchHabits = async (): Promise<Habit[]> => {
  const { data, error } = await supabase.from('habits').select('*');

  if (error) throw error;
  return data ?? [];
};

export const createHabit = async (habit: HabitInsert): Promise<Habit> => {
  const { data, error } = await supabase
    .from('habits')
    .insert({ ...habit })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeHabit = async (habitId: string): Promise<{ id: string }> => {
  const { data, error } = await supabase
    .from('habits')
    .delete()
    .eq('id', habitId)
    .select('id')
    .single();

  if (error) throw error;

  console.log(data);

  return data;
};

export const getStreak = async (habitId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('habits')
    .select('id, title, streak, user_id')
    .eq('id', habitId)
    .maybeSingle();

  if (error) {
    console.error('getStreak error:', error);
    throw error;
  }

  if (!data) {
    console.warn('Habit not found');
    return -1;
  }

  return data.streak ?? 0;
};

export const fetchHabitLogs = async (habitId: string): Promise<HabitLog[]> => {
  const { data, error } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('habit_id', habitId)
    .order('log_date', { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const logHabit = async (habit: Habit, logDate?: string): Promise<Habit> => {
  try {
    console.log('--- logHabit START ---');
    console.log('Habit input:', habit);

    const today = logDate ?? new Date().toISOString().split('T')[0];
    const todayDate = new Date(today);
    console.log('Today:', today);

    // 1. Calculate new streak
    let newStreak = 1;
    if (habit.last_completed_date) {
      const lastDate = new Date(habit.last_completed_date);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      console.log('Last completed date:', habit.last_completed_date, 'Diff days:', diffDays);

      if (diffDays === 1) newStreak = habit.streak + 1;
      else if (diffDays === 0) newStreak = habit.streak;
      else newStreak = 1;
    }
    console.log('Calculated new streak:', newStreak);

    // 2. Insert log (no onConflict)
    const { data: logData, error: logError } = await supabase
      .from('habit_logs')
      .insert([{ habit_id: habit.id, log_date: today, completed: true }])
      .select();

    console.log('Habit log insert result:', logData, 'Error:', logError);
    if (logError) throw logError;

    // 3. Update habit streak + last_completed_date
    const { data, error: habitError } = await supabase
      .from('habits')
      .update({ streak: newStreak, last_completed_date: today })
      .eq('id', habit.id)
      .select()
      .maybeSingle();

    console.log('Habit update result:', data, 'Error:', habitError);
    if (habitError) throw habitError;

    if (!data) {
      console.warn('Habit updated but no data returned. Likely RLS is blocking the SELECT.');
      return habit;
    }

    console.log('--- logHabit END ---');
    return data;
  } catch (err) {
    console.error('Error in logHabit:', err);
    throw err;
  }
};

export const isHabitDoneToday = async (habitId: string): Promise<boolean> => {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('habit_logs')
    .select('id')
    .eq('habit_id', habitId)
    .eq('log_date', today)
    .maybeSingle();

  if (error) throw error;

  return !!data;
};

export const getHabitsDoneToday = async (): Promise<Set<string>> => {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('habit_logs')
    .select('habit_id')
    .eq('log_date', today);

  if (error) throw error;

  return new Set(data?.map(d => d.habit_id) ?? []);
};
