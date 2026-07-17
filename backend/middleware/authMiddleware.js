import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_super_secret_key';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ success: false, message: "مطلوب تسجيل الدخول" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: "توكن غير صالح" });
        
        // هنا نقوم بتخزين الـ payload كاملة (بما فيها id و role)
        req.user = decoded; 
        next();
    });
};