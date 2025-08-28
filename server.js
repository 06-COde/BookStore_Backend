import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/connectDB.js';  
import bookRoutes from './routes/book.routes.js';
import errorHandler from './middlewares/error.handler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: true }));
// Middleware for JSON parsing
app.use(express.json());    
app.use(errorHandler);

connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use('/api/books', bookRoutes);   

app.get('/', (req, res) => {
    res.send('Hello World!');
});     

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});