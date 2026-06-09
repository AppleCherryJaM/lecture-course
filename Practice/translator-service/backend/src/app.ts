import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import { translateRoute } from './routes/translate.route';
import { errorMiddleware } from './middlewares/error-handler.middleware';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/translate', translateRoute);

app.use(errorMiddleware);

const start = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();