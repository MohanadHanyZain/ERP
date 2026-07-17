import { supabase } from '../config/supabase.js';

// 1. جلب المنتجات الخاصة بالمستخدم الحالي فقط
export const getAllProducts = async (userId) => {
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('user_id', userId); // إضافة شرط العزل
    if (error) throw error;
    return data;
}

// 2. إضافة منتج وربطه بـ user_id
export const createProduct = async (productData, userId) => {
    // ندمج بيانات المنتج مع الـ userId
    const { data, error } = await supabase
        .from('products')
        .insert([{ ...productData, user_id: userId }])
        .select();
    if (error) throw error;
    return data;
};

// 3. حذف المنتج بشرط أن يكون يخص هذا المستخدم
export const deleteProduct = async (id, userId) => {
    const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('user_id', userId); // الحذف لا يتم إلا إذا كان المنتج يخص هذا المستخدم
    if (error) throw error;
    return data;
};

// 4. تعديل المنتج بشرط أن يكون يخص هذا المستخدم
export const updateProduct = async (id, productData, userId) => {
    const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .eq('user_id', userId) // التعديل لا يتم إلا إذا كان المنتج يخص هذا المستخدم
        .select(); 
    if (error) throw error;
    return data[0];
};