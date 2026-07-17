import { supabase } from '../config/supabase.js';

export const getAllCustomers = async () => {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) throw error;
    return data;
};

export const createCustomer = async (customerData) => {
    const { data, error } = await supabase.from('customers').insert([customerData]).select();
    if (error) throw error;
    return data[0];
};