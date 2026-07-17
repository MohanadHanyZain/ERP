export const processPurchase = async (purchaseData, userId) => {
    const { supplier_id, items, total_amount } = purchaseData;

    // 1. إنشاء فاتورة الشراء مع الـ user_id
    const { data: purchase, error: purchaseError } = await supabase
        .from('purchases')
        .insert([{ supplier_id, total_amount, user_id: userId }]) // تمت الإضافة
        .select();
    if (purchaseError) throw purchaseError;
    const purchaseId = purchase[0].id;

    // 2. إعداد مصفوفة المنتجات مع الـ user_id
    const purchaseItems = items.map(item => ({
        purchase_id: purchaseId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        user_id: userId // تمت الإضافة
    }));

    // 3. إعداد مصفوفة الحركات (Transactions) مع الـ user_id
    const transactions = items.map(item => ({
        product_id: item.product_id,
        transaction_type: 'in',
        quantity: item.quantity,
        price: item.price,
        notes: `شراء فاتورة رقم ${purchaseId}`,
        user_id: userId // تمت الإضافة
    }));

    // 4. تنفيذ العمليات
    const { error: itemsError } = await supabase.from('purchase_items').insert(purchaseItems);
    if (itemsError) throw itemsError;

    const { error: transError } = await supabase.from('transactions').insert(transactions);
    if (transError) throw transError;

    return purchaseId;
};