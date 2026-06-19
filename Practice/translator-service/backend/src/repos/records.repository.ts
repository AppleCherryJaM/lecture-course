import pool from "../config/db";
import { Record } from "../types/types";

export class RecordsRepository {

    constructor() { }

    public async create(record: Record) {
        const result = await pool.query(
            `INSERT INTO record (from_lang, to_lang, input_text, translated_text, user_id)
             VALUES ($1, $2, $3, $4, $5)`,
            [record.from_lang, record.to_lang, record.input_text, record.translated_text, record.user_id]
        );
        return result.rows[0];
    }
}