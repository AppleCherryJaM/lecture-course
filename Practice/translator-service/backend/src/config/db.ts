import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const DB_PORT = Number(process.env.DATABASE_PORT);
const DB_HOST = process.env.DATABASE_HOST;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_USER = process.env.DATABASE_USER;
const DB_NAME = process.env.DATABASE_NAME;

const pool = new Pool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    max: 10,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err);
    process.exit(-1);
});

export default pool;
