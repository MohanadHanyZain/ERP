import * as supplierService from '../services/supplierService.js';

export const getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await supplierService.getAllSuppliers(req.userId);
        res.status(200).json({ success: true, data: suppliers });
    } catch (error) { next(error); }
};

export const addSupplier = async (req, res, next) => {
    try {
        const newSupplier = await supplierService.createSupplier(req.body, req.userId);
        res.status(201).json({ success: true, data: newSupplier });
    } catch (error) { next(error); }
};