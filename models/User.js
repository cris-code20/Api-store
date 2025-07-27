const pool = require('../config/db');

class User {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async create({ name, email, password_hash, phone }) {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)',
            [name, email, password_hash, phone]
        );

        return { id: result.insertId, name, email, password_hash, phone };
    }

    static async update(id, { name, email, password_hash, phone }) {
        await pool.query(
            'UPDATE users SET name = ?, email = ?, password_hash = ?, phone = ? WHERE id = ?',
            [name, email, password_hash, phone, id]
        );

        return this.getById(id);
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = User;
