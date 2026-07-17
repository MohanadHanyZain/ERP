import { supabase } from '../config/supabase.js';

export const getAllCustomers = async (userId) => {
    const { data, error } = await supabase.from('customers').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
};

export const createCustomer = async (customerData, userId) => {
    const { data, error } = await supabase.from('customers').insert([{ ...customerData, user_id: userId }]).select();
    if (error) throw error;
    return data[0];
};