const pool = require('../config/db');

class Order {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM orders');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create({ user_id, address_id, total, status, payment_method }) {
    const [result] = await pool.query(
      `INSERT INTO orders (user_id, address_id, total, status, payment_method)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, address_id, total, status, payment_method]
    );
    return { id: result.insertId, user_id, address_id, total, status, payment_method };
  }

  static async update(id, { status }) {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Order;

