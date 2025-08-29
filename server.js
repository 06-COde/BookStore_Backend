import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/connectDB.js';  
import bookRoutes from './routes/book.routes.js';
import errorHandler from './middlewares/error.handler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

connectDB();

app.use('/api/books', bookRoutes);   

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Hello World!" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
