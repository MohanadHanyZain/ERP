import { supabase } from '../config/supabase.js';

export const getAllProducts = async () => {
    const { data, error } = await supabase.from('products').select('*, categories(name)');
    if (error) throw error;
    return data;
}

export const createProduct = async (productData) => {
    const { data, error } = await supabase.from('products').insert([productData]).select();
    if (error) throw error;
    return data;
};

export const deleteProduct = async (id) => {
    const { data, error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return data;
};

export const updateProduct = async (id, productData) => {
    const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select(); 
    if (error) throw error;
    return data[0];
};