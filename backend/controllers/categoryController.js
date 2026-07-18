import * as categoryService from '../services/categoryService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getAllCategories(req.user.id);
    return sendSuccess(res, categories, 'تم جلب التصنيفات بنجاح');
});

export const addCategory = asyncHandler(async (req, res) => {
    const newCategory = await categoryService.createCategory(req.body, req.user.id);
    return sendSuccess(res, newCategory, 'تم إضافة التصنيف بنجاح', 201);
});