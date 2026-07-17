import { supabase } from '../config/supabase.js';

export const processPurchase = async (purchaseData) => {
    const { supplier_id, items, total_amount } = purchaseData;

    // 1. إنشاء فاتورة الشراء
    const { data: purchase, error: purchaseError } = await supabase
        .from('purchases')
        .insert([{ supplier_id, total_amount }])
        .select();
    if (purchaseError) throw purchaseError;
    const purchaseId = purchase[0].id;

    // 2. إعداد مصفوفة المنتجات (Purchase Items)
    const purchaseItems = items.map(item => ({
        purchase_id: purchaseId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
    }));

    // 3. إعداد مصفوفة الحركات (Transactions) - لاحظ هنا النوع 'in'
    const transactions = items.map(item => ({
        product_id: item.product_id,
        transaction_type: 'in',
        quantity: item.quantity,
        price: item.price,
        notes: `شراء فاتورة رقم ${purchaseId}`
    }));

    // 4. تنفيذ العمليات
    await supabase.from('purchase_items').insert(purchaseItems);
    await supabase.from('transactions').insert(transactions);

    return purchaseId;
};