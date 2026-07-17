import { supabase } from '../config/supabase.js';

export const getAllSuppliers = async () => {
    const { data, error } = await supabase.from('suppliers').select('*');
    if (error) throw error;
    return data;
};

export const createSupplier = async (supplierData) => {
    const { data, error } = await supabase.from('suppliers').insert([supplierData]).select();
    if (error) throw error;
    return data[0];
};