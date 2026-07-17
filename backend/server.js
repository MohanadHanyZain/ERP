import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: "System is healthy!" });
});

app.use('/products', productRoutes);


// Error Handler
app.use(errorHandler);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})