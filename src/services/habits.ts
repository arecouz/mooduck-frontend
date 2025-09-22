import { supabase } from '../utils/supabaseClient';
import { Habit, HabitInsert, HabitLog } from '../types/habits';

export const fetchHabits = async (userId: string): Promise<Habit[]> => {
    const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', userId);

    if (error) throw error;
    return data as Habit[] || [];
};

export const createHabit = async (userId: string, habit: HabitInsert): Promise<Habit> => {
    const { data, error } = await supabase
        .from('habits')
        .insert([{ ...habit, user_id: userId }])
        .single();

    if (error) throw error;
    return data as Habit;
};

export const logHabit = async (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('habit_logs')
        .upsert([{ habit_id: habitId, log_date: today, completed: true }], {
            onConflict: 'habit_id',
        });

    if (error) throw error;
    return (data ?? []) as HabitLog[];
};

export const fetchHabitLogs = async (habitId: string): Promise<HabitLog[]> => {
    const { data, error } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('habit_id', habitId)
        .order('log_date', { ascending: true });

    if (error) throw error;
    return data as HabitLog[] || [];
};
