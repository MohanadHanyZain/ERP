import * as productService from '../services/productService.js';

export const getProducts = async (req, res, next) => {
    try {
        // التصحيح: نستخدم req.user.id بدلاً من req.userId
        const products = await productService.getAllProducts(req.user.id);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body, req.user.id);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        next(error);
    }
};

// طبق نفس التغيير على deleteProduct و updateProduct
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id, req.user.id);
        res.status(200).json({ success: true, message: "تم الحذف" });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.updateProduct(id, req.body, req.user.id);
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        next(error);
    }
};