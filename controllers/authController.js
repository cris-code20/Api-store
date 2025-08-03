const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// 🔐 Clave secreta JWT
const JWT_SECRET = process.env.JWT_SECRET || 'Metano04';

// 📥 Registro
exports.register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Campos obligatorios' });
  }

  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length) {
    return res.status(400).json({ message: 'El email ya está registrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashedPassword, phone, 'user']
  );

  res.status(201).json({ id: result.insertId, name, email });
};

// 🔐 Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};
