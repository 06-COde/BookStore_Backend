import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/connectDB.js';  
import bookRoutes from './routes/book.routes.js';
import errorHandler from './middlewares/error.handler.js';
import http from 'http';
import os from 'os';
import cluster from 'cluster';
import { validateEnv } from './config/envValidator.js';

const totalCpus = os.cpus().length;
const PORT = process.env.PORT || 5000;
const app = express();

await validateEnv();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use('/api/books', bookRoutes);   
app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Hello World!" });
});

const startServer = async () => {
  if (cluster.isPrimary) {
    console.log(`Primary with pid ${process.pid} is running`);
    await connectDB();
    for (let i = 0; i < totalCpus; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.error(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Worker ${process.pid} is listening on http://localhost:${PORT}`);
    });
  }
};

startServer();
