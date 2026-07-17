import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_super_secret_key'; // في الواقع يجب وضعها في .env

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // استخراج التوكن من الـ Header
    
    if (!token) return res.status(403).json({ success: false, message: "مطلوب تسجيل الدخول" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: "توكن غير صالح" });
        req.userId = decoded.id; // تمرير معرف المستخدم للعمليات القادمة
        next();
    });
};