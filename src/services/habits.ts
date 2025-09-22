import { supabase } from '../utils/supabaseClient';
<<<<<<< HEAD
import { Tables, TablesInsert } from '../types/supabase'; // generated types

// Aliases for clarity
export type Habit = Tables<'habits'>;
export type HabitInsert = TablesInsert<'habits'>;
export type HabitLog = Tables<'habit_logs'>;
export type HabitLogInsert = TablesInsert<'habit_logs'>;

// ----------------------
// RLS enforces user isolation
// ----------------------

export const fetchHabits = async (): Promise<Habit[]> => {
    const { data, error } = await supabase
        .from('habits')
        .select('*');

    if (error) throw error;
    return data ?? [];
};

export const createHabit = async (habit: HabitInsert): Promise<Habit> => {
    console.log('testing')
    const { data, error } = await supabase
        .from('habits')
        .insert({ ...habit })
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const logHabit = async (habitId: string): Promise<HabitLog> => {
=======
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
>>>>>>> c2286142c722fa692d5156d7772a589922b0eecd
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('habit_logs')
<<<<<<< HEAD
        .upsert(
            [{ habit_id: habitId, log_date: today, completed: true }],
            { onConflict: 'habit_id,log_date' } // composite key
        )
        .select()
        .single();

    if (error) throw error;
    return data;
=======
        .upsert([{ habit_id: habitId, log_date: today, completed: true }], {
            onConflict: 'habit_id',
        });

    if (error) throw error;
    return (data ?? []) as HabitLog[];
>>>>>>> c2286142c722fa692d5156d7772a589922b0eecd
};

export const fetchHabitLogs = async (habitId: string): Promise<HabitLog[]> => {
    const { data, error } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('habit_id', habitId)
        .order('log_date', { ascending: true });

    if (error) throw error;
<<<<<<< HEAD
    return data ?? [];
=======
    return data as HabitLog[] || [];
>>>>>>> c2286142c722fa692d5156d7772a589922b0eecd
};
