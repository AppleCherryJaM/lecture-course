import pool from '../config/db';
import fs from 'fs';
import path from 'path';

const runMigration = async () => {
    const sql = fs.readFileSync(
        path.join(__dirname, 'init.sql'),
        'utf-8'
    );

    try {
        await pool.query(sql);
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await pool.end();
    }
};

runMigration();
