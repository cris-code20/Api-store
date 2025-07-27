const pool = require('../config/db');

class OrderItem {
  static async create({ order_id, product_id, quantity, unit_price }) {
    const [result] = await pool.query(
      `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
       VALUES (?, ?, ?, ?)`,
      [order_id, product_id, quantity, unit_price]
    );
    return { id: result.insertId, order_id, product_id, quantity, unit_price };
  }

  static async getByOrder(order_id) {
    const [rows] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [order_id]);
    return rows;
  }

  static async deleteByOrder(order_id) {
    const [result] = await pool.query('DELETE FROM order_items WHERE order_id = ?', [order_id]);
    return result.affectedRows;
  }
}

module.exports = OrderItem;