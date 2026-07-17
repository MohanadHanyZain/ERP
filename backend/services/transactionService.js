import { supabase } from '../config/supabase.js';

export const createTransaction = async (transData) => {
    const { data, error } = await supabase.from('transactions').insert([transData]).select();
    if (error) throw error;
    return data[0];
};

export const getTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select('*, products(name)');
    if (error) throw error;
    return data;
};