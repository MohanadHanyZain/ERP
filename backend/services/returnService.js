import { supabase } from '../config/supabase.js';

export const processCustomerReturn = async (returnData) => {
    const { sale_id, product_id, quantity, reason } = returnData;

    // 1. تسجيل المرتجع في جدول خاص بالمرتجعات (سننشئ الجدول أدناه)
    const { data: returnEntry, error: returnError } = await supabase
        .from('returns')
        .insert([{ sale_id, product_id, quantity, reason, type: 'customer' }])
        .select();
    
    if (returnError) throw returnError;

    // 2. تسجيل حركة في المخزن (لأن المرتجع يعني زيادة الرصيد)
    const { error: transError } = await supabase.from('transactions').insert([{
        product_id,
        transaction_type: 'in', // دخول بضاعة للمخزن
        quantity,
        price: 0, // غالباً لا نحسب السعر في الحركة هنا أو نحسبه بسعر الشراء
        notes: `مرتجع من فاتورة ${sale_id}`
    }]);

    if (transError) throw transError;

    return returnEntry[0];
};