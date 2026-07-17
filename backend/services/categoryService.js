import { supabase } from '../config/supabase.js';

export const getAllCategories = async (userId) => { // إضافة userId
    const { data, error } = await supabase.from('categories').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
};

export const createCategory = async (categoryData, userId) => { // إضافة userId
    const { data, error } = await supabase.from('categories').insert([{ ...categoryData, user_id: userId }]).select();
    if (error) throw error;
    return data[0];
};