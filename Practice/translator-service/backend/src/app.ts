import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import pool from './config/db';
import translateRoute from './routes/translate.route';
import usersRouter from './routes/users.route';
import { errorMiddleware } from './middlewares/error-handler.middleware';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/translate', translateRoute);
app.use('/api/users', usersRouter);

app.use(errorMiddleware);

const start = async () => {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to PostgreSQL');
        client.release();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to PostgreSQL:', error);
        process.exit(1);
    }
}

start();