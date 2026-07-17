import { supabase } from '../config/supabase.js';

export const getDashboardStats = async () => {
    // جلب بيانات المبيعات
    const { data: salesData } = await supabase.from('sales').select('total_amount');
    const totalSales = salesData ? salesData.reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0) : 0;

    // جلب بيانات المشتريات
    const { data: purchasesData } = await supabase.from('purchases').select('total_amount');
    const totalPurchases = purchasesData ? purchasesData.reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0) : 0;

    // جلب بيانات المصروفات
    const { data: expensesData } = await supabase.from('expenses').select('amount');
    const totalExpenses = expensesData ? expensesData.reduce((acc, curr) => acc + parseFloat(curr.amount), 0) : 0;

    // حساب صافي الربح
    const netProfit = totalSales - totalPurchases - totalExpenses;

    return {
        totalSales,
        totalPurchases,
        totalExpenses,
        netProfit
    };
};