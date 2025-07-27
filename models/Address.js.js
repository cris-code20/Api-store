const pool = require('../config/db');

class Address {
  static async getAllByUser(userId) {
    const [rows] = await pool.query(
      'SELECT * FROM addresses WHERE user_id = ?',
      [userId]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM addresses WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ user_id, address_line, city, province, postal_code, is_pickup_location = false }) {
    const [result] = await pool.query(
      `INSERT INTO addresses (user_id, address_line, city, province, postal_code, is_pickup_location)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, address_line, city, province, postal_code, is_pickup_location]
    );

    return {
      id: result.insertId,
      user_id,
      address_line,
      city,
      province,
      postal_code,
      is_pickup_location,
    };
  }

  static async update(id, data) {
    const {
      address_line,
      city,
      province,
      postal_code,
      is_pickup_location,
    } = data;

    await pool.query(
      `UPDATE addresses SET address_line = ?, city = ?, province = ?, postal_code = ?, is_pickup_location = ?
       WHERE id = ?`,
      [address_line, city, province, postal_code, is_pickup_location, id]
    );

    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM addresses WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Address;
