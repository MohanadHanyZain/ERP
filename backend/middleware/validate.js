import Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().positive().required(),
    stock_quantity: Joi.number().integer().min(0).default(0),
    category_id: Joi.string().uuid().optional()
});

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
};

export const categorySchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().optional()
});

export const customerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().optional()
});

export const expenseSchema = Joi.object({
    amount: Joi.number().positive().required(),
    description: Joi.string().required()
});

export const saleSchema = Joi.object({
    product_id: Joi.string().uuid().required(),
    quantity: Joi.number().integer().positive().required()
});

export const purchaseSchema = Joi.object({
    product_id: Joi.string().uuid().required(),
    quantity: Joi.number().integer().positive().required(),
    cost_price: Joi.number().positive().required()
});