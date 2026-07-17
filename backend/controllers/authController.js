import { supabase } from '../config/supabase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_super_secret_key';

export const register = async (req, res) => {
    const { email, password, store_name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password_hash: hashedPassword, store_name }])
        .select();

    if (error) return res.status(400).json({ success: false, message: "فشل التسجيل" });
    res.status(201).json({ success: true, message: "تم إنشاء الحساب بنجاح" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const { data: users, error } = await supabase.from('users').select('*').eq('email', email);

    if (error || users.length === 0 || !(await bcrypt.compare(password, users[0].password_hash))) {
        return res.status(401).json({ success: false, message: "البريد أو كلمة السر خطأ" });
    }

    const token = jwt.sign({ id: users[0].id }, SECRET_KEY, { expiresIn: '24h' });
    res.status(200).json({ success: true, token });
};