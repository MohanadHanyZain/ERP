import * as customerService from '../services/customerService.js';

export const getCustomers = async (req, res, next) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        next(error);
    }
};

export const addCustomer = async (req, res, next) => {
    try {
        const newCustomer = await customerService.createCustomer(req.body);
        res.status(201).json({ success: true, data: newCustomer });
    } catch (error) {
        next(error);
    }
};