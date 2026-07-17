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