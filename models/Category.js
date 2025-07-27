const pool = require('../config/db');

class Category {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM categories');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    }

    static async create({ name }) {
        const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
        return { id: result.insertId, name };
    }

    static async update(id, { name }) {
        await pool.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
        return this.getById(id);
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Category;
