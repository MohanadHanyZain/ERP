export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // req.user يأتي من الـ verifyToken السابق له
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "ليس لديك صلاحية للوصول لهذا المسار" });
        }
        next();
    };
};