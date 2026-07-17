import * as productService from '../services/productService.js';

export const getProducts = async (req, res, next) => {
    try {
        // نمرر الـ userId الذي سيأتي من الـ middleware
        const products = await productService.getAllProducts(req.userId);
        
        res.status(200).json({ success: true, data: products, message: "Products fetched successfully" });
    } catch (error) {
        next(error);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        // نمرر الـ body ومعها الـ userId
        const newProduct = await productService.createProduct(req.body, req.userId);
        res.status(201).json({ success: true, data: newProduct, message: "Product added successfully" });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        // نمرر الـ id الخاص بالمنتج والـ userId للتأكد من ملكيته للمنتج قبل الحذف
        await productService.deleteProduct(id, req.userId);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        // نمرر الـ id الخاص بالمنتج والبيانات الجديدة والـ userId
        const updatedProduct = await productService.updateProduct(id, req.body, req.userId);
        res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully" });
    } catch (error) {
        next(error);
    }
};