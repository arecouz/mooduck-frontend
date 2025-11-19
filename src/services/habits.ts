import { supabase } from '../utils/supabaseClient';
import { Tables, TablesInsert } from '../types/supabase'; // generated types


export type Habit = Tables<'habits'>;
export type HabitInsert = TablesInsert<'habits'>;
export type HabitLog = Tables<'habit_logs'>;
export type HabitLogInsert = TablesInsert<'habit_logs'>;

export const fetchHabits = async (): Promise<Habit[]> => {
    const { data, error } = await supabase
        .from('habits')
        .select('*');

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

export const logHabit = async (habitId: string): Promise<HabitLog> => {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('habit_logs')
        .upsert(
            [{ habit_id: habitId, log_date: today, completed: true }],
            { onConflict: 'habit_id,log_date' } 
        )
        .select()
        .single();

    if (error) throw error;
    return data;
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
