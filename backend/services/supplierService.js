import { supabase } from '../config/supabase.js';

export const getAllSuppliers = async (userId) => {
    const { data, error } = await supabase.from('suppliers').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
};

export const createSupplier = async (supplierData, userId) => {
    const { data, error } = await supabase.from('suppliers').insert([{ ...supplierData, user_id: userId }]).select();                                
    if (error) throw error;
    return data[0];
};