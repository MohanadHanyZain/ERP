import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import returnRoutes from './routes/returnRoutes.js';
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middleware/errorHandler.js';



dotenv.config();

const app = express();


app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: "System is healthy!" });
});


// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));






app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/customers', customerRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/transactions', transactionRoutes);
app.use('/sales', saleRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/expenses', expenseRoutes);
app.use('/dashboard', reportRoutes);
app.use('/returns', returnRoutes);
app.use('/auth', authRoutes);



// Error Handler
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})