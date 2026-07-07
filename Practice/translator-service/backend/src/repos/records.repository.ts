import pool from "../config/db";
import { Record } from "../types/types";

export class RecordsRepository {
    constructor() { }

    public async create(record: Record) {
        const result = await pool.query(
            `INSERT INTO record (from_lang, to_lang, input_text, translated_text, user_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [record.from_lang, record.to_lang, record.input_text, record.translated_text, record.user_id]
        );
        return result.rows[0];
    }

    public async findByUserId(userId: number, limit: number, offset: number) {
        const result = await pool.query(
            `SELECT * FROM record 
             WHERE user_id = $1 
             ORDER BY id DESC 
             LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        );
        return result.rows;
    }

    public async countByUserId(userId: number) {
        const result = await pool.query(
            `SELECT COUNT(*) FROM record WHERE user_id = $1`,
            [userId]
        );
        return parseInt(result.rows[0].count, 10);
    }
}