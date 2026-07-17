import * as categoryService from '../services/categoryService.js';

export const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories(req.userId);
        res.status(200).json({ success: true, data: categories });
    } catch (error) { next(error); }
};

export const addCategory = async (req, res, next) => {
    try {
        const newCategory = await categoryService.createCategory(req.body, req.userId);
        res.status(201).json({ success: true, data: newCategory });
    } catch (error) { next(error); }
};