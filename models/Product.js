const pool = require('../config/db');

class Product {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create({ category_id, name, description, price, stock, image_url }) {
    const [result] = await pool.query(
      `INSERT INTO products (category_id, name, description, price, stock, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [category_id, name, description, price, stock, image_url]
    );
    return { id: result.insertId, category_id, name, description, price, stock, image_url };
  }

  static async update(id, { category_id, name, description, price, stock, image_url }) {
    await pool.query(
      `UPDATE products SET category_id = ?, name = ?, description = ?, price = ?, stock = ?, image_url = ?
       WHERE id = ?`,
      [category_id, name, description, price, stock, image_url, id]
    );
    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Product;