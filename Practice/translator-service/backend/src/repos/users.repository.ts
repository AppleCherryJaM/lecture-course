import pool from "../config/db";
import { User } from "../types/types";

export class UsersRepository {
    constructor() { }

    public async create(user: User) {
        const result = await pool.query(
            `INSERT INTO users (email, password)
             VALUES ($1, $2)
             RETURNING *`,
            [user.email, user.password]
        );
        return result.rows[0];
    }

    public async findByEmail(email: string) {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return result.rows[0];
    }

    public async findById(id: number) {
        const result = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    }

    public async update(id: number, { email, password }: { email: string, password: string }) {
        const result = await pool.query(
            `UPDATE users SET email = $1, password = $2 WHERE id = $3
             RETURNING *`,
            [email, password, id]
        );
        return result.rows[0];
    }

    public async delete(id: number) {
        const result = await pool.query(
            `DELETE FROM users WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
}