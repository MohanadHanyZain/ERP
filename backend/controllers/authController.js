import { supabase } from '../config/supabase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js'; // استيراد الـ Handler

const SECRET_KEY = 'your_super_secret_key';

export const register = asyncHandler(async (req, res) => {
    const { email, password, store_name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password_hash: hashedPassword, store_name }])
        .select();

    if (error) throw new Error("فشل التسجيل: " + error.message); // الـ asyncHandler سيلتقط هذا الخطأ

    return sendSuccess(res, data[0], "تم إنشاء الحساب بنجاح", 201);
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { data: users, error } = await supabase.from('users').select('*').eq('email', email);

    if (error || users.length === 0 || !(await bcrypt.compare(password, users[0].password_hash))) {
        // يمكنك إلقاء خطأ مع كود حالة إذا كان الـ Middleware يدعم ذلك، 
        // أو الاعتماد على معالجة الخطأ العامة
        const err = new Error("البريد أو كلمة السر خطأ");
        err.statusCode = 401;
        throw err;
    }

    const token = jwt.sign({ id: users[0].id, role: users[0].role }, SECRET_KEY, { expiresIn: '24h' });
    
    return sendSuccess(res, { token }, "تم تسجيل الدخول بنجاح", 200);
});