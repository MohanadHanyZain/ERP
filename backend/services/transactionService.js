import { supabase } from '../config/supabase.js';

export const getTransactions = async (userId) => {
    const { data, error } = await supabase.from('transactions').select('*, products!inner(name)').eq('user_id', userId);
    if (error) throw error;
    return data;
};

export const createTransaction = async (transData, userId) => {
    const { data, error } = await supabase.from('transactions').insert([{ ...transData, user_id: userId }]).select();
    if (error) throw error;
    return data[0];
};