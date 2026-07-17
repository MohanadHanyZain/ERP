
import * as productService from '../services/productService.js';



export const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        
        res.status(200).json({ success: true, data: products, message: "Products fetched successfully" });
    } catch (error) {
        next(error);
    }
};
export const addProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({ success: true, data: newProduct, message: "Product added successfully" });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params; // الحصول على الـ id من الرابط
        await productService.deleteProduct(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.updateProduct(id, req.body);
        res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully" });
    } catch (error) {
        next(error);
    }
};