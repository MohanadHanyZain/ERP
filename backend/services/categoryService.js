import { supabase } from '../config/supabase.js';

export const getAllCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data;
};

export const createCategory = async (categoryData) => {
    const { data, error } = await supabase.from('categories').insert([categoryData]).select();
    if (error) throw error;
    return data[0];
};