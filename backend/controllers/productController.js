import * as productService from '../services/productService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getProducts = asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts(req.user.id);
    return sendSuccess(res, products, 'تم جلب المنتجات بنجاح');
});

export const addProduct = asyncHandler(async (req, res) => {
    const newProduct = await productService.createProduct(req.body, req.user.id);
    return sendSuccess(res, newProduct, 'تم إضافة المنتج بنجاح', 201);
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await productService.deleteProduct(id, req.user.id);
    return sendSuccess(res, null, 'تم حذف المنتج بنجاح');
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await productService.updateProduct(id, req.body, req.user.id);
    return sendSuccess(res, updatedProduct, 'تم تحديث المنتج بنجاح');
});

export const getProductById = asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
        // يمكنك إلقاء خطأ مع كود حالة 404 ليلتقطه الـ Middleware
        const error = new Error('المنتج غير موجود');
        error.statusCode = 404;
        throw error;
    }
    return sendSuccess(res, product);
});