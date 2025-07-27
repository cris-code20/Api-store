const pool = require('../config/db');

class Invoice {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM invoices');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM invoices WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create({ order_id, invoice_number, total }) {
    const [result] = await pool.query(
      `INSERT INTO invoices (order_id, invoice_number, total)
       VALUES (?, ?, ?)`,
      [order_id, invoice_number, total]
    );
    return { id: result.insertId, order_id, invoice_number, total };
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM invoices WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Invoice;
