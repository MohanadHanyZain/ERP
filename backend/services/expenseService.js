import { supabase } from '../config/supabase.js';

export const addExpense = async (expenseData) => {
    const { title, amount, notes } = expenseData;
    
    const { data, error } = await supabase
        .from('expenses')
        .insert([{ title, amount, notes }])
        .select();
        
    if (error) throw error;
    return data[0];
};